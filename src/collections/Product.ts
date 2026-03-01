import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'relationship',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'variants',
      type: 'array',
      fields: [
        {
          name: 'variant',
          type: 'relationship',
          relationTo: 'variants',
        },
      ],
    },
  ],
  timestamps:true
}
