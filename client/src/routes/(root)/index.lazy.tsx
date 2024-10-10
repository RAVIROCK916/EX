import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(root)/')({
  component: () => <div>Hello /!</div>,
})
