import { createQuery } from './core'
import { GetUserInfo } from '../../../server/src/queries/getUserInfo'


const query = createQuery<GetUserInfo>(
  'operations/get-user-info',
  ['User'],
)

export default query
