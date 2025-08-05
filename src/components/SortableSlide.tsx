// components/SortableSlide.tsx
'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

interface SortableSlideProps {
  id: string
  slide: { title: string, points: string[] }
  index: number
  onTitleChange: (val: string) => void
  onPointChange: (pointIndex: number, val: string) => void
  onAddPoint: () => void
}

export function SortableSlide({
  id,
  slide,
  index,
  onTitleChange,
  onPointChange,
  onAddPoint
}: SortableSlideProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card>
        <CardContent className="space-y-3 p-4">
          <Input
            value={slide.title}
            onChange={(e) => onTitleChange(e.target.value)}
          />
          {slide.points.map((pt, i) => (
            <Textarea
              key={i}
              value={pt}
              onChange={(e) => onPointChange(i, e.target.value)}
            />
          ))}
          <Button variant="secondary" size="sm" onClick={onAddPoint}>
            Add Point
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
