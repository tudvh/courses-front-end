'use client'

import { Pencil } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Button, Table } from '@/components/ui'
import { DEFAULT_PAGINATION } from '@/constants'
import { useLoading } from '@/contexts'
import { useHandleError } from '@/hooks'
import { TSetPagination, TTableColumn } from '@/types'
import { ProductSearchParams, TBrand, TCategory, TProduct } from '@/types/admin'
import { NumberUtil } from '@/utils'
import Image from 'next/image'

const defaultValueDataSearch: ProductSearchParams = {
  q: '',
  category_id: '',
  brand_id: '',
  status: '',
}

export default function ProductListPage() {
  const { openLoading, closeLoading } = useLoading()
  const { handleResponseError } = useHandleError()
  const [categories, setCategories] = useState<TCategory[]>([])
  const [brands, setBrands] = useState<TBrand[]>([])
  const [products, setProducts] = useState<TProduct[]>([])
  const [pagination, setPagination] = useState<TSetPagination>(DEFAULT_PAGINATION)
  const [dataSearch, setDataSearch] = useState(defaultValueDataSearch)

  const columns: TTableColumn<TProduct>[] = [
    {
      headerName: 'ID',
      field: 'id',
    },
    {
      headerName: 'Hình ảnh',
      valueGetter: row => {
        return (
          <Image
            loading="lazy"
            width={24}
            height={24}
            src={row.images[0]?.url}
            alt={`product-${row.id}`}
            className="size-24 rounded object-cover"
          />
        )
      },
    },
    {
      headerName: 'Tên sản phẩm',
      field: 'name',
    },
    {
      headerName: 'Danh mục',
      field: 'category',
      valueGetter: row => {
        return row.category.name
      },
    },
    {
      headerName: 'Thương hiệu',
      field: 'brand',
      valueGetter: row => {
        return row.brand.name
      },
    },
    {
      headerName: 'Đơn giá',
      field: 'price',
      valueGetter: row => {
        return `${NumberUtil.currency(row.price)} đ`
      },
    },
    {
      headerName: 'Số lượng',
      field: 'quantity',
    },
    {
      headerName: 'Trạng thái',
      field: 'status',
      valueGetter: row => {
        return row.status
      },
    },
    {
      headerName: 'Hành động',
      valueGetter: row => {
        return (
          <div className="flex gap-5">
            <Link href={`products/${row.id}/update`}>
              <Button>
                <Pencil />
              </Button>
            </Link>
          </div>
        )
      },
    },
  ]

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold">Sản phẩm</h1>
      <Table
        columns={columns}
        rows={products}
        pagination={pagination}
        // handleChangePage={selected => handleChangePage(selected)}
      />
    </div>
  )
}
