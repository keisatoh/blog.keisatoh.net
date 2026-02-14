import { describe, expect, test } from 'bun:test';
import { getExcerpt } from './index';

describe('getExcerpt', () => {
  test('extracts plain text from HTML', () => {
    const html = '<p>Hello <strong>world</strong>!</p>';
    expect(getExcerpt(html, 100)).toBe('Hello world!');
  });

  test('truncates text and adds ellipsis when exceeding limit', () => {
    const html = '<p>This is a long paragraph that should be truncated.</p>';
    expect(getExcerpt(html, 20)).toBe('This is a long parag\u2026');
  });

  test('does not add ellipsis when text fits within limit', () => {
    const html = '<p>Short text</p>';
    expect(getExcerpt(html, 100)).toBe('Short text');
  });

  test('decodes common HTML entities', () => {
    const html = '<p>&amp; &lt;test&gt; &quot;quoted&quot;</p>';
    expect(getExcerpt(html, 100)).toBe('& <test> "quoted"');
  });

  test('decodes numeric HTML entities', () => {
    const html = '<p>&#65;&#66;&#67;</p>';
    expect(getExcerpt(html, 100)).toBe('ABC');
  });

  test('decodes hex HTML entities', () => {
    const html = '<p>&#x41;&#x42;&#x43;</p>';
    expect(getExcerpt(html, 100)).toBe('ABC');
  });

  test('handles Japanese text with entities', () => {
    const html = '<p>&ldquo;日本語&rdquo;テスト</p>';
    expect(getExcerpt(html, 100)).toBe('\u201C日本語\u201Dテスト');
  });

  test('removes script tags and their content', () => {
    const html = '<p>Before</p><script>alert("xss")</script><p>After</p>';
    expect(getExcerpt(html, 100)).toBe('Before After');
  });

  test('removes style tags and their content', () => {
    const html = '<p>Before</p><style>.foo { color: red; }</style><p>After</p>';
    expect(getExcerpt(html, 100)).toBe('Before After');
  });

  test('converts block elements to spaces', () => {
    const html = '<div>First</div><div>Second</div><p>Third</p>';
    expect(getExcerpt(html, 100)).toBe('First Second Third');
  });

  test('handles list items', () => {
    const html = '<ul><li>One</li><li>Two</li><li>Three</li></ul>';
    expect(getExcerpt(html, 100)).toBe('One Two Three');
  });

  test('handles br tags', () => {
    const html = '<p>Line 1<br/>Line 2<br>Line 3</p>';
    expect(getExcerpt(html, 100)).toBe('Line 1 Line 2 Line 3');
  });

  test('collapses multiple whitespaces', () => {
    const html = '<p>Multiple   spaces   here</p>';
    expect(getExcerpt(html, 100)).toBe('Multiple spaces here');
  });

  test('handles empty input', () => {
    expect(getExcerpt('', 100)).toBe('');
  });

  test('handles input with only HTML tags', () => {
    expect(getExcerpt('<div><span></span></div>', 100)).toBe('');
  });
});
