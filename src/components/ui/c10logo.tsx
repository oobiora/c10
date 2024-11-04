'use client'
import { useEffect } from "react";
import { LottieRefCurrentProps } from "lottie-react";
import C10Logo from "@/assets/C10Logo.json";
import dynamic from "next/dynamic";

// Add this utility function at the top of the file
const isBrowser = () => typeof window !== 'undefined'

// Dynamically import Lottie with SSR disabled
const LottieComponent = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => <div className="w-full h-24" />
});


export function C10LogoComponent(
    { isHovered, lottieRef, setIsHovered }: {
         isHovered: boolean, 
         lottieRef: React.RefObject<LottieRefCurrentProps>,
         setIsHovered: (value: boolean) => void
        }) {

  useEffect(() => {
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
  }, [isHovered, lottieRef]);

  return (

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
  );
}