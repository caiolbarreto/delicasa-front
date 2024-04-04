import { api } from '@/lib/api'

interface LoginUserBody {
  cpf: string
}

export async function loginUser({ cpf }: LoginUserBody) {
  const response = await api.post('/users/login', {
    cpf,
  })

  return response.data
}
