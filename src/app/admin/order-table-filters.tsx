import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const orderFiltersSchema = z.object({
  name: z.string().optional(),
  cpf: z.string().optional(),
  status: z.string().optional(),
})

type OrderFiltersSchema = z.infer<typeof orderFiltersSchema>

export function OrderTableFilters() {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const pathname = usePathname()
  const { replace } = useRouter()

  const cpf = searchParams.get('cpf')
  const name = searchParams.get('name')
  const status = searchParams.get('status')

  const { register, handleSubmit, control, reset } =
    useForm<OrderFiltersSchema>({
      resolver: zodResolver(orderFiltersSchema),
      defaultValues: {
        name: name ?? '',
        cpf: cpf ?? '',
        status: status ?? 'all',
      },
    })

  function handleFilter(data: OrderFiltersSchema) {
    Object.entries(data).map(([key, value]) => {
      if (value) {
        return params.set(key, value)
      } else {
        return params.delete(key)
      }
    })

    params.set('page', '1')
    replace(`${pathname}?${params.toString()}`)
  }

  function handleClearFilters() {
    params.delete('name')
    params.delete('cf')
    params.delete('status')
    params.set('page', '1')

    reset({
      name: '',
      cpf: '',
      status: 'all',
    })
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={handleSubmit(handleFilter)}
    >
      <span className="text-sm font-semibold">Filtros</span>
      <Input
        placeholder="Nome do cliente"
        className="h-8 w-[320px]"
        {...register('name')}
      />
      <Input
        placeholder="Order ID"
        className="h-8 w-auto"
        {...register('cpf')}
      />

      <Controller
        name="status"
        control={control}
        render={({ field: { name, onChange, value, disabled } }) => {
          return (
            <Select
              defaultValue="all"
              name={name}
              onValueChange={onChange}
              value={value}
              disabled={disabled}
            >
              <SelectTrigger className="h-8 w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="paid">Pago</SelectItem>
              </SelectContent>
            </Select>
          )
        }}
      />

      <Button variant="outline" size="xs" type="submit">
        <Search className="mr-2 h-4 w-4" />
        Aplicar filtro
      </Button>

      <Button
        variant="outline"
        size="xs"
        type="submit"
        onClick={handleClearFilters}
      >
        <X className="mr-2 h-4 w-4" />
        Remover filtro
      </Button>
    </form>
  )
}
