'use client'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Plus, RefreshCcw, Upload } from 'lucide-react'

interface Props {
  value: string
  loading: boolean
  onChange: (val: string) => void
  onGenerate: () => void
}

export function TopicInput({ value, onChange, onGenerate, loading }: Props) {
  return (
    <Card className="w-full max-w-2xl relative">
      <CardContent className="p-4">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Describe your idea or paste text"
          className="min-h-[80px] w-full"
        />

        {/* Floating Action Buttons */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          <Button size="icon" className="bg-green-500 hover:bg-green-600 text-white">
            <Plus className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            onClick={() => onChange('')}
          >
            <RefreshCcw className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            onClick={onGenerate}
            disabled={loading}
          >
            {loading ? (
              <RefreshCcw className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
