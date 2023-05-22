import { createAction } from './core'
import { UpdateUserHasPaid } from '../../../server/src/actions/updateUserHasPaid'

const action = createAction<UpdateUserHasPaid>(
  'operations/update-user-has-paid',
  ['User'],
)

export default action
