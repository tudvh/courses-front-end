import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Roboto } from 'next/font/google'

import { APP_CONFIG } from '@/constants'
import { LoadingProvider } from '@/contexts'
import '@/styles/globals.css'
import { LayoutProps } from '@/types'

const roboto = Roboto({
  subsets: ['vietnamese'],
  weight: ['100', '300', '400', '500', '700', '900'],
})

export const metadata: Metadata = {
  metadataBase: new URL(APP_CONFIG.APP_URL),
  description: 'Courses Steam by TuDVH',
  icons: {
    icon: {
      url: '/images/logo.ico',
    },
  },
  openGraph: {
    images: [
      {
        url: 'https://bing.biturl.top?format=image&index=random',
      },
    ],
  },
}

type RootLayoutProps = {
  params: {
    locale: string
  }
} & LayoutProps

export default async function RootLayout(props: RootLayoutProps) {
  const {
    params: { locale },
    children,
  } = props
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className={roboto.className}>
        <NextIntlClientProvider messages={messages}>
          <LoadingProvider>{children}</LoadingProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
