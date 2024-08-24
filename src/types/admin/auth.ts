import * as yup from 'yup'

import { loginSchema } from '@/schema'
import { TAdminUser } from '../admin-user'

export type TLoginSchema = yup.InferType<typeof loginSchema>

export type LoginPayload = TLoginSchema

export type LoginResponse = {
  accessToken: string
  expiresIn: number
  user: TAdminUser
}
