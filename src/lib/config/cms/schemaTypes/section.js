export default {
  name: 'section',
  title: 'Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'identifier',
      title: 'Identifier',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description: 'Unique identifier for this section',
    },
    {
      name: 'type',
      title: 'Section Type',
      type: 'string',
      options: {
        list: [
          {title: 'Hero Section', value: 'hero'},
          {title: 'Services Section', value: 'services'},
          {title: 'Stats Section', value: 'stats'},
          {title: 'CTA Section', value: 'cta'},
          {title: 'Content Section', value: 'content'},
          {title: 'Testimonials Section', value: 'testimonials'},
          {title: 'Locations Section', value: 'locations'},
          {title: 'Contact Section', value: 'contact'},
        ],
      },
      validation: (Rule) => Rule.required(),
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
            {title: 'Quote', value: 'blockquote'},
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
                  },
                ],
              },
            ],
          },
        },
        {type: 'mediaAsset'},
      ],
    },
    {
      name: 'settings',
      title: 'Section Settings',
      type: 'object',
      fields: [
        {
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'string',
          options: {
            list: [
              {title: 'White', value: 'white'},
              {title: 'Gray Light', value: 'gray-light'},
              {title: 'Gray Dark', value: 'gray-dark'},
              {title: 'Blue', value: 'blue'},
              {title: 'Gradient', value: 'gradient'},
            ],
          },
        },
        {
          name: 'padding',
          title: 'Padding',
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
        {
          name: 'enableAnimations',
          title: 'Enable Animations',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'fullWidth',
          title: 'Full Width',
          type: 'boolean',
          initialValue: false,
        },
      ],
    },
    {
      name: 'locale',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          {title: 'English', value: 'en'},
          {title: 'Italiano', value: 'it'},
        ],
      },
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      locale: 'locale',
    },
    prepare(selection) {
      const {title, type, locale} = selection
      return {
        title: title,
        subtitle: `${type} - ${locale?.toUpperCase()}`,
      }
    },
  },
}
