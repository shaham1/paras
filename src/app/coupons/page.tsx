"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FloatingLines from '@/components/FloatingLines';
import { Button } from '@/components/ui/button';

// --- DATA ---
const COUPONS = [
  { id: 1, title: "Gourmet Dinner", detail: "I'll cook your favorite 3-course meal.", icon: "🍳" },
  { id: 2, title: "Weekend Getaway", detail: "A surprise trip to a destination of your choice.", icon: "✈️" },
  { id: 3, title: "Yes Day", detail: "I have to say YES to everything you ask for 24h.", icon: "✅" },
  { id: 4, title: "Coffee Subscription", detail: "I'll be your personal barista for a whole month.", icon: "☕" },
];

export default function CouponsPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <main className="relative min-h-screen w-full bg-[#030008] text-white overflow-hidden p-10 cursor-crosshair">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <FloatingLines/>
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-12">
        {/* HEADER */}
        <div className="space-y-2">
          <Badge className="bg-pink-500/20 text-pink-500 border-pink-500/40 font-mono tracking-widest uppercase">
            Module: Gift_Selection
          </Badge>
          <h1 className="text-6xl font-black italic tracking-tighter uppercase">Pick Your Fate</h1>
          <p className="text-gray-400 font-light max-w-xl leading-relaxed">
            Four encrypted envelopes. Only one can be decrypted. Choose wisely; the others will be permanently deleted from the buffer.
          </p>
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-4 gap-6 h-[400px]">
          {COUPONS.map((coupon) => {
            const isSelected = selectedId === coupon.id;
            const hasChosen = selectedId !== null;

            return (
              <motion.div
                key={coupon.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: coupon.id * 0.1 }}
              >
                <Card 
                  onClick={() => !hasChosen && setSelectedId(coupon.id)}
                  className={`
                    relative h-full flex flex-col items-center justify-center p-8 transition-all duration-700 overflow-hidden
                    ${!hasChosen ? 'cursor-pointer border-pink-500/30 bg-white/5 hover:border-pink-500 hover:bg-white/10' : ''}
                    ${isSelected ? 'border-pink-500 bg-pink-500/10 shadow-[0_0_50px_rgba(236,72,153,0.3)]' : 'border-white/5 bg-black/40 opacity-100'}
                  `}
                >
                  {/* HIDDEN STATE */}
                  <AnimatePresence mode="wait">
                    {!hasChosen ? (
                      <motion.div 
                        key="hidden"
                        className="text-center space-y-4"
                        exit={{ opacity: 0, scale: 0.5 }}
                      >
                        <div className="text-4xl font-mono text-pink-500 opacity-20 italic">?</div>
                        <div className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">Encrypted_Packet</div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="revealed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-4"
                      >
                        <div className="text-5xl">{coupon.icon}</div>
                        <h3 className="text-xl font-bold uppercase tracking-tight">{coupon.title}</h3>
                        <p className="text-[10px] text-gray-400 font-mono leading-relaxed px-4">{coupon.detail}</p>
                        {isSelected && (
                          <Badge className="bg-pink-500 text-white animate-pulse">WON</Badge>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* DECORATIVE SCAN LINE */}
                  {!hasChosen && (
                    <div className="absolute inset-0 pointer-events-none w-full h-[1px] bg-pink-500/20 top-0 animate-[scan_3s_linear_infinite]" />
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* ACTION BUTTON */}
        <AnimatePresence>
          {selectedId && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <p className="text-pink-500 font-mono text-xs animate-pulse tracking-widest uppercase">Selection Confirmed // Archive Updated</p>
              <Button 
                onClick={() => window.location.href = '/dashboard/messages'}
                className="bg-transparent border border-white/20 hover:border-white text-white rounded-full px-12 py-6 font-mono text-xs tracking-widest transition-all"
              >
                PROCEED TO MEMORY_VAULT
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CSS FOR SCAN LINE */}
      <style jsx global>{`
        @keyframes scan {
          0% { top: 0% }
          100% { top: 100% }
        }
      `}</style>
    </main>
  );
}