"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FloatingLines from '@/components/FloatingLines';

// --- CONFIG ---
const BIRTH_DATE = new Date('1998-12-18'); 
const ACCESS_PASSWORD = "SARAH"; // Change this to your secret word
const DUMMY_MEMORIES = [
  { id: 1, title: "The Coffee Incident", text: "That time we spent 4 hours talking about everything." },
  { id: 2, title: "Midnight Drive", text: "Windows down, singing at the top of our lungs." },
  { id: 3, title: "The High Score", text: "You finally beat my record. I'm still salty about it." },
];

export default function BirthdayApp() {
  const [stage, setStage] = useState(-1); // Start at -1 for Terminal
  const [inputValue, setInputValue] = useState("");
  const [terminalOutput, setTerminalOutput] = useState<string[]>(["Initializing secure connection...", "Requesting access permissions..."]);
  const [distance, setDistance] = useState(0);

  // 1. Metric Calculation
  useEffect(() => {
    const totalDays = Math.floor((new Date().getTime() - BIRTH_DATE.getTime()) / (1000 * 60 * 60 * 24));
    setDistance(totalDays * 2570000);
  }, []);

  // 2. Terminal Logic
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.toUpperCase() === ACCESS_PASSWORD) {
      setTerminalOutput(prev => [...prev, "✓ ACCESS GRANTED", "Bypassing encryption...", "Loading Sarah_Wrapped_2025..."]);
      setTimeout(() => setStage(0), 1500);
    } else {
      setTerminalOutput(prev => [...prev, "✗ INVALID CREDENTIALS", "Try again..."]);
      setInputValue("");
    }
  };

  return (
    <main className="relative h-screen w-full bg-[#030008] text-white overflow-hidden selection:bg-pink-500">
      
      {/* BACKGROUNDS */}
      <div className="absolute inset-0 z-0">
        {/* Floating lines only appear after login to create a "reveal" effect */}
        {stage >= 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
            <FloatingLines/>
            <div className="absolute inset-0 bg-black/50 pointer-events-none" />
          </motion.div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* --- STAGE -1: THE TERMINAL --- */}
        {stage === -1 && (
          <motion.div 
            key="terminal"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            className="relative z-50 h-full w-full flex items-center justify-center bg-black p-6 font-mono"
          >
            <div className="w-full max-w-2xl space-y-4">
              <div className="space-y-1 text-pink-500 text-sm opacity-80">
                {terminalOutput.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
              
              <form onSubmit={handleLogin} className="flex items-center gap-3 text-xl">
                <span className="text-pink-500 font-bold tracking-widest">GUEST@BIRTHDAY:~$</span>
                <input 
                  autoFocus
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="bg-transparent border-none outline-none text-white w-full uppercase caret-pink-500"
                  placeholder="ENTER SECRET_KEY"
                />
              </form>
              <p className="text-[10px] text-gray-600 italic">Hint: It's your name in all caps.</p>
            </div>
          </motion.div>
        )}

        {/* --- STAGE 0: THE HERO --- */}
        {stage === 0 && (
          <motion.div 
            key="hero"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="relative z-10 h-full w-full flex flex-col items-center justify-center"
          >
            <h1 className="text-[15vw] font-black italic tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-pink-200 to-purple-600 drop-shadow-[0_0_40px_rgba(236,72,153,0.25)]">
              Sarah
            </h1>
            <Button 
              onClick={() => setStage(1)}
              className="mt-12 bg-transparent border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white rounded-full px-16 py-7 text-xs tracking-[0.6em] uppercase font-mono transition-all duration-700"
            >
              Access Archive
            </Button>
          </motion.div>
        )}

        {/* --- STAGE 1: THE STATS & MEMORIES --- */}
        {stage === 1 && (
          <motion.div 
            key="content"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="relative z-10 h-full w-full flex flex-col items-center justify-center px-24 space-y-16"
          >
            <div className="w-full max-w-6xl space-y-4">
              <Badge className="bg-pink-500/10 text-pink-500 border-pink-500/20 uppercase tracking-widest">Metric Report</Badge>
              <h2 className="text-8xl font-black italic uppercase leading-none">
                {distance.toLocaleString()} <span className="text-pink-500 text-5xl tracking-normal">KM</span>
              </h2>
              <p className="text-gray-400 text-xl font-light max-w-2xl leading-relaxed">
                Total orbital distance traveled through the solar system since 1998.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-8 w-full max-w-6xl">
              {DUMMY_MEMORIES.map((m) => (
                <Card key={m.id} className="bg-black/60 border-white/10 backdrop-blur-3xl p-10 flex flex-col justify-between group hover:border-pink-500/50 transition-all duration-500 h-[320px] rounded-[2rem]">
                  <div className="text-[10px] font-mono text-pink-500/60 uppercase font-bold">Entry_00{m.id}</div>
                  <div>
                    <h4 className="text-2xl font-bold mb-3">{m.title}</h4>
                    <p className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors leading-relaxed">{m.text}</p>
                  </div>
                </Card>
              ))}
            </div>
            <button onClick={() => setStage(-1)} className="font-mono text-[10px] tracking-[1.5em] text-pink-500/30 hover:text-pink-500 uppercase">
              // Terminate_Session
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GLOBAL HUD ELEMENTS (Visible only after login) */}
      {stage >= 0 && (
        <div className="absolute inset-0 z-50 pointer-events-none p-10 flex flex-col justify-between">
           <div className="flex justify-between items-start">
              <Badge variant="outline" className="border-pink-500/50 text-pink-500 font-mono tracking-widest bg-black/40 backdrop-blur-md">
                SECURE_CONNECTION_ESTABLISHED
              </Badge>
              <div className="text-right font-mono text-[10px] text-gray-500 tracking-widest">
                [ {new Date().toLocaleTimeString()} ]
              </div>
           </div>
        </div>
      )}

      {/* FILM GRAIN EFFECT */}
      <div className="fixed inset-0 pointer-events-none z-[60] opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </main>
  );
}