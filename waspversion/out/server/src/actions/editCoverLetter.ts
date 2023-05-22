import prisma from '../dbClient.js'

import { editCoverLetter } from '../ext-src/actions.js'


export default async function (args, context) {
  return (editCoverLetter as any)(args, {
    ...context,
    entities: {
      CoverLetter: prisma.coverLetter,
    },
  })
}

export type EditCoverLetter = typeof editCoverLetter 
