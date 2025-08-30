
export function BlockControls({ onAddBlock }: { onAddBlock: (type: string) => void }) {
  return (
    <div className="space-x-2 mb-6">
      <button
        type="button"
        onClick={() => onAddBlock('title')}
        className="text-sm border border-gray-300 dark:border-gray-600 px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        + Title
      </button>
      <button
        type="button"
        onClick={() => onAddBlock('text')}
        className="text-sm border border-gray-300 dark:border-gray-600 px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        + Text
      </button>
      <button
        type="button"
        onClick={() => onAddBlock('image')}
        className="text-sm border border-gray-300 dark:border-gray-600 px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        + Image
      </button>
    </div>
  )
}