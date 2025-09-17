export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(80),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'metaTitle',
      title: 'Meta Title (SEO)',
      type: 'string',
      validation: (Rule) => Rule.max(60),
    },
    {
      name: 'metaDescription',
      title: 'Meta Description (SEO)',
      type: 'text',
      validation: (Rule) => Rule.max(160),
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
    {
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        {type: 'reference', to: [{type: 'section'}]},
        {type: 'heroSection'},
        {type: 'servicesSection'},
        {type: 'statsSection'},
        {type: 'ctaSection'},
        {type: 'contentSection'},
      ],
    },
    {
      name: 'isHomepage',
      title: 'Is Homepage',
      type: 'boolean',
      description: 'Mark this page as the homepage',
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'Published', value: 'published'},
          {title: 'Scheduled', value: 'scheduled'},
        ],
      },
      initialValue: 'draft',
    },
  ],
  preview: {
    select: {
      title: 'title',
      locale: 'locale',
      status: 'status',
    },
    prepare(selection) {
      const {title, locale, status} = selection
      return {
        title: title,
        subtitle: `${locale?.toUpperCase()} - ${status}`,
      }
    },
  },
  orderings: [
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
    {
      title: 'Published Date, New',
      name: 'publishedDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
}
