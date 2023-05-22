import { createAction } from './core'
import { CreateJob } from '../../../server/src/actions/createJob'

const action = createAction<CreateJob>(
  'operations/create-job',
  ['Job'],
)

export default action
