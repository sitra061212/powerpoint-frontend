'use client'

import {
  IconDotsVertical,
  IconLogout,
} from '@tabler/icons-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

// 🔹 Define types
interface User {
  id: string
  name?: string
  email: string
  image?: string
}

interface NavUserProps {
  user: User
  onLogout: () => void
}

export function NavUser({ user, onLogout }: NavUserProps) {
  const { isMobile } = useSidebar()

  const avatarUrl = user.image || '/avatars/default.jpg'
  const displayName = user.name || user.email.split('@')[0]
  const displayEmail = user.email

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          {/* User Button Trigger */}
          <DropdownMenuTrigger asChild>
  <button
    type="button"
    className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium hover:bg-accent focus:bg-accent focus:outline-none data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
    onClick={(e) => {
      // Remove any preventDefault or stopPropagation
      console.log('Trigger clicked') // Debug
    }}
  >
    <Avatar className="h-8 w-8 rounded-lg">
      <AvatarImage src={avatarUrl} alt={displayName} />
      <AvatarFallback>{displayName[0]?.toUpperCase()}</AvatarFallback>
    </Avatar>
    <div className="grid flex-1 text-left text-sm leading-tight">
      <span className="truncate font-medium">{displayName}</span>
      <span className="truncate text-xs text-muted-foreground">{displayEmail}</span>
    </div>
    <IconDotsVertical className="ml-auto h-4 w-4" />
  </button>
</DropdownMenuTrigger>

          {/* Dropdown Menu */}
          <DropdownMenuContent
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
            className="min-w-56 rounded-lg"
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={avatarUrl} alt={displayName} />
                  <AvatarFallback>{displayName[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{displayName}</span>
                  <span className="truncate text-xs text-muted-foreground">{displayEmail}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={onLogout}>
              <IconLogout className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}