import prisma from '../dbClient.js'

import { createJob } from '../ext-src/actions.js'


export default async function (args, context) {
  return (createJob as any)(args, {
    ...context,
    entities: {
      Job: prisma.job,
    },
  })
}

export type CreateJob = typeof createJob 
