import { blogPosts } from '../blogData';
import BlogPostClient from './BlogPostClient';
import { oswald } from '@/app/fonts';

export const dynamicParams = false;

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        id: post.slug,
    }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }>; }) {
    
    const { id } = await params;

    const post = blogPosts.find((p) => p.slug === id);

    if (!post) {
        return (
            <div className={`${oswald.className} min-h-screen flex items-center justify-center text-2xl font-bold text-red-600 dark:text-red-400`}>
                404 - Post not found
            </div>
        );
    }

    return <BlogPostClient post={post} />;
}