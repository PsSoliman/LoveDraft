import prisma from '../dbClient.js'

import { deleteJob } from '../ext-src/actions.js'


export default async function (args, context) {
  return (deleteJob as any)(args, {
    ...context,
    entities: {
      Job: prisma.job,
    },
  })
}

export type DeleteJob = typeof deleteJob 
