import { describe, expect, test } from 'bun:test';
import { getExcerpt } from './index';

describe('getExcerpt', () => {
  test('removes Markdown formatting while preserving text', () => {
    const markdown = '# Heading\n\nThis is **important** and [a link](https://example.com).';
    expect(getExcerpt(markdown, 100)).toBe('Heading This is important and a link.');
  });

  test('removes images from the excerpt', () => {
    expect(getExcerpt('![alt text](image.avif) Article text', 100)).toBe('Article text');
  });

  test('removes code blocks from the excerpt', () => {
    const markdown = 'Before\n\n```ts\nconst value = 1;\n```\n\nAfter';
    expect(getExcerpt(markdown, 100)).toBe('Before After');
  });

  test('truncates text and adds an ellipsis when needed', () => {
    expect(getExcerpt('This is a long paragraph.', 10)).toBe('This is a …');
  });

  test('does not add an ellipsis when text fits within the limit', () => {
    expect(getExcerpt('Short text', 100)).toBe('Short text');
  });

  test('normalizes whitespace', () => {
    expect(getExcerpt('First\n\nSecond   Third', 100)).toBe('First Second Third');
  });

  test('handles empty input', () => {
    expect(getExcerpt('', 100)).toBe('');
  });
});
