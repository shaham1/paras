"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FriendWishPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.currentTarget);
    const payload = {
      sender: formData.get('sender'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/transmissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  }

  return (
    <main className="min-h-screen bg-[#030008] text-pink-500 font-mono flex items-center justify-center p-6 selection:bg-pink-500 selection:text-black">
      
      {/* SCANLINE OVERLAY */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,118,0.06))] bg-[length:100%_2px,3px_100%]" />

      <div className="w-full max-w-lg relative border border-pink-500/20 bg-black/40 backdrop-blur-xl p-8 md:p-12 shadow-[0_0_50px_rgba(236,72,153,0.1)]">
        
        <AnimatePresence mode="wait">
          {status !== 'success' ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-pink-500 animate-pulse" />
                  <span className="text-[10px] tracking-[0.4em] uppercase opacity-50">Secure_Transmission_Link</span>
                </div>
                <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white">
                  Broadcast to Paras
                </h1>
                <p className="text-xs text-gray-500 leading-relaxed uppercase">
                  Submit your message to the 2025 Archive. This will be stored permanently in her private vault.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <label className="text-[10px] tracking-widest text-pink-500/60 font-bold uppercase">Identification</label>
                  <input
                    required
                    name="sender"
                    placeholder="YOUR_NAME"
                    className="w-full bg-transparent border-b border-pink-500/30 py-3 text-white outline-none focus:border-pink-500 transition-colors placeholder:text-pink-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] tracking-widest text-pink-500/60 font-bold uppercase">Transmission_Data</label>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    placeholder="WRITE_YOUR_MESSAGE_HERE..."
                    className="w-full bg-white/5 border border-pink-500/10 p-4 text-white outline-none focus:border-pink-500 transition-colors placeholder:text-pink-900 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-4 border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-black font-black uppercase tracking-[0.3em] transition-all duration-300 disabled:opacity-50"
                >
                  {status === 'sending' ? 'Sending_Signal...' : 'Initiate_Broadcast'}
                </button>
                
                {status === 'error' && (
                  <p className="text-[10px] text-red-500 text-center animate-bounce">
                    [!] ERROR: Connection timed out. Try again.
                  </p>
                )}
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10 space-y-6"
            >
              <div className="text-6xl animate-pulse">📡</div>
              <h2 className="text-2xl font-black italic text-white uppercase tracking-tighter">
                Broadcast Success
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed max-w-[250px] mx-auto uppercase">
                The signal has been intercepted and routed to the secure vault.
              </p>
              <div className="pt-6">
                <button 
                  onClick={() => setStatus('idle')}
                  className="text-[10px] underline tracking-widest opacity-50 hover:opacity-100 transition-opacity"
                >
                  SEND_ANOTHER_TRANSMISSION
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CORNER ACCENTS */}
        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-pink-500" />
        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-pink-500" />
      </div>
    </main>
  );
}