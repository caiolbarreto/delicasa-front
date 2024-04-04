'use client'

import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'
import { useSearchParams } from 'next/navigation'

import { Pagination } from '@/components/pagination'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getOrders } from '@/api/getOrders'
import { useCallback } from 'react'
import { OrderTableRow } from './order-table-row'

export default function Admin() {
  const searchParams = useSearchParams()

  const page = searchParams.get('page')
  const name = searchParams.get('name')
  const cpf = searchParams.get('cpf')
  const status = searchParams.get('status')

  const pageIndex = z.coerce.number().parse(page ?? '1')

  const { data: result } = useQuery({
    queryKey: ['snacks', pageIndex, name, cpf, status],
    queryFn: () => getOrders({ pageIndex, name, cpf, status }),
  })

  const handlePagination = useCallback(
    (value: number) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('page', String(value))

      return params.toString()
    },
    [searchParams],
  )

  return (
    <div className="p- mt-10 flex flex-col gap-4 border-muted-foreground px-20">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Snacks
        </h1>
      </div>
      <div className="space-y-2.5">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[64px]"></TableHead>
                <TableHead className="w-[200px]">Identifier</TableHead>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead className="w-[400px]">Description</TableHead>
                <TableHead className="w-[150px]">Price</TableHead>
                <TableHead className="w-[100px]"></TableHead>
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
  )
}
