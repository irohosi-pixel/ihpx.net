import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import removeMd from 'remove-markdown';

export async function GET(context: { site: any }) {
  const allPosts = (await getCollection('blog'))
    .filter((post) => !post.data.ignore)
    .sort((a, b) => {
      const aDate = new Date(a.data.pubDate);
      const bDate = new Date(b.data.pubDate);
      return bDate.getTime() - aDate.getTime();
    });
  return rss({
    title: "ブログ | 色星ぴくせる's Site",
    description: '色星ぴくせるのブログの投稿一覧',
    site: context.site,
    trailingSlash: false,
    items: allPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description:
        post.data.description ||
        removeMd(post.body!).substring(0, 100) + (removeMd(post.body!).length > 100 ? '...' : ''),
      link: `/posts/${post.id}/`,
    })),
    customData: `<language>ja-jp</language>`,
  });
}
