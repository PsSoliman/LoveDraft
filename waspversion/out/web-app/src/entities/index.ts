import {
  User,
  SocialLogin,
  CoverLetter,
  Job,
} from '@prisma/client'
  
export type {
  User,
  SocialLogin,
  CoverLetter,
  Job,
} from '@prisma/client'

export type Entity = 
  | User
  | SocialLogin
  | CoverLetter
  | Job
  | never
