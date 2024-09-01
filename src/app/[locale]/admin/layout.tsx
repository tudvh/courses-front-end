import type { Metadata } from 'next'

import { AdminAuthProvider } from '@/contexts'
import { LayoutProps } from '@/types'

export const metadata: Metadata = {
  title: {
    default: 'Courses Steam Admin',
    template: '%s | Courses Steam Admin',
  },
}

export default async function AdminLayout(props: LayoutProps) {
  const { children } = props

  return <AdminAuthProvider>{children}</AdminAuthProvider>
}
