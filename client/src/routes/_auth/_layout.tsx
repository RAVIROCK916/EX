import { createFileRoute, Outlet } from '@tanstack/react-router'
import { MaxWidthWrapper } from '@/components'
import { Toaster } from '@/components/ui/sonner'

export const Route = createFileRoute('/_auth/_layout')({
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <MaxWidthWrapper>
      <Toaster richColors theme="dark" position="top-right" />
      <main className="mx-auto w-full relative">
        <Outlet />
      </main>
    </MaxWidthWrapper>
  )
}
