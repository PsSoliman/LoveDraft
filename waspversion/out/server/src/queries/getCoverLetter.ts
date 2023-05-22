import prisma from '../dbClient.js'

import { getCoverLetter } from '../ext-src/queries.js'


export default async function (args, context) {
  return (getCoverLetter as any)(args, {
    ...context,
    entities: {
      CoverLetter: prisma.coverLetter,
    },
  })
}

export type GetCoverLetter = typeof getCoverLetter 
