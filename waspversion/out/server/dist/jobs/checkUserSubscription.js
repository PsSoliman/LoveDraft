import prisma from '../dbClient.js';
import { createJob } from './core/pgBoss/pgBossJob.js';
import { updateUserSubscription } from '../ext-src/workers/updateUserSubscription.js';
export const checkUserSubscription = createJob({
    jobName: "checkUserSubscription",
    jobFn: updateUserSubscription,
    defaultJobOptions: {},
    jobSchedule: { "cron": "0 23 * * *", "options": {}, "args": null },
    entities: {
        User: prisma.user,
    },
});
//# sourceMappingURL=checkUserSubscription.js.map