import { api } from '@/lib/api'
import { User } from './getOrders'

interface LoginUserBody {
  cpf: string
}

export async function loginUser({ cpf }: LoginUserBody) {
  const response = await api.post<User>('/users/login', {
    cpf,
  })

  return response.data
}
