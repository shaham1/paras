"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import FloatingLines from '@/components/FloatingLines';
import Link from 'next/link';

const BIRTH_DATE = new Date('1998-12-18');

export default function Dashboard() {
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const totalDays = Math.floor((new Date().getTime() - BIRTH_DATE.getTime()) / (1000 * 60 * 60 * 24));
    // Metric preference: 2.57 million KM per day in orbit
    setDistance(totalDays * 2570000);
  }, []);

  return (
    <main className="relative h-screen w-full bg-[#030008] text-white overflow-hidden p-12">
      <div className="absolute inset-0 z-0">
        <FloatingLines/>
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-between">
        {/* TOP HUD */}
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <Badge variant="outline" className="border-pink-500/50 text-pink-500 font-mono tracking-widest">SYSTEM_LIVE: PARAS_2025</Badge>
            <p className="text-[10px] text-gray-500 font-mono uppercase">Status: Stable Orbit</p>
          </div>
          <div className="text-right font-mono text-[10px] text-gray-500">
            [ COORDINATES: 45.52306° N, 122.67648° W ]
          </div>
        </div>

        {/* CENTER HERO */}
        <div className="text-center">
          <motion.h1 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            className="text-[15vw] font-black italic tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-pink-200 to-purple-600 drop-shadow-[0_0_40px_rgba(236,72,153,0.3)]"
          >
            PARAS
          </motion.h1>
          <div className="mt-4 text-4xl font-mono text-pink-500/80 tracking-tighter">
            {distance.toLocaleString()} <span className="text-sm align-top">KM TRAVELED</span>
          </div>
        </div>

        {/* NAVIGATION TILES */}
        <div className="grid grid-cols-4 gap-4 max-w-5xl mx-auto w-full mb-10">
          {[
            { label: 'Timeline', href: '/matrix', icon: 'Timeline.obj' },
            { label: 'Frequency', href: '/frequency', icon: 'Audio.wav' },
            { label: 'Multiverse', href: '/multiverse', icon: 'Reality.log' },
            { label: 'Rewards', href: '/coupons', icon: 'Vault.key' }
          ].map((nav) => (
            <Link key={nav.href} href={nav.href} className="group">
              <div className="border border-white/10 bg-black/40 backdrop-blur-md p-6 rounded-2xl hover:border-pink-500/50 transition-all duration-500 group-hover:-translate-y-1">
                <p className="text-[10px] font-mono text-gray-500 group-hover:text-pink-500 mb-2 uppercase">{nav.icon}</p>
                <h3 className="text-xl font-bold uppercase italic">{nav.label}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}