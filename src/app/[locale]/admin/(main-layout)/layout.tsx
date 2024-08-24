'use client'

import { redirect } from 'next/navigation'
import { useEffect } from 'react'

import { Header, Sidebar } from '@/components/partials/admin'
import { useAdminAuth } from '@/contexts'
import { LayoutProps } from '@/types'

const AdminLayout = (props: LayoutProps) => {
  const { children } = props
  const { isAdminAuth, adminUserData } = useAdminAuth()

  useEffect(() => {
    if (!isAdminAuth) {
      redirect('/admin/auth/login')
    }
  }, [isAdminAuth])

  if (!adminUserData) {
    return null
  }

  return (
    <div className="h-dvh w-dvw">
      <div className="fixed bottom-0 left-0 top-0 hidden h-dvh w-[280px] md:block">
        <Sidebar />
      </div>
      <div className="flex h-full w-full flex-col pl-0 md:pl-[280px]">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}

export default AdminLayout
