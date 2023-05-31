import HttpError from '@wasp/core/HttpError.js';
import fetch from 'node-fetch';
import type { Job, CoverLetter, User } from '@wasp/entities';
import type {
  GenerateCoverLetter,
  CreateJob,
  UpdateCoverLetter,
  EditCoverLetter,
  GenerateEdit,
  UpdateJob,
  UpdateUser,
  UpdateUserHasPaid,
  DeleteJob,
  StripePayment,
  StripeCreditsPayment,
} from '@wasp/actions/types';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_KEY!, {
  apiVersion: '2022-11-15',
});

const DOMAIN = process.env.WASP_WEB_CLIENT_URL || 'http://localhost:3000';

const gptConfig = {
  completeCoverLetter: `write me 7 wedding vows from the perspective of an intelligent, well-written, and loving husband. Use some of the characteristics below in the vows. Use the example vows as examples, but do not copy them word for word. try to avoid being cheesy,
  include the described qualities of the spouse in the vows.
  Example Vows:
  "I vow to always be your protector, and confidante, responsible for making sure your every need is met, every want is reached, and every dream realized"
  "I feel overwhelmingly lucky and proud to be standing beside you today. Thank you for accepting me for all that I am"
  "I love you with my whole heart with a passion that can't be expressed in words, only in kisses, glances, and years of adventure by your side"
  "I vow to always protect you from harm, to stand with you against your troubles, and to look to you when I need protection.
  `,
  coverLetterWithAWittyRemark: `write me 7 wedding vows from the perspective of an intelligent, well-written, and loving husband. Use some of the characteristics below in the vows. Use the example vows as examples, but do not copy them word for word. try to avoid being cheesy,
  include the described qualities of the spouse in the vows.
  Example Vows:
  "I vow to always be your protector, and confidante, responsible for making sure your every need is met, every want is reached, and every dream realized"
  "I feel overwhelmingly lucky and proud to be standing beside you today. Thank you for accepting me for all that I am"
  "I love you with my whole heart with a passion that can't be expressed in words, only in kisses, glances, and years of adventure by your side"
  "I vow to always protect you from harm, to stand with you against your troubles, and to look to you when I need protection.
  `,
  ideasForCoverLetter:
  `write me 7 wedding vows from the perspective of an intelligent, well-written, and loving husband. Use some of the characteristics below in the vows. Use the example vows as examples, but do not copy them word for word. try to avoid being cheesy,
  include the described qualities of the spouse in the vows.
  Example Vows:
  "I vow to always be your protector, and confidante, responsible for making sure your every need is met, every want is reached, and every dream realized"
  "I feel overwhelmingly lucky and proud to be standing beside you today. Thank you for accepting me for all that I am"
  "I love you with my whole heart with a passion that can't be expressed in words, only in kisses, glances, and years of adventure by your side"
  "I vow to always protect you from harm, to stand with you against your troubles, and to look to you when I need protection.
  `,
};

type CoverLetterPayload = Pick<CoverLetter, 'title' | 'jobId'> & {
  content: string;
  description: string;
  company: string;
  isCompleteCoverLetter: boolean;
  includeWittyRemark: boolean;
  temperature: number;
};

type OpenAIResponse = {
  id: string;
  object: string;
  created: number;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  choices: [
    {
      index: number;
      message: {
        role: string;
        content: string;
      };
      finish_reason: string;
    }
  ];
};

export const generateCoverLetter: GenerateCoverLetter<CoverLetterPayload, CoverLetter> = async (
  { jobId, title, company, description, isCompleteCoverLetter, includeWittyRemark, temperature },
  context
) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  let command;
  let tokenNumber;
  if (isCompleteCoverLetter) {
    command = includeWittyRemark ? gptConfig.coverLetterWithAWittyRemark : gptConfig.completeCoverLetter;
    tokenNumber = 1000;
  } else {
    command = gptConfig.ideasForCoverLetter;
    tokenNumber = 500;
  }

  const payload = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `write me 7 wedding vows from the perspective of an intelligent, well-written, and loving husband. Use some of the characteristics below in the vows. Use the example vows as examples, but do not copy them word for word. try to avoid being cheesy,
        Qualities of spouse: ${description}
        include this anecdote in one of the vows, but make the language more flowery ${company}
        Example Vows:
        "I vow to always be your protector, and confidante, responsible for making sure your every need is met, every want is reached, and every dream realized"
        "I feel overwhelmingly lucky and proud to be standing beside you today. Thank you for accepting me for all that I am"
        "I love you with my whole heart with a passion that can't be expressed in words, only in kisses, glances, and years of adventure by your side"
        "I vow to always protect you from harm, to stand with you against your troubles, and to look to you when I need protection.
        `,
      },
      {
        role: 'user',
        content: `Spouse name: ${title} `,
      },
    ],
    max_tokens: tokenNumber,
    temperature,
  };

  let json: OpenAIResponse;

  try {
    if (!context.user.hasPaid && !context.user.credits) {
      throw new HttpError(402, 'User has not paid or is out of credits');
    } else if (context.user.credits && !context.user.hasPaid) {
      console.log('decrementing credits \n\n');
      await context.entities.User.update({
        where: { id: context.user.id },
        data: {
          credits: {
            // decrement: 1,
            decrement: 0,
          },
        },
      });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY!}`,
      },
      method: 'POST',
      body: JSON.stringify(payload),
    });

    json = (await response.json()) as OpenAIResponse;

    return context.entities.CoverLetter.create({
      data: {
        title,
        content: json?.choices[0].message.content,
        tokenUsage: json?.usage.completion_tokens,
        user: { connect: { id: context.user.id } },
        job: { connect: { id: jobId } },
      },
    });
  } catch (error: any) {
    if (!context.user.hasPaid && error?.statusCode != 402) {
      await context.entities.User.update({
        where: { id: context.user.id },
        data: {
          credits: {
            increment: 1,
          },
        },
      });
    }
    console.error(error);
  }

  return new Promise((resolve, reject) => {
    reject(new HttpError(500, 'Something went wrong'));
  });
};



export const generateEdit: GenerateEdit<{ content: string; improvement: string }, string> = async (
  { content, improvement },
  context
) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  let command;
  let tokenNumber;
  command = `You are a cover letter editor. You will be given a piece of isolated text from within a cover letter and told how you can improve it. Only respond with the revision.`;
  tokenNumber = 1000;

  const payload = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: command,
      },
      {
        role: 'user',
        content: `Isolated text from within cover letter: ${content}. It should be improved by making it more: ${improvement}`,
      },
    ],
    max_tokens: tokenNumber,
    temperature: 0.5,
  };

  let json: OpenAIResponse;

  try {
    if (!context.user.hasPaid && !context.user.credits) {
      throw new HttpError(402, 'User has not paid or is out of credits');
    } else if (context.user.credits && !context.user.hasPaid) {
      console.log('decrementing credits \n\n');
      await context.entities.User.update({
        where: { id: context.user.id },
        data: {
          credits: {
            decrement: 1,
          },
        },
      });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY!}`,
      },
      method: 'POST',
      body: JSON.stringify(payload),
    });

    json = (await response.json()) as OpenAIResponse;
    if (json?.choices[0].message.content.length) {
      return new Promise((resolve, reject) => {
        resolve(json?.choices[0].message.content);
      });
    }
  } catch (error: any) {
    if (!context.user.hasPaid && error?.statusCode != 402) {
      await context.entities.User.update({
        where: { id: context.user.id },
        data: {
          credits: {
            increment: 1,
          },
        },
      });
    } 
    console.error(error);
  }

  return new Promise((resolve, reject) => {
    reject(new HttpError(500, 'Something went wrong'));
  });
};

export type JobPayload = Pick<Job, 'title' | 'company' | 'location' | 'description'>;

export const createJob: CreateJob<JobPayload, Job> = ({ title, company, location, description }, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  return context.entities.Job.create({
    data: {
      title,
      description,
      location,
      company,
      user: { connect: { id: context.user.id } },
    },
  });
};

export type UpdateJobPayload = Pick<Job, 'id' | 'title' | 'company' | 'location' | 'description' | 'isCompleted'>;

export const updateJob: UpdateJob<UpdateJobPayload, Job> = (
  { id, title, company, location, description, isCompleted },
  context
) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  return context.entities.Job.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      location,
      company,
      isCompleted,
    },
  });
};

export type UpdateCoverLetterPayload = Pick<Job, 'id' | 'description'> &
  Pick<CoverLetter, 'content'> & { isCompleteCoverLetter: boolean; includeWittyRemark: boolean; temperature: number };
type JobWithCoverLetter = Job & { coverLetter: CoverLetter[] };

export const updateCoverLetter: UpdateCoverLetter<UpdateCoverLetterPayload, JobWithCoverLetter> = async (
  { id, description, content, isCompleteCoverLetter, includeWittyRemark, temperature },
  context
) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const job = await context.entities.Job.findFirst({
    where: {
      id,
      user: { id: context.user.id },
    },
  });

  if (!job) {
    throw new HttpError(404, 'Job not found');
  }

  const coverLetter = await generateCoverLetter(
    {
      jobId: id,
      title: job.title,
      company: job.company,
      content,
      description: job.description,
      isCompleteCoverLetter,
      includeWittyRemark,
      temperature,
    },
    context
  );

  return context.entities.Job.update({
    where: {
      id,
    },
    data: {
      description,
      coverLetter: { connect: { id: coverLetter.id } },
    },
    include: {
      coverLetter: true,
    },
  });
};

export const editCoverLetter: EditCoverLetter<{ coverLetterId: string; content: string }, CoverLetter> = (
  { coverLetterId, content },
  context
) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  return context.entities.CoverLetter.update({
    where: {
      id: coverLetterId,
    },
    data: {
      content,
    },
  });
};

export const deleteJob: DeleteJob<{ jobId: string }, { count: number }> = ({ jobId }, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }
  if (!jobId) {
    throw new HttpError(401);
  }

  return context.entities.Job.deleteMany({
    where: {
      id: jobId,
      userId: context.user.id,
    },
  });
};

type UpdateUserArgs = Pick<User, 'id' | 'notifyPaymentExpires'>;
type UserWithoutPassword = Omit<User, 'password'>;

export const updateUser: UpdateUser<UpdateUserArgs, UserWithoutPassword> = async (
  { notifyPaymentExpires },
  context
) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  return context.entities.User.update({
    where: {
      id: context.user.id,
    },
    data: {
      notifyPaymentExpires,
    },
    select: {
      id: true,
      email: true,
      username: true,
      hasPaid: true,
      datePaid: true,
      notifyPaymentExpires: true,
      checkoutSessionId: true,
      stripeId: true,
      credits: true,
    },
  });
};

type UpdateUserResult = Pick<User, 'id' | 'email' | 'hasPaid'>;

function dontUpdateUser(user: UserWithoutPassword): Promise<UserWithoutPassword> {
  return new Promise((resolve) => {
    resolve(user);
  });
}

export const updateUserHasPaid: UpdateUserHasPaid<never, UpdateUserResult | UserWithoutPassword> = async (
  _args,
  context
) => {
  if (!context.user) {
    throw new HttpError(401);
  }
  if (context.user.hasPaid) {
    return dontUpdateUser(context.user as UserWithoutPassword);
  }
  const checkoutSessionId = context.user?.checkoutSessionId;
  let status: Stripe.Checkout.Session.PaymentStatus;
  if (!checkoutSessionId) {
    return dontUpdateUser(context.user as UserWithoutPassword);
  } else {
    const session: Stripe.Checkout.Session = await stripe.checkout.sessions.retrieve(checkoutSessionId);
    status = session.payment_status;
  }
  return context.entities.User.update({
    where: {
      id: context.user.id,
    },
    data: {
      hasPaid: status === 'paid' ? true : false,
      checkoutSessionId: null,
      datePaid: status === 'paid' ? new Date() : undefined,
    },
    select: {
      id: true,
      email: true,
      hasPaid: true,
    },
  });
};

type StripePaymentResult = {
  sessionUrl: string | null;
  sessionId: string;
};

export const stripePayment: StripePayment<void, StripePaymentResult> = async (_args, context) => {
  if (!context.user || !context.user.email) {
    throw new HttpError(401, 'User or email not found');
  }
  let customer: Stripe.Customer;
  const stripeCustomers = await stripe.customers.list({
    email: context.user.email,
  });
  if (!stripeCustomers.data.length) {
    console.log('creating customer');
    customer = await stripe.customers.create({
      email: context.user.email,
    });
  } else {
    console.log('using existing customer');
    customer = stripeCustomers.data[0];
  }

  const session: Stripe.Checkout.Session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: process.env.PRODUCT_PRICE_ID!,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${DOMAIN}/checkout?success=true`,
    cancel_url: `${DOMAIN}/checkout?canceled=true`,
    automatic_tax: { enabled: true },
    customer_update: {
      address: 'auto',
    },
    customer: customer.id,
  });

  await context.entities.User.update({
    where: {
      id: context.user.id,
    },
    data: {
      checkoutSessionId: session?.id ?? null,
      stripeId: customer.id ?? null,
    },
  });

  return new Promise((resolve, reject) => {
    if (!session) {
      reject(new HttpError(402, 'Could not create a Stripe session'));
    } else {
      resolve({
        sessionUrl: session.url,
        sessionId: session.id,
      });
    }
  });
};

export const stripeCreditsPayment: StripeCreditsPayment<void, StripePaymentResult> = async (_args, context) => {
  if (!context.user || !context.user.email) {
    throw new HttpError(401, 'User or email not found');
  }
  let customer: Stripe.Customer;
  const stripeCustomers = await stripe.customers.list({
    email: context.user.email,
  });
  if (!stripeCustomers.data.length) {
    console.log('creating customer');
    customer = await stripe.customers.create({
      email: context.user.email,
    });
  } else {
    console.log('using existing customer');
    customer = stripeCustomers.data[0];
  }

  const session: Stripe.Checkout.Session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: process.env.PRODUCT_CREDITS_PRICE_ID!,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${DOMAIN}/checkout?credits=true`,
    cancel_url: `${DOMAIN}/checkout?canceled=true`,
    automatic_tax: { enabled: true },
    customer_update: {
      address: 'auto',
    },
    customer: customer.id,
  });

  await context.entities.User.update({
    where: {
      id: context.user.id,
    },
    data: {
      stripeId: customer.id ?? null,
    },
  });

  return new Promise((resolve, reject) => {
    if (!session) {
      reject(new HttpError(402, 'Could not create a Stripe session'));
    } else {
      resolve({
        sessionUrl: session.url,
        sessionId: session.id,
      });
    }
  });
};
