export default {
  name: 'location',
  title: 'Location',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Location Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'type',
      title: 'Location Type',
      type: 'string',
      options: {
        list: [
          {title: 'Headquarters', value: 'headquarters'},
          {title: 'Branch Office', value: 'branch'},
          {title: 'Warehouse', value: 'warehouse'},
          {title: 'Service Point', value: 'service'},
          {title: 'Partner Location', value: 'partner'},
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        {
          name: 'street',
          title: 'Street Address',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'city',
          title: 'City',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'province',
          title: 'Province/State',
          type: 'string',
        },
        {
          name: 'postalCode',
          title: 'Postal Code',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'country',
          title: 'Country',
          type: 'string',
          validation: (Rule) => Rule.required(),
          initialValue: 'Italy',
        },
      ],
    },
    {
      name: 'coordinates',
      title: 'Geographic Coordinates',
      type: 'object',
      fields: [
        {
          name: 'latitude',
          title: 'Latitude',
          type: 'number',
          validation: (Rule) => Rule.min(-90).max(90),
        },
        {
          name: 'longitude',
          title: 'Longitude',
          type: 'number',
          validation: (Rule) => Rule.min(-180).max(180),
        },
      ],
    },
    {
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
        },
        {
          name: 'email',
          title: 'Email Address',
          type: 'email',
        },
        {
          name: 'website',
          title: 'Website',
          type: 'url',
        },
      ],
    },
    {
      name: 'hours',
      title: 'Operating Hours',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'day',
              title: 'Day',
              type: 'string',
              options: {
                list: [
                  {title: 'Monday', value: 'monday'},
                  {title: 'Tuesday', value: 'tuesday'},
                  {title: 'Wednesday', value: 'wednesday'},
                  {title: 'Thursday', value: 'thursday'},
                  {title: 'Friday', value: 'friday'},
                  {title: 'Saturday', value: 'saturday'},
                  {title: 'Sunday', value: 'sunday'},
                ],
              },
            },
            {
              name: 'open',
              title: 'Opening Time',
              type: 'string',
              description: 'Format: HH:MM (e.g., 09:00)',
            },
            {
              name: 'close',
              title: 'Closing Time',
              type: 'string',
              description: 'Format: HH:MM (e.g., 17:30)',
            },
            {
              name: 'closed',
              title: 'Closed',
              type: 'boolean',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              day: 'day',
              open: 'open',
              close: 'close',
              closed: 'closed',
            },
            prepare(selection) {
              const {day, open, close, closed} = selection
              return {
                title: day?.charAt(0).toUpperCase() + day?.slice(1),
                subtitle: closed ? 'Closed' : `${open} - ${close}`,
              }
            },
          },
        },
      ],
    },
    {
      name: 'services',
      title: 'Available Services',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              {title: 'National Transport', value: 'national'},
              {title: 'International Logistics', value: 'international'},
              {title: 'Express Delivery', value: 'express'},
              {title: 'Warehousing', value: 'warehousing'},
              {title: 'Customs Clearance', value: 'customs'},
              {title: 'Customer Service', value: 'customer-service'},
            ],
          },
        },
      ],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description of this location',
    },
    {
      name: 'images',
      title: 'Location Images',
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
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'featured',
      title: 'Featured Location',
      type: 'boolean',
      description: 'Show this location prominently on the locations page',
      initialValue: false,
    },
    {
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Is this location currently active?',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'address.city',
      type: 'type',
      active: 'active',
    },
    prepare(selection) {
      const {title, subtitle, type, active} = selection
      return {
        title: title,
        subtitle: `${type} in ${subtitle}${!active ? ' (Inactive)' : ''}`,
      }
    },
  },
  orderings: [
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
    {
      title: 'Type',
      name: 'typeAsc',
      by: [
        {field: 'type', direction: 'asc'},
        {field: 'name', direction: 'asc'},
      ],
    },
  ],
}
