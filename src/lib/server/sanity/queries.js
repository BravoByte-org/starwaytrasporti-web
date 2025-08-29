// GROQ queries for different content types

// Page queries
export const PAGE_QUERY = `
  *[_type == "page" && slug.current == $slug && locale == $locale][0]{
    _id,
    _rev,
    title,
    slug,
    metaTitle,
    metaDescription,
    locale,
    isHomepage,
    publishedAt,
    status,
    sections[]{
      _type,
      _type == "reference" => @->{
        _id,
        title,
        type,
        content,
        settings,
        locale
      },
      _type != "reference" => {
        ...,
        backgroundImages[]{
          ...,
          asset->
        }
      }
    }
  }
`;

export const HOMEPAGE_QUERY = `
  *[_type == "page" && isHomepage == true && locale == $locale][0]{
    _id,
    _rev,
    title,
    slug,
    metaTitle,
    metaDescription,
    locale,
    publishedAt,
    sections[]{
      _type,
      _type == "reference" => @->{
        _id,
        title,
        type,
        content,
        settings,
        locale
      },
      _type != "reference" => {
        ...,
        backgroundImages[]{
          ...,
          asset->
        },
        services[]{
          ...,
        },
        stats[]{
          ...,
        },
        buttons[]{
          ...,
        }
      }
    }
  }
`;

export const PAGES_LIST_QUERY = `
  *[_type == "page" && locale == $locale] | order(publishedAt desc){
    _id,
    title,
    slug,
    metaTitle,
    metaDescription,
    locale,
    isHomepage,
    publishedAt,
    status
  }
`;

// Navigation queries
export const NAVIGATION_QUERY = `
  *[_type == "navigationItem" && placement == $placement && locale == $locale && active == true] | order(order asc){
    _id,
    title,
    url,
    pageReference->{
      slug,
      title
    },
    icon,
    order,
    openInNewTab,
    parent->{ 
      _id, 
      title 
    }
  }
`;

// Location queries
export const LOCATIONS_QUERY = `
  *[_type == "location" && active == true] | order(name asc){
    _id,
    name,
    slug,
    type,
    address,
    coordinates,
    contact,
    hours[]{
      day,
      open,
      close,
      closed
    },
    services,
    description,
    images[]{
      ...,
      asset->
    },
    featured
  }
`;

export const LOCATION_QUERY = `
  *[_type == "location" && slug.current == $slug && active == true][0]{
    _id,
    name,
    slug,
    type,
    address,
    coordinates,
    contact,
    hours[]{
      day,
      open,
      close,
      closed
    },
    services,
    description,
    images[]{
      ...,
      asset->
    },
    featured
  }
`;

export const FEATURED_LOCATIONS_QUERY = `
  *[_type == "location" && featured == true && active == true] | order(name asc){
    _id,
    name,
    slug,
    type,
    address,
    contact,
    services,
    description,
    images[0]{
      ...,
      asset->
    }
  }
`;

// Testimonial queries
export const TESTIMONIALS_QUERY = `
  *[_type == "testimonial" && locale == $locale] | order(publishedAt desc){
    _id,
    content,
    author{
      name,
      title,
      company,
      avatar{
        ...,
        asset->
      }
    },
    rating,
    serviceType,
    featured,
    publishedAt
  }
`;

export const FEATURED_TESTIMONIALS_QUERY = `
  *[_type == "testimonial" && featured == true && locale == $locale] | order(rating desc, publishedAt desc)[0...6]{
    _id,
    content,
    author{
      name,
      title,
      company,
      avatar{
        ...,
        asset->
      }
    },
    rating,
    serviceType,
    publishedAt
  }
`;

// Section queries
export const SECTION_QUERY = `
  *[_type == "section" && identifier.current == $identifier && locale == $locale][0]{
    _id,
    title,
    type,
    content,
    settings,
    locale
  }
`;

export const SECTIONS_BY_TYPE_QUERY = `
  *[_type == "section" && type == $type && locale == $locale] | order(_createdAt desc){
    _id,
    title,
    type,
    content,
    settings,
    locale
  }
`;

// Search query
export const SEARCH_QUERY = `
  *[_type in ["page", "location", "section"] && 
    (title match $searchTerm + "*" || 
     content[].children[].text match $searchTerm + "*" ||
     description match $searchTerm + "*") &&
    locale == $locale] | order(_score desc)[0...20]{
    _type,
    _id,
    title,
    _type == "page" => {
      slug,
      metaDescription
    },
    _type == "location" => {
      slug,
      description,
      address
    },
    _type == "section" => {
      type,
      content[0].children[0].text
    }
  }
`;

// Preview queries (for draft content)
export const PREVIEW_PAGE_QUERY = `
  *[_type == "page" && _id == $id][0]{
    _id,
    _rev,
    title,
    slug,
    metaTitle,
    metaDescription,
    locale,
    isHomepage,
    publishedAt,
    status,
    sections[]{
      _type,
      _type == "reference" => @->{
        _id,
        title,
        type,
        content,
        settings,
        locale
      },
      _type != "reference" => {
        ...,
        backgroundImages[]{
          ...,
          asset->
        }
      }
    }
  }
`;
