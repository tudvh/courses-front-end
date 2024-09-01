'use client'

import { Ban, LockOpen } from 'lucide-react'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import UserAvatarDefault from '@/assets/images/user-avatar-default.webp'
import { Badge, Button, Table } from '@/components/ui'
import { DEFAULT_PAGINATION, USER_GENDER_TEXT } from '@/constants'
import { useLoading } from '@/contexts'
import { useHandleError } from '@/hooks'
import { UserService } from '@/services/api/admin'
import { TApiResponseError, TPagination, TTableColumn } from '@/types'
import { TUser, UserSearchParams, UserUpdateStatusPayload } from '@/types/admin'
import { Alert, Toast } from '@/utils'
import FormSearch from './form-search'

const defaultValueDataSearch: UserSearchParams = {
  q: '',
  isActive: '',
  page: 1,
}

export default function UserListPage() {
  const { openLoading, closeLoading } = useLoading()
  const { handleResponseError } = useHandleError()
  const [users, setUsers] = useState<TUser[]>([])
  const [pagination, setPagination] = useState<TPagination>(DEFAULT_PAGINATION)
  const [dataSearch, setDataSearch] = useState<UserSearchParams>(defaultValueDataSearch)
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathName = usePathname()

  const updateUrlSearchParams = (dataSearch?: UserSearchParams) => {
    if (!dataSearch) return
    const params = new URLSearchParams()

    if (dataSearch.q) params.set('q', dataSearch.q)
    if (dataSearch.isActive) params.set('is-active', dataSearch.isActive)
    if (dataSearch.page && dataSearch.page !== 1) params.set('page', dataSearch.page.toString())

    router.push(`${pathName}?${params.toString()}`)
  }

  const fetchUsers = async (params?: UserSearchParams) => {
    try {
      openLoading()
      const response = await UserService.getUsers(params)
      setUsers(response.data)
      setPagination(response.meta)
    } catch (err) {
      handleResponseError(err as TApiResponseError)
    } finally {
      closeLoading()
    }
  }

  const handleConfirmUserAction = async (user: TUser) => {
    const action = user.isActive ? 'cấm' : 'gỡ bỏ lệnh cấm'
    const result = await Alert.confirm(`Bạn có chắc muốn ${action} người dùng này không`)

    if (result) {
      handleActionUser({
        userId: user.id,
        isActive: !user.isActive,
      })
    }
  }

  const handleActionUser = async (payload: UserUpdateStatusPayload) => {
    try {
      openLoading()
      await UserService.updateStatus(payload)
      Toast.success('Thành công')
      fetchUsers(dataSearch)
    } catch (err) {
      handleResponseError(err as TApiResponseError)
    } finally {
      closeLoading()
    }
  }

  const handleChangePage = (selected: number) => {
    setPagination(prev => ({ ...prev, page: selected }))
    updateUrlSearchParams({ ...dataSearch, page: selected })
  }

  const handleSearch = () => {
    updateUrlSearchParams({ ...dataSearch, page: 1 })
  }

  const handleResetFormSearch = () => {
    setDataSearch(defaultValueDataSearch)
    updateUrlSearchParams(defaultValueDataSearch)
  }

  const columns: TTableColumn<TUser>[] = [
    {
      headerName: 'Ảnh đại diện',
      valueGetter: row => {
        return (
          <div className="min-w-20">
            <Image
              loading="lazy"
              width={80}
              height={80}
              src={row.avatarUrl || UserAvatarDefault}
              alt={`user-${row.id}`}
              className="block size-20 rounded-full object-cover"
            />
          </div>
        )
      },
    },
    {
      headerName: 'Họ và tên lót',
      field: 'lastName',
    },
    {
      headerName: 'Tên',
      field: 'firstName',
    },
    {
      headerName: 'Ngày sinh',
      field: 'dob',
    },
    {
      headerName: 'Giới tính',
      valueGetter: row => {
        return USER_GENDER_TEXT[row.gender]
      },
    },
    {
      headerName: 'Số điện thoại',
      field: 'phoneNumber',
    },
    {
      headerName: 'Email',
      field: 'email',
    },
    {
      headerName: 'Trạng thái',
      valueGetter: row => {
        return row.isActive ? (
          <Badge className="bg-green-200 hover:bg-green-300 text-foreground text-center">
            Đang hoạt động
          </Badge>
        ) : (
          <Badge className="bg-red-200 hover:bg-red-300 text-foreground text-center">Bị cấm</Badge>
        )
      },
    },
    {
      headerName: 'Hành động',
      valueGetter: row => {
        return (
          <Button
            className={`bg-${row.isActive ? 'red' : 'green'}-500 hover:bg-${row.isActive ? 'red' : 'green'}-600`}
            onClick={() => handleConfirmUserAction(row)}
          >
            {row.isActive ? <Ban size={16} /> : <LockOpen size={16} />}
          </Button>
        )
      },
    },
  ]

  useEffect(() => {
    const q = searchParams.get('q') || defaultValueDataSearch.q
    const isActive = searchParams.get('is-active') || defaultValueDataSearch.isActive
    const page = Number(searchParams.get('page') || defaultValueDataSearch.page)

    const newDataSearch = { q, isActive, page }
    setDataSearch(newDataSearch)

    if (JSON.stringify(newDataSearch) === JSON.stringify(defaultValueDataSearch)) {
      fetchUsers()
    } else {
      fetchUsers(newDataSearch)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold">Người dùng</h1>
      <FormSearch
        dataSearch={dataSearch}
        setDataSearch={setDataSearch}
        onReset={handleResetFormSearch}
        onSearch={handleSearch}
      />
      <Table
        columns={columns}
        rows={users}
        pagination={pagination}
        handleChangePage={selected => handleChangePage(selected)}
      />
    </div>
  )
}
