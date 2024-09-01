import { ReactNode, TableHTMLAttributes } from 'react'

import { Pagination } from '@/components/ui'
import { cn } from '@/lib/utils'
import { TOnChangePage, TPagination, TTableColumn } from '@/types'

export type TableProps<T> = {
  columns?: TTableColumn<T>[]
  handleChangePage?: TOnChangePage
  rows?: T[]
  pagination?: TPagination
  onRowClick?: (data: T) => void
  showHeader?: boolean
  customNullDataText?: string | ReactNode
  classNameLayout?: string
} & TableHTMLAttributes<HTMLTableElement>

export const Table = <T,>(props: TableProps<T>) => {
  const {
    rows,
    columns,
    pagination,
    onRowClick = undefined,
    handleChangePage,
    classNameLayout,
    className,
    showHeader = true,
    customNullDataText,
  } = props
  const { lastPage, total, currentPage } = pagination || {}

  return (
    <div className={cn('space-y-5', classNameLayout)}>
      <div className="w-full overflow-x-auto rounded-none border shadow md:rounded-lg">
        <table className={cn('w-full text-left text-sm text-foreground rtl:text-right', className)}>
          {showHeader && (
            <thead className="bg-secondary text-xs uppercase text-foreground">
              <tr>
                {columns?.map((column, index) => {
                  const { headerName } = column
                  return (
                    <th key={index} className="px-6 py-4">
                      {headerName}
                    </th>
                  )
                })}
              </tr>
            </thead>
          )}
          <tbody className="bg-card text-foreground">
            {rows?.length ? (
              rows?.map((row, indexRow) => (
                <tr
                  key={indexRow}
                  className={cn('border-b', onRowClick && 'cursor-pointer')}
                  onClick={() => {
                    onRowClick && onRowClick(row)
                  }}
                >
                  {columns?.map((column, indexColumn) => {
                    const { field, valueGetter } = column
                    return (
                      <td key={indexColumn} className="px-6 py-4">
                        {valueGetter ? valueGetter(row) : field ? row[field] : ''}
                      </td>
                    )
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns?.length ?? 0} className="px-6 py-4 text-center">
                  {customNullDataText ? customNullDataText : 'Không có dữ liệu'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {lastPage && currentPage && handleChangePage ? (
        <div className="grid grid-cols-4">
          <div className="col-span-1 hidden md:block"></div>
          <div className="col-span-3 md:col-span-2">
            <Pagination
              pageCount={lastPage}
              currentPage={currentPage}
              onChangePage={handleChangePage}
            />
          </div>
          <div className="col-span-1 flex items-end justify-end">
            {!!total && (
              <p className="text-end text-xs uppercase text-foreground">{`Tổng: ${total}`}</p>
            )}
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
