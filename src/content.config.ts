// Import the glob loader
import { glob } from 'astro/loaders';
// Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';
// Define a `loader` and `schema` for each collection
const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/blog' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    updDate: z.optional(z.date()),
    description: z.optional(z.string()),
    author: z.string(),
    image: z.optional(
      z.object({
        url: z.string(),
        alt: z.string(),
      }),
    ),
    category: z.optional(z.string()),
    tags: z.optional(z.array(z.string())),
    ignore: z.optional(z.boolean()),
  }),
});
// Export a single `collections` object to register your collection(s)
export const collections = { blog };
