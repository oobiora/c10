import type { Tweet as TweetType } from 'react-tweet/api'
import { TweetInfo, useTweet } from 'react-tweet'
import {
  type TwitterComponents,
  TweetNotFound,
  TweetInReplyTo,
  enrichTweet,
  TweetSkeleton,
  type TweetProps
} from 'react-tweet'
import { TweetText } from "@/components/ui/tweet-text";
import { TweetMedia } from '@/components/ui/tweet-media-alt'
import { TweetHeader } from '@/components/ui/tweet-header'
import { useState } from 'react'

type Props = {
    tweet: TweetType
    components?: TwitterComponents
}

export const TwitterContent = ({ tweet: t }: Props) => {
    const tweet = enrichTweet(t)
    const [showInfo, setShowInfo] = useState(false)

    return (
        <div className="w-full bg-black rounded-xl p-1">
            <div className="max-w-[500px] mx-auto">
                <div className="bg-zinc-950 py-2 px-5 rounded-md relative group">
                    <div>
                        <TweetHeader tweet={tweet} />
                    </div>
                    {tweet.in_reply_to_status_id_str && <TweetInReplyTo tweet={tweet} />}
                    
                    <div className="relative">
                        {/* Media content */}
                        {tweet.mediaDetails?.length ? (
                            <div
                                className={
                                tweet.mediaDetails.length === 1
                                    ? ''
                                    : 'inline-grid grid-cols-2 gap-x-2 gap-y-2'
                                }
                            >
                                {tweet.mediaDetails?.map((media) => (
                                <a key={media.media_url_https} href={tweet.url} target="_blank">
                                    <TweetMedia tweet={tweet} media={media} />
                                </a>
                                ))}
                            </div>
                        ) : null}

                        {/* Overlay with tweet text */}
                        <div 
                            className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-200 flex items-center justify-center p-4
                                ${showInfo ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} 
                                ${!showInfo ? 'group-hover:opacity-100 group-hover:pointer-events-auto' : ''}`}
                        >
                            <TweetText tweet={tweet} />
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                        <TweetInfo tweet={tweet} />
                        <button
                            onClick={() => setShowInfo(!showInfo)}
                            className="text-xs text-zinc-500 hover:text-white transition-colors px-2 py-1 rounded-md hover:bg-zinc-900"
                        >
                            {showInfo ? 'Hide Info' : 'Show Info'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
} 

export const Tweet = ({
    id,
    apiUrl,
    fallback = <TweetSkeleton />,
    components,
    onError,
}: TweetProps) => {
    const { data, error, isLoading } = useTweet(id, apiUrl)
   
    if (isLoading) return fallback
    if (error || !data) {
        const NotFound = components?.TweetNotFound || TweetNotFound
        return <NotFound error={onError ? onError(error) : error} />
    }
   
    return <TwitterContent tweet={data} components={components} />
}