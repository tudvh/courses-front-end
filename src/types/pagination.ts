export type TOnChangePage = (selected: number) => void

export type TSetPagination = {
  currentPage?: number
  lastPage?: number
  total?: number
  perPage?: number
  from?: number
  to?: number
}
