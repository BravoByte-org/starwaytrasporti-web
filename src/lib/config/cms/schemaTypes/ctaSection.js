export default {
  name: 'ctaSection',
  title: 'CTA Section',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'CTA Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'CTA Subtitle',
      type: 'text',
    },
    {
      name: 'buttons',
      title: 'CTA Buttons',
      type: 'array',
      of: [
        {
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
              validation: (Rule) => Rule.required(),
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
            {
              name: 'openInNewTab',
              title: 'Open in New Tab',
              type: 'boolean',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              text: 'text',
              style: 'style',
            },
            prepare(selection) {
              const {text, style} = selection
              return {
                title: text,
                subtitle: `${style} button`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(3),
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
          {title: 'White', value: 'white'},
        ],
      },
      initialValue: 'blue',
    },
    {
      name: 'variant',
      title: 'CTA Variant',
      type: 'string',
      options: {
        list: [
          {title: 'Center Aligned', value: 'center'},
          {title: 'Split Layout', value: 'split'},
          {title: 'Banner Style', value: 'banner'},
        ],
      },
      initialValue: 'center',
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
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
      buttonCount: 'buttons.length',
      variant: 'variant',
    },
    prepare(selection) {
      const {title, buttonCount, variant} = selection
      return {
        title: `CTA: ${title}`,
        subtitle: `${buttonCount || 0} buttons - ${variant}`,
      }
    },
  },
}
