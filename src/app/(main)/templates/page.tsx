'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

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

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Explore Templates</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Browse from curated slide templates to kickstart your presentation.
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <Input
          placeholder="Search templates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:max-w-sm"
        />

        <a href="/templates/new">
          <Button variant="default">+ Create Template</Button>
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card
            key={template._id}
            className={`transition hover:shadow-lg cursor-pointer border-2 ${
              selected === template._id ? 'border-blue-500' : 'border-transparent'
            }`}
            onClick={() => setSelected(template._id)}
          >
            <CardContent className="p-5">
              <h3 className="font-semibold text-lg mb-1 text-gray-800 dark:text-white">
                {template.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Layout: {template.layout}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Button disabled={!selected} className="w-full">
          {selected ? 'Use Selected Template' : 'Select a template to continue'}
        </Button>
      </div>
    </div>
  )
}
