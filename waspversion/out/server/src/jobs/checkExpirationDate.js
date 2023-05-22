import prisma from '../dbClient.js'
import { createJob } from './core/pgBoss/pgBossJob.js'
import { sendExpirationNotice } from '../ext-src/workers/sendExpirationNotice.js'

export const checkExpirationDate = createJob({
  jobName: "checkExpirationDate",
  jobFn: sendExpirationNotice,
  defaultJobOptions: {},
  jobSchedule: {"cron":"0 17 * * *","options":{},"args":null},
  entities: {
    User: prisma.user,
  },
})
