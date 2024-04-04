export type OrderStatus = 'pending' | 'paid'

interface OrderStatusProps {
  status: OrderStatus
}

export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      {status === 'pending' && (
        <span className="h-2 w-2 rounded-full bg-slate-400" />
      )}

      {status === 'paid' && (
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
      )}

      <span className="font-medium text-muted-foreground">
        {status === 'paid' ? 'Pago' : 'Pendente'}
      </span>
    </div>
  )
}
