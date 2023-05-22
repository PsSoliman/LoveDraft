import { createAction } from './core'
import { DeleteJob } from '../../../server/src/actions/deleteJob'

const action = createAction<DeleteJob>(
  'operations/delete-job',
  ['Job'],
)

export default action
