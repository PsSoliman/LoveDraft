import prisma from '../dbClient.js';
import { editCoverLetter } from '../ext-src/actions.js';
export default async function (args, context) {
    return editCoverLetter(args, Object.assign(Object.assign({}, context), { entities: {
            CoverLetter: prisma.coverLetter,
        } }));
}
//# sourceMappingURL=editCoverLetter.js.map