export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'content',
      title: 'Testimonial Content',
      type: 'text',
      validation: (Rule) => Rule.required().max(500),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Full Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'title',
          title: 'Job Title',
          type: 'string',
        },
        {
          name: 'company',
          title: 'Company',
          type: 'string',
        },
        {
          name: 'avatar',
          title: 'Avatar',
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
          ],
        },
      ],
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
      description: 'Rating from 1 to 5 stars',
    },
    {
      name: 'serviceType',
      title: 'Service Type',
      type: 'string',
      options: {
        list: [
          {title: 'National Transport', value: 'national'},
          {title: 'International Logistics', value: 'international'},
          {title: 'Express Delivery', value: 'express'},
          {title: 'General', value: 'general'},
        ],
      },
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this testimonial in featured sections',
      initialValue: false,
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
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
  preview: {
    select: {
      title: 'author.name',
      subtitle: 'author.company',
      media: 'author.avatar',
      content: 'content',
      rating: 'rating',
    },
    prepare(selection) {
      const {title, subtitle, media, content, rating} = selection
      const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating)
      return {
        title: title || 'Anonymous',
        subtitle: `${stars} ${subtitle || ''} - ${content?.substring(0, 50)}...`,
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'Rating, Highest',
      name: 'ratingDesc',
      by: [
        {field: 'rating', direction: 'desc'},
        {field: 'publishedAt', direction: 'desc'},
      ],
    },
    {
      title: 'Published Date, New',
      name: 'publishedDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
}
