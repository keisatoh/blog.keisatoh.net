import { remark } from 'remark';
import stripMarkdown from 'strip-markdown';

const markdownToText = remark().use(stripMarkdown, {
  remove: [['image', () => []]],
});

export function getExcerpt(markdown: string, excerptLength: number): string {
  const plainText = String(markdownToText.processSync(markdown))
    .replace(/&#x20;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const excerpt = plainText.slice(0, excerptLength);
  return excerptLength < plainText.length ? `${excerpt}\u2026` : excerpt;
}
