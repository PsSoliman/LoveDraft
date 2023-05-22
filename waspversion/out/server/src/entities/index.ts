import {
  type User,
  type SocialLogin,
  type CoverLetter,
  type Job,
} from "@prisma/client"

export {
  type User,
  type SocialLogin,
  type CoverLetter,
  type Job,
} from "@prisma/client"

export type Entity = 
  | User
  | SocialLogin
  | CoverLetter
  | Job
  | never

export type EntityName = 
  | "User"
  | "SocialLogin"
  | "CoverLetter"
  | "Job"
  | never
