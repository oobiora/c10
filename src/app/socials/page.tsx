'use client';
import { TopBanner } from "@/components/ui/top-banner"
import { motion } from "framer-motion"
import Image from 'next/image'

export default function Socials() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.5,
                duration: 0.8
            }
        }
    }

    const item = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                duration: 0.8
            }
        }
    }

    return (
        <div className="min-h-screen bg-black text-white font-mono flex flex-col">
          <main className="flex-grow flex items-center justify-center px-4">
            <div className="max-w-md w-full space-y-8 text-center">
                <TopBanner />
              <motion.div 
                className="space-y-4 sm:space-y-8 bg-zinc-950 p-2 sm:p-4 rounded-md border border-zinc-800"
                variants={container}
                initial="hidden"
                animate="show"
              >
                <motion.div variants={item} className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 items-stretch">
                  <div className="flex items-center justify-center">
                    <div className="relative w-20 sm:w-24 md:w-full aspect-square">
                      <Image 
                        src="/InstagramLogo.svg"
                        alt="Instagram Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="col-span-2 text-start flex flex-col justify-center">
                    <a 
                      href="https://instagram.com/con10scious" 
                      className="text-xs sm:text-base md:text-xl hover:text-blue-400 transition-colors block mb-1 sm:mb-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      instagram.com/con10scious
                    </a>
                    <div className="text-zinc-300 text-[10px] sm:text-xs md:text-sm leading-tight sm:leading-relaxed">
                      Facebook purchased Instagram for $1bn in April 2012. After failing to acquire Snapchat in 2013, Zuckerberg absorbed the rival app&apos;s core features into Instagram. In October 2021, Zuckerberg named this abomination &quot;Meta&quot;.
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={item} className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 items-stretch">
                  <div className="flex items-center justify-center">
                    <div className="relative w-20 sm:w-24 md:w-full aspect-square">
                      <Image
                        src="/TwitterLogo.svg" 
                        alt="Twitter Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="col-span-2 text-start flex flex-col justify-center">
                    <a
                      href="https://twitter.com/con10scious"
                      className="text-xs sm:text-base md:text-xl hover:text-blue-400 transition-colors block mb-1 sm:mb-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      twitter.com/con10scious
                    </a>
                    <div className="text-zinc-300 text-[10px] sm:text-xs md:text-sm leading-tight sm:leading-relaxed">
                      Formerly Twitter, &quot;x - dot - com&quot; was purchased by Elon Musk in October of 2022. Numerous unpopular decisions followed the nightmare acquisition, leaving behind a culture resembling Liveleak more than its former self.
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={item} className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 items-stretch">
                  <div className="flex items-center justify-center">
                    <div className="relative w-20 sm:w-24 md:w-full aspect-square">
                      <Image
                        src="/ThreadsLogo.svg"
                        alt="Threads Logo" 
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="col-span-2 text-start flex flex-col justify-center">
                    <a
                      href="https://threads.net/@con10scious"
                      className="text-xs sm:text-base md:text-xl hover:text-blue-400 transition-colors block mb-1 sm:mb-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      threads.net/con10scious
                    </a>
                    <div className="text-zinc-300 text-[10px] sm:text-xs md:text-sm leading-tight sm:leading-relaxed">
                      Less than twelve months after Musk purchased Twitter, Zuckerberg launched &quot;Threads&quot;, a Twitter competitor. Meta&apos;s new social media product struggled to find its footing at first, yet has now surged up to 275 mn monthly users.
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </main>
          
          <footer className="text-center p-2 sm:p-4 text-[10px] sm:text-xs">
            © 2024 Con10scious. All rights reserved.
          </footer>
        </div>
    )
}