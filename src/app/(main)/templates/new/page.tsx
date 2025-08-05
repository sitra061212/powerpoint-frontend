'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Textarea } from '@/components/ui/textarea'

type Placeholder = {
  type: string
  content?: string
}

export default function NewTemplatePage() {
  const [templateName, setTemplateName] = useState('')
  const [layout, setLayout] = useState('default')
  const [placeholders, setPlaceholders] = useState<Placeholder[]>([])

  const router = useRouter()

  const addBlock = (type: string) => {
    const defaultContent =
      type === 'title'
        ? 'Slide Title'
        : type === 'text'
        ? 'Some description text'
        : ''
    setPlaceholders([...placeholders, { type, content: defaultContent }])
  }

  const updateContent = (index: number, value: string) => {
    const updated = [...placeholders]
    updated[index].content = value
    setPlaceholders(updated)
  }

  const removeBlock = (index: number) => {
    const updated = [...placeholders]
    updated.splice(index, 1)
    setPlaceholders(updated)
  }

  const handleCancel = () => {
    router.push('/templates')
  }

  const handleSubmit = async () => {
    if (!templateName) return alert('Template name is required.')

    try {
      const res = await fetch('http://localhost:5000/api/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: templateName,
          layout,
          placeholders,
        }),
      })

      if (!res.ok) throw new Error('Failed to save template')
      router.push('/templates')
    } catch (error) {
      console.error(error)
      alert('Failed to save template.')
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Create a New Template</h1>

      <Input
        placeholder="Template name"
        value={templateName}
        onChange={(e) => setTemplateName(e.target.value)}
        className="mb-4"
      />

      <Input
        placeholder="Layout name (e.g., title-content)"
        value={layout}
        onChange={(e) => setLayout(e.target.value)}
        className="mb-6"
      />

      <div className="space-x-2 mb-6">
        <Button variant="outline" onClick={() => addBlock('title')}>
          + Title Block
        </Button>
        <Button variant="outline" onClick={() => addBlock('text')}>
          + Text Block
        </Button>
        <Button variant="outline" onClick={() => addBlock('image')}>
          + Image Block
        </Button>
      </div>

      <div className="space-y-4">
        {placeholders.map((block, index) => (
          <div
            key={index}
            className="p-4 border rounded bg-gray-50 dark:bg-gray-800 relative"
          >
            <button
              onClick={() => removeBlock(index)}
              className="absolute top-2 right-2 text-sm text-red-500 hover:underline"
            >
              Remove
            </button>

            <p className="text-sm font-medium capitalize mb-2">{block.type} Block</p>

            {(block.type === 'title' || block.type === 'text') && (
              <Textarea
                value={block.content}
                onChange={(e) => updateContent(index, e.target.value)}
                placeholder={`Enter ${block.type} content`}
              />
            )}

            {block.type === 'image' && (
              <p className="text-sm text-muted">
                🖼️ Image Placeholder (content handled at render time)
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="ghost" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Save Template</Button>
      </div>
    </div>
  )
}
