// components/slides/TitleSlide.tsx
import { Card, CardContent } from "@/components/ui/card"

interface TitleSlideProps {
  title: string
  subtitle?: string
  backgroundImage?: string
  theme?: 'default' | 'dark' | 'gradient' | 'minimal'
}

export function TitleSlide({
  title,
  subtitle,
  backgroundImage,
  theme = 'default'
}: TitleSlideProps) {
  // Theme-based classes
  const themeClasses = {
    default: 'bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-100',
    dark: 'bg-gradient-to-br from-slate-900 to-slate-800 text-white',
    gradient: 'bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 text-slate-800 dark:text-slate-100',
    minimal: 'bg-slate-50 text-slate-800 dark:bg-slate-800 dark:text-slate-100'
  }

  return (
    <Card
      className={`w-full min-h-[80vh] rounded-2xl shadow-lg overflow-hidden border-0 relative flex flex-col justify-center items-center text-center p-10`}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Optional overlay for background images */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-black/60 z-0"></div>
      )}

      {/* Theme background overlay for non-image themes */}
      {!backgroundImage && (
        <div className={`absolute inset-0 z-0 ${themeClasses[theme].split(' ')[1]} opacity-90`}></div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <CardContent className="p-0">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 text-white drop-shadow-md">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl text-white/90 drop-shadow-sm">
              {subtitle}
            </p>
          )}
        </CardContent>
      </div>

      {/* Accent bar at bottom */}
      <div className="relative z-10 h-2 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
    </Card>
  )
}