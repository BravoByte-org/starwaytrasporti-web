export default {
  name: 'navigationItem',
  title: 'Navigation Item',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'url',
      title: 'URL',
      type: 'string',
      description: 'Internal path (e.g., /about) or external URL',
    },
    {
      name: 'pageReference',
      title: 'Page Reference',
      type: 'reference',
      to: [{type: 'page'}],
      description: 'Link to an internal page (alternative to URL)',
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon name or SVG code',
      options: {
        list: [
          {title: 'Home', value: 'home'},
          {title: 'Services', value: 'services'},
          {title: 'Locations', value: 'locations'},
          {title: 'About', value: 'about'},
          {title: 'Contact', value: 'contact'},
          {title: 'Arrow Right', value: 'arrow-right'},
          {title: 'External Link', value: 'external-link'},
        ],
      },
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Display order (lower numbers appear first)',
      validation: (Rule) => Rule.min(0),
    },
    {
      name: 'parent',
      title: 'Parent Navigation Item',
      type: 'reference',
      to: [{type: 'navigationItem'}],
      description: 'For creating sub-menus',
    },
    {
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
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
      name: 'placement',
      title: 'Placement',
      type: 'string',
      options: {
        list: [
          {title: 'Header Navigation', value: 'header'},
          {title: 'Footer Links', value: 'footer'},
          {title: 'Footer Legal', value: 'footer-legal'},
          {title: 'Mobile Menu', value: 'mobile'},
          {title: 'Breadcrumb', value: 'breadcrumb'},
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Show this navigation item',
      initialValue: true,
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Internal description for editors',
    },
  ],
  preview: {
    select: {
      title: 'title',
      placement: 'placement',
      locale: 'locale',
      order: 'order',
      active: 'active',
    },
    prepare(selection) {
      const {title, placement, locale, order, active} = selection
      return {
        title: title,
        subtitle: `${placement} (${locale?.toUpperCase()}) - Order: ${order}${!active ? ' (Inactive)' : ''}`,
      }
    },
  },
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: 'Placement & Order',
      name: 'placementOrder',
      by: [
        {field: 'placement', direction: 'asc'},
        {field: 'order', direction: 'asc'},
      ],
    },
  ],
}
