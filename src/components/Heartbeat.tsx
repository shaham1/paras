"use client";
import React from 'react';

export default function Heartbeat() {
  return (
    <div className="w-full h-24 relative overflow-hidden opacity-30">
      <svg viewBox="0 0 1000 100" className="w-full h-full">
        <path
          d="M0 50 L100 50 L110 30 L120 70 L130 50 L250 50 L260 10 L275 90 L290 50 L500 50"
          stroke="#ff007f"
          strokeWidth="2"
          fill="none"
          className="heartbeat-path"
        />
      </svg>
      <style jsx>{`
        .heartbeat-path {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw 3s linear infinite;
        }
        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}