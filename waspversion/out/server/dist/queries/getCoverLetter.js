import prisma from '../dbClient.js';
import { getCoverLetter } from '../ext-src/queries.js';
export default async function (args, context) {
    return getCoverLetter(args, Object.assign(Object.assign({}, context), { entities: {
            CoverLetter: prisma.coverLetter,
        } }));
}
//# sourceMappingURL=getCoverLetter.js.map