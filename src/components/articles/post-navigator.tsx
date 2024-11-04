'use client';
import { type SanityDocument } from "next-sanity";
import { urlFor } from "@/lib/utils";
import { useState } from "react";
import Image from 'next/image';
import { Tweet } from 'react-tweet';

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

    const renderContent = () => {
        if (!currentPost.content) return null;

        if (currentPost.content.contentType === 'image' && currentPost.content.image) {
            const imageUrl = urlFor(currentPost.content.image)?.url();
            return imageUrl ? (
                <div className="max-h-[500px] flex items-center justify-center">
                    <Image
                        src={imageUrl}
                        alt={currentPost.title}
                        width={800}
                        height={600}
                        className="max-h-full w-auto object-contain rounded-xl"
                        priority={false}
                    />
                </div>
            ) : null;
        }

        if (currentPost.content.contentType === 'tweet' && currentPost.content.tweetId) {
            return (
                <div className="flex justify-center w-full max-w-[550px] mx-auto">
                    <Tweet id={currentPost.content.tweetId} />
                </div>
            );
        }

        return null;
    };

    return (
        <div className="border border-zinc-800 rounded-md p-4 max-w-3xl mx-auto">
            <div className="flex flex-col gap-4">
                <div className="border border-zinc-800 rounded-lg p-4">
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">{currentPost.title}</h2>
                        <p className="text-zinc-400 text-sm">
                            {new Date(currentPost.publishedAt).toLocaleDateString()}
                        </p>
                    </div>
                    
                    <div className="my-4">
                        {renderContent()}
                    </div>

                    {currentPost.prompt && (
                        <div className="mt-4 p-3 bg-zinc-900/50 rounded-lg">
                            <p className="text-zinc-200">
                                <span className="font-semibold">Discussion prompt: </span>
                                {currentPost.prompt}
                            </p>
                        </div>
                    )}
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