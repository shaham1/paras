"use client";

import React, { useState, useEffect } from 'react';

export default function TimeCapsule() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0, distance: 0, progress: 0
  });

  useEffect(() => {
    // BIRTHDAY: Dec 28, 2025
    const targetDate = new Date('2025-12-28T00:00:00').getTime();
    const startDate = new Date('2024-12-28T00:00:00').getTime(); // Start of her 18th year

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      // Calculate Progress of the year (%)
      const totalYear = targetDate - startDate;
      const elapsed = now - startDate;
      const progressPercent = Math.min((elapsed / totalYear) * 100, 100);

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const m = Math.floor((difference / 1000 / 60) % 60);
      const s = Math.floor((difference / 1000) % 60);

      // Orbital Velocity: 107,000 km/h
      const hoursRemaining = Math.max(difference / (1000 * 60 * 60), 0);
      const dist = hoursRemaining * 107000; 

      setTimeLeft({ 
        days: d, hours: h, minutes: m, seconds: s, 
        distance: dist, progress: progressPercent 
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="border border-pink-500/20 bg-black/60 backdrop-blur-xl p-6 rounded-2xl font-mono shadow-[0_0_30px_rgba(236,72,153,0.05)]">
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-1">
          <span className="text-[10px] tracking-[0.3em] text-pink-500 uppercase font-bold text-glow">Mission_Clock</span>
          <h3 className="text-white text-xs font-black italic">PHASE_18 // TERMINATING</h3>
        </div>
        <div className="text-right">
          <span className="text-[8px] text-gray-500 uppercase">Status</span>
          <div className="text-[10px] text-green-500 animate-pulse">OPTIMAL</div>
        </div>
      </div>

      {/* COUNTDOWN GRID */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {[
          { l: 'D', v: timeLeft.days },
          { l: 'H', v: timeLeft.hours },
          { l: 'M', v: timeLeft.minutes },
          { l: 'S', v: timeLeft.seconds }
        ].map((u) => (
          <div key={u.l} className="bg-white/5 rounded-lg py-2 border border-white/5">
            <div className="text-xl font-black text-white">{String(Math.max(u.v, 0)).padStart(2, '0')}</div>
            <div className="text-[7px] text-gray-500 font-bold">{u.l}</div>
          </div>
        ))}
      </div>

      {/* PROGRESS BAR */}
      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-[8px] font-bold uppercase tracking-tighter">
          <span className="text-gray-500">Revolution_18_Completion</span>
          <span className="text-pink-500">{timeLeft.progress.toFixed(4)}%</span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 p-[1px]">
          <div 
            className="h-full bg-gradient-to-r from-purple-600 via-pink-500 to-white transition-all duration-1000 ease-linear shadow-[0_0_10px_rgba(236,72,153,0.5)]" 
            style={{ width: `${timeLeft.progress}%` }}
          />
        </div>
      </div>

      {/* DISTANCE REMAINING */}
      <div className="pt-4 border-t border-white/5">
        <div className="flex justify-between items-center">
          <span className="text-[9px] text-gray-400 uppercase tracking-widest">Target: Year_19</span>
          <span className="text-[10px] font-bold text-pink-500">
            -{Math.floor(timeLeft.distance).toLocaleString()} KM
          </span>
        </div>
      </div>
    </div>
  );
}