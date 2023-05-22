import prisma from '../dbClient.js'

import { getUserInfo } from '../ext-src/queries.js'


export default async function (args, context) {
  return (getUserInfo as any)(args, {
    ...context,
    entities: {
      User: prisma.user,
    },
  })
}

export type GetUserInfo = typeof getUserInfo 
