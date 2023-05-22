import prisma from '../dbClient.js';
import { updateJob } from '../ext-src/actions.js';
export default async function (args, context) {
    return updateJob(args, Object.assign(Object.assign({}, context), { entities: {
            Job: prisma.job,
        } }));
}
//# sourceMappingURL=updateJob.js.map