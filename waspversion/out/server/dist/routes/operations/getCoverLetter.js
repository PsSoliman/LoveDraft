import { deserialize as superjsonDeserialize, serialize as superjsonSerialize, } from 'superjson';
import { handleRejection } from '../../utils.js';
import getCoverLetter from '../../queries/getCoverLetter.js';
export default handleRejection(async (req, res) => {
    const args = (req.body && superjsonDeserialize(req.body)) || {};
    const context = {
        user: req.user
    };
    const result = await getCoverLetter(args, context);
    const serializedResult = superjsonSerialize(result);
    res.json(serializedResult);
});
//# sourceMappingURL=getCoverLetter.js.map