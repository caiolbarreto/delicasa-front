import { api } from '@/lib/api'

export interface User {
  id: string
  name: string
  cpf: string
  cellphone: string
  isAdmin: boolean
}

export interface Item {
  id: string
  name: string
  price: number
}

export interface OrderItem {
  id: string
  orderId: string
  itemId: string
  quantity: number
  item: Item
}

export interface GetOrdersResponse {
  orders: {
    id: string
    userId: string
    createdAt: Date
    status: 'pending' | 'paid'
    items: OrderItem[]
    user: User
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export interface GetOrdersQuery {
  pageIndex?: number | null
  name?: string | null
  cpf?: string | null
  status?: string | null
}

export async function getOrders({
  pageIndex,
  name,
  cpf,
  status,
}: GetOrdersQuery) {
  const response = await api.get<GetOrdersResponse>('/orders', {
    params: {
      pageIndex,
      name,
      cpf,
      status,
    },
  })

  return response.data
}
