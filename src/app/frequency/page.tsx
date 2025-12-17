"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import FloatingLines from '@/components/FloatingLines';

// --- DATA: Replace with songs that actually mean something to you both ---
const TRACKS = [
  {
    id: "LOG_01",
    title: "The Main Theme",
    artist: "The Song of 2024",
    note: "This was playing on repeat during our road trip. It still feels like summer.",
    color: "from-pink-500"
  },
  {
    id: "LOG_02",
    title: "Midnight Lofi",
    artist: "3 AM Vibes",
    note: "For the nights where we stayed up way too late talking about the multiverse.",
    color: "from-purple-500"
  },
  {
    id: "LOG_03",
    title: "The Hype Track",
    artist: "Chaos Energy",
    note: "The 'get-ready' song. Usually involves us singing badly in the car.",
    color: "from-blue-500"
  },
];

export default function FrequencyPage() {
  return (
    <main className="relative min-h-screen w-full bg-[#030008] text-white overflow-hidden p-12">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <FloatingLines/>
        <div className="absolute inset-0 bg-black/80 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-16">
        {/* HEADER */}
        <div className="space-y-4">
          <Badge variant="outline" className="border-pink-500/50 text-pink-500 font-mono tracking-[0.4em]">
            CHAPTER_05: FREQUENCY_ANALYSIS
          </Badge>
          <h1 className="text-7xl font-black italic uppercase tracking-tighter">The Sound of Us</h1>
          <p className="text-gray-400 font-light max-w-xl text-lg leading-relaxed">
            Every memory has a frequency. These are the tracks that have defined our orbit at **107,000 km/h**.
          </p>
        </div>

        {/* FREQUENCY CARDS */}
        <div className="grid grid-cols-1 gap-12">
          {TRACKS.map((track, i) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-8 group"
            >
              {/* THE "VINYL" VISUALIZER */}
              <div className="relative h-48 w-48 flex-shrink-0">
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${track.color} to-black animate-spin-slow opacity-20 group-hover:opacity-100 transition-opacity duration-700`} />
                <div className="absolute inset-4 rounded-full bg-black border border-white/10 flex items-center justify-center">
                  <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
                </div>
                {/* Visualizer bars */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-end gap-1 h-8">
                  {[...Array(5)].map((_, j) => (
                    <motion.div
                      key={j}
                      animate={{ height: [4, 20, 8, 24, 4] }}
                      transition={{ repeat: Infinity, duration: 1 + Math.random(), ease: "easeInOut" }}
                      className="w-1 bg-pink-500"
                    />
                  ))}
                </div>
              </div>

              {/* TRACK INFO */}
              <div className="space-y-4">
                <span className="font-mono text-pink-500/50 text-xs tracking-widest">{track.id}</span>
                <h3 className="text-4xl font-bold italic uppercase">{track.title}</h3>
                <p className="text-purple-400 font-mono text-sm">{track.artist}</p>
                <p className="text-gray-400 max-w-md italic font-light">"{track.note}"</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* NEXT CHAPTER TRIGGER */}
        <div className="pt-20 text-center">
          <Button 
            onClick={() => window.location.href = '/multiverse'}
            className="bg-transparent border border-pink-500/50 text-pink-500 hover:bg-pink-500 hover:text-white rounded-full px-16 py-8 text-xs tracking-[0.5em] uppercase font-mono transition-all duration-500"
          >
            Continue Journey
          </Button>
        </div>
      </div>
      
      {/* CSS FOR SLOW SPIN */}
      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </main>
  );
}