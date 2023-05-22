import prisma from '../dbClient.js';
import { updateCoverLetter } from '../ext-src/actions.js';
export default async function (args, context) {
    return updateCoverLetter(args, Object.assign(Object.assign({}, context), { entities: {
            Job: prisma.job,
            CoverLetter: prisma.coverLetter,
            User: prisma.user,
        } }));
}
//# sourceMappingURL=updateCoverLetter.js.map