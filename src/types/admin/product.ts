export type ProductSearchParams = {
  q: string
  category_id: string
  brand_id: string
  status: string
}

export type TCategory = {
  id: number
  name: string
}

export type TBrand = {
  id: number
  name: string
}

export type TImage = {
  id: number
  url: string
}

export type TProduct = {
  id: number
  name: string
  slug: string
  category: TCategory
  brand: TBrand
  price: number
  quantity: number
  description: string
  status: number
  images: TImage[]
}
