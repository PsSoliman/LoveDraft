import { createQuery } from './core'
import { GetJob } from '../../../server/src/queries/getJob'


const query = createQuery<GetJob>(
  'operations/get-job',
  ['Job'],
)

export default query
