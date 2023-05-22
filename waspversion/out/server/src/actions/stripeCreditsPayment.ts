import prisma from '../dbClient.js'

import { stripeCreditsPayment } from '../ext-src/actions.js'


export default async function (args, context) {
  return (stripeCreditsPayment as any)(args, {
    ...context,
    entities: {
      User: prisma.user,
    },
  })
}

export type StripeCreditsPayment = typeof stripeCreditsPayment 
