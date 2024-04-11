import { Button } from '@/components/ui/button'
import { KeyRound } from 'lucide-react'

export default function OpenDoor() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border-2 border-muted-foreground/30">
        <KeyRound className="h-8 w-8 text-primary " />
      </div>
      <Button className="h-40 w-full text-base">
        Aperte aqui para destravar a porta
      </Button>
    </div>
  )
}
