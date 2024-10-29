'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRef } from 'react';
import C10Logo from '@/assets/C10Logo.json'
import Image from 'next/image';
import { LottieRefCurrentProps } from "lottie-react";
import dynamic from 'next/dynamic'

const images = ['/face1.svg', '/face2.svg', '/face3.svg']
const DISPLAY_TIME = 5000 // Time each image is fully visible
const FADE_DURATION = 1000 // Duration of fade transition

// Add this utility function at the top of the file
const isBrowser = () => typeof window !== 'undefined'

// Dynamically import Lottie with SSR disabled
const LottieComponent = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => <div className="w-full h-24" />
});

export function SplashPage() {
  const [email, setEmail] = useState('')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [nextImageIndex, setNextImageIndex] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const lottieRef = useRef<LottieRefCurrentProps>(null)

  useEffect(() => {
    const transitionImages = () => {
      // Start fade transition
      setIsTransitioning(true)

      // After fade completes, update indices and reset transition state
      setTimeout(() => {
        setCurrentImageIndex(nextImageIndex)
        setNextImageIndex((nextImageIndex + 1) % images.length)
        setIsTransitioning(false)
      }, FADE_DURATION)
    }

    // Initial delay to show first image
    const initialTimeout = setTimeout(() => {
      transitionImages()
      
      // Start the regular interval after first transition
      const intervalId = setInterval(transitionImages, DISPLAY_TIME)
      
      return () => clearInterval(intervalId)
    }, DISPLAY_TIME)

    // Cleanup initial timeout if component unmounts before first transition
    return () => clearTimeout(initialTimeout)
  }, [nextImageIndex])

  useEffect(() => {
    // Only run animations if we're in the browser and lottieRef is available
    if (!isBrowser() || !lottieRef.current) return;
    
    if (isHovered) {
      lottieRef.current.setDirection(1);
      lottieRef.current.setSpeed(1.8);
      lottieRef.current.play();
    } else {
      lottieRef.current.setDirection(-1);
      lottieRef.current.setSpeed(1.8);
      lottieRef.current.play();
    }
  }, [isHovered]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your backend
    console.log('Email submitted:', email)
    // Reset the input field
    setEmail('')
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono flex flex-col">
      {/* <nav className="flex justify-between items-center p-6">
        <div className="text-xl font-bold">Con10cious</div>
        <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
          Contact
        </Button>
      </nav> */}
      
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8 text-center">
          <div 
            className="w-full h-24" 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <LottieComponent
              lottieRef={lottieRef}
              animationData={C10Logo}
              loop={false}
              autoplay={false}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div className="rounded-md bg-zinc-950 p-10 border border-zinc-800"> 
            <p className="text-sm">what lies in the shadow of the statue?</p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-4 flex flex-col items-center">
              <Input
                type="text"
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 bg-zinc-500 text-black placeholder-gray-500"
              />
              <Button type="submit" className="bg-black border border-zinc-800 text-white hover:bg-zinc-400 w-fit">
               submit 
              </Button>
              <Button className="bg-transparent border-none text-white">
                (skip)
              </Button>
            </form>
          </div>
        <div className="relative flex h-64">
          <Image
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt={`Face illustration ${currentImageIndex + 1}`}
            fill
            className={`object-contain transition-opacity duration-1000 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <Image
            key={nextImageIndex}
            src={images[nextImageIndex]}
            alt={`Face illustration ${nextImageIndex + 1}`}
            fill
            className={`object-contain transition-opacity duration-1000 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] ${
              isTransitioning ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
        </div>

      </main>
      
      <footer className="text-center p-6 text-sm">
        © 2023 Con10tious. All rights reserved.
      </footer>
    </div>
  )
}
