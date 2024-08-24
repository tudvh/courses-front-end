'use client'

import ReactPaginate from 'react-paginate'

import { PAGINATION } from '@/constants'
import { TOnChangePage } from '@/types'

type PaginationProps = {
  pageCount: number
  currentPage: number
  onChangePage: TOnChangePage
}

export const Pagination = (props: PaginationProps) => {
  const { pageCount, currentPage, onChangePage } = props

  return (
    <ReactPaginate
      breakLabel="..."
      previousLabel="<"
      nextLabel=">"
      forcePage={currentPage - 1}
      marginPagesDisplayed={PAGINATION.MARGIN_RANGE_DISPLAY}
      pageCount={pageCount ?? 0}
      disableInitialCallback={true}
      renderOnZeroPageCount={null}
      className="flex select-none flex-wrap items-center justify-center gap-2"
      breakLinkClassName="flex items-center justify-center px-3 h-8 leading-tight bg-background text-foreground border rounded hover:bg-accent"
      pageLinkClassName="flex items-center justify-center px-3 h-8 leading-tight bg-background text-foreground border rounded hover:bg-accent"
      previousLinkClassName="flex items-center justify-center px-3 h-8 leading-tight bg-background text-foreground border rounded hover:bg-accent"
      nextLinkClassName="flex items-center justify-center px-3 h-8 leading-tight bg-background text-foreground border rounded hover:bg-accent"
      activeLinkClassName="!bg-primary !text-primary-foreground"
      disabledLinkClassName="!bg-muted !text-muted-foreground cursor-default"
      onPageChange={({ selected }) => {
        onChangePage(selected + 1)
      }}
    />
  )
}
