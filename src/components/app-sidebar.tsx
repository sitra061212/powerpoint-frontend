'use client'

import {
  IconDashboard,
  IconLayout,
  IconSettings,
  IconLogout,
} from '@tabler/icons-react'
import { usePathname, useRouter } from 'next/navigation'
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const router = useRouter()

  // 🔹 Get logged-in user from localStorage or API
  const [user, setUser] = React.useState<{ name: string; email: string } | null>(null)

  React.useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  // 🔹 Logout function
  const handleLogout = () => {
    localStorage.removeItem('token') // remove auth token
    localStorage.removeItem('user') // remove user info
    router.push('/login') // redirect to login page
  }

  const navMain = [
    { title: 'Dashboard', url: '/home', icon: IconDashboard },
    { title: 'Templates', url: '/templates', icon: IconLayout },
    { title: 'Settings', url: '/settings', icon: IconSettings },
    {
      title: 'Logout',
      url: '#',
      icon: IconLogout,
      onClick: handleLogout, // attach logout action
    },
  ]

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
              <a href="/">
                <span className="text-base font-bold">Presina AI</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent>
        <NavMain items={navMain} activePath={pathname} />
      </SidebarContent>

      {/* Sidebar Footer (User Info) */}
      <SidebarFooter>
        {user && <NavUser user={{ ...user, avatar: '/avatars/default.jpg' }} />}
      </SidebarFooter>
    </Sidebar>
  )
}
