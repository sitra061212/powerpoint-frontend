// components/slides/QuoteSlide.tsx
'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import type { SlideData } from '@/types/slides'

interface QuoteSlideProps {
  slide: SlideData
  backgroundImage?: string
  theme?: 'default' | 'dark' | 'elegant' | 'bold'
}

export function QuoteSlide({ slide, backgroundImage, theme = 'default' }: QuoteSlideProps) {
  // Theme-based classes
  const themeClasses = {
    default: 'bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-100',
    dark: 'bg-gradient-to-br from-slate-900 to-slate-800 text-white',
    elegant: 'bg-gradient-to-br from-gray-50 to-rose-50 text-slate-800 dark:from-slate-900 dark:to-gray-900 dark:text-rose-100',
    bold: 'bg-gradient-to-br from-purple-900 to-pink-900 text-white',
  }

  return (
    <Card
      className={`w-full h-[600px] rounded-2xl shadow-lg overflow-hidden border-0 relative flex flex-col justify-center items-center text-center p-8`}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Optional overlay for readability on image backgrounds */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-black/60 z-0"></div>
      )}

      {/* Theme overlay for non-image themes */}
      {!backgroundImage && (
        <div className={`absolute inset-0 z-0 ${themeClasses[theme].split(' ')[1]} opacity-90`}></div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-6">
        <CardContent className="p-0">
          <blockquote className="text-3xl md:text-4xl font-light italic leading-relaxed mb-6 text-white drop-shadow-md">
            “{slide.quote}”
          </blockquote>
          {slide.author && (
            <cite className="text-2xl font-medium text-white/90 drop-shadow-sm">
              — {slide.author}
            </cite>
          )}
        </CardContent>
      </div>

      {/* Accent bar at bottom */}
      <div className="relative z-10 h-2 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
    </Card>
  )
}