"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
// Note: Ensure you have the FaultyLetters component in your components folder
import FaultyLetters from '@/components/FaultyLetters'; 

const QUIZ_STEPS = [
  {
    question: "PROTOCOL 01: SUBJECT_VERIFICATION. What is the name of the place where we spent 4 hours talking about the 'Coffee Incident'?",
    answer: "STARBUCKS", 
    hint: "Hint: It's the one with the shaky table."
  },
  {
    question: "PROTOCOL 02: TEMPORAL_SYNC. In which year did we officially hit the 'Inseparable' threshold?",
    answer: "2022",
    hint: "Hint: The year of the 1000km road trip."
  },
  {
    question: "PROTOCOL 03: CHARACTER_CHECK. Which of these is your primary fuel source: [A] Matcha [B] Espresso [C] Pure Chaos?",
    answer: "C",
    hint: "Hint: Option C is statistically most likely."
  }
];

export default function TerminalGate() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [logs, setLogs] = useState<string[]>([
    "Initializing secure handshake...",
    "System: Paras_Archive_v19.0",
    "Identity Verification Required."
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentStep = QUIZ_STEPS[step];

    if (inputValue.toUpperCase() === currentStep.answer.toUpperCase()) {
      const nextLogs = [`> ${inputValue}`, "✓ VERIFICATION SUCCESSFUL", "---"];
      
      if (step < QUIZ_STEPS.length - 1) {
        setLogs(prev => [...prev, ...nextLogs]);
        setStep(prev => prev + 1);
        setInputValue("");
      } else {
        setLogs(prev => [...prev, ...nextLogs, "ALL PROTOCOLS CLEARED", "DECRYPTING DASHBOARD..."]);
        setTimeout(() => router.push('/dashboard'), 1500);
      }
    } else {
      setLogs(prev => [...prev, `> ${inputValue}`, "✗ ACCESS_DENIED: DATA_MISMATCH"]);
      setInputValue("");
    }
  };

  return (
    <main className="relative h-screen w-full bg-[#050505] flex items-center justify-center p-4 overflow-hidden">
      
      {/* REACT BITS: FAULTY TERMINAL BACKGROUND */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <FaultyLetters 
          text="ACCESS DENIED ERROR 403 RESTRICTED DATA ENCRYPTION ACTIVE" 
          payload="PARAS ARCHIVE 2025"
        />
      </div>

      {/* LINUX TERMINAL WINDOW */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative z-10 w-full max-w-3xl rounded-lg overflow-hidden border border-white/10 shadow-2xl backdrop-blur-md bg-black/60"
      >
        {/* TERMINAL TITLE BAR (LINUX STYLE) */}
        <div className="bg-[#1e1e1e] px-4 py-2 flex items-center justify-between border-b border-white/5">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">
            bash — paras@linux-pdx1: ~
          </div>
          <div className="w-12" /> {/* Spacer */}
        </div>

        {/* TERMINAL BODY */}
        <div className="p-8 font-mono text-pink-500 h-[450px] flex flex-col">
          <div className="flex-grow overflow-y-auto scrollbar-hide space-y-2 text-sm opacity-90">
            {logs.map((log, i) => (
              <p key={i} className={
                log.startsWith('✓') ? "text-green-400" : 
                log.startsWith('✗') ? "text-red-400" : ""
              }>
                {log}
              </p>
            ))}
          </div>

          <div className="mt-6 border-t border-pink-500/20 pt-6">
            <p className="text-white text-lg mb-4 leading-relaxed">
              {QUIZ_STEPS[step].question}
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="font-bold text-purple-400">paras@archive:~$</span>
                <input 
                  autoFocus 
                  type="text" 
                  value={inputValue} 
                  onChange={(e) => setInputValue(e.target.value)}
                  className="bg-transparent border-none outline-none text-white w-full uppercase caret-pink-500"
                  spellCheck={false}
                />
              </div>
              <p className="text-[10px] text-gray-600 uppercase tracking-widest mt-2">
                {QUIZ_STEPS[step].hint}
              </p>
            </form>
          </div>
        </div>
      </motion.div>

      {/* SCANLINE EFFECT */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%]" />
    </main>
  );
}