"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingLines from '@/components/FloatingLines';
import Heartbeat from '@/components/Heartbeat';
import Link from 'next/link';

export default function Dashboard() {
  const [isBooting, setIsBooting] = useState(true);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsBooting(false), 3000);
    const BIRTH_DATE = new Date('2006-12-28');
    const totalHours = Math.floor((new Date().getTime() - BIRTH_DATE.getTime()) / (1000 * 60 * 60));
    setDistance(totalHours * 107000);
    return () => clearTimeout(timer);
  }, []);

  return (
    // min-h-screen + flex-col is the key to filling the space
    <main className="relative h-screen w-full bg-[#030008] text-white overflow-hidden p-8 md:p-16 flex flex-col justify-between">
      
      {/* 1. BOOT OVERLAY (Remains same) */}
      <AnimatePresence>
        {isBooting && (
          <motion.div 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center font-mono text-pink-500"
          >
            <div className="w-64 space-y-2">
              <p>[ SYSTEM ] initializing_paras_v19.0...</p>
              <div className="h-1 w-full bg-pink-500/20 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2 }} className="h-full bg-pink-500" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <FloatingLines/>
        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* --- TOP SECTION: HUD HEADER --- */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={isBooting ? {} : { y: 0, opacity: 1 }}
        className="relative z-10 flex justify-between items-start"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-mono text-[10px] text-pink-500 tracking-[0.4em]">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
            LIVE_ORBITAL_STREAM
          </div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">Paras // Archive</h1>
        </div>
        <div className="text-right font-mono text-[10px] text-gray-600 space-y-1">
          <p>LOGGED_IN: PARAS_06</p>
          <p>DEPLOYMENT_DATE: 28.12.06</p>
        </div>
      </motion.div>

      {/* --- MIDDLE SECTION: HERO DATA & NAV --- */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={isBooting ? {} : { opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
      >
        <div className="lg:col-span-8 space-y-6">
          <div className="space-y-0">
            <span className="text-[10px] font-mono text-gray-500 tracking-[0.5em] uppercase">Cosmic Displacement</span>
            <div className="text-[10vw] font-black italic tracking-tighter leading-none text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              {distance.toLocaleString()}<span className="text-2xl text-pink-500 ml-2">KM</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Reality', href: '/neural-core', id: '01' },
              { label: 'Vault', href: '/coupons', id: '02' },
              { label: 'Signals', href: '/dashboard/messages', id: '03' },
              { label: 'Goodbye', href: '/matrix', id: '05' }
            ].map((item) => (
              <Link key={item.id} href={item.href} className="border border-white/5 bg-white/[0.03] p-6 rounded-2xl hover:border-pink-500/40 transition-all group backdrop-blur-md">
                <p className="text-[8px] font-mono text-gray-600 mb-2 italic">ACCESS_PT_{item.id}</p>
                <h3 className="text-xl font-black uppercase italic group-hover:text-pink-500">{item.label}</h3>
              </Link>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 flex justify-end">
          <div className="w-full max-w-xs p-8 border border-pink-500/20 bg-pink-500/5 rounded-[2.5rem] backdrop-blur-xl rotate-3 hover:rotate-0 transition-transform duration-500">
            <h2 className="text-xl font-black italic uppercase mb-4 text-pink-500">System Note</h2>
            <p className="text-xs text-gray-400 font-mono leading-relaxed">
              Happy Birthday, Paras. You have officially completed 166,440 hours of your mission. Version 19.0 is now the active stable build.
            </p>
          </div>
        </div>
      </motion.div>

      {/* --- BOTTOM SECTION: BIO-STATUS & FOOTER --- */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={isBooting ? {} : { y: 0, opacity: 1 }}
        className="relative z-10 space-y-6"
      >
        <div className="flex justify-between items-end border-b border-white/5 pb-4 font-mono text-[8px] text-gray-600 uppercase tracking-widest">
          <span>Neural_Sync: 99%</span>
          <span className="text-pink-500">Subject: Paras // Age: 19</span>
          <span>Frame_Rate: 60FPS</span>
        </div>
        <Heartbeat />
      </motion.div>

    </main>
  );
}