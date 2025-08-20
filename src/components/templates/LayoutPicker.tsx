import { LAYOUTS, LayoutKey } from '@/lib/layouts'

export function LayoutPicker({
  selectedLayout,
  onSelect,
}: {
  selectedLayout: LayoutKey
  onSelect: (layout: LayoutKey) => void
}) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">Choose Layout</label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {(Object.keys(LAYOUTS) as LayoutKey[]).map((key) => {
          const layout = LAYOUTS[key]
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelect(key)}
              className={`p-3 border rounded text-left text-sm transition-all ${
                selectedLayout === key
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="font-medium">{layout.name}</div>
              <div className="text-gray-500 dark:text-gray-400">{layout.description}</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}