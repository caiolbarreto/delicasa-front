'use client'

import { KeyRound, UserRound } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

export function BottomBar() {
  const [page, setPage] = useState('open')

  return (
    <div
      className={twMerge(
        'absolute bottom-0 flex h-20 w-full items-center justify-center',
        'gap-16 border-t border-muted-foreground',
        'text-muted-foreground',
      )}
    >
      <Link href="/open-door">
        <div
          className={twMerge(
            'flex flex-col items-center',
            page === 'open' && 'text-primary', // Apply different styles if page is 'open'
          )}
          onClick={() => setPage('open')}
        >
          <KeyRound />
          <span>Abrir porta</span>
        </div>
      </Link>
      <Link href="/profile">
        <div
          className={twMerge(
            'flex flex-col items-center',
            page === 'profile' && 'text-primary', // Apply different styles if page is 'profile'
          )}
          onClick={() => setPage('profile')}
        >
          <UserRound />
          <span>Minha conta</span>
        </div>
      </Link>
    </div>
  )
}
