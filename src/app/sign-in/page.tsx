'use client'

import { loginUser } from '@/api/loginUser'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { maskCPF } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { setCookie } from 'nookies'
import { LogIn } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { z } from 'zod'
import { useUser } from '@/context/user-context'

const loginAccountSchema = z.object({
  cpf: z.string().min(1),
})

type LoginAccountSchema = z.infer<typeof loginAccountSchema>

export default function Login() {
  const { handleSetUser } = useUser()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginAccountSchema>({
    resolver: zodResolver(loginAccountSchema),
  })

  const { mutateAsync: loginUserFn, isPending: isJoining } = useMutation({
    mutationFn: loginUser,
  })

  async function handleLoginUser(data: LoginAccountSchema) {
    try {
      const response = await loginUserFn({
        cpf: data.cpf,
      })

      handleSetUser(response)

      setCookie(null, 'user', JSON.stringify(response), {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      })

      router.push('/open-door')
    } catch (err) {
      toast.error('Usuário não encontrado')
    }
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center px-8">
      <div className="w-full">
        <LogIn className="mb-4 h-8 w-8 text-primary" />
        <h1 className="text-left text-3xl font-bold tracking-tight text-foreground">
          Faça login
        </h1>

        <form
          className="mt-6 space-y-2"
          onSubmit={handleSubmit(handleLoginUser)}
        >
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
          <Button className="mt-5 h-12 w-full" disabled={isJoining}>
            Fazer login
          </Button>
        </form>
        <p className="mt-8">
          Não possui conta?{' '}
          <span className="text-primary">
            <Link href="/">Criar conta</Link>
          </span>
        </p>
      </div>
    </div>
  )
}
