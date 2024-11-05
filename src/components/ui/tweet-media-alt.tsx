import type { MediaDetails } from 'react-tweet/api'
import { type EnrichedTweet, getMediaUrl, getMp4Video } from 'react-tweet'
import BlurImage from '@/lib/blur-image'

export const TweetMedia = ({
  tweet,
  media,
}: {
  tweet: EnrichedTweet
  media: MediaDetails
}) => {
  if (media.type == 'video') {
    return (
      <div className="relative w-full aspect-square">
        <video
          className="rounded-lg bg-black drop-shadow-sm w-full h-full object-contain"
          loop
          autoPlay
          muted
          playsInline
        >
          <source src={getMp4Video(media).url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    )
  }

  if (media.type == 'animated_gif') {
    return (
      <div className="relative w-full aspect-square">
        <video
          className="rounded-lg bg-black drop-shadow-sm w-full h-full object-contain"
          loop
          autoPlay
          muted
          playsInline
        >
          <source src={getMp4Video(media).url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    )
  }

  return (
    <div className="relative w-full aspect-square">
      <BlurImage
        alt={tweet.text}
        src={getMediaUrl(media, 'small')}
        fill
        className="rounded-lg drop-shadow-sm object-contain"
      />
    </div>
  )
}