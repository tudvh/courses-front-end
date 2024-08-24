'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { HttpStatusCode } from 'axios'
import { useTranslations } from 'next-intl'
import { ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
} from '@/components/ui'
import { useAdminAuth, useLoading } from '@/contexts'
import { useHandleError } from '@/hooks'
import { loginSchema } from '@/schema'
import { TLoginSchema } from '@/types/admin'

const defaultValues = {
  email: '',
  password: '',
}

export default function LoginPage(): ReactNode {
  const { login } = useAdminAuth()
  const { setErrorForInput, handleResponseError } = useHandleError()
  const { openLoading, closeLoading } = useLoading()
  const [isShowPassword, setIsShowPassword] = useState(false)
  const t = useTranslations()

  const form = useForm<TLoginSchema>({
    resolver: yupResolver(loginSchema),
    defaultValues,
  })

  const { email: emailError, password: passwordError } = form.formState.errors

  const onSubmit = async (values: TLoginSchema) => {
    try {
      openLoading()
      await login(values)
    } catch (err: any) {
      if (err?.response?.status === HttpStatusCode.UnprocessableEntity) {
        setErrorForInput(err, form.setError)
      } else {
        handleResponseError(err)
      }
    } finally {
      closeLoading()
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-center text-3xl font-bold">{t('auth.login.title')}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>{t('auth.email')}</FormLabel>
                <FormControl>
                  <Input placeholder="abc@example.com" error={!!emailError} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>{t('auth.password')}</FormLabel>
                <FormControl>
                  <Input
                    type={isShowPassword ? 'text' : 'password'}
                    error={!!passwordError}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-2">
            <Checkbox
              id="show-password"
              checked={isShowPassword}
              onCheckedChange={isCheck => setIsShowPassword(isCheck as boolean)}
            />
            <Label htmlFor="show-password">Hiển thị mật khẩu</Label>
          </div>
          <Button type="submit" className="!mt-8 w-full">
            {t('auth.login.submit')}
          </Button>
        </form>
      </Form>
    </div>
  )
}
