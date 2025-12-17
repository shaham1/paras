"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import FloatingLines from '@/components/FloatingLines';

const BRANCHES = [
  { side: "left", text: "The random choice to grab a coffee at 4 PM." },
  { side: "right", text: "The decision to finally reply to that one text." },
  { side: "left", text: "The coincidence of being in the same city at the same time." },
  { side: "right", text: "The millions of small 'What Ifs' that went our way." },
];

export default function MatrixPage() {
  return (
    <main className="relative min-h-screen w-full bg-[#030008] text-white p-12 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <FloatingLines/>
        <div className="absolute inset-0 bg-black/90 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center py-20">
        <Badge className="bg-pink-500/10 text-pink-500 border-pink-500/30 mb-12">CHAPTER_04: THE_PROBABILITY_MATRIX</Badge>
        
        <h2 className="text-center text-4xl font-light italic text-gray-400 mb-20 max-w-2xl">
          "The odds of us meeting were statistically insignificant. And yet, here we are."
        </h2>

        {/* THE CENTRAL TIMELINE */}
        <div className="relative w-full">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-pink-500 via-purple-500 to-transparent" />
          
          <div className="space-y-32 relative">
            {BRANCHES.map((b, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: b.side === 'left' ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`flex w-full ${b.side === 'left' ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`w-1/2 px-12 relative ${b.side === 'left' ? 'text-right' : 'text-left'}`}>
                  {/* The dot on the line */}
                  <div className={`absolute top-1/2 w-3 h-3 bg-white rounded-full border-4 border-pink-500 ${b.side === 'left' ? '-right-[6px]' : '-left-[6px]'} -translate-y-1/2`} />
                  
                  <p className="text-2xl font-black italic uppercase tracking-tighter leading-tight">
                    {b.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-40 text-center"
        >
          <p className="text-pink-500 font-mono text-sm tracking-[0.5em] mb-8 uppercase">Matrix Resolution: Success</p>
          <button 
             onClick={() => window.location.href = '/archive'}
             className="px-12 py-5 border border-white/20 rounded-full hover:border-pink-500 transition-all font-mono text-xs tracking-widest"
          >
            ENTER_MEMORIES
          </button>
        </motion.div>
      </div>
    </main>
  );
}