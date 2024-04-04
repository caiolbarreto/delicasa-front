'use client'

import { Check, Search, X } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { GetOrdersResponse, OrderItem, User } from '@/api/getOrders'
import { OrderDetails } from './order-details'
import { format } from 'date-fns'
import { OrderStatus } from './order-status'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateOrderStatus } from '@/api/updateOrderStatus'

interface OrderTableRowProps {
  order: {
    id: string
    userId: string
    createdAt: Date
    status: 'pending' | 'paid'
    items: OrderItem[]
    user: User
  }
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const queryClient = useQueryClient()

  const orderTotal = order.items.map(
    (orderItem) => orderItem.item.price * orderItem.quantity,
  )

  const total = orderTotal.reduce((acc, curr) => acc + curr, 0)

  function handleOrderAction(orderId: string, status: OrderStatus) {
    const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['orders'],
    })

    ordersListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) {
        return
      }

      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if (order.id === orderId) {
            return { ...order, status }
          }

          return order
        }),
      })
    })
  }

  const { mutateAsync: updateOrderStatusFn, isPending: isPaying } = useMutation(
    {
      mutationFn: updateOrderStatus,
      async onSuccess(_, { orderId }) {
        handleOrderAction(orderId, 'paid')
      },
    },
  )

  return (
    <>
      <TableRow className="h-16">
        <TableCell>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="xs">
                <Search className="h-3 w-3" />
                <span className="sr-only">Detalhes do pedido</span>
              </Button>
            </DialogTrigger>

            <OrderDetails order={order} total={total} />
          </Dialog>
        </TableCell>
        <TableCell className="font-mono text-xs font-medium">
          {order.id}
        </TableCell>
        <TableCell className="text-medium">
          {format(order.createdAt, 'dd/MM/yy HH:mm')}
        </TableCell>
        <TableCell className="text-medium">
          <OrderStatus status={order.status} />
        </TableCell>
        <TableCell className="font-medium">{order.user.name}</TableCell>
        <TableCell className="text-medium">{order.user.cpf}</TableCell>
        <TableCell className="text-medium">{order.user.cellphone}</TableCell>
        <TableCell className="text-medium">
          {order.user.isAdmin ? (
            <Check className="h-4 w-4" />
          ) : (
            <X className="h-4 w-4" />
          )}
        </TableCell>

        <TableCell className="font-medium">
          {(total / 100).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </TableCell>
        <TableCell>
          {order.status === 'pending' && (
            <Button
              variant="outline"
              size="xs"
              disabled={isPaying}
              onClick={() => updateOrderStatusFn({ orderId: order.id })}
            >
              Pagamento efetuado
            </Button>
          )}
        </TableCell>
      </TableRow>
    </>
  )
}
