import { createAction } from './core'
import { UpdateJob } from '../../../server/src/actions/updateJob'

const action = createAction<UpdateJob>(
  'operations/update-job',
  ['Job'],
)

export default action
