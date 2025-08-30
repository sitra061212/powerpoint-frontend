import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, X } from 'lucide-react'

export function SortableItem({
  block,
  updateContent,
  removeBlock,
  onImageUpload,
}: {
  block: any
  updateContent: (id: string, value: any) => void
  removeBlock: (id: string) => void
  onImageUpload: (id: string, file: File) => void
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({
    id: block.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 'auto',
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="p-4 border rounded bg-gray-50 dark:bg-gray-800 relative mb-4"
    >
      <button
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 text-gray-400 hover:text-gray-600"
      >
        <GripVertical className="h-5 w-5" />
      </button>

      <button
        onClick={() => removeBlock(block.id)}
        className="absolute top-2 right-2 text-sm text-red-500 hover:underline"
      >
        <X className="h-5 w-5" />
      </button>

      <p className="text-sm font-medium capitalize mb-2 ml-6">{block.type} Block</p>

      {block.type === 'title' && (
        <textarea
          value={block.content as string}
          onChange={(e) => updateContent(block.id, e.target.value)}
          className="w-full p-2 border rounded text-sm"
          placeholder="Slide Title"
        />
      )}

      {block.type === 'text' && (
        <textarea
          value={block.content as string}
          onChange={(e) => updateContent(block.id, e.target.value)}
          className="w-full p-2 border rounded text-sm"
          placeholder="Add content"
        />
      )}

      {block.type === 'image' && (
        <div>
          <label className="block text-sm mb-1">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) onImageUpload(block.id, file)
            }}
            className="text-sm mb-2"
          />
          {typeof block.content === 'object' && block.content.url && (
            <img
              src={block.content.url}
              alt="Custom upload"
              className="w-full h-48 object-cover mt-2 rounded"
            />
          )}
        </div>
      )}
    </div>
  )
}