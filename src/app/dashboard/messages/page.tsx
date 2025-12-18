"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { getMessages } from '@/app/actions/getMessages';
import FloatingLines from '@/components/FloatingLines';

export default function MessagesPage() {
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    
    // FETCH LIVE DATA FROM NEON
    const fetchSignals = async () => {
      const data = await getMessages();
      setMessages(data);
      setIsLoading(false);
    };

    fetchSignals();
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#030008]" />;

  return (
    <main className="relative min-h-screen bg-[#030008] text-white overflow-hidden p-6 md:p-12 flex flex-col">
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 z-0">
        <FloatingLines/>
        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]" />
      </div>

      <div className="relative z-10 flex-grow flex flex-col max-w-4xl mx-auto w-full">
        
        {/* HEADER */}
        <header className="mb-12 border-b border-pink-500/20 pb-6">
          <div className="flex justify-between items-end">
            <div>
              <p className="font-mono text-[10px] text-pink-500 tracking-[0.5em] uppercase">Intercepted_Signals</p>
              <h1 className="text-4xl font-black italic tracking-tighter uppercase text-glow">Messages</h1>
            </div>
            <div className="text-right font-mono text-[8px] text-gray-600 uppercase">
              Frequency: 107.0 MHz<br />
              Status: {isLoading ? 'SCANNING...' : 'LOCKED'}
            </div>
          </div>
        </header>

        {/* MESSAGE STREAM */}
        <section className="flex-grow space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-40">
              <div className="font-mono text-pink-500 animate-pulse tracking-[0.3em]">DECRYPTING_TRANSMISSIONS...</div>
            </div>
          ) : (
            <AnimatePresence>
              {messages.length > 0 ? (
                messages.map((msg, i) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="group relative p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-pink-500/30 transition-all backdrop-blur-md"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-mono text-[10px] text-pink-500 font-bold tracking-widest uppercase">
                        FROM: {msg.sender || "ANONYMOUS"}
                      </span>
                      <span className="text-[8px] text-gray-700 font-mono italic">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-lg font-light italic text-gray-200 leading-relaxed">
                      "{msg.message}"
                    </p>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/10 rounded-tr-2xl group-hover:border-pink-500/40 transition-colors" />
                  </motion.div>
                ))
              ) : (
                <div className="text-center p-20 border border-dashed border-white/10 rounded-3xl">
                  <p className="font-mono text-gray-600 uppercase tracking-widest text-xs">No signals intercepted yet.</p>
                </div>
              )}
            </AnimatePresence>
          )}
        </section>

        {/* FOOTER: TERMINATE SESSION BUTTON */}
        <footer className="mt-20 py-10 flex flex-col items-center gap-6 border-t border-white/5">
          <Link href="/matrix">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(236,72,153,0.15)" }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex flex-col items-center gap-2 px-12 py-5 bg-black border border-pink-500/40 rounded-full transition-all overflow-hidden"
            >
              <span className="relative z-10 text-[11px] font-mono tracking-[0.5em] text-pink-500 group-hover:text-white transition-colors">
                TERMINATE_SECURE_SESSION
              </span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/10 to-transparent h-1/2 w-full"
                animate={{ translateY: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </motion.button>
          </Link>
          <div className="text-[8px] font-mono text-gray-700 uppercase tracking-widest pt-4">
            Auth: PARAS // Node: PDX_WEST // Uptime: 19_YEARS
          </div>
        </footer>
      </div>
    </main>
  );
}