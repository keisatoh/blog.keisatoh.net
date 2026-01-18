import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE_TITLE, SITE_DESCRIPTION } from '../../config';

interface Post {
  frontmatter: {
    title: string;
    date: string;
    description: string;
  };
  url: string;
}

export async function GET(context: APIContext) {
  const posts = Object.values(
    import.meta.glob<Post>('./posts/*.md', { eager: true })
  );

  const sortedPosts = posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site!,
    items: sortedPosts.map((post) => ({
      title: post.frontmatter.title,
      pubDate: new Date(post.frontmatter.date),
      description: post.frontmatter.description,
      link: post.url,
    })),
  });
}
