import type { Metadata } from 'next'

import { LayoutProps } from '@/types'

export const metadata: Metadata = {
  title: {
    default: 'Courses Steam Admin',
    template: '%s | Courses Steam Admin',
  },
}

export default async function RootLayout(props: LayoutProps) {
  const { children } = props
  return children
}
