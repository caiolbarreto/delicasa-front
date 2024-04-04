import { api } from '@/lib/api'

interface LoginUserBody {
  name: string
  cpf: string
}

export async function loginUser({ name, cpf }: LoginUserBody) {
  const response = await api.post('/users/login', {
    name,
    cpf,
  })

  return response.data
}
