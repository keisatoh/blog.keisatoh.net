import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL, AUTHOR_NAME } from '../../config';
import type { BlogPostingParams } from '../types';

export function generateBlogPostingSchema(params: BlogPostingParams) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: params.title,
    description: params.description,
    ...(params.image ? { image: params.image } : {}),
    datePublished: params.date,
    author: {
      '@type': 'Person',
      name: AUTHOR_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: AUTHOR_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': params.url,
    },
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  };
}
