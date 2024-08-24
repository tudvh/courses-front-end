import type { Metadata } from 'next'

import { LayoutProps } from '@/types'

export const metadata: Metadata = {
  title: {
    default: 'Courses Steam',
    template: '%s | Courses Steam',
  },
}

export default async function RootLayout(props: LayoutProps) {
  const { children } = props
  return children
}
