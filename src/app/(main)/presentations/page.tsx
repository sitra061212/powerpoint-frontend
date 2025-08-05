'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Presentation {
  _id: string
  source: string
  slides: any[]
  isConverted: boolean
  createdAt: string
}

export default function MyPresentationsPage() {
  const [presentations, setPresentations] = useState<Presentation[]>([])

  useEffect(() => {
    const fetchPresentations = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/outline')
        const data = await res.json()
        setPresentations(data)
      } catch (error) {
        console.error('Failed to fetch presentations:', error)
      }
    }

    fetchPresentations()
  }, [])

  const outlines = presentations.filter(p => !p.isConverted)
  const slides = presentations.filter(p => p.isConverted)

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        My Presentations
      </h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          🧠 AI-Generated Outlines (Not Converted)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {outlines.map((outline) => (
            <Card key={outline._id}>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {new Date(outline.createdAt).toLocaleString()}
                </p>
                <p className="text-gray-800 dark:text-white text-sm line-clamp-4">
                  {outline.source.substring(0, 200)}...
                </p>
                <Button className="mt-3 w-full" variant="secondary">
                  Convert to Slides
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          🎞️ Converted to Slides
        </h2>
        {slides.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No converted slides yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {slides.map((slide) => (
              <Card key={slide._id}>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {new Date(slide.createdAt).toLocaleString()}
                  </p>
                  <p className="text-gray-800 dark:text-white text-sm line-clamp-4">
                    {slide.source.substring(0, 200)}...
                  </p>
                  <Button className="mt-3 w-full">View Slides</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
