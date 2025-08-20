'use client'

export function ExportButton({ presentationId }: { presentationId: string }) {
  const handleExport = (format: 'pptx' | 'pdf') => {
    const url = `http://localhost:5000/api/export/${format}/${presentationId}`
    const link = document.createElement('a')
    link.href = url
    link.download = `presentation.${format}`
    link.click()
  }

  return (
    <div className="flex gap-2 mt-4">
      <button
        onClick={() => handleExport('pptx')}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        📄 Export as PPT
      </button>

      <button
        onClick={() => handleExport('pdf')}
        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        📄 Export as PDF
      </button>
    </div>
  )
}