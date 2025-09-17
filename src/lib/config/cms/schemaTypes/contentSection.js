export default {
  name: 'contentSection',
  title: 'Content Section',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                  {
                    title: 'Open in new tab',
                    name: 'blank',
                    type: 'boolean',
                  },
                ],
              },
            ],
          },
        },
        {type: 'mediaAsset'},
        {
          type: 'object',
          name: 'ctaBlock',
          title: 'Call to Action Block',
          fields: [
            {
              name: 'title',
              title: 'CTA Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'CTA Description',
              type: 'text',
            },
            {
              name: 'button',
              title: 'CTA Button',
              type: 'object',
              fields: [
                {
                  name: 'text',
                  title: 'Button Text',
                  type: 'string',
                },
                {
                  name: 'url',
                  title: 'Button URL',
                  type: 'string',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Single Column', value: 'single'},
          {title: 'Two Columns', value: 'two-column'},
          {title: 'Sidebar', value: 'sidebar'},
        ],
      },
      initialValue: 'single',
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          {title: 'White', value: 'white'},
          {title: 'Gray Light', value: 'gray-light'},
          {title: 'Gray Dark', value: 'gray-dark'},
        ],
      },
      initialValue: 'white',
    },
    {
      name: 'padding',
      title: 'Section Padding',
      type: 'string',
      options: {
        list: [
          {title: 'Small', value: 'small'},
          {title: 'Medium', value: 'medium'},
          {title: 'Large', value: 'large'},
        ],
      },
      initialValue: 'medium',
    },
  ],
  preview: {
    select: {
      title: 'title',
      content: 'content',
    },
    prepare(selection) {
      const {title, content} = selection
      // Get first text block for preview
      const block = (content || []).find((item) => item._type === 'block')
      const subtitle = block?.children?.[0]?.text || 'Content section'

      return {
        title: title || 'Content Section',
        subtitle: subtitle.substring(0, 60) + (subtitle.length > 60 ? '...' : ''),
      }
    },
  },
}
