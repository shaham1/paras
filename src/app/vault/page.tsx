"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
const WRAPPED_SLIDES = [
  {
    id: "intro",
    title: "2024_RECAP",
    subtitle: "A journey through the archives.",
    image: "/dreamworld.png", 
    color: "from-pink-900/20 to-black",
    text: "You traveled 17.8 Billion KM this year. But let's look at where it started."
  },
  {
    id: "the-van",
    title: "THE_VAN_PROTOCOL",
    subtitle: "Grade 11 Commute",
    image: "/me.png", 
    color: "from-purple-900/20 to-black",
    text: "It started with a route change. A obsession with Laiba. A back seat in a school van."
  },
  {
    id: "the-shift",
    title: "THE_LAIBA_SCHISM",
    subtitle: "Side A vs Side B",
    image: "/farewell.png", 
    color: "from-red-900/20 to-black",
    text: "Lines were drawn. I was still better tho frfr. Farewell day, and we still weren't really friends."
  },
  {
    id: "trust",
    title: "LAST_DAY_OF_SCHOOL",
    subtitle: "You stuck around",
    image: "/pras.png", 
    color: "from-blue-900/20 to-black",
    text: "It was her fault not mine (trust) :)."
  },
  {
    id: "rants",
    title: "THE_RANT_CHANNELS",
    subtitle: "Unlimited Uptime",
    image: "/horse.png", 
    color: "from-pink-600/20 to-black",
    text: "Hours spent on the phone. Late night rants. You became the primary listener, and you also grew an interest in horses!?."
  },
  {
    id: "move",
    title: "THE_FINAL_REVOLUTION",
    subtitle: "107,000 KM/H",
    image: "/archive/top.jpeg", // Placeholder
    color: "from-green-900/20 to-black",
    text: "A new city. One week before college. But the link never dropped. Happy 19th, Paras."
  }
];

const SLIDE_DURATION = 8000; // 8 seconds per slide = ~48 seconds total

export default function SpotifyWrapped() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // Progress bar timer
    const progressTimer = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, SLIDE_DURATION / 100);

    // Slide transition timer
    const slideTimer = setTimeout(() => {
      if (currentSlide < WRAPPED_SLIDES.length - 1) {
        setCurrentSlide(currentSlide + 1);
        setProgress(0);
      } else {
        router.push('/coupons'); // Auto-leads to messages after wrapped
      }
    }, SLIDE_DURATION);

    return () => {
      clearTimeout(slideTimer);
      clearInterval(progressTimer);
    };
  }, [currentSlide, router]);

  const slide = WRAPPED_SLIDES[currentSlide];

  return (
    <main className={`relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black transition-colors duration-1000 bg-gradient-to-b ${slide.color}`}>
      
      {/* TOP PROGRESS BARS */}
      <div className="absolute top-6 left-0 right-0 px-4 flex gap-2 z-50">
        {WRAPPED_SLIDES.map((_, index) => (
          <div key={index} className="h-1 flex-grow bg-white/20 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-white"
              initial={{ width: 0 }}
              animate={{ 
                width: index === currentSlide ? `${progress}%` : index < currentSlide ? "100%" : "0%" 
              }}
              transition={{ ease: "linear" }}
            />
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full max-w-lg px-8 flex flex-col items-center text-center"
        >
          {/* IMAGE ELEMENT */}
          <div className="relative w-100 h-100 mb-12 shadow-2xl">
            <Image 
              src={slide.image} 
              alt={slide.title} 
              fill 
              className="object-contain opacity-50 brightness-150"
            />
          </div>

          <h2 className="text-pink-500 font-mono text-xs tracking-[0.5em] mb-2 uppercase">
            {slide.subtitle}
          </h2>
          <h1 className="text-white text-4xl font-black italic mb-6 tracking-tighter uppercase leading-none">
            {slide.title}
          </h1>
          <p className="text-gray-400 font-mono text-sm leading-relaxed max-w-xs">
            {slide.text}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* BACKGROUND DECORATION */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        {/* <Threads/> */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
      </div>

      {/* CLICKABLE AREAS FOR OVERRIDE */}
      <div className="absolute inset-0 z-40 flex">
        <div 
          className="w-1/2 h-full cursor-pointer" 
          onClick={() => { if(currentSlide > 0) { setCurrentSlide(currentSlide - 1); setProgress(0); }}} 
        />
        <div 
          className="w-1/2 h-full cursor-pointer" 
          onClick={() => { if(currentSlide < WRAPPED_SLIDES.length - 1) { setCurrentSlide(currentSlide + 1); setProgress(0); }}} 
        />
      </div>
    </main>
  );
}