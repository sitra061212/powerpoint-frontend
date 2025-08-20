import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { SortableItem } from './SortableItem'

export function BlockList({
  blocks,
  updateContent,
  removeBlock,
  onImageUpload,
  onDragEnd,
}: {
  blocks: any[]
  updateContent: (id: string, value: any) => void
  removeBlock: (id: string) => void
  onImageUpload: (id: string, file: File) => void
  onDragEnd: (event: DragEndEvent) => void
}) {
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={blocks} strategy={verticalListSortingStrategy}>
        {blocks.map((block) => (
          <SortableItem
            key={block.id}
            block={block}
            updateContent={updateContent}
            removeBlock={removeBlock}
            onImageUpload={onImageUpload}
          />
        ))}
      </SortableContext>
    </DndContext>
  )
}