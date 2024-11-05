'use client';
import { type SanityDocument } from "next-sanity";
import { urlFor } from "@/lib/utils";
import { useState, useEffect } from "react";
import Image from 'next/image';
import { Tweet } from '@/components/ui/twitter-content';

interface Statistics {
    option1Count: number;
    option2Count: number;
    total: number;
}

function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export function PostNavigator({ initialPosts }: { initialPosts: SanityDocument[] }) {
    const [posts, setPosts] = useState(initialPosts);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    
    // Load more posts when reaching near the end
    useEffect(() => {
        const loadMorePosts = async () => {
            if (currentIndex > posts.length - 5 && hasMore && !isLoading) {
                setIsLoading(true);
                try {
                    const lastPost = posts[posts.length - 1];
                    const response = await fetch(`/api/posts?cursor=${lastPost.publishedAt}`);
                    const newPosts = await response.json();
                    
                    if (newPosts.length === 0) {
                        setHasMore(false);
                    } else {
                        setPosts(current => [...current, ...shuffleArray(newPosts)] as SanityDocument[]);
                    }
                } catch (error) {
                    console.error('Error loading more posts:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        loadMorePosts();
    }, [currentIndex, hasMore, isLoading, posts]);

    // Initial shuffle
    useEffect(() => {
        if (initialPosts.length > 0) {
            setPosts(shuffleArray(initialPosts));
        }
    }, [initialPosts]);

    const [hoveredResponse, setHoveredResponse] = useState<'option1' | 'option2' | null>(null);
    const [selectedResponses, setSelectedResponses] = useState<Record<string, number>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [statistics, setStatistics] = useState<Record<string, Statistics>>({});
    const currentPost = posts[currentIndex];

    useEffect(() => {
        // Fetch statistics for current post
        const fetchStatistics = async () => {
            try {
                const response = await fetch(`/api/post-response?postId=${currentPost._id}`);
                if (!response.ok) throw new Error('Failed to fetch statistics');
                const data = await response.json();
                if (data.success) {
                    setStatistics(prev => ({
                        ...prev,
                        [currentPost._id]: data.statistics
                    }));
                }
            } catch (error) {
                console.error('Error fetching statistics:', error);
            }
        };

        if (currentPost._id && !statistics[currentPost._id]) {
            fetchStatistics();
        }
    }, [currentPost._id, statistics]);

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % posts.length);
        setHoveredResponse(null);
        setError(null);
    };

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
        setHoveredResponse(null);
        setError(null);
    };

    const renderContent = () => {
        if (!currentPost.content) return null;

        if (currentPost.content.contentType === 'image' && currentPost.content.image) {
            const imageUrl = urlFor(currentPost.content.image)?.url();
            return imageUrl ? (
                <div className="relative h-[500px] w-full bg-zinc-950/30 rounded-xl">
                    <Image
                        src={imageUrl}
                        alt={currentPost.title}
                        fill
                        className="object-contain p-4"
                        sizes="(max-width: 768px) 100vw, 800px"
                        priority={false}
                    />
                </div>
            ) : null;
        }

        if (currentPost.content.contentType === 'tweet' && currentPost.content.tweetId) {
            return (
                <div className="flex justify-center w-full">
                    <Tweet 
                        id={currentPost.content.tweetId}
                        onError={(error) => {
                            console.error('Error loading tweet:', error);
                        }}
                        fallback={
                            <div className="h-[100px] flex items-center justify-center text-zinc-500">
                                Loading tweet...
                            </div>
                        }
                    />
                </div>
            );
        }

        return null;
    };

    const handleResponseClick = async (optionNumber: 1 | 2) => {
        if (isSubmitting || selectedResponses[currentPost._id]) return;

        setIsSubmitting(true);
        setError(null);
        
        try {
            const response = await fetch('/api/post-response', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    postId: currentPost._id,
                    optionChosen: optionNumber,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to submit response');
            }

            setSelectedResponses(prev => ({
                ...prev,
                [currentPost._id]: optionNumber
            }));

            if (data.statistics) {
                setStatistics(prev => ({
                    ...prev,
                    [currentPost._id]: data.statistics
                }));
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to submit response');
            console.error('Error submitting response:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderResponses = () => {
        if (!currentPost.responses?.option1 || !currentPost.responses?.option2) return null;

        const hasResponded = selectedResponses[currentPost._id];
        const stats = statistics[currentPost._id];

        return (
            <div className="mt-6 space-y-4">
                {error && (
                    <div className="p-3 bg-red-900/50 border border-red-800 rounded-lg">
                        <p className="text-red-200 text-sm">{error}</p>
                    </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                    <div 
                        className="relative"
                        onMouseEnter={() => setHoveredResponse('option1')}
                        onMouseLeave={() => setHoveredResponse(null)}
                    >
                        <button 
                            onClick={() => handleResponseClick(1)}
                            disabled={isSubmitting || !!hasResponded}
                            className={`w-full px-4 py-3 border border-zinc-800 rounded-md transition-colors ${
                                !!hasResponded ? 'bg-zinc-800' : 'hover:bg-zinc-900/50'
                            } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {currentPost.responses.option1.text}
                        </button>
                        {hoveredResponse === 'option1' && (
                            <div className="absolute top-full mt-2 p-3 bg-zinc-900 border border-zinc-800 rounded-md w-full z-10">
                                <p className="text-sm text-zinc-300">
                                    {currentPost.responses.option1.explanation}
                                </p>
                            </div>
                        )}
                    </div>
                    <div 
                        className="relative"
                        onMouseEnter={() => setHoveredResponse('option2')}
                        onMouseLeave={() => setHoveredResponse(null)}
                    >
                        <button 
                            onClick={() => handleResponseClick(2)}
                            disabled={isSubmitting || Boolean(hasResponded)}
                            className={`w-full px-4 py-3 border border-zinc-800 rounded-md transition-colors ${
                                Boolean(hasResponded) ? 'bg-zinc-800' : 'hover:bg-zinc-900/50'
                            } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {currentPost.responses.option2.text}
                        </button>
                        {hoveredResponse === 'option2' && (
                            <div className="absolute top-full mt-2 p-3 bg-zinc-900 border border-zinc-800 rounded-md w-full z-10">
                                <p className="text-sm text-zinc-300">
                                    {currentPost.responses.option2.explanation}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                {(hasResponded && stats) && (
                    <div className="mt-4 p-3 bg-zinc-900/50 rounded-lg">
                        <p className="text-sm text-zinc-300">
                            Results: Option 1: {stats.option1Count} ({Math.round(stats.option1Count/stats.total * 100)}%) | 
                            Option 2: {stats.option2Count} ({Math.round(stats.option2Count/stats.total * 100)}%)
                        </p>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="border border-zinc-800 rounded-md p-4 max-w-3xl mx-auto">
            <div className="flex flex-col gap-4">
                <div className="rounded-lg p-4">
                    <div className="mb-4 text-left">
                        <h2 className="text-md font-medium">{currentPost.title}</h2>
                        <p className="text-zinc-400 text-xs">
                            {new Date(currentPost.publishedAt).toLocaleDateString()}
                        </p>
                    </div>
                    
                    <div className="my-4">
                        {renderContent()}
                    </div>

                    {currentPost.prompt && (
                        <div className="text-left px-3 bg-black rounded-lg">
                            <p className="text-zinc-200 text-sm">
                                <span className="font-semibold">Discussion prompt: </span>
                                {currentPost.prompt}
                            </p>
                        </div>
                    )}

                    {renderResponses()}
                </div>
                
                <div className="flex justify-between items-center">
                    <button 
                        onClick={goToPrevious}
                        className="px-4 py-2 border border-zinc-800 rounded-md hover:bg-zinc-900/50 transition-colors"
                    >
                        Previous
                    </button>
                    {/* <span className="text-sm text-zinc-400">
                        {currentIndex + 1} of {posts.length}
                    </span> */}
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