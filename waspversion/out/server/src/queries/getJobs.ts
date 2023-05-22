import prisma from '../dbClient.js'

import { getJobs } from '../ext-src/queries.js'


export default async function (args, context) {
  return (getJobs as any)(args, {
    ...context,
    entities: {
      Job: prisma.job,
    },
  })
}

export type GetJobs = typeof getJobs 
