export function getExcerpt(html: string, excerptLength: number): string {
  const plainText = html
    .replace(/<(script|style|pre)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
    .replace(
      /<\/?(?:address|article|aside|blockquote|br|caption|dd|div|dl|dt|fieldset|figcaption|figure|footer|form|h[1-6]|header|hr|li|main|nav|ol|p|section|table|tbody|td|tfoot|th|thead|tr|ul)\b[^>]*>/gi,
      ' ',
    )
    .replace(/<[^>]+>/g, '')
    .replace(/&#x20;/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const excerpt = plainText.slice(0, excerptLength);
  return excerptLength < plainText.length ? `${excerpt}\u2026` : excerpt;
}
