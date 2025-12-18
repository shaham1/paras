"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const NAV_LINKS = [
  { name: 'NEURAL_ARCHIVE', path: '/vault', },
  { name: 'SIGNAL_WALK', path: '/minigame', },
  { name: 'RECOVERED_WISHES', path: '/dashboard/messages', },
  { name: 'TERMINATE', path: '/matrix', },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-black text-white font-mono flex flex-col">
      {/* 🛠️ NEURAL HUD HEADER */}
      <header className="fixed top-0 left-0 right-0 z-[100] border-b border-pink-500/20 bg-black/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo / Status */}
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse shadow-[0_0_10px_#ff007f]" />
            <div>
              <h2 className="text-xs font-black tracking-tighter uppercase italic">
                Subject_Paras_1228
              </h2>
              <p className="text-[9px] text-gray-500 uppercase leading-none">
                System_Uptime: Stable
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link key={link.path} href={link.path} className="relative group">
                  <span className={`text-[10px] tracking-[0.2em] transition-colors ${
                    isActive ? 'text-pink-500' : 'text-gray-400 group-hover:text-white'
                  }`}>
                    {link.name}
                  </span>
                  {isActive && (
                    <motion.div 
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-[1px] bg-pink-500 shadow-[0_0_10px_#ff007f]"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Metric Speed HUD */}
          <div className="text-right">
            <p className="text-[8px] text-pink-500/50 uppercase tracking-widest">Signal_Velocity</p>
            <p className="text-sm font-black italic text-white">107,000 KM/H</p>
          </div>
        </div>
      </header>

      {/* 🖥️ MAIN CONTENT AREA */}
      <main className="flex-grow pt-16 relative">
        {/* Subtle Scanline Effect Overlay */}
        <div className="absolute inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20" />
        
        {children}
      </main>

      {/* 🏁 FOOTER STATUS BAR */}
      <footer className="fixed bottom-0 left-0 right-0 z-[100] h-6 bg-pink-500 flex items-center px-4 justify-between">
        <div className="text-[9px] text-black font-black uppercase flex gap-4">
          <span>Sector: {pathname.split('/').pop()?.toUpperCase()}</span>
          <span className="opacity-50">|</span>
          <span>Lat: 24.8607° N</span>
          <span>Long: 67.0011° E</span>
        </div>
        <div className="text-[9px] text-black font-black uppercase animate-pulse">
          Connection_Secure_AES-256
        </div>
      </footer>
    </div>
  );
}