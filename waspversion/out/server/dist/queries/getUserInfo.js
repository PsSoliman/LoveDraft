import prisma from '../dbClient.js';
import { getUserInfo } from '../ext-src/queries.js';
export default async function (args, context) {
    return getUserInfo(args, Object.assign(Object.assign({}, context), { entities: {
            User: prisma.user,
        } }));
}
//# sourceMappingURL=getUserInfo.js.map