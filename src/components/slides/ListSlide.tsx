// components/slides/BulletSlide.tsx
import { Card, CardContent } from "@/components/ui/card"

interface BulletSlideProps {
  title: string
  bullets: string[]
  backgroundImage?: string
  theme?: 'default' | 'dark' | 'gradient' | 'minimal'
}

export function BulletSlide({
  title,
  bullets,
  backgroundImage,
  theme = 'default'
}: BulletSlideProps) {
  // Theme-based classes
  const themeClasses = {
    default: 'bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-100',
    dark: 'bg-gradient-to-br from-slate-900 to-slate-800 text-white',
    gradient: 'bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 text-slate-800 dark:text-slate-100',
    minimal: 'bg-slate-50 text-slate-800 dark:bg-slate-800 dark:text-slate-100'
  }

  return (
    <Card
      className={`w-full min-h-[80vh] rounded-2xl shadow-lg overflow-hidden border-0 relative flex flex-col p-10`}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Optional overlay for background images */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-black/50 z-0"></div>
      )}

      {/* Theme overlay for non-image themes */}
      {!backgroundImage && (
        <div className={`absolute inset-0 z-0 ${themeClasses[theme].split(' ')[1]} opacity-90`}></div>
      )}

      {/* Content */}
      <div className="relative z-10 flex-1">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white drop-shadow-md leading-tight">
          {title}
        </h2>
        <CardContent className="p-0">
          <ul className="space-y-5">
            {bullets.map((point, index) => (
              <li
                key={index}
                className="text-lg md:text-xl text-white/90 leading-relaxed flex items-start gap-3 drop-shadow-sm"
              >
                <span className="inline-block w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                <span className="flex-1">{point}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </div>

      {/* Accent bar at bottom */}
      <div className="relative z-10 h-2 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
    </Card>
  )
}