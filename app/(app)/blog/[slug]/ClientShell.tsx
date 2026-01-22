'use client';

import dynamic from 'next/dynamic';

const BlogPostClient = dynamic(() => import('./BlogPostClient'), {
  ssr: false,
});

export default function ClientShell({ post }: { post: any }) {
  return <BlogPostClient post={post} />;
}
