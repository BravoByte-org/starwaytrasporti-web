export default {
  name: 'servicesSection',
  title: 'Services Section',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
    },
    {
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Service Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Service Description',
              type: 'text',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'icon',
              title: 'Service Icon',
              type: 'string',
              options: {
                list: [
                  {title: 'Truck (National)', value: 'truck'},
                  {title: 'Globe (International)', value: 'globe'},
                  {title: 'Clock (Express)', value: 'clock'},
                  {title: 'Warehouse', value: 'warehouse'},
                  {title: 'Shield (Security)', value: 'shield'},
                ],
              },
            },
            {
              name: 'color',
              title: 'Icon Color',
              type: 'string',
              options: {
                list: [
                  {title: 'Blue', value: 'blue'},
                  {title: 'Green', value: 'green'},
                  {title: 'Purple', value: 'purple'},
                  {title: 'Orange', value: 'orange'},
                  {title: 'Red', value: 'red'},
                ],
              },
              initialValue: 'blue',
            },
            {
              name: 'link',
              title: 'Service Link',
              type: 'object',
              fields: [
                {
                  name: 'url',
                  title: 'URL',
                  type: 'string',
                },
                {
                  name: 'text',
                  title: 'Link Text',
                  type: 'string',
                  initialValue: 'Learn More',
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'title',
              description: 'description',
              icon: 'icon',
            },
            prepare(selection) {
              const {title, description, icon} = selection
              return {
                title: title,
                subtitle: `${icon} - ${description?.substring(0, 50)}...`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(6),
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Grid', value: 'grid'},
          {title: 'List', value: 'list'},
        ],
      },
      initialValue: 'grid',
    },
    {
      name: 'variant',
      title: 'Variant',
      type: 'string',
      options: {
        list: [
          {title: 'Default', value: 'default'},
          {title: 'Compact', value: 'compact'},
          {title: 'Detailed', value: 'detailed'},
        ],
      },
      initialValue: 'default',
    },
    {
      name: 'enableAnimations',
      title: 'Enable Animations',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'title',
      serviceCount: 'services.length',
    },
    prepare(selection) {
      const {title, serviceCount} = selection
      return {
        title: `Services: ${title}`,
        subtitle: `${serviceCount || 0} services`,
      }
    },
  },
}
