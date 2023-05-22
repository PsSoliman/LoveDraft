import { createQuery } from './core'
import { GetCoverLetters } from '../../../server/src/queries/getCoverLetters'


const query = createQuery<GetCoverLetters>(
  'operations/get-cover-letters',
  ['CoverLetter'],
)

export default query
