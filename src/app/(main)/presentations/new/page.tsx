'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function CreatePresentationPage() {
  const [prompt, setPrompt] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [outline, setOutline] = useState<any[] | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0])
  }

 const handleGenerate = async () => {
  if (!prompt && !file) {
    alert("Please enter a prompt or upload a file.")
    return
  }

  setLoading(true)

  const formData = new FormData()
  if (prompt) formData.append("prompt", prompt)
  if (file) formData.append("file", file)

  try {
    const res = await fetch("http://localhost:5000/api/outline", {
      method: "POST",
      body: formData,
    })

    if (!res.ok) throw new Error("Failed to generate outline")

    const data = await res.json()
    const slides = data?.outline ?? data?.data?.slides ?? []
    console.log("Storing to localStorage:", slides)

    localStorage.setItem("generatedOutline", JSON.stringify(slides))

    setOutline(slides)

    // ✅ redirect to editor page after storing
    window.location.href = "/presentations/outline"
  } catch (error) {
    console.error(error)
    alert("Something went wrong while generating outline.")
  } finally {
    setLoading(false)
  }
}


  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Create a New Presentation
      </h1>

      <Tabs defaultValue="prompt" className="w-full mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="prompt">Use Prompt</TabsTrigger>
          <TabsTrigger value="upload">Upload Document</TabsTrigger>
        </TabsList>

        <TabsContent value="prompt">
          <Card>
            <CardContent className="p-6">
              <textarea
                rows={6}
                placeholder="Enter a topic, idea, or text prompt..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload">
          <Card>
            <CardContent className="p-6 space-y-4">
              <Input
                type="file"
                accept=".pdf,.txt,.docx"
                onChange={handleFileChange}
              />
              {file && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Selected: {file.name}
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Button className="w-full mb-6" onClick={handleGenerate} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Outline'}
      </Button>


    </div>
  )
}
