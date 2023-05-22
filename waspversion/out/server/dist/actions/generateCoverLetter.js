import prisma from '../dbClient.js';
import { generateCoverLetter } from '../ext-src/actions.js';
export default async function (args, context) {
    return generateCoverLetter(args, Object.assign(Object.assign({}, context), { entities: {
            CoverLetter: prisma.coverLetter,
            User: prisma.user,
        } }));
}
//# sourceMappingURL=generateCoverLetter.js.map