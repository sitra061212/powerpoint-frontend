'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

interface Slide {
  title: string
  points: string[]
}

export default function OutlineEditorPage() {
  const router = useRouter()
  const [outline, setOutline] = useState<Slide[]>([])

  // Load generatedOutline on first load
  useEffect(() => {
    const saved = localStorage.getItem('generatedOutline')
    if (saved) {
      try {
        setOutline(JSON.parse(saved))
      } catch (err) {
        console.error('Invalid JSON in generatedOutline:', err)
        router.push('/home')
      }
    } else {
      router.push('/home')
    }
  }, [router])

  const updateTitle = (index: number, value: string) => {
    const newOutline = [...outline]
    newOutline[index].title = value
    setOutline(newOutline)
  }

  const updatePoint = (slideIndex: number, pointIndex: number, value: string) => {
    const newOutline = [...outline]
    newOutline[slideIndex].points[pointIndex] = value
    setOutline(newOutline)
  }

  const handleAddPoint = (index: number) => {
    const newOutline = [...outline]
    newOutline[index].points.push('')
    setOutline(newOutline)
  }

  const handleNext = () => {
    // ✅ Always save current outline (edited or original) to editedOutline
    localStorage.setItem('editedOutline', JSON.stringify(outline))
    
    // ✅ Save numSlides and outlineId if available
    const numSlides = localStorage.getItem('numSlides')
    const outlineId = localStorage.getItem('outlineId')
    if (numSlides) localStorage.setItem('numSlides', numSlides)
    if (outlineId) localStorage.setItem('outlineId', outlineId)

    // ✅ Navigate — slide generation happens on next page
    router.push('/presentations/slides')
  }

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Edit Outline
      </h1>

      <div className="space-y-6">
        {outline.map((slide, index) => (
          <Card key={index}>
            <CardContent className="space-y-3 p-4">
              <Input
                value={slide.title}
                onChange={(e) => updateTitle(index, e.target.value)}
                placeholder="Slide title"
              />
              {slide.points.map((point, pIndex) => (
                <Textarea
                  key={pIndex}
                  value={point}
                  onChange={(e) => updatePoint(index, pIndex, e.target.value)}
                  placeholder="Bullet point"
                />
              ))}
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleAddPoint(index)}
              >
                Add Point
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-4 mt-6 w-full">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => router.push('/')}
        >
          ← Back to Chat
        </Button>

        <Button
          className="flex-1"
          onClick={handleNext}
        >
          🚀 Generate Slides
        </Button>
      </div>
    </div>
  )
}