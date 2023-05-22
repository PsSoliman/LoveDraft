import prisma from '../dbClient.js'

import { generateEdit } from '../ext-src/actions.js'


export default async function (args, context) {
  return (generateEdit as any)(args, {
    ...context,
    entities: {
      CoverLetter: prisma.coverLetter,
      User: prisma.user,
    },
  })
}

export type GenerateEdit = typeof generateEdit 
