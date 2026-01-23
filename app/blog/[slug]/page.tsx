import { blogPosts } from '../blogData';
import BlogPostClient from './BlogPostClient';
import { oswald } from '@/app/fonts';
import { Suspense } from 'react';

export function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({
    params,
}: {
    params: { slug: string };
}) {
    const resolvedParams = await params;
    const post = blogPosts.find((p) => p.slug === resolvedParams.slug);

    if (!post) {
        return (
            <div className={`${oswald.className} min-h-screen flex items-center justify-center text-2xl font-bold text-red-600 dark:text-red-400`}>
                404 - Post not found
            </div>
        );
    }

    return (
        <Suspense fallback={<div className={`${oswald.className} min-h-screen flex flex-col justify-center items-center`}>
            <p className={`${oswald.className} text-xl dark:text-white text-black`}>Loading...</p>
        </div>}>
            <BlogPostClient post={post} />
        </Suspense>
    );
}