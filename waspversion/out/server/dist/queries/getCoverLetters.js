import prisma from '../dbClient.js';
import { getCoverLetters } from '../ext-src/queries.js';
export default async function (args, context) {
    return getCoverLetters(args, Object.assign(Object.assign({}, context), { entities: {
            CoverLetter: prisma.coverLetter,
        } }));
}
//# sourceMappingURL=getCoverLetters.js.map