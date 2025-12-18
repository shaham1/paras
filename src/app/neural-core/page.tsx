"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingLines from '@/components/FloatingLines';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

// --- CONFIGURATION: ADD YOUR FILENAMES HERE ---
const DIRECTORIES = [
  { 
    id: 'DIR_01', 
    name: 'core_memories', 
    files: [
      { name: 'first_transmission.log', url: '', type: 'TEXT', content: 'Entry 001: The start of the Paras Protocol.' },
      { name: 'coffee_incident.jpg', url: '/archive/coffee.jpeg', type: 'IMAGE' },
      { name: 'YOUR_FIRST_CAR!!.png', url: '/archive/shadow.jpeg', type: 'IMAGE' },
    ] 
  },
  { 
    id: 'DIR_02', 
    name: 'paras_evolution', 
    files: [
      { name: 'inside_joke_01.jpg', url: '/archive/joke1.jpg', type: 'IMAGE' },
      { name: 'oh.jpeg', url: '/archive/whateven.jpeg', type: 'IMAGE' },
      { name: 'archive/lowkey.jpeg', url: '', type: 'TEXT', content: 'A reminder that you probably failed your mid-terms.' },
      { name: 'Lowkey_ate_for_once.pdf', url: '/archive/lowkey.jpeg', type: 'IMAGE'},
      { name: 'CHEATER?!?!?!?!?!.pdf', url: '/archive/image.png', type: 'IMAGE'},
      { name: 'my_dress_up_darling.pdf', url: '/archive/shrek.jpeg', type: 'IMAGE'},
      { name: 'the_manifesto.pdf', url: '', type: 'TEXT', content: "just pictures that i liked"},
    ] 
  },
  { 
    id: 'DIR_03', 
    name: 'intellectual_property', 
    files: [
      { name: 'v18_stable.jpg', url: '/archive/v18.jpg', type: 'IMAGE' },
      { name: 'v19_beta_test.jpg', url: '/archive/v19.jpg', type: 'IMAGE' }
    ] 
  },
];

export default function NeuralCore() {
  const [activeDir, setActiveDir] = useState(DIRECTORIES[0]);
  const [selectedFile, setSelectedFile] = useState<any>(null);

  return (
    <main className="relative h-screen w-full bg-[#030008] text-pink-500 font-mono p-6 md:p-12 overflow-hidden flex flex-col">
      
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 z-0">
        <FloatingLines/>
        <div className="absolute inset-0 bg-black/90 pointer-events-none" />
      </div>

      {/* TOP HUD */}
      <div className="relative z-10 flex justify-between items-center border-b border-pink-500/20 pb-4 mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.history.back()}
            className="text-[10px] border border-pink-500/30 px-2 py-1 hover:bg-pink-500 hover:text-black transition-all"
          >
            RETURN_TO_DASHBOARD
          </button>
          <span className="text-gray-500 text-[10px] tracking-widest hidden md:block">
            PATH: /root/paras/{activeDir.name}
          </span>
        </div>
        <div className="text-[10px] text-pink-500/50 animate-pulse">
          DIRECTORY_ENCRYPTION: ACTIVE (AES-256)
        </div>
      </div>

      <div className="relative z-10 flex-grow grid grid-cols-12 gap-8 overflow-hidden">
        
        {/* SIDEBAR: NAVIGATION TREE */}
        <aside className="col-span-12 md:col-span-3 border-r border-white/5 space-y-2 overflow-y-auto scrollbar-hide">
          <p className="text-[9px] text-gray-600 mb-4 uppercase tracking-[0.3em]">System_Directories</p>
          {DIRECTORIES.map((dir) => (
            <button
              key={dir.id}
              onClick={() => setActiveDir(dir)}
              className={`w-full text-left p-4 rounded-xl transition-all border group ${
                activeDir.id === dir.id 
                ? 'bg-pink-500/10 border-pink-500/40 text-white shadow-[0_0_20px_rgba(236,72,153,0.1)]' 
                : 'border-transparent text-gray-500 hover:text-pink-300 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm">/{dir.name}</span>
                <span className="text-[8px] opacity-0 group-hover:opacity-100">READ_ONLY</span>
              </div>
            </button>
          ))}
        </aside>

        {/* FILE EXPLORER GRID */}
        <section className="col-span-12 md:col-span-9 bg-white/[0.01] rounded-[2.5rem] border border-white/5 p-8 relative overflow-y-auto scrollbar-hide">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDir.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {activeDir.files.map((file, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedFile(file)}
                  className="group aspect-video bg-black/40 border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-pink-500/50 transition-all cursor-pointer relative overflow-hidden shadow-xl"
                >
                   {file.type === 'IMAGE' ? (
                     <div className="text-2xl opacity-40 group-hover:opacity-100 transition-opacity">📷</div>
                   ) : (
                     <div className="text-2xl opacity-40 group-hover:opacity-100 transition-opacity">📄</div>
                   )}
                  
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter text-center px-4">
                    {file.name}
                  </span>

                  {/* Decorative Scanline inside card */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/5 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </section>
      </div>

      {/* FOOTER BAR */}
      <div className="relative z-10 mt-8 pt-4 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 font-mono">
        <div className="flex items-center gap-3">
          <span className="text-green-500 font-bold tracking-tighter text-sm">paras@archive:~$</span>
          <span className="text-white/80 text-sm animate-pulse cursor-default">access --memories --all</span>
        </div>
        <div className="flex gap-8 text-[10px] text-gray-600 uppercase tracking-widest">
          <span>Files_Indexed: {activeDir.files.length}</span>
          <span>Buffer: Optimized</span>
        </div>
      </div>

      {/* --- FILE VIEW MODAL (LIGHTBOX) --- */}
      <AnimatePresence>
        {selectedFile && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-20 bg-black/95 backdrop-blur-md"
            onClick={() => setSelectedFile(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedFile.type === 'IMAGE' ? (
                <div className="relative w-full h-full border border-pink-500/20 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(236,72,153,0.2)]">
                  <Image 
                    src={selectedFile.url} 
                    alt={selectedFile.name}
                    fill
                    className="object-contain"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-8">
                     <p className="text-pink-500 text-xs tracking-widest uppercase font-black">{selectedFile.name}</p>
                     <p className="text-gray-500 text-[9px] mt-1 italic uppercase">Source: Archive_Node_1228</p>
                  </div>
                </div>
              ) : (
                <div className="bg-[#111] border border-pink-500/30 p-12 rounded-3xl w-full max-w-2xl shadow-2xl">
                   <h2 className="text-pink-500 mb-6 text-xl font-black italic">FILE_CONTENTS: {selectedFile.name}</h2>
                   <p className="text-gray-300 text-lg leading-relaxed font-light italic">
                     "{selectedFile.content}"
                   </p>
                </div>
              )}

              <button 
                onClick={() => setSelectedFile(null)}
                className="mt-8 text-[10px] tracking-[0.5em] text-gray-500 hover:text-white transition-colors"
              >
                [ CLOSE_VIEWER ]
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}