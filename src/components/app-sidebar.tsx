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

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
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
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
