import { createAction } from './core'
import { EditCoverLetter } from '../../../server/src/actions/editCoverLetter'

const action = createAction<EditCoverLetter>(
  'operations/edit-cover-letter',
  ['CoverLetter'],
)

export default action
