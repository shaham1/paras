"use client";

import React, { useState, useEffect } from 'react';

interface FaultyLettersProps {
  text: string;
  payload?: string;
}

export default function FaultyLetters({ text, payload }: FaultyLettersProps) {
  const [glitchText, setGlitchText] = useState(text);
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#!@$%^&*()_+";

  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly decide to glitch a few characters
      const newText = text.split('').map((char, i) => {
        if (char === " ") return " ";
        // 5% chance to glitch a character per frame
        if (Math.random() > 0.95) {
          return characters[Math.floor(Math.random() * characters.length)];
        }
        return char;
      }).join('');
      
      setGlitchText(newText);
    }, 100);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full select-none">
      <div className="font-mono text-[8vw] font-black tracking-tighter text-pink-500/10 break-all leading-none text-center">
        {glitchText}
      </div>
      {payload && (
        <div className="mt-4 font-mono text-xs tracking-[1em] text-purple-500/20 uppercase">
          {payload}
        </div>
      )}
    </div>
  );
}