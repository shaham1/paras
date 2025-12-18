"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function CommuteMinigame() {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [playerPos, setPlayerPos] = useState(50); // Percentage
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle Input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setPlayerPos(p => Math.max(0, p - 10));
      if (e.key === 'ArrowRight') setPlayerPos(p => Math.min(100, p + 10));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Game Logic
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const interval = setInterval(() => {
      setScore(s => s + 1);
      // Random "Collision" Logic (Simulated for simplicity)
      if (Math.random() > 0.98) {
        // setGameOver(true); // Optional: Make it hard or just a score chaser
      }
    }, 100);

    return () => clearInterval(interval);
  }, [gameStarted, gameOver]);

  return (
    <main className="h-screen w-full bg-[#030008] text-pink-500 font-mono flex flex-col items-center justify-center p-6">
      
      <div className="text-center mb-8 space-y-2">
        <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white">Van_Runner_v1.0</h1>
        <p className="text-[10px] tracking-[0.3em] opacity-50">VELOCITY: 107,000 KM/H // STATUS: {gameStarted ? 'SYNCED' : 'STANDBY'}</p>
      </div>

      <div 
        ref={containerRef}
        className="relative w-full max-w-md h-[500px] border border-pink-500/30 bg-black/60 rounded-3xl overflow-hidden backdrop-blur-md"
      >
        {/* ROAD LINES */}
        <div className="absolute inset-0 flex justify-around opacity-10">
          <div className="w-px h-full bg-pink-500" />
          <div className="w-px h-full bg-pink-500" />
        </div>

        {!gameStarted ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20 space-y-6 p-8 text-center">
            <p className="text-sm italic">"Navigate the Grade 11 static. Collect the comfort fragments."</p>
            <button 
              onClick={() => setGameStarted(true)}
              className="px-8 py-3 border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-black transition-all font-black uppercase"
            >
              Start_Commute
            </button>
          </div>
        ) : (
          <>
            {/* SCORE HUD */}
            <div className="absolute top-4 left-4 z-10 text-[10px] font-bold">
              DISTANCE: {score * 107} KM
            </div>

            {/* PLAYER (The Van/Signal) */}
            <motion.div 
              animate={{ left: `${playerPos}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute bottom-10 -ml-4 w-8 h-12 bg-pink-500 rounded-lg shadow-[0_0_20px_#ff007f] flex items-center justify-center"
            >
              <div className="w-1 h-6 bg-white/20 rounded-full" />
            </motion.div>

            {/* RANDOM MEMORY FRAGMENTS (Purely visual for now) */}
            <motion.div 
              animate={{ y: [0, 500] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-1/4 text-white opacity-20 text-[10px]"
            >
              [PASSWORD_SYNK]
            </motion.div>
          </>
        )}
      </div>

      {/* CONTROLS */}
      <div className="mt-8 flex gap-8 text-[10px] text-gray-500 uppercase tracking-widest">
        <span>Use [←] [→] to dodge static</span>
        <button onClick={() => window.history.back()} className="underline hover:text-white">Exit_Simulator</button>
      </div>

    </main>
  );
}