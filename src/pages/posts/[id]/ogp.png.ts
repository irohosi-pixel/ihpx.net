import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { getOgpImage } from '../../../components/OgpImage';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { id: post.id },
    props: { post },
  }));
}

export async function GET({ props }: APIContext) {
  const post: Post = props.post;
  if (post.data.image !== undefined) {
    return new Response(null, { status: 404 });
  }
  return new Response(await getOgpImage(post.data.title));
}
