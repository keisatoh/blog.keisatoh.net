const HTML_ENTITY_MAP: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&apos;': "'",
  '&nbsp;': ' ',
  '&hellip;': '\u2026',
  '&mdash;': '\u2014',
  '&ndash;': '\u2013',
  '&lsquo;': '\u2018',
  '&rsquo;': '\u2019',
  '&ldquo;': '\u201C',
  '&rdquo;': '\u201D',
};

function decodeHtmlEntities(text: string): string {
  return text.replace(/&[a-zA-Z0-9#]+;/g, (entity) => {
    if (entity in HTML_ENTITY_MAP) {
      return HTML_ENTITY_MAP[entity];
    }
    const numericMatch = entity.match(/&#(\d+);/);
    if (numericMatch) {
      return String.fromCharCode(parseInt(numericMatch[1], 10));
    }
    const hexMatch = entity.match(/&#x([0-9a-fA-F]+);/);
    if (hexMatch) {
      return String.fromCharCode(parseInt(hexMatch[1], 16));
    }
    return entity;
  });
}

function stripHtmlTags(html: string): string {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/p>/gi, ' ')
    .replace(/<\/div>/gi, ' ')
    .replace(/<\/li>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getExcerpt(html: string, excerptLength: number): string {
  const plainText = decodeHtmlEntities(stripHtmlTags(html));
  const excerpt = plainText.slice(0, excerptLength);
  return excerptLength < plainText.length ? excerpt + '\u2026' : excerpt;
}
