import { parse, serialize } from 'cookie'
import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'

const defaultLocale = 'vi'

const nextIntlMiddleware = createMiddleware({
  locales: ['vi', 'en'],
  defaultLocale,
  localePrefix: 'as-needed',
  localeDetection: true,
})

export function middleware(req: NextRequest) {
  const cookies = parse(req.headers.get('cookie') || '')

  if (!cookies.NEXT_LOCALE) {
    const url = req.nextUrl.clone()
    url.pathname = `/${defaultLocale}${url.pathname}`
    const res = NextResponse.redirect(url)
    res.headers.append(
      'Set-Cookie',
      serialize('NEXT_LOCALE', defaultLocale, { path: '/', maxAge: 60 * 60 * 24 * 365 }),
    )
    return res
  }

  return nextIntlMiddleware(req)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
