import prisma from '../dbClient.js';
import { stripeCreditsPayment } from '../ext-src/actions.js';
export default async function (args, context) {
    return stripeCreditsPayment(args, Object.assign(Object.assign({}, context), { entities: {
            User: prisma.user,
        } }));
}
//# sourceMappingURL=stripeCreditsPayment.js.map