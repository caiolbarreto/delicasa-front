import { KeyRound, UserRound } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

export function BottomBar() {
  return (
    <div
      className={twMerge(
        'absolute bottom-0 flex h-20 w-full items-center justify-center',
        'gap-16 border-t border-zinc-700',
        'text-zinc-500',
      )}
    >
      <div className="flex flex-col items-center">
        <KeyRound />
        <span>Abrir porta</span>
      </div>
      <div className="flex flex-col items-center">
        <UserRound />
        <span>Minha conta</span>
      </div>
    </div>
  )
}
