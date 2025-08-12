// components/ConditionalSidebarLayout.tsx
'use client'

import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

export function ConditionalSidebarLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  // Define the route(s) where sidebar should be hidden
  const hideSidebar = pathname === '/presentations/slide'

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      {/* Only render sidebar if not on /presentations/slide */}
      {!hideSidebar && <AppSidebar variant="inset" />}

      <SidebarInset>
        <SiteHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}