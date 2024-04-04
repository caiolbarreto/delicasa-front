import { api } from '@/lib/api'

interface UpdateOrderStatusQuery {
  orderId: string
}

export async function updateOrderStatus({ orderId }: UpdateOrderStatusQuery) {
  await api.put(`/orders/${orderId}`, {
    status: 'paid',
  })
}
