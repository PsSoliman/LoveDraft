import prisma from '../dbClient.js'

import { updateUser } from '../ext-src/actions.js'


export default async function (args, context) {
  return (updateUser as any)(args, {
    ...context,
    entities: {
      User: prisma.user,
    },
  })
}

export type UpdateUser = typeof updateUser 
