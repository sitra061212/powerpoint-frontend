'use client'

import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'

interface Props {
  file: File | null
  onFileSelect: () => void
  onRemove: () => void
}

export function FileButtons({ file, onFileSelect, onRemove }: Props) {
  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-2xl">
      {/* Buttons Side by Side */}
      <div className="flex items-center gap-4 w-full">
        <Button variant="outline" className="flex-1" onClick={onFileSelect}>
          <Upload className="mr-2 h-4 w-4" /> {file ? 'Change file' : 'Select file'}
        </Button>
        <Button variant="outline" className="flex-1">
          Start from blank slide
        </Button>
      </div>

      {/* Show selected file name */}
      {file && (
        <div className="text-sm text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-3 py-2 rounded-md w-full flex items-center justify-between">
          <span>📄 {file.name}</span>
          <button
            onClick={onRemove}
            className="text-xs underline hover:text-red-500"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  )
}
