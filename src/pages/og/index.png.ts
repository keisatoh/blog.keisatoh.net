import type { APIRoute } from 'astro';
import { generateOgImage } from '../../utils/ogImage';
import { SITE_TITLE, SITE_DESCRIPTION } from '../../../config';

export const GET: APIRoute = async () => {
  const png = await generateOgImage(SITE_TITLE);

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
