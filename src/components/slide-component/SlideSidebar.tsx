// components/SlideSidebar.tsx
'use client'

import { Card } from '@/components/ui/card'

interface Slide {
  title: string
}

interface SlideSidebarProps {
  slides: Slide[]
  activeIndex: number
  onNavigate: (index: number) => void
  collapsed: boolean // controlled from parent
}

export function SlideSidebar({ slides, activeIndex, onNavigate, collapsed }: SlideSidebarProps) {
  return (
    <nav
      className={`fixed left-0 top-0 bottom-0 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 z-50 overflow-y-auto border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ease-in-out ${
        collapsed ? 'w-16 p-2' : 'w-72 p-4'
      }`}
    >
      {!collapsed && (
        <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white px-2">
          Presentation Outline
        </h2>
      )}

      <div className="space-y-3">
        {slides.map((slide, index) => (
          <Card
            key={index}
            className={`cursor-pointer transition-all duration-200 transform hover:scale-[1.02] hover:shadow-md ${
              activeIndex === index
                ? 'bg-blue-100 dark:bg-blue-900/50 border-blue-300 dark:border-blue-700 ring-2 ring-blue-500 dark:ring-blue-600'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
            } ${collapsed ? 'p-2 flex items-center justify-center' : 'p-3'}`}
            onClick={() => onNavigate(index)}
          >
            <div className="flex items-start gap-3">
              <span
                className={`flex-shrink-0 w-6 h-6 rounded-full text-xs flex items-center justify-center font-medium ${
                  activeIndex === index
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                {index + 1}
              </span>
              {!collapsed && (
                <div className="min-w-0">
                  <p
                    className={`text-sm font-medium truncate ${
                      activeIndex === index
                        ? 'text-blue-800 dark:text-blue-300'
                        : 'text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {slide.title}
                  </p>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </nav>
  )
}
