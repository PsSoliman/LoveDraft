import { createAction } from './core'
import { UpdateCoverLetter } from '../../../server/src/actions/updateCoverLetter'

const action = createAction<UpdateCoverLetter>(
  'operations/update-cover-letter',
  ['Job', 'CoverLetter', 'User'],
)

export default action
