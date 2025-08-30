'use client'

import { SidebarTrigger } from '@/components/ui/sidebar'
import { ModeSwitcher } from './toggle-switch'
import { Button } from '@/components/ui/button'
import { PlusIcon, LayoutGrid } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function SiteHeader() {
  const router = useRouter()

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        {/* Left: Sidebar Toggle */}
        <SidebarTrigger className="-ml-1" />

        {/* Right: Action Buttons + Theme Switch */}
        <div className="ml-auto flex items-center gap-2">
          {/* Create Button */}
          <Button
            variant="default"
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 text-sm px-3"
            onClick={() => router.push('/home')}
          >
            <PlusIcon className="h-4 w-4" />
            <span>Create</span>
          </Button>

          {/* My Presentations Button */}
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5 text-sm px-3"
            onClick={() => router.push('/presentations')}
          >
            <LayoutGrid className="h-4 w-4" />
            <span>My presentations</span>
          </Button>

          {/* Dark Mode Switcher */}
          <ModeSwitcher />
        </div>
      </div>
    </header>
  )
}