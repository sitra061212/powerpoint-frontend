'use client'

import { usePathname, useRouter } from 'next/navigation'
import * as React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
import { IconDashboard, IconLayout, IconSettings } from '@tabler/icons-react'

// ✅ Auth client
import { authClient } from '@/lib/auth-client'

// 🔹 Define User type
interface User {
  id: string
  name?: string
  email: string
  image?: string
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const router = useRouter()

  const [user, setUser] = React.useState<User | null>(null)
  const [loading, setLoading] = React.useState(true)

  // ✅ Fetch session once
  React.useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data } = await authClient.getSession()
        console.log('Fetched session:', data)
        if (data?.user) {
          setUser(data.user)
        } else {
          setUser(null)
        }
      } catch (err) {
        console.error('Failed to fetch session:', err)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchSession()
  }, [])

  // ✅ Logout handler
  const handleLogout = async () => {
    try {
      await authClient.signOut()
      setUser(null)
      router.push('/login')
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }

  // 🛠 Nav items
  const navMain = [
    { title: 'Dashboard', url: '/home', icon: IconDashboard },
    { title: 'Templates', url: '/templates', icon: IconLayout },
    { title: 'Settings', url: '/settings', icon: IconSettings },
  ]

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Logo/Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="!p-1.5">
              <a href="/">
                <span className="text-base font-bold">Presina AI</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Navigation Links */}
      <SidebarContent>
        <NavMain items={navMain} activePath={pathname} />
      </SidebarContent>

      {/* User Footer */}
      <SidebarFooter>
        {loading ? (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton disabled>Loading...</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        ) : user ? (
          <NavUser user={user} onLogout={handleLogout} />
        ) : (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => (window.location.href = '/login')}>
                Log in
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}