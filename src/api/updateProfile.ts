import { api } from '@/lib/api'

interface UpdateUserBody {
  userId: string | undefined
  name: string
  cpf: string
  cellphone: string
}

export async function updateUser({
  userId,
  name,
  cpf,
  cellphone,
}: UpdateUserBody) {
  await api.patch(`/users/${userId}`, {
    name,
    cpf,
    cellphone,
  })
}
