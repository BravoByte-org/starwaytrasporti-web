export default {
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Hero Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    },
    {
      name: 'subtitle',
      title: 'Hero Subtitle',
      type: 'text',
      validation: (Rule) => Rule.max(200),
    },
    {
      name: 'ctaButton',
      title: 'CTA Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'url',
          title: 'Button URL',
          type: 'string',
        },
        {
          name: 'style',
          title: 'Button Style',
          type: 'string',
          options: {
            list: [
              {title: 'Primary', value: 'primary'},
              {title: 'Secondary', value: 'secondary'},
              {title: 'Outline', value: 'outline'},
            ],
          },
          initialValue: 'primary',
        },
      ],
    },
    {
      name: 'backgroundImages',
      title: 'Background Images (Parallax Layers)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'layer',
              title: 'Parallax Layer',
              type: 'string',
              options: {
                list: [
                  {title: 'Background (Slowest)', value: 'bg-1'},
                  {title: 'Middle Layer', value: 'bg-2'},
                  {title: 'Foreground (Fastest)', value: 'bg-3'},
                ],
              },
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(3),
    },
    {
      name: 'enableParallax',
      title: 'Enable Parallax Effect',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'showScrollIndicator',
      title: 'Show Scroll Indicator',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'variant',
      title: 'Hero Variant',
      type: 'string',
      options: {
        list: [
          {title: 'Default', value: 'default'},
          {title: 'Compact', value: 'compact'},
          {title: 'Full Screen', value: 'fullscreen'},
        ],
      },
      initialValue: 'default',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: `Hero: ${title}`,
        subtitle: subtitle,
      }
    },
  },
}
