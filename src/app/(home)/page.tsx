'use client'

import { createUser } from '@/api/createUser'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Lock } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { maskCPF, maskCellphone } from '@/lib/utils'

const createAccountSchema = z.object({
  name: z.string().min(1),
  cpf: z.string().min(1),
  cellphone: z.string().min(1),
})

type CreateAccountSchema = z.infer<typeof createAccountSchema>

export default function SignUp() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAccountSchema>({
    resolver: zodResolver(createAccountSchema),
  })

  const { mutateAsync: createUserFn, isPending: isCreating } = useMutation({
    mutationFn: createUser,
  })

  async function handleCreateAccount(data: CreateAccountSchema) {
    try {
      await createUserFn({
        name: data.name,
        cpf: data.cpf,
        cellphone: data.cellphone,
      })

      toast.success('Usuário criado!', {
        position: 'top-center',
      })
      router.push('/sign-in')
    } catch (err) {
      toast.error('CPF já em uso', {
        position: 'top-center',
      })
    }
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center px-8">
      <div className="w-full">
        <Lock className="mb-4 h-8 w-8 text-primary" />
        <h1 className="text-left text-3xl font-bold tracking-tight text-foreground">
          Crie sua conta
        </h1>

        <form
          className="mt-6 space-y-2"
          onSubmit={handleSubmit(handleCreateAccount)}
        >
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              placeholder="Nome"
              className="h-12 w-full"
              {...register('name', { required: true })}
            />
            {errors.name && (
              <span className="text-sm text-red-500">Nome é obrigatório</span>
            )}
          </div>
          <div>
            <Label htmlFor="cpf">CPF</Label>
            <Input
              id="cpf"
              placeholder="999.999.999-99"
              className="h-12 w-full"
              {...register('cpf', { required: true })}
              onChange={(e) => {
                e.target.value = maskCPF(e.target.value)
              }}
            />
            {errors.cpf && (
              <span className="text-sm text-red-500">CPF é obrigatório</span>
            )}
          </div>
          <div>
            <Label htmlFor="cellphone">Celular</Label>
            <Input
              id="cellphone"
              placeholder="(99) 99999-9999"
              className="h-12 w-full"
              {...register('cellphone', { required: true })}
              onChange={(e) => {
                e.target.value = maskCellphone(e.target.value)
              }}
            />
            {errors.cellphone && (
              <span className="text-sm text-red-500">
                Celular é obrigatório
              </span>
            )}
          </div>
          <Button className="h-12 w-full" type="submit" disabled={isCreating}>
            Criar conta
          </Button>
        </form>
        <p className="mt-8">
          Já possui conta?{' '}
          <span className="text-primary">
            <Link href="/sign-in">Faça login</Link>
          </span>
        </p>
      </div>
    </div>
  )
}
