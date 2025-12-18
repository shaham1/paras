"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import FaultyLetters from '@/components/FaultyLetters';

const QUIZ_STEPS = [
  {
    level: "01",
    code: "TRANSPORT_SYNC",
    question: "Mom decides to switch the van route because 'She' is doing it too. Who was the original catalyst for this orbit?",
    options: [
      { text: "A Random Driver", correct: false },
      { text: "The Laiba Factor", correct: true },
      { text: "A Navigation Glitch", correct: false }
    ],
    answer: "Laiba",
    hint: "Think back to the van route change in Grade 11."
  },
  {
    level: "02",
    code: "RANT_PROCESSING",
    question: "Despite 'Taking Sides' initially, Paras spent hours every night listening to the Architect rant. Who was this architect:",
    options: [
      { text: "Permanent Ear Damage", correct: false },
      { text: "The foundation of real friendship", correct: true },
      { text: "System Overheat", correct: false }
    ],
    answer: "Shaham",
    hint: "It wasn't about the ear damage, though that was a risk."
  },
  {
    level: "03",
    code: "HEHEHE",
    question: "HAPPY BIRTHDAY PARAS, I Love You (say it back)",
    answer: "i love you too",
    hint: "Distance is just a number for 107,000 KM/H signals."
  }
];

export default function TerminalGate() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [logs, setLogs] = useState<string[]>([
    "Initializing secure handshake...",
    "System: Paras_Archive_v2.5",
    "Identity Verification Required."
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentStep = QUIZ_STEPS[step];

    if (inputValue.toUpperCase() === currentStep.answer.toUpperCase()) {
      const nextLogs = [
        `> ${inputValue}`,
        "✓ VERIFICATION_SUCCESSFUL",
        "--------------------------"
      ];
      
      if (step < QUIZ_STEPS.length - 1) {
        setLogs(prev => [...prev, ...nextLogs]);
        setStep(prev => prev + 1);
        setInputValue("");
      } else {
        setLogs(prev => [...prev, ...nextLogs, "ALL PROTOCOLS CLEARED", "DECRYPTING_DASHBOARD..."]);
        setTimeout(() => router.push('/dashboard'), 1500);
      }
    } else {
      setLogs(prev => [...prev, `> ${inputValue}`, "✗ ACCESS_DENIED: DATA_MISMATCH", "RETRYING..."]);
      setInputValue("");
    }
  };

  return (
    <main className="relative h-screen w-full bg-[#050505] flex items-center justify-center p-4 overflow-hidden">
      
      {/* BACKGROUND: FAULTY TERMINAL EFFECT */}
      <div className="absolute inset-0 z-0 opacity-70 pointer-events-none">
        <FaultyLetters 
          text="ACCESS RESTRICTED IDENTIFY SUBJECT PARAS 19.0 ENCRYPTION ACTIVE" 
          payload="PARAS_ARCHIVE_NODE_1228"
        />
      </div>

      {/* LINUX TERMINAL WINDOW */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-15 w-full max-w-5xl rounded-xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl bg-black/90"
      >
        {/* TITLE BAR */}
        <div className="bg-[#1a1a1a] px-4 py-2 flex items-center justify-between border-b border-white/5">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="text-[10px] font-mono text-gray-500 tracking-[0.3em] uppercase">
            bash — paras@linux-terminal: ~
          </div>
          <div className="w-10" />
        </div>

        {/* TERMINAL BODY */}
        <div className="p-8 font-mono text-pink-500 h-[600px] flex flex-col">
          {/* LOG SCROLL AREA */}
          <div className="flex-grow overflow-y-auto scrollbar-hide space-y-2 text-sm opacity-80">
            {logs.map((log, i) => (
              <p key={i} className={
                log.startsWith('✓') ? "text-green-400" : 
                log.startsWith('✗') ? "text-red-400" : ""
              }>
                {log}
              </p>
            ))}
          </div>

          {/* ACTIVE INPUT AREA */}
          <div className="mt-6 border-t border-pink-500/10 pt-6">
            <AnimatePresence mode="wait">
              <motion.p 
                key={step}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-white text-base mb-4 italic"
              >
                {QUIZ_STEPS[step].question}
              </motion.p>
            </AnimatePresence>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-purple-400 font-bold font-mono">paras@vault:~$</span>
                <input 
                  autoFocus 
                  type="text" 
                  value={inputValue} 
                  onChange={(e) => setInputValue(e.target.value)}
                  className="bg-transparent border-none outline-none text-white w-full uppercase caret-pink-500"
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
              <p className="text-[9px] text-gray-600 uppercase tracking-widest mt-1">
                {QUIZ_STEPS[step].hint}
              </p>
            </form>
          </div>
        </div>

        {/* WINDOW FOOTER */}
        <div className="px-8 py-3 bg-white/[0.02] border-t border-white/5 flex justify-between items-center text-[9px] text-gray-600">
          <span>ENC: AES-256-GCM</span>
          <span className="text-pink-500/40 tracking-tighter">PARAS_PROTOCOL_v2.5</span>
        </div>
      </motion.div>

      {/* CRT SCANLINE OVERLAY */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%]" />
    </main>
  );
}