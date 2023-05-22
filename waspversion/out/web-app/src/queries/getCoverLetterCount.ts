import { createQuery } from './core'
import { GetCoverLetterCount } from '../../../server/src/queries/getCoverLetterCount'


const query = createQuery<GetCoverLetterCount>(
  'operations/get-cover-letter-count',
  ['CoverLetter'],
)

export default query
