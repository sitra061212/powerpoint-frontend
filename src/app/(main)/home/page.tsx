'use client'

import { useState, useRef } from 'react'
import { WelcomeCard } from '@/components/dashboard-component/WelcomeCard'
import { FileButtons } from '@/components/dashboard-component/FileButtons'
import { SlideSelection } from '@/components/dashboard-component/SlideSelection'
import { TopicInput } from '@/components/dashboard-component/TopicInput'

export default function DashboardPage() {
  const [file, setFile] = useState<File | null>(null)
  const [topicDescription, setTopicDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedSlides, setSelectedSlides] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) setFile(selectedFile)
  }

  const removeFile = () => {
    setFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleGenerate = async () => {
    if (!topicDescription && !file) {
      alert('Please enter a prompt or upload a file.')
      return
    }
    if (!selectedSlides) {
      alert('Please select the number of slides.')
      return
    }

    setLoading(true)
    const formData = new FormData()
    if (topicDescription) formData.append('prompt', topicDescription)
    if (file) formData.append('file', file)
    formData.append('num_slides', String(selectedSlides))

    try {
      const res = await fetch('http://localhost:5000/api/outline', {
        method: 'POST',
        body: formData,
      })
      if (!res.ok) throw new Error('Failed to generate outline')
      const data = await res.json()
      const slides = data?.outline ?? data?.data?.slides ?? []
      localStorage.setItem('generatedOutline', JSON.stringify(slides))
      window.location.href = '/presentations/outline'
    } catch (error) {
      console.error(error)
      alert('Something went wrong while generating outline.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-8 p-6">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept=".pdf,.docx,.pptx"
      />

      <WelcomeCard />

      <FileButtons
        file={file}
        onFileSelect={() => fileInputRef.current?.click()}
        onRemove={removeFile}
      />

      {(topicDescription || file) && (
        <SlideSelection onSelect={(count) => setSelectedSlides(count)} />
      )}

      <TopicInput
        value={topicDescription}
        loading={loading}
        onChange={setTopicDescription}
        onGenerate={handleGenerate}
      />
    </div>
  )
}
