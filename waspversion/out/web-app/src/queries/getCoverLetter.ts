import { createQuery } from './core'
import { GetCoverLetter } from '../../../server/src/queries/getCoverLetter'


const query = createQuery<GetCoverLetter>(
  'operations/get-cover-letter',
  ['CoverLetter'],
)

export default query
