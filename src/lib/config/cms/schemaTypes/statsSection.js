export default {
  name: 'statsSection',
  title: 'Stats Section',
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
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'value',
              title: 'Stat Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'e.g., 500+, 10K+, 98%, 24/7',
            },
            {
              name: 'label',
              title: 'Stat Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'e.g., Active Clients, Deliveries per Month',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              description: 'Optional additional context',
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  {title: 'Users', value: 'users'},
                  {title: 'Truck', value: 'truck'},
                  {title: 'Clock', value: 'clock'},
                  {title: 'Shield', value: 'shield'},
                  {title: 'Star', value: 'star'},
                  {title: 'Heart', value: 'heart'},
                ],
              },
            },
            {
              name: 'animationType',
              title: 'Animation Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Count Up', value: 'countup'},
                  {title: 'Fade In', value: 'fadein'},
                  {title: 'Slide Up', value: 'slideup'},
                ],
              },
              initialValue: 'fadein',
            },
          ],
          preview: {
            select: {
              value: 'value',
              label: 'label',
            },
            prepare(selection) {
              const {value, label} = selection
              return {
                title: `${value} ${label}`,
                subtitle: label,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(6),
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          {title: 'Blue', value: 'blue'},
          {title: 'Dark', value: 'dark'},
          {title: 'Gradient', value: 'gradient'},
        ],
      },
      initialValue: 'blue',
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Horizontal', value: 'horizontal'},
          {title: 'Vertical', value: 'vertical'},
        ],
      },
      initialValue: 'horizontal',
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
      statCount: 'stats.length',
    },
    prepare(selection) {
      const {title, statCount} = selection
      return {
        title: `Stats: ${title}`,
        subtitle: `${statCount || 0} statistics`,
      }
    },
  },
}
