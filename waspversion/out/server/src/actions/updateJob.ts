import prisma from '../dbClient.js'

import { updateJob } from '../ext-src/actions.js'


export default async function (args, context) {
  return (updateJob as any)(args, {
    ...context,
    entities: {
      Job: prisma.job,
    },
  })
}

export type UpdateJob = typeof updateJob 
