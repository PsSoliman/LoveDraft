import prisma from '../dbClient.js';
import { getJob } from '../ext-src/queries.js';
export default async function (args, context) {
    return getJob(args, Object.assign(Object.assign({}, context), { entities: {
            Job: prisma.job,
        } }));
}
//# sourceMappingURL=getJob.js.map