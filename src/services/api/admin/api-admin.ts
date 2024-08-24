import axios from 'axios'
import { parseCookies } from 'nookies'

import { APP_CONFIG } from '@/constants'

const apiAdmin = axios.create({
  baseURL: APP_CONFIG.APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiAdmin.interceptors.request.use(
  config => {
    const { admin_access_token } = parseCookies()
    if (admin_access_token) {
      config.headers['Authorization'] = 'Bearer ' + admin_access_token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

export default apiAdmin
