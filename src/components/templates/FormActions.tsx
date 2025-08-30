import { Button } from '@/components/ui/button'

export function FormActions({
  onCancel,
  onSubmit,
}: {
  onCancel: () => void
  onSubmit: () => void
}) {
  return (
    <div className="flex justify-between mt-8">
      <Button variant="ghost" onClick={onCancel}>
        Cancel
      </Button>
      <Button onClick={onSubmit}>Save Template</Button>
    </div>
  )
}