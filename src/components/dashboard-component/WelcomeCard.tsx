'use client'

import { Card, CardHeader } from '@/components/ui/card'

export function WelcomeCard() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="flex flex-row items-start gap-4">
        <img src="/persina.png" alt="Logo" className="h-8 w-8 rounded" />
        <div>
          <p className="text-xl font-semibold">
            Hi there! 👋 Let's build your presentation together!
          </p>
          <ul className="list-disc pl-6 space-y-1 text-sm mt-2">
            <li>Upload a 📁 PDF, DOCX, or PPTX file</li>
            <li>Or simply describe your topic in a few words</li>
          </ul>
          <p className="text-sm mt-2">
            I'll turn it into polished slides in minutes.
            If you upload a 📁 PowerPoint (PPTX), I'll only redesign it.
            Your original text will remain unchanged.
          </p>
          <p className="text-sm mt-1">One file at a time, please.</p>
        </div>
      </CardHeader>
    </Card>
  )
}
