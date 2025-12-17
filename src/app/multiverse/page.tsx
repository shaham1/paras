"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import FloatingLines from '@/components/FloatingLines';
// If you've added SpotlightCard from React Bits:
// import SpotlightCard from '@/components/SpotlightCard';

const UNIVERSES = [
  {
    id: "U-712",
    title: "The Victorian Era",
    desc: "In this timeline, we are rival poets exchanging heated insults via carrier pigeon. You still win every argument.",
    status: "DIVERGENT"
  },
  {
    id: "U-004",
    title: "The Deep Sea",
    desc: "We are highly intelligent octopuses running an underwater glowing-algae cafe. The coffee is terrible, but the vibes are 10/10.",
    status: "STABLE"
  },
  {
    id: "U-999",
    title: "The Martian Colony",
    desc: "It's 2150. We just opened the first taco stand on Mars. We're currently arguing over who has to fix the oxygen scrubber.",
    status: "EXPANDING"
  },
  {
    id: "U-111",
    title: "The Silent Film",
    desc: "Everything is black and white, and we communicate exclusively through dramatic hand gestures and piano music.",
    status: "LOCKED"
  },
  {
    id: "U-042",
    title: "The Prime Reality",
    desc: "The one where we're on a laptop in 2025, looking at a birthday site, traveling at 107,000 km/h. It's my favorite one.",
    status: "CURRENT"
  }
];

export default function MultiversePage() {
  return (
    <main className="relative min-h-screen w-full bg-[#030008] text-white overflow-hidden p-12 cursor-crosshair">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <FloatingLines/>
        <div className="absolute inset-0 bg-black/80 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        {/* HEADER */}
        <div className="space-y-4">
          <Badge variant="outline" className="border-pink-500/50 text-pink-500 font-mono tracking-[0.3em]">
            CHAPTER_03: MULTIVERSE_ANALYSIS
          </Badge>
          <h1 className="text-7xl font-black italic uppercase tracking-tighter">The Alternate Logs</h1>
          <p className="text-gray-400 font-light max-w-2xl text-xl leading-relaxed">
            Data suggests that in every possible reality, we end up as friends. 
            Here are a few variations the system found in the deep-space buffer.
          </p>
        </div>

        {/* MULTIVERSE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {UNIVERSES.map((u, i) => (
            <motion.div
              key={u.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {/* Replace with <SpotlightCard> once component is ready */}
              <div className="group relative p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-3xl hover:border-pink-500/50 transition-all duration-500 h-[280px] flex flex-col justify-between overflow-hidden">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[10px] text-pink-500/50 tracking-widest">{u.id}</span>
                  <Badge className="bg-white/5 text-[9px] font-mono border-white/10 group-hover:text-pink-500 group-hover:border-pink-500/30">
                    {u.status}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold italic uppercase group-hover:text-pink-500 transition-colors">
                    {u.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-light italic group-hover:text-gray-200 transition-colors">
                    "{u.desc}"
                  </p>
                </div>

                {/* Decorative scanning element */}
                <div className="absolute -right-4 -bottom-4 text-8xl font-black text-white/5 pointer-events-none group-hover:text-pink-500/5 transition-colors">
                  {i + 1}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* NAVIGATION */}
        <div className="pt-12 flex justify-center">
          <Button 
            onClick={() => window.location.href = '/coupons'}
            className="bg-transparent border border-white/10 hover:border-pink-500 text-gray-500 hover:text-pink-500 rounded-full px-12 py-6 font-mono text-[10px] tracking-[0.5em] transition-all"
          >
            NEXT_CHAPTER: GIFT_REDEEMER
          </Button>
        </div>
      </div>
    </main>
  );
}