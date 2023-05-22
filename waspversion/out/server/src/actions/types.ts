import {
  type _CoverLetter,
  type _User,
  type _Job,
  type AuthenticatedAction,
} from '../_types'

export type GenerateCoverLetter<Input = never, Output = unknown> = 
  AuthenticatedAction<
    [
      _CoverLetter,
      _User,
    ],
    Input,
    Output
  >

export type CreateJob<Input = never, Output = unknown> = 
  AuthenticatedAction<
    [
      _Job,
    ],
    Input,
    Output
  >

export type UpdateJob<Input = never, Output = unknown> = 
  AuthenticatedAction<
    [
      _Job,
    ],
    Input,
    Output
  >

export type UpdateCoverLetter<Input = never, Output = unknown> = 
  AuthenticatedAction<
    [
      _Job,
      _CoverLetter,
      _User,
    ],
    Input,
    Output
  >

export type GenerateEdit<Input = never, Output = unknown> = 
  AuthenticatedAction<
    [
      _CoverLetter,
      _User,
    ],
    Input,
    Output
  >

export type EditCoverLetter<Input = never, Output = unknown> = 
  AuthenticatedAction<
    [
      _CoverLetter,
    ],
    Input,
    Output
  >

export type UpdateUser<Input = never, Output = unknown> = 
  AuthenticatedAction<
    [
      _User,
    ],
    Input,
    Output
  >

export type UpdateUserHasPaid<Input = never, Output = unknown> = 
  AuthenticatedAction<
    [
      _User,
    ],
    Input,
    Output
  >

export type DeleteJob<Input = never, Output = unknown> = 
  AuthenticatedAction<
    [
      _Job,
    ],
    Input,
    Output
  >

export type StripePayment<Input = never, Output = unknown> = 
  AuthenticatedAction<
    [
      _User,
    ],
    Input,
    Output
  >

export type StripeCreditsPayment<Input = never, Output = unknown> = 
  AuthenticatedAction<
    [
      _User,
    ],
    Input,
    Output
  >

