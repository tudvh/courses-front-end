import { LoginPayload, LoginResponse } from '@/types/admin'

import apiAdmin from './api-admin'

const path = '/admin/auth'

export class AuthService {
  public static async login(payloads: LoginPayload) {
    const { data } = await apiAdmin.post<LoginResponse>(`${path}/login`, payloads)
    return data
  }

  public static async getProfile() {
    const { data } = await apiAdmin.post(`${path}/me`)
    return data
  }
}
