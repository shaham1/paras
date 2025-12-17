"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

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
    <main className="h-screen w-full bg-black flex items-center justify-center p-6 font-mono text-pink-500">
      <div className="w-full max-w-2xl space-y-6">
        <div className="space-y-2 text-sm opacity-80 h-48 overflow-y-auto flex flex-col justify-end">
          {logs.map((log, i) => (
            <p key={i} className={log.startsWith('✓') ? "text-green-500" : log.startsWith('✗') ? "text-red-500" : ""}>{log}</p>
          ))}
        </div>

        <motion.div key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 border-t border-pink-500/20 pt-6">
          <p className="text-white text-lg">{QUIZ_STEPS[step].question}</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="font-bold">GUEST@PARAS_VAULT:~$</span>
              <input 
                autoFocus 
                type="text" 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)}
                className="bg-transparent border-none outline-none text-white w-full uppercase caret-pink-500"
              />
            </div>
            <p className="text-[10px] text-gray-600 uppercase tracking-widest">{QUIZ_STEPS[step].hint}</p>
          </form>
        </motion.div>
      </div>
    </main>
  );
}