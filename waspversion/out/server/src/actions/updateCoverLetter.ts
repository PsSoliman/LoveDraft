import prisma from '../dbClient.js'

import { updateCoverLetter } from '../ext-src/actions.js'


export default async function (args, context) {
  return (updateCoverLetter as any)(args, {
    ...context,
    entities: {
      Job: prisma.job,
      CoverLetter: prisma.coverLetter,
      User: prisma.user,
    },
  })
}

export type UpdateCoverLetter = typeof updateCoverLetter 
