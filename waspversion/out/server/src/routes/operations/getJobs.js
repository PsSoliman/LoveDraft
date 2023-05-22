import { 
  deserialize as superjsonDeserialize,
  serialize as superjsonSerialize,
} from 'superjson'
import { handleRejection } from '../../utils.js'
import getJobs from '../../queries/getJobs.js'

export default handleRejection(async (req, res) => {
  const args = (req.body && superjsonDeserialize(req.body)) || {}

  const context = {
    user: req.user
  }

  const result = await getJobs(args, context)
  const serializedResult = superjsonSerialize(result)
  res.json(serializedResult)
})
