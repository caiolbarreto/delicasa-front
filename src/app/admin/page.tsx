'use client'

import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Pagination } from '@/components/pagination'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getOrders } from '@/api/getOrders'
import { OrderTableRow } from './order-table-row'
import { OrderTableFilters } from './order-table-filters'
import { parseCookies } from 'nookies'

export default function Admin() {
  const cookies = parseCookies()

  const user = cookies.user && JSON.parse(cookies.user)

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const page = searchParams.get('page')
  const name = searchParams.get('name')
  const cpf = searchParams.get('cpf')
  const status = searchParams.get('status')

  const pageIndex = z.coerce.number().parse(page ?? '1')

  const { data: result } = useQuery({
    queryKey: ['orders', pageIndex, name, cpf, status],
    queryFn: () => getOrders({ pageIndex, name, cpf, status }),
  })

  function handlePagination(pageIndex: number) {
    const params = new URLSearchParams(searchParams)
    if (pageIndex) {
      params.set('page', String(pageIndex))
    } else {
      params.delete('page')
    }
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <>
      {user.isAdmin ? (
        <div className="mt-16 flex flex-col gap-4 border-muted-foreground px-16">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Pedidos
            </h1>
          </div>
          <div className="h-full space-y-2.5">
            <OrderTableFilters />

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[64px]"></TableHead>
                    <TableHead className="w-[150px]">ID</TableHead>
                    <TableHead className="w-[150px]">Data</TableHead>
                    <TableHead className="w-[150px]">Status</TableHead>
                    <TableHead className="w-[150px]">Cliente</TableHead>
                    <TableHead className="w-[100px]">CPF</TableHead>
                    <TableHead className="w-[100px]">Celular</TableHead>
                    <TableHead className="w-[50px]">Admin</TableHead>
                    <TableHead className="w-[100px]">Total</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {result ? (
                    result.orders.map((order) => {
                      return <OrderTableRow key={order.id} order={order} />
                    })
                  ) : (
                    <tr>
                      <td>
                        <p>loading</p>
                      </td>
                    </tr>
                  )}
                </TableBody>
              </Table>
            </div>
            {result && (
              <Pagination
                pageIndex={result.meta.pageIndex}
                totalCount={result.meta.totalCount}
                perPage={result.meta.perPage}
                onPageChange={handlePagination}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="flex h-screen items-center justify-center">
          <h1 className="font-semibold">Você não tem acesso a essa página</h1>
        </div>
      )}
    </>
  )
}
