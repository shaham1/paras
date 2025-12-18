"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function SignOutPage() {
  const router = useRouter();
  const [status, setStatus] = useState('ACTIVE');
  const [showGoodbye, setShowGoodbye] = useState(false);

  useEffect(() => {
    // Stage 1: Initial Greeting
    const timer1 = setTimeout(() => setStatus('SAVING_PROGRESS...'), 2000);
    // Stage 2: Final Message
    const timer2 = setTimeout(() => setShowGoodbye(true), 4000);
    // Stage 3: Shutdown
    const timer3 = setTimeout(() => setStatus('STASIS_MODE'), 7000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <main className="h-screen w-full bg-[#030008] flex items-center justify-center font-mono overflow-hidden">
      
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.05)_0%,transparent_70%)]" />

      <div className="relative z-10 text-center space-y-8 max-w-lg px-6">
        
        {/* STATUS INDICATOR */}
        <div className="flex flex-col items-center gap-2">
          <div className={`w-2 h-2 rounded-full animate-pulse ${status === 'STASIS_MODE' ? 'bg-gray-800' : 'bg-pink-500'}`} />
          <span className="text-[10px] tracking-[0.5em] text-gray-500 uppercase">
            Session_Status: {status}
          </span>
        </div>

        <AnimatePresence mode="wait">
          {!showGoodbye ? (
            <motion.div
              key="active"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <h1 className="text-3xl font-black italic text-white uppercase tracking-tighter">
                Securely Storing Memories...
              </h1>
              <p className="text-xs text-gray-600 leading-relaxed uppercase tracking-widest">
                The Paras Protocol is preparing for background operation.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="goodbye"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h1 className="text-4xl font-black italic text-pink-500 uppercase tracking-tighter">
                Sleep well, Paras.
              </h1>
              <div className="space-y-2 text-gray-300 italic text-sm md:text-base leading-relaxed">
                <p>"The archive is locked, but the journey continues."</p>
                <p>Happy 19th Birthday. You're doing great.</p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/')}
                className="mt-8 px-6 py-2 border border-pink-500/30 text-[10px] text-pink-500 uppercase tracking-[0.3em] hover:bg-pink-500 hover:text-black transition-all"
              >
                Re-Initiate_Session
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SYSTEM DATA DECORATION */}
        <div className="pt-12 grid grid-cols-2 gap-8 border-t border-white/5 opacity-20 text-[8px] text-gray-500 uppercase tracking-widest">
          <div className="text-left">
            Total_Distance: 17.8B KM<br />
            Sync_Level: Optimal
          </div>
          <div className="text-right">
            Encryption: Active<br />
            Subject: Paras_19
          </div>
        </div>
      </div>

      {/* FINAL SHUTDOWN EFFECT */}
      {status === 'STASIS_MODE' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 pointer-events-none bg-black/40 backdrop-grayscale"
        />
      )}
    </main>
  );
}