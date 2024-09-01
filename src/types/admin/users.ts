import { UserGenderEnum } from '@/enums'
import { PaginateSearchParams } from '../pagination'

export type UserSearchParams = {
  q: string
  isActive: string
} & PaginateSearchParams

export type TUser = {
  id: string
  firstName: string
  lastName: string
  dob: string
  gender: UserGenderEnum
  phoneNumber: string
  avatarUrl: string
  avatarFullPath: string
  email: string
  isActive: boolean
}

export type UserUpdateStatusPayload = {
  userId: string
  isActive: boolean
}
