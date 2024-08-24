export const APP_CONFIG = {
  APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  APP_ENV: process.env.NEXT_PUBLIC_APP_ENV ?? 'local',
  APP_API_URL: process.env.NEXT_PUBLIC_APP_API_URL,
}

export const DEBOUNCE = {
  TIME_OUT: 300,
}
