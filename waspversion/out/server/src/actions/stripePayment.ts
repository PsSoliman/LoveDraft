import prisma from '../dbClient.js'

import { stripePayment } from '../ext-src/actions.js'


export default async function (args, context) {
  return (stripePayment as any)(args, {
    ...context,
    entities: {
      User: prisma.user,
    },
  })
}

export type StripePayment = typeof stripePayment 
