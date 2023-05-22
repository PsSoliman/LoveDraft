import { deserialize as superjsonDeserialize, serialize as superjsonSerialize, } from 'superjson';
import { handleRejection } from '../../utils.js';
import updateUser from '../../actions/updateUser.js';
export default handleRejection(async (req, res) => {
    const args = (req.body && superjsonDeserialize(req.body)) || {};
    const context = {
        user: req.user
    };
    const result = await updateUser(args, context);
    const serializedResult = superjsonSerialize(result);
    res.json(serializedResult);
});
//# sourceMappingURL=updateUser.js.map