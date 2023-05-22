import prisma from '../dbClient.js';
import { updateUser } from '../ext-src/actions.js';
export default async function (args, context) {
    return updateUser(args, Object.assign(Object.assign({}, context), { entities: {
            User: prisma.user,
        } }));
}
//# sourceMappingURL=updateUser.js.map