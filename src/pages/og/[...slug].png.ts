import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { generateOgImage } from '../../utils/ogImage';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('posts');
  return posts.map((post) => ({
    params: { slug: post.id.replace(/\.md$/, '') },
    props: { title: post.data.title, date: post.data.date },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const { title, date } = props as { title: string; date: string };
  const png = await generateOgImage(title, date);

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
