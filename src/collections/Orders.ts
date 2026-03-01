import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    // address info
    {
      name: 'firstname',
      type: 'text',
      required: true,
    },
    {
      name: 'lastname',
      type: 'text',
    },
    {
      name: 'contact',
      type: 'number',
    },
    {
      name: 'verified_contact',
      type: 'text',
      defaultValue: 'false',
    },
    {
      name: 'address-1',
      type: 'textarea',
      required: true,
    },
    {
      name: 'address-2',
      type: 'textarea',
    },
    {
      name: 'pincode',
      type: 'number',
      required: true,
    },
    // product_info
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
    },
    // payment methods
    {
      name: 'payment_method',
      type: 'text',
    },
    {
      name: 'payment_status',
      type: 'text',
      defaultValue: 'INITIAL',
    },
  ],
  timestamps:true
}
