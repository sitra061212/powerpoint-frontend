// app/layout.tsx
import { ConditionalSidebarLayout } from '@/components/ConditionalSidebarLayout'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ConditionalSidebarLayout>{children}</ConditionalSidebarLayout>
}