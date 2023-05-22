import prisma from '../dbClient.js'

import { generateCoverLetter } from '../ext-src/actions.js'


export default async function (args, context) {
  return (generateCoverLetter as any)(args, {
    ...context,
    entities: {
      CoverLetter: prisma.coverLetter,
      User: prisma.user,
    },
  })
}

export type GenerateCoverLetter = typeof generateCoverLetter 
