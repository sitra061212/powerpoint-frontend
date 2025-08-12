'use client'

import { Button } from '@/components/ui/button'

interface Props {
  onSelect: (count: number) => void
}

export function SlideSelection({ onSelect }: Props) {
  return (
    <div className="w-full max-w-2xl mt-8">
      <p className="text-sm mb-4">
        How many slides would you like? Since you're on the free plan, I can create up to 10 slides for you.
        Please upgrade if you want to process larger files.
      </p>
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => onSelect(1)} className="flex-1">1 slide</Button>
        <Button variant="outline" onClick={() => onSelect(3)} className="flex-1">3 slides</Button>
        <Button variant="outline" onClick={() => onSelect(10)} className="flex-1">10 slides</Button>
        <Button variant="outline" className="flex-1">Upgrade plan</Button>
      </div>
    </div>
  )
}
