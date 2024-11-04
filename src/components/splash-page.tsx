'use client'

import { useState, useRef } from 'react'
import { ProfileForm } from '@/components/register-form';
import { C10LogoComponent } from '@/components/ui/c10logo'
import { LottieRefCurrentProps } from "lottie-react";
import Image from 'next/image';
import Link from 'next/link'


export function SplashPage() {
  const [isHovered, setIsHovered] = useState(false)
  const lottieRef = useRef<LottieRefCurrentProps>(null)
  // const [error, setError] = useState('')



  return (
    <div className="min-h-screen bg-black text-white font-mono flex flex-col">
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8 text-center">
          {/* C10LogoComponent is a client component */}
          <C10LogoComponent isHovered={isHovered} lottieRef={lottieRef} setIsHovered={setIsHovered} />
          <div className="rounded-md bg-zinc-950 p-10 border border-zinc-800"> 
            <ProfileForm />
            {/* Skip to activity page */}
            <Link href="/activity" className="bg-transparent border-none text-white">
              (skip)
            </Link >
          </div>
          <div className="relative flex aspect-square w-full max-w-[32rem] mx-auto">
            <Image
              src="/faces.gif"
              alt="Animated faces"
              fill
              className="object-contain"
            />
          </div>
        </div>

      </main>
      
      <footer className="text-center p-6 text-sm">
        © 2024 Con10scious. All rights reserved.
      </footer>
    </div>
  )
}
