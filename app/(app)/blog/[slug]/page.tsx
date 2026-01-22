import { blogPosts } from '../blogData';
import dynamic from 'next/dynamic';

const BlogPostClient = dynamic(() => import('./BlogPostClient'), {
  ssr: false,
});

import { oswald } from '@/app/(app)/fonts';
import { Suspense } from 'react';

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
      <div className={`${oswald.className} min-h-screen flex items-center justify-center text-2xl font-bold text-red-600`}>
        404 - Post not found
      </div>
    );
  }

  return <BlogPostClient post={post} />;
}
