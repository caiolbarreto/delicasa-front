import { Suspense } from 'react'

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Suspense>
      <div>{children}</div>
    </Suspense>
  )
}
