'use client'

import { Search } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { OrderItem, User } from '@/api/getOrders'

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

  return (
    <>
      <TableRow>
        <TableCell>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="xs">
                <Search className="h-3 w-3" />
                <span className="sr-only">Order details</span>
              </Button>
            </DialogTrigger>
          </Dialog>
        </TableCell>
        <TableCell className="font-mono text-xs font-medium">
          {order.id}
        </TableCell>
        <TableCell className="text-medium">
          {new Date(order.createdAt).toLocaleString()}
        </TableCell>
        <TableCell className="text-medium">{order.status}</TableCell>
        <TableCell className="font-medium">{order.user.name}</TableCell>
        <TableCell className="text-medium">{order.user.cpf}</TableCell>
        <TableCell className="text-medium">{order.user.cellphone}</TableCell>
        <TableCell className="text-medium">{order.user.isAdmin}</TableCell>

        <TableCell className="font-medium">
          {(10000 / 100).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </TableCell>
        <TableCell>
          <Button
            variant="outline"
            size="xs"
            // disabled={isApproving}
            // onClick={() => approveOrderFn({ orderId: order.orderId })}
          >
            Pagamento efetuado
          </Button>
        </TableCell>
      </TableRow>
    </>
  )
}
