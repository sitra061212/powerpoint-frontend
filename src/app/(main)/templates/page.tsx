'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

interface Template {
  _id: string
  name: string
  layout: string
  placeholders: any[]
}

export default function ExploreTemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/templates')
        const data = await res.json()
        setTemplates(data)
      } catch (error) {
        console.error('Failed to fetch templates:', error)
      }
    }

    fetchTemplates()
  }, [])

  const filteredTemplates = templates.filter((template) =>
    template.name.toLowerCase().includes(search.toLowerCase())
  )

  // Map layout to visual properties
  const getLayoutConfig = (layout: string) => {
    const configs: Record<string, { label: string; color: string; imageSeed: string }> = {
      'title-only': { label: 'Title', color: 'bg-blue-100 text-blue-800', imageSeed: 'title' },
      'title-content': { label: 'Text', color: 'bg-green-100 text-green-800', imageSeed: 'text' },
      'image-left': { label: 'Image Left', color: 'bg-purple-100 text-purple-800', imageSeed: 'left' },
      'image-right': { label: 'Image Right', color: 'bg-purple-100 text-purple-800', imageSeed: 'right' },
      'two-column': { label: 'Two Column', color: 'bg-orange-100 text-orange-800', imageSeed: 'columns' },
      'quote': { label: 'Quote', color: 'bg-pink-100 text-pink-800', imageSeed: 'quote' },
      'default': { label: 'Custom', color: 'bg-gray-100 text-gray-800', imageSeed: 'custom' }
    }
    return configs[layout] || configs['default']
  }

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Explore Templates</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Browse from curated slide templates to kickstart your presentation.
      </p>

      {/* Search & Create */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <Input
          placeholder="Search templates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:max-w-sm"
        />

        <a href="/templates/new">
          <Button>+ Create Template</Button>
        </a>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => {
          const config = getLayoutConfig(template.layout)
          const imageSeed = `${template._id}-${config.imageSeed}`

          return (
            <Card
              key={template._id}
              className={`group relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-2 cursor-pointer ${
                selected === template._id
                  ? 'border-blue-500 shadow-lg'
                  : 'border-transparent hover:border-gray-200 dark:hover:border-gray-700'
              }`}
              onClick={() => setSelected(template._id)}
            >
              {/* Preview Image */}
              <div className="aspect-video w-full bg-gray-100 dark:bg-gray-800 relative">
                <img
                  src={`https://picsum.photos/seed/${imageSeed}/800/400?grayscale&blur=1`}
                  alt="Template preview"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay Badge */}
                <Badge
                  className={`absolute top-3 right-3 text-xs px-2 py-1 ${config.color} backdrop-blur-sm`}
                >
                  {config.label}
                </Badge>
              </div>

              {/* Content */}
              <CardContent className="p-5">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-white line-clamp-1">
                  {template.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {template.placeholders.length} elements
                </p>
              </CardContent>

              {/* Selection Indicator */}
              {selected === template._id && (
                <div className="absolute inset-0 pointer-events-none border-4 border-blue-500 rounded-lg"></div>
              )}
            </Card>
          )
        })}
      </div>

      {/* Action Button */}
      <div className="mt-10">
        <Button
          className="w-full text-lg py-6"
          disabled={!selected}
          onClick={() => {
            // Simulate using the template
            alert(`Using template: ${selected}`)
          }}
        >
          {selected ? '✅ Use Selected Template' : 'Select a template to continue'}
        </Button>
      </div>
    </div>
  )
}