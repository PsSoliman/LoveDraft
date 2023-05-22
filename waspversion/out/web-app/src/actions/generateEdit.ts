import { createAction } from './core'
import { GenerateEdit } from '../../../server/src/actions/generateEdit'

const action = createAction<GenerateEdit>(
  'operations/generate-edit',
  ['CoverLetter', 'User'],
)

export default action
