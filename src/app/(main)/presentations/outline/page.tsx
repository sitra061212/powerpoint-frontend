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

  useEffect(() => {
    const saved = localStorage.getItem('generatedOutline')
    if (saved) {
      try {
        setOutline(JSON.parse(saved))
      } catch (err) {
        console.error('Invalid JSON in generatedOutline:', err)
      }
    }
  }, [])

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

  const handleNext = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/slides', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ outline }),
      })

      if (!res.ok) throw new Error('Slide generation failed')

      const data = await res.json()

      // Save slides in localStorage
      localStorage.setItem('editedOutline', JSON.stringify(data.slides))
      localStorage.setItem('outlineId', data._id)

      // Navigate to slide show
      router.push('/presentations/slide')
    } catch (err) {
      console.error(err)
      alert('Failed to generate slides.')
    }
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

    {/* Buttons Side by Side */}
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
        🚀 Generate Slide
      </Button>
    </div>
  </div>
)
}