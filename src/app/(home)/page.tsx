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

const createAccountSchema = z.object({
  name: z.string().min(1),
  cpf: z.string().min(1),
  cellphone: z.string().min(1),
})

type CreateAccountSchema = z.infer<typeof createAccountSchema>

function maskCPF(value: string): string {
  // Format CPF as 999.999.999-99
  return value
    .replace(/\D/g, '') // Remove non-digit characters
    .slice(0, 11) // Limit to 11 characters (length of CPF)
    .replace(/(\d{3})(\d)/, '$1.$2') // Add dot after first 3 digits
    .replace(/(\d{3})(\d)/, '$1.$2') // Add dot after next 3 digits
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2') // Add dash before last 2 digits
}

function maskCellphone(value: string): string {
  // Format cellphone as (99) 99999-9999
  return value
    .replace(/\D/g, '') // Remove non-digit characters
    .slice(0, 11) // Limit to 11 characters (length of cellphone)
    .replace(/(\d{2})(\d)/, '($1) $2') // Add parenthesis around first 2 digits
    .replace(/(\d{5})(\d)/, '$1-$2') // Add dash after next 5 digits
}

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

      toast.success('Usuário criado!')
      router.push('/sign-in')
    } catch (err) {
      toast.error('CPF já em uso')
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
