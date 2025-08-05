'use client'

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useEffect, useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

interface Slide {
  title: string
  points: string[]
}

interface SortableSlideItemProps {
  slide: Slide
  index: number
  onUpdate: (index: number, field: 'title' | 'points', value: any) => void
}

function SortableSlideItem({ slide, index, onUpdate }: SortableSlideItemProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
  } = useSortable({ id: index.toString() })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-4"
    >
      <Card className="shadow-md">
        <CardContent className="space-y-3 p-4">
          <Input
            placeholder="Slide Title"
            value={slide.title}
            onChange={(e) => onUpdate(index, 'title', e.target.value)}
          />
          {slide.points.map((point, pointIndex) => (
            <Textarea
              key={pointIndex}
              placeholder="Add content..."
              value={point}
              onChange={(e) => {
                const newPoints = [...slide.points]
                newPoints[pointIndex] = e.target.value
                onUpdate(index, 'points', newPoints)
              }}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default function SlideEditorPage() {
  const [slides, setSlides] = useState<Slide[]>([])
  const [outlineId, setOutlineId] = useState<string | null>(null)
  const router = useRouter()

  // Track the currently active slide index
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)

  // Ref to track the main content area
  const mainContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem('editedOutline')
    const id = localStorage.getItem('outlineId')
    if (saved) setSlides(JSON.parse(saved))
    if (id) setOutlineId(id)
  }, [])

  const updateSlide = (index: number, field: 'title' | 'points', value: any) => {
    const updated = [...slides]
    updated[index][field] = value
    setSlides(updated)
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over.id) {
      const oldIndex = parseInt(active.id)
      const newIndex = parseInt(over.id)
      setSlides((prev) => arrayMove(prev, oldIndex, newIndex))
    }
  }

  const sensors = useSensors(useSensor(PointerSensor))

  const handleSave = async () => {
    if (!outlineId) return alert("Missing outline ID")

    const res = await fetch(`http://localhost:5000/api/slides/${outlineId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slides }),
    })

    if (res.ok) {
      alert('Slides saved!')
      router.push('/presentations')
    } else {
      alert('Failed to save slides.')
    }
  }

  // Function to handle slide selection in the sidebar
  const handleSlideSelect = (index: number) => {
    setActiveSlideIndex(index)
    // Scroll to the active slide
    if (mainContentRef.current) {
      const slideElement = mainContentRef.current.children[index]
      if (slideElement) {
        slideElement.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <div className="flex max-w-4xl mx-auto p-6 h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-48 bg-gray-800 p-4 space-y-2">
        <h2 className="text-lg font-bold">Slides</h2>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={slides.map((_, i) => i.toString())} strategy={verticalListSortingStrategy}>
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => handleSlideSelect(i)} // Select the slide when clicked
                className={`bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 ${
                  activeSlideIndex === i ? 'bg-gray-600' : ''
                }`}
              >
                Slide {i + 1}
              </button>
            ))}
          </SortableContext>
        </DndContext>
      </div>

      {/* Main Content Area */}
      <div
        ref={mainContentRef}
        className="flex-1 p-4 overflow-y-auto max-h-full"
      >
        <h1 className="text-2xl font-bold mb-6">🛠️ Slide Editor</h1>

        {/* Display all slides */}
        <div>
          {slides.map((slide, index) => (
            <SortableSlideItem
              key={index}
              slide={slide}
              index={index}
              onUpdate={updateSlide}
            />
          ))}
        </div>

        {/* Formatting Options */}
        <div className="mt-4 flex justify-center space-x-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            T<sub>1</sub> Subtitle
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            H Heading
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            • Bullet
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            * Footnote
          </button>
        </div>

        {/* Settings Style Button */}
        <div className="mt-4 flex justify-center">
          <Button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full">
            Settings style →
          </Button>
        </div>
      </div>
    </div>
  )
}