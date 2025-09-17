export default {
  name: 'mediaAsset',
  title: 'Media Asset',
  type: 'object',
  fields: [
    {
      name: 'asset',
      title: 'Asset',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Important for SEO and accessibility',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'caption',
          title: 'Caption',
          type: 'string',
        },
      ],
    },
    {
      name: 'size',
      title: 'Display Size',
      type: 'string',
      options: {
        list: [
          {title: 'Small', value: 'small'},
          {title: 'Medium', value: 'medium'},
          {title: 'Large', value: 'large'},
          {title: 'Full Width', value: 'full'},
        ],
      },
      initialValue: 'medium',
    },
    {
      name: 'alignment',
      title: 'Alignment',
      type: 'string',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
          {title: 'Right', value: 'right'},
        ],
      },
      initialValue: 'center',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'object',
      fields: [
        {
          name: 'url',
          title: 'URL',
          type: 'url',
        },
        {
          name: 'openInNewTab',
          title: 'Open in New Tab',
          type: 'boolean',
          initialValue: false,
        },
      ],
    },
  ],
  preview: {
    select: {
      media: 'asset',
      title: 'asset.alt',
    },
    prepare(selection) {
      const {media, title} = selection
      return {
        title: title || 'Media Asset',
        media: media,
      }
    },
  },
}
