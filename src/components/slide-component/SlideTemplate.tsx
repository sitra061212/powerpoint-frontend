// components/SlideTemplate.tsx
import { Card } from '@/components/ui/card'

interface SlideTemplateProps {
  title: string
  points: string[]
  backgroundImage?: string
  theme?: 'light' | 'dark' | 'blue' | 'gradient'
}

export function SlideTemplate({ 
  title, 
  points, 
  backgroundImage, 
  theme = 'gradient' 
}: SlideTemplateProps) {
  // Background based on theme
  const getBackground = () => {
    if (backgroundImage) {
      return `url(${backgroundImage}) center/cover`
    }
    switch (theme) {
      case 'dark':
        return 'bg-gradient-to-br from-slate-900 to-slate-800'
      case 'blue':
        return 'bg-gradient-to-br from-blue-900 to-indigo-800'
      case 'gradient':
      default:
        return 'bg-gradient-to-br from-slate-100 to-gray-200 dark:from-slate-800 dark:to-slate-900'
    }
  }

  return (
    <Card 
      className={`w-full max-w-4xl mx-auto aspect-video flex flex-col ${getBackground()} text-foreground rounded-none border-0 shadow-none`}
    >
      {/* Content */}
      <div className="flex-1 flex flex-col justify-center p-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center leading-tight text-white drop-shadow-lg">
          {title}
        </h1>
        
        <ul className="space-y-6 text-2xl md:text-3xl text-center text-white drop-shadow-md">
          {points.map((point, i) => (
            <li key={i} className="opacity-90 leading-relaxed animate-in slide-in-from-bottom-4 duration-500" style={{ '--tw-animate-delay': `${i * 100}ms` } as React.CSSProperties}>
              • {point}
            </li>
          ))}
        </ul>
      </div>

      {/* Optional: Logo or footer badge */}
      <div className="p-4 text-center text-sm text-white/60">
        {/* Optional: Add your brand */}
        {/* <span>Presented by Persina AI</span> */}
      </div>
    </Card>
  )
}