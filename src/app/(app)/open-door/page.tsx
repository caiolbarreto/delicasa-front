'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { KeyRound } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { sendRequestOpenDoor } from '@/api/sendRequestOpenDoor'
import { parseCookies } from 'nookies'

export default function OpenDoor() {
  const cookies = parseCookies()

  const userData = cookies.user && JSON.parse(cookies.user)

  const [showTimer, setShowTimer] = useState(false)
  const [countdown, setCountdown] = useState(10)

  const { mutateAsync: sendRequestOpenDoorFn } = useMutation({
    mutationFn: sendRequestOpenDoor,
  })

  async function handleClick() {
    await sendRequestOpenDoorFn({ userId: userData?.id })

    setShowTimer(true)

    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1)
    }, 1000)

    setTimeout(() => {
      clearInterval(timer)
      setShowTimer(false)
      setCountdown(10)
    }, 10000)
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border-2 border-muted-foreground/30">
        <KeyRound className="h-8 w-8 text-primary " />
      </div>
      <Button
        className="h-40 w-full text-base"
        disabled={showTimer}
        onClick={handleClick}
      >
        Aperte aqui para destravar a porta
      </Button>
      {showTimer && (
        <div className="mt-4 text-sm text-muted-foreground">
          Espere {countdown} segundos para abrir a porta novamente
        </div>
      )}
    </div>
  )
}
