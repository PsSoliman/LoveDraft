import prisma from '../dbClient.js';
import { getJobs } from '../ext-src/queries.js';
export default async function (args, context) {
    return getJobs(args, Object.assign(Object.assign({}, context), { entities: {
            Job: prisma.job,
        } }));
}
//# sourceMappingURL=getJobs.js.map