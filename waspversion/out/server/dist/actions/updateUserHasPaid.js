import prisma from '../dbClient.js';
import { updateUserHasPaid } from '../ext-src/actions.js';
export default async function (args, context) {
    return updateUserHasPaid(args, Object.assign(Object.assign({}, context), { entities: {
            User: prisma.user,
        } }));
}
//# sourceMappingURL=updateUserHasPaid.js.map