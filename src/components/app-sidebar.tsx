'use client'

import {
  IconDashboard,
  IconFileText,
  IconLayout,
  IconSettings,
  IconLogout,
} from '@tabler/icons-react'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

// ✅ Central AppUser type
export type AppUser = {
  id?: string
  name: string
  email: string
  image?: string | null // allow null
}

const data: { user: AppUser; navMain: any[] } = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    image: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '/home',
      icon: IconDashboard,
    },
    {
      title: 'My Presentations',
      url: '/presentations',
      icon: IconFileText,
    },
    {
      title: 'Templates',
      url: '/templates',
      icon: IconLayout,
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: IconSettings,
    },
    {
      title: 'Logout',
      url: '/logout',
      icon: IconLogout,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const [user, setUser] = React.useState<AppUser | null>(data.user)

  // Example: handling logout
  const handleLogout = () => {
    setUser(null)
    // Add actual logout logic here
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Sidebar Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <span className="text-base font-bold">Presina AI</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent>
        <NavMain items={data.navMain} activePath={pathname} />
      </SidebarContent>

      {/* Sidebar Footer (User Info) */}
      <SidebarFooter>
        <NavUser user={user} onLogout={handleLogout} />
      </SidebarFooter>
    </Sidebar>
  )
}
