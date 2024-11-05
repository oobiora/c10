import type { MediaDetails } from 'react-tweet/api'
import { type EnrichedTweet, getMediaUrl, getMp4Video } from 'react-tweet'
import BlurImage from '@/lib/blur-image'
import { Volume2, VolumeX } from 'lucide-react'

export const TweetMedia = ({
  tweet,
  media,
  isMuted,
  videoRef,
}: {
  tweet: EnrichedTweet
  media: MediaDetails
  isMuted: boolean
  videoRef: React.RefObject<HTMLVideoElement>
}) => {
  if (media.type === 'video' || media.type === 'animated_gif') {
    return (
      <div className="relative w-full aspect-square">
        <video
          ref={videoRef}
          className="rounded-lg bg-black drop-shadow-sm w-full h-full object-contain"
          loop
          autoPlay
          muted={isMuted}
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

// Separate component for video controls
export const VideoControls = ({ isMuted, toggleMute }: { 
  isMuted: boolean
  toggleMute: () => void 
}) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleMute()
      }}
      className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
      aria-label={isMuted ? "Unmute" : "Mute"}
    >
      {isMuted ? (
        <VolumeX className="w-4 h-4 text-white" />
      ) : (
        <Volume2 className="w-4 h-4 text-white" />
      )}
    </button>
  )
}