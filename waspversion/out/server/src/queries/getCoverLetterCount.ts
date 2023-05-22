import prisma from '../dbClient.js'

import { getCoverLetterCount } from '../ext-src/queries.js'


export default async function (args, context) {
  return (getCoverLetterCount as any)(args, {
    ...context,
    entities: {
      CoverLetter: prisma.coverLetter,
    },
  })
}

export type GetCoverLetterCount = typeof getCoverLetterCount 
