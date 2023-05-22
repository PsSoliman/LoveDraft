import prisma from '../dbClient.js'

import { updateUserHasPaid } from '../ext-src/actions.js'


export default async function (args, context) {
  return (updateUserHasPaid as any)(args, {
    ...context,
    entities: {
      User: prisma.user,
    },
  })
}

export type UpdateUserHasPaid = typeof updateUserHasPaid 
