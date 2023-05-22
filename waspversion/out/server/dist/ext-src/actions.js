import HttpError from '../core/HttpError.js';
import fetch from 'node-fetch';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_KEY, {
    apiVersion: '2022-11-15',
});
const DOMAIN = process.env.WASP_WEB_CLIENT_URL || 'http://localhost:3000';
const gptConfig = {
    completeCoverLetter: `You are a cover letter generator.
You will be given a job description along with the job applicant's resume.
You will write a cover letter for the applicant that matches their past experiences from the resume with the job description.
Rather than simply outlining the applicant's past experiences, you will give more detail and explain how those experiences will help the applicant succeed in the new job.
You will write the cover letter in a modern, professional style without being too formal, as a modern employee might do naturally.`,
    coverLetterWithAWittyRemark: `You are a cover letter generator.
You will be given a job description along with the job applicant's resume.
You will write a cover letter for the applicant that matches their past experiences from the resume with the job description.
Rather than simply outlining the applicant's past experiences, you will give more detail and explain how those experiences will help the applicant succeed in the new job.
You will write the cover letter in a modern, relaxed style, as a modern employee might do naturally.
Include a job related joke at the end of the cover letter.`,
    ideasForCoverLetter: "You are a cover letter idea generator. You will be given a job description along with the job applicant's resume. You will generate a bullet point list of ideas for the applicant to use in their cover letter. ",
};
export const generateCoverLetter = async ({ jobId, title, content, description, isCompleteCoverLetter, includeWittyRemark, temperature }, context) => {
    if (!context.user) {
        throw new HttpError(401);
    }
    let command;
    let tokenNumber;
    if (isCompleteCoverLetter) {
        command = includeWittyRemark ? gptConfig.coverLetterWithAWittyRemark : gptConfig.completeCoverLetter;
        tokenNumber = 1000;
    }
    else {
        command = gptConfig.ideasForCoverLetter;
        tokenNumber = 500;
    }
    const payload = {
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: command,
            },
            {
                role: 'user',
                content: `My Resume: ${content}. Job title: ${title} Job Description: ${description}.`,
            },
        ],
        max_tokens: tokenNumber,
        temperature,
    };
    let json;
    try {
        if (!context.user.hasPaid && !context.user.credits) {
            throw new HttpError(402, 'User has not paid or is out of credits');
        }
        else if (context.user.credits && !context.user.hasPaid) {
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
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            method: 'POST',
            body: JSON.stringify(payload),
        });
        json = (await response.json());
        return context.entities.CoverLetter.create({
            data: {
                title,
                content: json === null || json === void 0 ? void 0 : json.choices[0].message.content,
                tokenUsage: json === null || json === void 0 ? void 0 : json.usage.completion_tokens,
                user: { connect: { id: context.user.id } },
                job: { connect: { id: jobId } },
            },
        });
    }
    catch (error) {
        if (!context.user.hasPaid && (error === null || error === void 0 ? void 0 : error.statusCode) != 402) {
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
export const generateEdit = async ({ content, improvement }, context) => {
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
    let json;
    try {
        if (!context.user.hasPaid && !context.user.credits) {
            throw new HttpError(402, 'User has not paid or is out of credits');
        }
        else if (context.user.credits && !context.user.hasPaid) {
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
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            method: 'POST',
            body: JSON.stringify(payload),
        });
        json = (await response.json());
        if (json === null || json === void 0 ? void 0 : json.choices[0].message.content.length) {
            return new Promise((resolve, reject) => {
                resolve(json === null || json === void 0 ? void 0 : json.choices[0].message.content);
            });
        }
    }
    catch (error) {
        if (!context.user.hasPaid && (error === null || error === void 0 ? void 0 : error.statusCode) != 402) {
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
export const createJob = ({ title, company, location, description }, context) => {
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
export const updateJob = ({ id, title, company, location, description, isCompleted }, context) => {
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
export const updateCoverLetter = async ({ id, description, content, isCompleteCoverLetter, includeWittyRemark, temperature }, context) => {
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
    const coverLetter = await generateCoverLetter({
        jobId: id,
        title: job.title,
        content,
        description: job.description,
        isCompleteCoverLetter,
        includeWittyRemark,
        temperature,
    }, context);
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
export const editCoverLetter = ({ coverLetterId, content }, context) => {
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
export const deleteJob = ({ jobId }, context) => {
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
export const updateUser = async ({ notifyPaymentExpires }, context) => {
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
function dontUpdateUser(user) {
    return new Promise((resolve) => {
        resolve(user);
    });
}
export const updateUserHasPaid = async (_args, context) => {
    var _a;
    if (!context.user) {
        throw new HttpError(401);
    }
    if (context.user.hasPaid) {
        return dontUpdateUser(context.user);
    }
    const checkoutSessionId = (_a = context.user) === null || _a === void 0 ? void 0 : _a.checkoutSessionId;
    let status;
    if (!checkoutSessionId) {
        return dontUpdateUser(context.user);
    }
    else {
        const session = await stripe.checkout.sessions.retrieve(checkoutSessionId);
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
export const stripePayment = async (_args, context) => {
    var _a, _b;
    if (!context.user || !context.user.email) {
        throw new HttpError(401, 'User or email not found');
    }
    let customer;
    const stripeCustomers = await stripe.customers.list({
        email: context.user.email,
    });
    if (!stripeCustomers.data.length) {
        console.log('creating customer');
        customer = await stripe.customers.create({
            email: context.user.email,
        });
    }
    else {
        console.log('using existing customer');
        customer = stripeCustomers.data[0];
    }
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: process.env.PRODUCT_PRICE_ID,
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
            checkoutSessionId: (_a = session === null || session === void 0 ? void 0 : session.id) !== null && _a !== void 0 ? _a : null,
            stripeId: (_b = customer.id) !== null && _b !== void 0 ? _b : null,
        },
    });
    return new Promise((resolve, reject) => {
        if (!session) {
            reject(new HttpError(402, 'Could not create a Stripe session'));
        }
        else {
            resolve({
                sessionUrl: session.url,
                sessionId: session.id,
            });
        }
    });
};
export const stripeCreditsPayment = async (_args, context) => {
    var _a;
    if (!context.user || !context.user.email) {
        throw new HttpError(401, 'User or email not found');
    }
    let customer;
    const stripeCustomers = await stripe.customers.list({
        email: context.user.email,
    });
    if (!stripeCustomers.data.length) {
        console.log('creating customer');
        customer = await stripe.customers.create({
            email: context.user.email,
        });
    }
    else {
        console.log('using existing customer');
        customer = stripeCustomers.data[0];
    }
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: process.env.PRODUCT_CREDITS_PRICE_ID,
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
            stripeId: (_a = customer.id) !== null && _a !== void 0 ? _a : null,
        },
    });
    return new Promise((resolve, reject) => {
        if (!session) {
            reject(new HttpError(402, 'Could not create a Stripe session'));
        }
        else {
            resolve({
                sessionUrl: session.url,
                sessionId: session.id,
            });
        }
    });
};
//# sourceMappingURL=actions.js.map