import type { CollectionConfig } from 'payload'
export const Variants: CollectionConfig = {
  slug: 'variants',
  access:{
    read:()=>true
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'price',
      type: 'text',
      required: true,
    },
    {
      name: 'img',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'content',
      type: 'text',
    },
  ],
  timestamps:true
}
