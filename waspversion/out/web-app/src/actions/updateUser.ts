import { createAction } from './core'
import { UpdateUser } from '../../../server/src/actions/updateUser'

const action = createAction<UpdateUser>(
  'operations/update-user',
  ['User'],
)

export default action
