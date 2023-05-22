import prisma from '../dbClient.js'

import { getJob } from '../ext-src/queries.js'


export default async function (args, context) {
  return (getJob as any)(args, {
    ...context,
    entities: {
      Job: prisma.job,
    },
  })
}

export type GetJob = typeof getJob 
