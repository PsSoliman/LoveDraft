import { deserialize as superjsonDeserialize, serialize as superjsonSerialize, } from 'superjson';
import { handleRejection } from '../../utils.js';
import getJob from '../../queries/getJob.js';
export default handleRejection(async (req, res) => {
    const args = (req.body && superjsonDeserialize(req.body)) || {};
    const context = {
        user: req.user
    };
    const result = await getJob(args, context);
    const serializedResult = superjsonSerialize(result);
    res.json(serializedResult);
});
//# sourceMappingURL=getJob.js.map