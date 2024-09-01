'use client'

import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { createContext, useContext, useEffect, useState } from 'react'

import { LoadingOverlay } from '@/components/ui'
import { apiAdmin, AuthService } from '@/services/api/admin'
import { LayoutProps } from '@/types'
import { LoginPayload } from '@/types/admin'
import { TAdminUser } from '@/types/admin-user'

type TAdminAuthContext = {
  isAdminAuth: boolean
  adminUserData: TAdminUser
  login: (payload: LoginPayload) => Promise<void>
  logout: () => Promise<void>
}

const AdminAuthContext = createContext<TAdminAuthContext | undefined>(undefined)

export const useAdminAuth = (): TAdminAuthContext => {
  const context = useContext(AdminAuthContext)
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider')
  }
  return context
}

export const AdminAuthProvider = (props: LayoutProps) => {
  const { children } = props
  const [isAdminAuth, setIsAdminAuth] = useState<boolean | undefined>(undefined)
  const [adminUserData, setAdminUserData] = useState<TAdminUser | null | undefined>(undefined)

  const login = async (payload: LoginPayload) => {
    const data = await AuthService.login(payload)
    setCookie(null, 'admin_access_token', data.accessToken, {
      path: '/',
      maxAge: data.expiresIn,
      sameSite: 'lax',
    })
    setIsAdminAuth(true)
    setAdminUserData(data.user)
  }

  const logout = async () => {
    setIsAdminAuth(false)
  }

  const getProfile = async () => {
    try {
      const data = await AuthService.getProfile()
      setAdminUserData(data)
    } catch (err: any) {
      console.error(err)
    }
  }

  useEffect(() => {
    const { admin_access_token: adminAccessToken } = parseCookies()
    setIsAdminAuth(!!adminAccessToken)
  }, [])

  useEffect(() => {
    if (isAdminAuth === false) {
      setAdminUserData(null)
      destroyCookie(null, 'admin_access_token', {
        path: '/',
        sameSite: 'lax',
      })
      return
    }
    if (isAdminAuth && !adminUserData) {
      getProfile()
    }
  }, [isAdminAuth, adminUserData])

  // Auto remove authToken when authToken invalid
  useEffect(() => {
    const interceptor = apiAdmin.interceptors.response.use(
      response => response,
      error => {
        const errorStatus = error.status ?? error.response?.status
        if (errorStatus === 401) {
          setIsAdminAuth(false)
        }
        return Promise.reject(error)
      },
    )

    return () => {
      apiAdmin.interceptors.response.eject(interceptor)
    }
  }, [])

  if (isAdminAuth === undefined || !adminUserData) {
    return <LoadingOverlay open />
  }

  const contextValue: TAdminAuthContext = {
    isAdminAuth,
    adminUserData,
    login,
    logout,
  }

  return <AdminAuthContext.Provider value={contextValue}>{children}</AdminAuthContext.Provider>
}
