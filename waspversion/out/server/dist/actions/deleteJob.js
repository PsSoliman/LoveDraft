import prisma from '../dbClient.js';
import { deleteJob } from '../ext-src/actions.js';
export default async function (args, context) {
    return deleteJob(args, Object.assign(Object.assign({}, context), { entities: {
            Job: prisma.job,
        } }));
}
//# sourceMappingURL=deleteJob.js.map