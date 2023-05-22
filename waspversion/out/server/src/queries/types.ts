
import {
  type _Job,
  type _CoverLetter,
  type _User,
  type AuthenticatedQuery,
} from '../_types'

export type GetJobs<Input = never, Output = unknown> = 
  AuthenticatedQuery<
    [
      _Job,
    ],
    Input,
    Output
  >

export type GetJob<Input = never, Output = unknown> = 
  AuthenticatedQuery<
    [
      _Job,
    ],
    Input,
    Output
  >

export type GetCoverLetter<Input = never, Output = unknown> = 
  AuthenticatedQuery<
    [
      _CoverLetter,
    ],
    Input,
    Output
  >

export type GetCoverLetters<Input = never, Output = unknown> = 
  AuthenticatedQuery<
    [
      _CoverLetter,
    ],
    Input,
    Output
  >

export type GetUserInfo<Input = never, Output = unknown> = 
  AuthenticatedQuery<
    [
      _User,
    ],
    Input,
    Output
  >

export type GetCoverLetterCount<Input = never, Output = unknown> = 
  AuthenticatedQuery<
    [
      _CoverLetter,
    ],
    Input,
    Output
  >

