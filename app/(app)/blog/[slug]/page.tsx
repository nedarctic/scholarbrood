import { blogPosts } from '../blogData';
import ClientShell from './ClientShell';
import { oswald } from '@/app/(app)/fonts';

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return (
      <div
        className={`${oswald.className} min-h-screen flex items-center justify-center text-2xl font-bold text-red-600`}
      >
        404 – Post not found
      </div>
    );
  }

  return <ClientShell post={post} />;
}
