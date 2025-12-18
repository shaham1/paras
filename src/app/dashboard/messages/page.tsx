import React from 'react';
import { motion } from 'framer-motion';
import FloatingLines from '@/components/FloatingLines';
import Heartbeat from '@/components/Heartbeat';
import { prisma } from "@/lib/prisma";

// This makes the page fetch fresh data on every visit instead of caching a static version
export const revalidate = 0;

export default async function MessageStream() {
  // 1. FETCH DATA DIRECTLY FROM NEON
  const messages = await prisma.transmission.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <main className="relative min-h-screen bg-[#030008] text-white overflow-x-hidden">
      {/* BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0">
        <FloatingLines/>
        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* TOP HUD */}
      <nav className="fixed top-0 w-full z-50 p-8 flex justify-between items-center backdrop-blur-md border-b border-white/5">
        <div className="font-mono text-[10px] tracking-[0.5em] text-pink-500">
          ARCHIVE // COMMUNICATIONS_LOG
        </div>
        <div className="font-mono text-[10px] text-gray-500">
          TOTAL_TRANSMISSIONS: {messages.length}
        </div>
      </nav>

      <div className="relative z-10 pt-40 pb-60 max-w-3xl mx-auto px-6">
        <div className="absolute left-1/2 -translate-x-1/2 top-40 bottom-40 w-px bg-gradient-to-b from-pink-500 via-purple-500 to-transparent opacity-20" />

        <div className="space-y-64">
          {messages.length > 0 ? (
            messages.map((m) => (
              <div key={m.id} className="relative">
                <div className="flex flex-col items-center mb-8">
                  <div className="w-2 h-2 rounded-full bg-pink-500 mb-4 shadow-[0_0_15px_#ff007f]" />
                  <span className="font-mono text-[10px] tracking-[0.3em] text-pink-500 uppercase">
                    INCOMING_SIGNAL
                  </span>
                  <h2 className="text-2xl font-black italic uppercase mt-2 tracking-tighter">
                    {m.sender}
                  </h2>
                </div>

                <div className="bg-white/5 border border-white/10 backdrop-blur-3xl p-12 rounded-[3rem] text-center group hover:border-pink-500/50 transition-colors duration-500">
                  <p className="text-3xl font-light italic leading-relaxed text-gray-200 group-hover:text-white transition-colors">
                    "{m.message}"
                  </p>
                </div>
                
                <div className="text-center mt-4 opacity-20 font-mono text-[8px] tracking-widest uppercase">
                  Log_Ref: {m.id.substring(0, 8)} // {m.createdAt.toLocaleDateString()}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-40 opacity-30 italic font-light">
              No transmissions intercepted yet. The archive is silent...
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 w-full z-50 bg-gradient-to-t from-black to-transparent pt-20">
        <Heartbeat />
      </div>
    </main>
  );
}