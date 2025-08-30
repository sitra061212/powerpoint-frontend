'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

// Components
import { TemplateNameInput } from '@/components/templates/TemplateNameInput'
import { LayoutPicker } from '@/components/templates/LayoutPicker'
import { ThemeCustomizer } from '@/components/templates/ThemeCustomizer'
import { BlockControls } from '@/components/templates/BlockControls'
import { BlockList } from '@/components/templates/BlockList'
import { FormActions } from '@/components/templates/FormActions'

// Layouts
import { LAYOUTS, LayoutKey } from '@/lib/layouts'

export default function NewTemplatePage() {
  const router = useRouter()
  const [templateName, setTemplateName] = useState('')
  const [selectedLayout, setSelectedLayout] = useState<LayoutKey>('title-content')
  const [placeholders, setPlaceholders] = useState<any[]>([])
  const [theme, setTheme] = useState({
    primaryColor: '#3b82f6',
    backgroundColor: '#ffffff',
    font: 'Inter',
  })

  const generateId = () => Math.random().toString(36).substring(7)

  const handleLayoutChange = (layout: LayoutKey) => {
    setSelectedLayout(layout)
    const defaults = LAYOUTS[layout].blocks.map((type) => ({
      id: generateId(),
      type,
      content:
        type === 'title'
          ? 'Slide Title'
          : type === 'text'
          ? 'Add content here'
          : type === 'image'
          ? { url: `https://picsum.photos/800/600?random=${Math.random()}` }
          : undefined,
    }))
    setPlaceholders(defaults)
  }

  const addBlock = (type: string) => {
    const newBlock = {
      id: generateId(),
      type,
      content: type === 'title' ? 'New Title' : type === 'text' ? 'New Text' : undefined,
    }
    setPlaceholders([...placeholders, newBlock])
  }

  const updateContent = (id: string, value: any) =>
    setPlaceholders(
      placeholders.map((b) => (b.id === id ? { ...b, content: value } : b))
    )

  const removeBlock = (id: string) =>
    setPlaceholders(placeholders.filter((b) => b.id !== id))

  const handleImageUpload = (id: string, file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        updateContent(id, { url: e.target.result as string, file })
      }
    }
    reader.readAsDataURL(file)
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = placeholders.findIndex((i) => i.id === active.id)
      const newIndex = placeholders.findIndex((i) => i.id === over.id)
      const newBlocks = [...placeholders]
      newBlocks.splice(oldIndex, 1)
      newBlocks.splice(newIndex, 0, placeholders[oldIndex])
      setPlaceholders(newBlocks)
    }
  }

 const handleSubmit = async () => {
  if (!templateName) return alert('Name required')

  const formData = new FormData()

  // ✅ 1. Prepare serializable data (without File objects)
  const serializablePlaceholders = placeholders.map(({ id, type, content }) => ({
    id,
    type,
    content: typeof content === 'object' && content?.url ? { url: content.url } : content,
  }))

  // ✅ 2. Append clean JSON
  formData.append(
    'data',
    JSON.stringify({
      name: templateName,
      layout: selectedLayout,
      placeholders: serializablePlaceholders,
      theme,
    })
  )

  // ✅ 3. Append actual image files (if any)
  placeholders.forEach((block) => {
    if (block.type === 'image' && block.content?.file instanceof File) {
      formData.append('images', block.content.file)
    }
  })

  try {
    const res = await fetch('http://localhost:5000/api/templates', {
      credentials: 'include',
      method: 'POST',
      body: formData, // No JSON.stringify needed — FormData handles it
    })

    if (!res.ok) throw new Error('Failed to save template')

    const result = await res.json()
    console.log('Template saved:', result)
    router.push('/templates')
  } catch (error: any) {
    console.error('Error saving template:', error)
    alert('Failed to save template: ' + error.message)
  }
}

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Create a New Template</h1>

      <TemplateNameInput value={templateName} onChange={setTemplateName} />
      <LayoutPicker selectedLayout={selectedLayout} onSelect={handleLayoutChange} />
      <ThemeCustomizer theme={theme} onThemeChange={setTheme} />
      <BlockControls onAddBlock={addBlock} />
      <BlockList
        blocks={placeholders}
        updateContent={updateContent}
        removeBlock={removeBlock}
        onImageUpload={handleImageUpload}
        onDragEnd={handleDragEnd}
      />
      <FormActions onCancel={() => router.push('/templates')} onSubmit={handleSubmit} />
    </div>
  )
}