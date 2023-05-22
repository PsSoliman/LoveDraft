import { deserialize as superjsonDeserialize, serialize as superjsonSerialize, } from 'superjson';
import { handleRejection } from '../../utils.js';
import updateCoverLetter from '../../actions/updateCoverLetter.js';
export default handleRejection(async (req, res) => {
    const args = (req.body && superjsonDeserialize(req.body)) || {};
    const context = {
        user: req.user
    };
    const result = await updateCoverLetter(args, context);
    const serializedResult = superjsonSerialize(result);
    res.json(serializedResult);
});
//# sourceMappingURL=updateCoverLetter.js.map