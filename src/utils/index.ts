export const getExcerpt = (html: string, excerptLength: number) => {
  const removeHTMLTags = (html: string) => {
    return html
      .replace(/\r?\n/g, ' ')
      .replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
  };
  const plainText = removeHTMLTags(html);

  const excerpt = plainText.slice(0, excerptLength);
  // 抜粋する文字数より本文が長い場合、末尾に3点リーダーをつける
  return excerptLength < plainText.length ? excerpt + '…' : excerpt;
};
