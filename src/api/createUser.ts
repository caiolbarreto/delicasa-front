import { api } from '@/lib/api'

interface CreateUserBody {
  name: string
  cpf: string
  cellphone: string
}

export async function createUser({ name, cpf, cellphone }: CreateUserBody) {
  await api.post('/users', {
    name,
    cpf,
    cellphone,
  })
}
