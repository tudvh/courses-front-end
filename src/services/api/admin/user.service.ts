import { PaginateResponse } from '@/types'
import { TUser, UserSearchParams, UserUpdateStatusPayload } from '@/types/admin'
import apiAdmin from './api-admin'

const path = '/admin/users'

export class UserService {
  public static async getUsers(params?: UserSearchParams): Promise<PaginateResponse<TUser>> {
    const { data } = await apiAdmin.get<PaginateResponse<TUser>>(path, { params })
    return data
  }
  public static async updateStatus(payload: UserUpdateStatusPayload): Promise<void> {
    await apiAdmin.put(`${path}/status`, payload)
  }
}
