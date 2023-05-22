import prisma from '../dbClient.js';
import { generateEdit } from '../ext-src/actions.js';
export default async function (args, context) {
    return generateEdit(args, Object.assign(Object.assign({}, context), { entities: {
            CoverLetter: prisma.coverLetter,
            User: prisma.user,
        } }));
}
//# sourceMappingURL=generateEdit.js.map