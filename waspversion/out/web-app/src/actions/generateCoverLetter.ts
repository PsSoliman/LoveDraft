import { createAction } from './core'
import { GenerateCoverLetter } from '../../../server/src/actions/generateCoverLetter'

const action = createAction<GenerateCoverLetter>(
  'operations/generate-cover-letter',
  ['CoverLetter', 'User'],
)

export default action
