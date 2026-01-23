import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.string(),
      description: z.string().optional(),
      dek: z.string().optional(),
      ogImage: image().optional(),
    }),
});

export const collections = { posts };
