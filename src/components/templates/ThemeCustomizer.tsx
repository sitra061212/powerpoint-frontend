
export function ThemeCustomizer({
  theme,
  onThemeChange,
}: {
  theme: { primaryColor: string; backgroundColor: string; font: string }
  onThemeChange: (theme: any) => void
}) {
  return (
    <div className="mb-6 p-4 border rounded bg-gray-50 dark:bg-gray-800">
      <h3 className="font-medium mb-3">🎨 Customize Theme</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm mb-1">Primary Color</label>
          <input
            type="color"
            value={theme.primaryColor}
            onChange={(e) => onThemeChange({ ...theme, primaryColor: e.target.value })}
            className="w-full h-10 border rounded cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Background</label>
          <input
            type="color"
            value={theme.backgroundColor}
            onChange={(e) => onThemeChange({ ...theme, backgroundColor: e.target.value })}
            className="w-full h-10 border rounded cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Font</label>
          <select
            value={theme.font}
            onChange={(e) => onThemeChange({ ...theme, font: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="Inter">Inter</option>
            <option value="Roboto">Roboto</option>
            <option value="Georgia">Georgia</option>
            <option value="Courier New">Courier New</option>
          </select>
        </div>
      </div>
    </div>
  )
}