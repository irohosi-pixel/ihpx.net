// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import rlc from 'remark-link-card';
import rehypeRaw from 'rehype-raw';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), sitemap(), react()],
  site: 'https://ihpx.net',
  markdown: {
    remarkPlugins: [[rlc, { shortenUrl: true }]],
    rehypePlugins: [
      rehypeRaw,
      [rehypeExternalLinks, { target: '_blank' }],
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'prepend',

          content: {
            type: 'element',

            tagName: 'i',

            properties: {
              className: ['heading-anchor', 'fa-solid', 'fa-link'],
            },

            children: [],
          },
        },
      ],
      ['rehype-toc', { headings: ['h2', 'h3'] }],
    ],
  },
});
