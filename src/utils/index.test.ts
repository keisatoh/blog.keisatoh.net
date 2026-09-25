import { describe, expect, test } from 'bun:test';
import { getExcerpt } from './index';

describe('getExcerpt', () => {
  test('removes HTML formatting while preserving text', () => {
    const html =
      '<h1>Heading</h1><p>This is <strong>important</strong> and <a href="https://example.com">a link</a>.</p>';
    expect(getExcerpt(html, 100)).toBe('Heading This is important and a link.');
  });

  test('removes images from the excerpt', () => {
    expect(getExcerpt('<p><img src="image.avif" alt="alt text"> Article text</p>', 100)).toBe(
      'Article text',
    );
  });

  test('removes code blocks from the excerpt', () => {
    const html = '<p>Before</p><pre><code>const value = 1;</code></pre><p>After</p>';
    expect(getExcerpt(html, 100)).toBe('Before After');
  });

  test('preserves text inside HTML elements', () => {
    const html = '<div>First <span>Second</span></div><p>Third</p>';
    expect(getExcerpt(html, 100)).toBe('First Second Third');
  });

  test('removes scripts and styles from the excerpt', () => {
    const html =
      '<p>Before</p><script>alert("xss")</script><style>.hidden { display: none; }</style><p>After</p>';
    expect(getExcerpt(html, 100)).toBe('Before After');
  });

  test('truncates text and adds an ellipsis when needed', () => {
    expect(getExcerpt('This is a long paragraph.', 10)).toBe('This is a …');
  });

  test('does not add an ellipsis when text fits within the limit', () => {
    expect(getExcerpt('<p>Short text</p>', 100)).toBe('Short text');
  });

  test('normalizes whitespace', () => {
    expect(getExcerpt('<p>First</p>\n\n<p>Second   Third</p>', 100)).toBe('First Second Third');
  });

  test('handles empty input', () => {
    expect(getExcerpt('', 100)).toBe('');
  });
});
