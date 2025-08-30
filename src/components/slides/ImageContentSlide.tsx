// components/slides/ImageContentSlide.tsx
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface ImageContentSlideProps {
  title: string
  content: string
  imageUrl: string
  imagePosition?: "left" | "right"
  grayscale?: boolean
  blurLevel?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  theme?: "light" | "dark" | "gradient"
}

export function ImageContentSlide({
  title,
  content,
  imageUrl,
  imagePosition = "right",
  grayscale = false,
  blurLevel = 0,
  theme = "light"
}: ImageContentSlideProps) {
  // Apply grayscale/blur only if it's a picsum.photos URL
  const enhancedImageUrl = imageUrl.includes("picsum.photos")
    ? `${imageUrl}${grayscale ? "?grayscale" : ""}${blurLevel ? `&blur=${blurLevel}` : ""}`
    : imageUrl

  // Theme classes for text/content side
  const themeClasses = {
    light: "bg-white text-slate-800",
    dark: "bg-slate-900 text-white",
    gradient: "bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800"
  }

  const textBgClass = themeClasses[theme].split(' ')[0] // Extract bg-* class
  const textColorClass = themeClasses[theme].split(' ')[1] // Extract text-* class

  return (
    <Card 
      className="w-full h-[600px] rounded-2xl shadow-lg overflow-hidden border-0 relative flex flex-col"
    >
      {/* Content Grid */}
      <div className={`grid md:grid-cols-2 h-full ${imagePosition === "left" ? "md:flex-row-reverse" : ""}`}>
        
        {/* Image Side */}
        <div className="relative bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-4">
          <Image
            src={enhancedImageUrl}
            alt={title}
            width={600}
            height={400}
            className="rounded-xl object-cover w-full h-full shadow-md"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Text Side */}
        <div className={`flex flex-col p-8 ${textBgClass} ${textColorClass}`}>
          <CardContent className="flex-1 flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {title}
            </h3>
            <p className="text-lg leading-relaxed whitespace-pre-line">
              {content}
            </p>
          </CardContent>
        </div>
      </div>

      {/* Accent Bar */}
      <div className="h-2 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
    </Card>
  )
}