'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

// Slide Components
import { TitleSlide } from '@/components/slides/TitleSlide'
import { BulletSlide } from '@/components/slides/ListSlide'
import { ImageContentSlide } from '@/components/slides/ImageContentSlide'
import { TitleContentSlide } from '@/components/slides/TitleContentSlide'
import { TwoColumnSlide } from '@/components/slides/TwoColumnSlide'
import { QuoteSlide } from '@/components/slides/QuoteSlide'
import { ChartSlide } from '@/components/slides/ChartSlide'
import { SlideWrapper } from '@/components/SlideWrapper'
import { ExportButton } from '@/components/ExportButton'

// Types
import type { SlideData } from '@/types/slide'

export default function SlidePage() {
  const router = useRouter()
  const [slides, setSlides] = useState<SlideData[]>([])
  const [imageOverrides, setImageOverrides] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [presentationId, setPresentationId] = useState<string>('') // ✅ Add state

  // Helper: render non-image slides
  function renderSlide(slide: SlideData, index: number) {
    const id = slide.id ?? index

    switch (slide.type) {
      case 'title':
        return (
          <TitleSlide
            key={id}
            title={slide.title ?? ''}
            subtitle={slide.subtitle}
          />
        )

      case 'bullet':
        return (
          <BulletSlide
            key={id}
            title={slide.title ?? ''}
            bullets={slide.bullets ?? []}
          />
        )

      case 'title-content':
        return (
          <TitleContentSlide
            key={id}
            title={slide.title ?? ''}
            content={slide.content ?? ''}
          />
        )

      case 'two-column':
        return (
          <TwoColumnSlide
            key={id}
            leftTitle={slide.leftTitle ?? ''}
            leftContent={slide.leftContent ?? ''}
            rightTitle={slide.rightTitle ?? ''}
            rightContent={slide.rightContent ?? ''}
          />
        )

      case 'quote':
        return <QuoteSlide key={id} slide={slide} />

      case 'chart':
        return <ChartSlide key={id} slide={slide} />

      default:
        return (
          <div key={id} className="p-6 bg-red-100 text-red-800 rounded-lg">
            Unknown slide type: {slide.type}
          </div>
        )
    }
  }

  // Load and generate all slides at once
  useEffect(() => {
    const generateSlides = async () => {
      setLoading(true)
      setError(null)

      const savedOutline = localStorage.getItem('editedOutline')
      if (!savedOutline) {
        setError('No outline found. Please go back and create one.')
        router.push('/home')
        return
      }

      let outline
      try {
        outline = JSON.parse(savedOutline)
      } catch (err) {
        setError('Invalid outline data.')
        return
      }

      if (!Array.isArray(outline)) {
        setError('Invalid outline format.')
        return
      }

      if (outline.length === 0) {
        setError('No slides to generate.')
        return
      }

      try {
        const res = await fetch('http://localhost:5000/api/slide', {
          credentials: 'include',
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            outline,
            numSlides: outline.length,
            outlineId: localStorage.getItem('outlineId') || null,
          }),
        })

        if (!res.ok) {
          const err = await res.json().catch(() => ({}))
          throw new Error(err.message || `Failed to generate slides (${res.status})`)
        }

        const data = await res.json()

        if (Array.isArray(data.slides)) {
    setSlides(data.slides)
    
    if (data._id) {
      setPresentationId(data._id)
      console.log('✅ Presentation saved with ID:', data._id) // ✅ Log here
    } else {
      setPresentationId('temp-' + Date.now())
      console.log('📎 Using temp ID for demo')
    }
  }else {
          throw new Error('Invalid response format: expected slides array')
        }
      } catch (err: any) {
        console.error('Error generating slides:', err)
        setError(err.message || 'Failed to generate slides. Try again.')
      } finally {
        setLoading(false)
      }
    }

    generateSlides()
  }, [router])

  // Handle image upload
  const handleImageUpload = (slideId: string | number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setImageOverrides(prev => ({
        ...prev,
        [slideId]: reader.result as string
      }))
    }
    reader.readAsDataURL(file)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Generating your presentation...</p>
      </div>
    )
  }

  if (error && slides.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => router.push('/home')}
          className="mt-4 text-blue-600 underline"
        >
          ← Back to Home
        </button>
      </div>
    )
  }

  return (
    <SlideWrapper>
      <div id="slides-container" className="flex flex-col gap-8 p-6 bg-gray-50 min-h-screen">
        {slides.map((slide, index) => {
          const id = slide.id ?? index
          const imageKey = String(id)

          // ✅ Clean, safe picsum URL — no extra spaces
          const seed = encodeURIComponent(slide.heading || slide.title || `slide-${index}`)
          const imageUrl = imageOverrides[imageKey] ||
            slide.image ||
            `https://picsum.photos/seed/${seed}/800/600.jpg?grayscale&blur=2` // ✅ Fixed: no extra space

          return (
            <div
              key={imageKey}
              className="relative group slide-to-export"
            >
              {slide.type === 'image-text' ? (
                <>
                  <ImageContentSlide
                    title={slide.heading ?? ''}
                    content={slide.text ?? ''}
                    imageUrl={imageUrl}
                    imagePosition={slide.imagePosition}
                  />

                  {/* Upload overlay */}
                  <div className="absolute inset-0 md:grid md:grid-cols-2 pointer-events-none">
                    <div
                      className={`relative ${
                        slide.imagePosition === 'left' ? 'order-first' : 'order-last'
                      }`}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload(imageKey)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 pointer-events-auto"
                        title="Click to replace image"
                      />
                    </div>
                  </div>

                  {/* Hover indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <span className="bg-black/60 text-white text-sm px-4 py-2 rounded-md pointer-events-auto shadow-lg">
                      🖼️ Click to Change Image
                    </span>
                  </div>
                </>
              ) : (
                renderSlide(slide, index)
              )}
            </div>
          )
        })}

        {/* ✅ Export Button */}
        {presentationId && <ExportButton presentationId={presentationId} />}
      </div>
    </SlideWrapper>
  )
}