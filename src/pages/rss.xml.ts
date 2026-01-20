import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../../config';

export async function GET(context: APIContext) {
  const posts = (await getCollection('posts')).sort(
    (a, b) =>
      new Date(b.data.date).getTime() -
      new Date(a.data.date).getTime()
  );

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      description: post.data.description || '',
      link: `/posts/${post.id.replace(/\.md$/, '')}/`,
    })),
  });
}
