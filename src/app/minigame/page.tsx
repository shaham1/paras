"use client";

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function VanAGoGo() {
  const [isLaunched, setIsLaunched] = useState(false);
  const [score, setScore] = useState(0);
  const [targets, setTargets] = useState([
    { id: 1, label: 'DRAMA', x: 70, y: 50, hit: false },
    { id: 2, label: 'LAIBA_ARGUMENT', x: 85, y: 30, hit: false },
    { id: 3, label: 'HOMEWORK', x: 75, y: 10, hit: false },
    { id: 4, label: 'COLLEGE_STRESS', x: 80, y: 70, hit: false },
  ]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Visual "Sling" effect
  const rotate = useTransform(x, [-100, 100], [-30, 30]);
  const opacity = useTransform(y, [0, -100], [1, 0.5]);

  const handleLaunch = () => {
    // Check for collisions with targets based on release position
    const finalX = x.get();
    const finalY = y.get();

    setTargets(prev => prev.map(t => {
      // Very basic "hit" logic based on inverse trajectory
      const isHit = Math.abs(finalX + (t.x - 50) * 2) < 20;
      if (isHit && !t.hit) setScore(s => s + 100);
      return isHit ? { ...t, hit: true } : t;
    }));

    setIsLaunched(true);
    setTimeout(() => {
      setIsLaunched(false);
      x.set(0);
      y.set(0);
    }, 1000);
  };

  return (
    <main className="h-screen w-full bg-[#05000a] text-white overflow-hidden flex flex-col items-center justify-center p-4">
      
      {/* HUD */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-8 border-b border-pink-500/20 pb-4 font-mono">
        <div>
          <h1 className="text-2xl font-black italic text-pink-500 uppercase tracking-tighter">Van_A_Go_Go</h1>
          <p className="text-[10px] text-gray-500 uppercase">Velocity: 107,000 KM/H</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-black italic text-glow">{score}</div>
          <p className="text-[10px] text-gray-500 uppercase">Stress_Neutralized</p>
        </div>
      </div>

      <div className="relative w-full max-w-5xl h-[70vh] bg-white/[0.02] border border-white/10 rounded-[4rem] overflow-hidden backdrop-blur-md">
        
        {/* THE VAN (Launch Pad) */}
        <div className="absolute bottom-10 left-10 w-40 h-24 bg-pink-500/10 border-2 border-dashed border-pink-500/30 rounded-2xl flex items-center justify-center">
          <span className="text-[10px] font-black text-pink-500/40 uppercase tracking-widest">Launch_Sector</span>
        </div>

        {/* TARGETS (Obstacles) */}
        {targets.map(t => (
          <motion.div
            key={t.id}
            initial={false}
            animate={{ 
              scale: t.hit ? 0 : 1,
              rotate: t.hit ? 180 : 0,
              opacity: t.hit ? 0 : 1
            }}
            className="absolute flex flex-col items-center"
            style={{ left: `${t.x}%`, top: `${t.y}%` }}
          >
            <div className="relative w-20 h-20">
              <Image 
                src="/archive/paras_grumpy.png" 
                alt="Obstacle" 
                fill 
                className="object-contain grayscale brightness-50" 
              />
            </div>
            <span className="mt-2 text-[8px] font-mono bg-red-500 text-black px-1 font-black uppercase">
              {t.label}
            </span>
          </motion.div>
        ))}

        {/* PROJECTILE (Paras Head) */}
        {!isLaunched && (
          <motion.div
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            onDragEnd={handleLaunch}
            style={{ x, y, rotate, opacity }}
            className="absolute bottom-12 left-16 z-50 w-28 h-28 cursor-grab active:cursor-grabbing"
          >
            <div className="relative w-full h-full">
              <Image 
                src="/archive/paras_happy.png" 
                alt="Projectile" 
                fill 
                className="object-contain drop-shadow-[0_0_20px_#ff007f]" 
              />
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black text-[8px] font-black px-2 py-0.5 rounded-full uppercase shadow-lg">
                Fling_Me
              </div>
            </div>
          </motion.div>
        )}

        {/* RESET BUTTON IF ALL HIT */}
        {targets.every(t => t.hit) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md z-[60]">
             <h2 className="text-4xl font-black italic text-pink-500 mb-6 uppercase">Crisis_Averted</h2>
             <button 
              onClick={() => setTargets(prev => prev.map(t => ({ ...t, hit: false })))}
              className="px-8 py-3 bg-pink-500 text-black font-black uppercase hover:scale-105 transition-all"
             >
               Re-Sync_Chaos
             </button>
          </div>
        )}
      </div>

      <div className="mt-8 font-mono text-[9px] text-gray-600 uppercase tracking-[0.4em] flex gap-12">
        <span>[Drag Paras back and release to launch]</span>
        <button onClick={() => window.history.back()} className="hover:text-white underline transition-colors">Abort_Simulator</button>
      </div>
    </main>
  );
}