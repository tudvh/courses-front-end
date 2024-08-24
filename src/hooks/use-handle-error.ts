import { useCallback } from 'react'
import first from 'lodash/first'
import { UseFormSetError } from 'react-hook-form'

import { TApiResponseError } from '@/types'
import { Toast } from '@/utils'

export const useHandleError = () => {
  const handleResponseError = useCallback((error: TApiResponseError) => {
    let message =
      error.response?.data?.message ||
      Object.values(error.response?.data?.errors || {}).join(', ') ||
      error.data?.message ||
      error.message ||
      error ||
      'Something went wrong. Please try again later.'
    message = message.replace(' (and 1 more error)', '')
    Toast.error(message)
  }, [])

  const setErrorForInput = useCallback((err: TApiResponseError, setError: UseFormSetError<any>) => {
    const errorObj = err?.response?.data.errors
    if (!errorObj) return
    Object.keys(errorObj).forEach(error => {
      setError(error, { type: 'manual', message: first(errorObj[error]) })
    })
  }, [])

  const setCustomErrorForInput = useCallback(
    (field: string, message: string, setError: UseFormSetError<any>) => {
      if (!message) return
      setError(field, {
        type: 'manual',
        message: message,
      })
    },
    [],
  )

  return { handleResponseError, setErrorForInput, setCustomErrorForInput }
}
