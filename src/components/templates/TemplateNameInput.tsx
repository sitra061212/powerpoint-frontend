import { Input } from '@/components/ui/input'

export function TemplateNameInput({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">Template Name</label>
      <Input
        placeholder="e.g., Modern Presentation"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}