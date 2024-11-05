'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function Welcome() {
  return (
    <div className="min-h-screen bg-black text-white font-mono flex flex-col">
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8 text-center">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-4xl w-full space-y-8"
          >
            <motion.div variants={item} className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 items-stretch">
              <div className="flex items-center justify-center">
                <div className="relative w-20 sm:w-24 md:w-full aspect-square">
                  <Image
                    src="/AAsciiLogo.svg"
                    alt="A ASCII Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="col-span-2 text-start flex flex-col justify-center">
                <h1 className="text-xs sm:text-base md:text-xl mb-1 sm:mb-2">
                  Welcome to my portfolio
                </h1>
                <div className="text-zinc-300 text-[10px] sm:text-xs md:text-sm leading-tight sm:leading-relaxed">
                  I&apos;m a software engineer with a passion for creating elegant solutions to complex problems.
                </div>
              </div>
            </motion.div>

            <motion.div variants={item} className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 items-stretch">
              <div className="flex items-center justify-center">
                <div className="relative w-20 sm:w-24 md:w-full aspect-square">
                  <Image
                    src="/HammerAsciiLogo.svg"
                    alt="Hammer ASCII Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="col-span-2 text-start flex flex-col justify-center">
                <h2 className="text-xs sm:text-base md:text-xl mb-1 sm:mb-2">
                  Building digital experiences
                </h2>
                <div className="text-zinc-300 text-[10px] sm:text-xs md:text-sm leading-tight sm:leading-relaxed">
                  From web applications to system architecture, I bring ideas to life through code.
                </div>
              </div>
            </motion.div>

            <motion.div variants={item} className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 items-stretch">
              <div className="flex items-center justify-center">
                <div className="relative w-20 sm:w-24 md:w-full aspect-square">
                  <Image
                    src="/ZAsciiLogo.svg"
                    alt="Z ASCII Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="col-span-2 text-start flex flex-col justify-center">
                <h2 className="text-xs sm:text-base md:text-xl mb-1 sm:mb-2">
                  Let&apos;s connect
                </h2>
                <div className="text-zinc-300 text-[10px] sm:text-xs md:text-sm leading-tight sm:leading-relaxed">
                  Feel free to explore my work and reach out if you&apos;d like to collaborate on something amazing.
                </div>
              </div>
            </motion.div>
          </motion.div>

          <Link 
            href="/activity" 
            className="inline-block mt-4 px-4 py-2 border border-zinc-800 rounded hover:bg-zinc-900 transition-colors"
          >
            Continue to Activity
          </Link>
        </div>
      </main>
      
      <footer className="text-center p-6 text-sm">
        © 2024 Con10scious. All rights reserved.
      </footer>
    </div>
  )
}
