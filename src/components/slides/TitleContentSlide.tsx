import { Card, CardContent } from "@/components/ui/card"

interface TitleContentSlideProps {
  title: string
  content: string
  backgroundImage?: string 
  theme?: 'default' | 'dark' | 'blue' | 'minimal'
}

export function TitleContentSlide({
  title,
  content,
  backgroundImage,
  theme = 'default'
}: TitleContentSlideProps) {
  const themeClasses = {
    default: 'bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-100',
    dark: 'bg-gradient-to-br from-slate-900 to-slate-800 text-white',
    blue: 'bg-gradient-to-br from-blue-900 to-indigo-900 text-white',
    minimal: 'bg-slate-50 text-slate-800 dark:bg-slate-800 dark:text-slate-100'
  }

  return (
    <Card 
      className={`w-full h-[600px] rounded-2xl shadow-lg overflow-hidden border-0 relative flex flex-col`}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Optional overlay for dark themes */}
      {theme !== 'minimal' && !backgroundImage && (
        <div className={`absolute inset-0 ${themeClasses[theme].split(' ')[1]} opacity-90 z-0`}></div>
      )}

      {/* Content */}
      <div className="relative z-10 p-8 flex-1 flex flex-col">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight max-w-3xl">
          {title}
        </h2>
        <CardContent className="flex-1 p-0">
          <p className="text-lg md:text-xl leading-relaxed whitespace-pre-line">
            {content}
          </p>
        </CardContent>
      </div>

      {/* Accent bar at bottom */}
      <div className="relative z-10 h-2 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
    </Card>
  )
}