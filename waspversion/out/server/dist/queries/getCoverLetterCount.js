import prisma from '../dbClient.js';
import { getCoverLetterCount } from '../ext-src/queries.js';
export default async function (args, context) {
    return getCoverLetterCount(args, Object.assign(Object.assign({}, context), { entities: {
            CoverLetter: prisma.coverLetter,
        } }));
}
//# sourceMappingURL=getCoverLetterCount.js.map