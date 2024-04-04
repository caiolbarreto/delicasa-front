import { Button } from '@/components/ui/button'

export default function OpenDoor() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Button className="h-40 w-full text-xl">
        Aperte aqui para destravar a porta
      </Button>
    </div>
  )
}
