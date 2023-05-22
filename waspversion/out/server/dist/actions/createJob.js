import prisma from '../dbClient.js';
import { createJob } from '../ext-src/actions.js';
export default async function (args, context) {
    return createJob(args, Object.assign(Object.assign({}, context), { entities: {
            Job: prisma.job,
        } }));
}
//# sourceMappingURL=createJob.js.map