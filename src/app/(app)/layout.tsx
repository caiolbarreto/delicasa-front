import { BottomBar } from '@/components/bottom-bar'

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative">
      <div className="px-8">{children}</div>
      <BottomBar />
    </div>
  )
}
