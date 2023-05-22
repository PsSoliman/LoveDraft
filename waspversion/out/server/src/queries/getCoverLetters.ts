import prisma from '../dbClient.js'

import { getCoverLetters } from '../ext-src/queries.js'


export default async function (args, context) {
  return (getCoverLetters as any)(args, {
    ...context,
    entities: {
      CoverLetter: prisma.coverLetter,
    },
  })
}

export type GetCoverLetters = typeof getCoverLetters 
