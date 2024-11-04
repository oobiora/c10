'use client';
import { type SanityDocument } from "next-sanity";
import Link from "next/link";
import { urlFor } from "@/lib/utils";
import { useState } from "react";

export function PostNavigator({ initialPosts }: { initialPosts: SanityDocument[] }) {
    const [posts] = useState(initialPosts);
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentPost = posts[currentIndex];

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % posts.length);
    };

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
    };

    const postImageUrl = currentPost.content ? urlFor(currentPost.content)?.url() : null;

    return (
        <div className="border border-zinc-800 rounded-md p-6">
            <div className="flex flex-col gap-6">
                <div className="border border-zinc-800 rounded-lg p-4">
                    <Link href={`/${currentPost.slug.current}`} className="space-y-4">
                        <div>
                            <h2 className="text-xl font-semibold">{currentPost.title}</h2>
                            <p>{new Date(currentPost.publishedAt).toLocaleDateString()}</p>
                        </div>
                        {postImageUrl && (
                            <img
                                src={postImageUrl}
                                alt={currentPost.title}
                                className="w-full rounded-xl object-contain"
                                loading="lazy"
                            />
                        )}
                    </Link>
                </div>
                
                <div className="flex justify-between items-center">
                    <button 
                        onClick={goToPrevious}
                        className="px-4 py-2 border border-zinc-800 rounded-md hover:bg-zinc-900/50 transition-colors"
                    >
                        Previous
                    </button>
                    <span className="text-sm text-zinc-400">
                        {currentIndex + 1} of {posts.length}
                    </span>
                    <button 
                        onClick={goToNext}
                        className="px-4 py-2 border border-zinc-800 rounded-md hover:bg-zinc-900/50 transition-colors"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}