import { describe, expect, test } from 'bun:test';
import { generateBlogPostingSchema, generateWebSiteSchema } from './jsonld';

describe('generateBlogPostingSchema', () => {
  test('generates valid BlogPosting schema', () => {
    const result = generateBlogPostingSchema({
      title: 'Test Post',
      description: 'A test description',
      date: '2024-01-15',
      url: 'https://blog.keisatoh.net/posts/test-post',
    });

    expect(result['@context']).toBe('https://schema.org');
    expect(result['@type']).toBe('BlogPosting');
    expect(result.headline).toBe('Test Post');
    expect(result.description).toBe('A test description');
    expect(result.datePublished).toBe('2024-01-15');
    expect(result.author).toEqual({
      '@type': 'Person',
      name: 'keisatoh',
      url: 'https://blog.keisatoh.net',
    });
    expect(result.publisher).toEqual({
      '@type': 'Person',
      name: 'keisatoh',
      url: 'https://blog.keisatoh.net',
    });
    expect(result.mainEntityOfPage).toEqual({
      '@type': 'WebPage',
      '@id': 'https://blog.keisatoh.net/posts/test-post',
    });
  });

  test('includes image when provided', () => {
    const result = generateBlogPostingSchema({
      title: 'Test Post',
      description: 'A test description',
      date: '2024-01-15',
      url: 'https://blog.keisatoh.net/posts/test-post',
      image: 'https://blog.keisatoh.net/og/test-post.png',
    });

    expect(result.image).toBe('https://blog.keisatoh.net/og/test-post.png');
  });

  test('excludes image when not provided', () => {
    const result = generateBlogPostingSchema({
      title: 'Test Post',
      description: 'A test description',
      date: '2024-01-15',
      url: 'https://blog.keisatoh.net/posts/test-post',
    });

    expect(result).not.toHaveProperty('image');
  });
});

describe('generateWebSiteSchema', () => {
  test('generates valid WebSite schema', () => {
    const result = generateWebSiteSchema();

    expect(result['@context']).toBe('https://schema.org');
    expect(result['@type']).toBe('WebSite');
    expect(result.name).toBe('blog.keisatoh.net');
    expect(result.description).toBe('keisatohのブログ');
    expect(result.url).toBe('https://blog.keisatoh.net');
  });
});
