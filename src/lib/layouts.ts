// lib/layouts.ts
export const LAYOUTS = {
  'title-only': {
    name: 'Title Only',
    description: 'Full-screen title',
    blocks: ['title'],
  },
  'title-content': {
    name: 'Title & Content',
    description: 'Classic slide layout',
    blocks: ['title', 'text'],
  },
  'image-left': {
    name: 'Image Left',
    description: 'Text on right, image on left',
    blocks: ['title', 'text', 'image'],
  },
  'image-right': {
    name: 'Image Right',
    description: 'Text on left, image on right',
    blocks: ['title', 'text', 'image'],
  },
  'two-column': {
    name: 'Two Column',
    description: 'Split content into two columns',
    blocks: ['title', 'text', 'text'],
  },
  quote: {
    name: 'Quote',
    description: 'Large quote with author',
    blocks: ['title', 'text'],
  },
} as const

export type LayoutKey = keyof typeof LAYOUTS