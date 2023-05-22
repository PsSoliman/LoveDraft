import { createQuery } from './core'
import { GetJobs } from '../../../server/src/queries/getJobs'


const query = createQuery<GetJobs>(
  'operations/get-jobs',
  ['Job'],
)

export default query
