export type TOnChangePage = (selected: number) => void

export type TPagination = {
  currentPage: number
  lastPage: number
  total: number
  perPage: number
  from: number
  to: number
}

export type PaginateSearchParams = {
  page: number
  perPage?: number
}

export type PaginateResponse<T> = {
  data: T[]
  meta: TPagination
}
