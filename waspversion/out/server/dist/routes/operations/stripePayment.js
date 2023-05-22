import { deserialize as superjsonDeserialize, serialize as superjsonSerialize, } from 'superjson';
import { handleRejection } from '../../utils.js';
import stripePayment from '../../actions/stripePayment.js';
export default handleRejection(async (req, res) => {
    const args = (req.body && superjsonDeserialize(req.body)) || {};
    const context = {
        user: req.user
    };
    const result = await stripePayment(args, context);
    const serializedResult = superjsonSerialize(result);
    res.json(serializedResult);
});
//# sourceMappingURL=stripePayment.js.map