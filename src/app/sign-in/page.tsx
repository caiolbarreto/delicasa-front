import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LogIn } from 'lucide-react'
import Link from 'next/link'

export default function SignUp() {
  return (
    <div className="flex h-screen flex-col items-center justify-center px-8">
      <div className="w-full">
        <LogIn className="mb-4 h-8 w-8 text-primary" />
        <h1 className="text-left text-3xl font-bold tracking-tight text-foreground">
          Faça login
        </h1>

        <div className="mt-6 space-y-2">
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input id="name" placeholder="Nome" className="h-12 w-full" />
          </div>
          <div>
            <Label htmlFor="cpf">CPF</Label>
            <Input
              id="cpf"
              placeholder="999999999-99"
              className="h-12 w-full"
            />
          </div>
        </div>
        <Button className="mt-5 h-12 w-full">Fazer login</Button>
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
