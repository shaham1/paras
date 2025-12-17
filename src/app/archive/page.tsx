"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import FloatingLines from '@/components/FloatingLines';
import InfiniteMenu from '@/components/InfiniteMenu'; // Ensure this is in your components folder

// --- MEMORY DATA ---
const ARCHIVE_ITEMS = [
  {
    link: "#",
    title: "THE FIRST MEETING",
    description: "Location: Downtown Coffee // Protocol: Nervous but excited.",
    image: "https://images.unsplash.com/photo-1511914265872-c40672604a80?q=80&w=500&h=500&auto=format&fit=crop" 
  },
  {
    link: "#",
    title: "METRIC_REACHED: 25M KM",
    description: "The moment we realized just how far we've traveled together.",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=500&h=500&auto=format&fit=crop"
  },
  {
    link: "#",
    title: "MIDNIGHT_DRIVE.LOG",
    description: "Windows down, singing at the top of our lungs through the city.",
    image: "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?q=80&w=500&h=500&auto=format&fit=crop"
  },
  {
    link: "#",
    title: "THE UNWRITTEN CHAPTER",
    description: "Whatever 2026 brings, we're ready for it.",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=500&h=500&auto=format&fit=crop"
  },
];

export default function ArchivePage() {
  return (
    <main className="relative h-screen w-full bg-[#030008] text-white overflow-hidden cursor-crosshair">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <FloatingLines colors={['#ff007f', '#7000ff']} />
        <div className="absolute inset-0 bg-black/70 pointer-events-none" />
      </div>

      {/* HUD OVERLAY */}
      <div className="absolute inset-0 z-50 pointer-events-none p-10 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <Badge variant="outline" className="border-pink-500/50 text-pink-500 font-mono tracking-widest bg-black/40 backdrop-blur-md">
              ARCHIVE_BROWSER_v1.0
            </Badge>
            <p className="text-[10px] text-gray-500 font-mono pl-1 uppercase">Mode: Infinite_Scroll</p>
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-right font-mono text-[10px] text-pink-500/50"
          >
            [ SCROLL TO EXPLORE ARCHIVE ]
          </motion.div>
        </div>

        <div className="flex justify-between items-end">
          <button 
            onClick={() => window.location.href = '/coupons'}
            className="pointer-events-auto text-[10px] font-mono text-gray-500 hover:text-white transition-colors"
          >
            [ BACK_TO_GIFTS ]
          </button>
          <div className="text-[10px] font-mono text-pink-500/30">
            TOTAL_ENTRIES: {ARCHIVE_ITEMS.length}
          </div>
        </div>
      </div>

      {/* THE INFINITE MENU STAGE */}
      <div className="relative z-10 h-full w-full">
        <InfiniteMenu items={ARCHIVE_ITEMS} />
      </div>

      {/* FILM GRAIN EFFECT */}
      <div className="fixed inset-0 pointer-events-none z-[60] opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </main>
  );
}