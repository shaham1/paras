"use client";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import FloatingLines from "@/components/FloatingLines";

const MILESTONES = [
  { year: "2022", event: "The Big Bang", desc: "Our first conversation. Everything started here." },
  { year: "2023", event: "The Stabilization", desc: "Becoming the person I can't imagine my day without." },
  { year: "2024", event: "The Acceleration", desc: "A year of growth, laughter, and $25.7 \text{ million km}$ of orbit." },
];

export default function TimelinePage() {
  return (
    <main className="relative min-h-screen bg-[#030008] text-white p-20">
      <div className="absolute inset-0 z-0"><FloatingLines/></div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <Badge className="mb-8 bg-pink-500/20 text-pink-500 border-pink-500/40 font-mono">CHAPTER_02: THE_TIMELINE</Badge>
        
        <div className="space-y-24 border-l border-white/10 pl-10">
          {MILESTONES.map((m, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="absolute -left-[53px] top-0 w-6 h-6 bg-pink-500 rounded-full border-4 border-[#030008]" />
              <span className="font-mono text-pink-500 text-sm">{m.year}</span>
              <h3 className="text-4xl font-black italic uppercase mt-2">{m.event}</h3>
              <p className="text-gray-400 mt-4 text-xl font-light">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}