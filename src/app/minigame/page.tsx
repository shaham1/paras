"use client";

import React, { Suspense, useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, PerspectiveCamera, Float, Sparkles, Box, Icosahedron, Text } from '@react-three/drei';
import * as THREE from 'three';

// 🚐 THE VAN WITH COLLISION LOGIC
function Van({ position, vanRef }: any) {
  useFrame(({ mouse, viewport }) => {
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    vanRef.current.position.x = THREE.MathUtils.lerp(vanRef.current.position.x, x, 0.1);
    vanRef.current.position.y = THREE.MathUtils.lerp(vanRef.current.position.y, y, 0.1);
    vanRef.current.rotation.z = -mouse.x * 0.4;
  });

  return (
    <mesh ref={vanRef}>
      <boxGeometry args={[1, 0.6, 2]} />
      <meshStandardMaterial color="#ff007f" emissive="#ff007f" emissiveIntensity={0.5} />
      <pointLight position={[0, 0, 1]} distance={5} intensity={2} color="white" />
    </mesh>
  );
}

// ⚠️ THE OBSTACLE
function Obstacle({ index, vanRef, onCrash }: any) {
  const mesh = useRef<THREE.Mesh>(null!);
  
  // Randomize starting positions
  const x = useMemo(() => (Math.random() - 0.5) * 10, []);
  const y = useMemo(() => (Math.random() - 0.5) * 10, []);
  const z = useMemo(() => -20 - index * 10, [index]);

  useFrame((state, delta) => {
    if (!mesh.current) return;

    // Move obstacle toward the camera
    mesh.current.position.z += 0.25;

    // Reset if it goes behind player
    if (mesh.current.position.z > 5) {
      mesh.current.position.z = -100;
      mesh.current.position.x = (Math.random() - 0.5) * 10;
      mesh.current.position.y = (Math.random() - 0.5) * 10;
    }

    // 💥 REAL-TIME COLLISION DETECTION (Distance Check)
    const distance = mesh.current.position.distanceTo(vanRef.current.position);
    if (distance < 1.2) {
      onCrash();
    }
  });

  return (
    <mesh ref={mesh} position={[x, y, z]}>
      <icosahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial color="cyan" wireframe />
    </mesh>
  );
}

export default function Vantastrophe() {
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'CRASHED'>('START');
  const [score, setScore] = useState(0);
  const vanRef = useRef<THREE.Mesh>(null!);

  const handleCrash = () => {
    if (gameState === 'PLAYING') setGameState('CRASHED');
  };

  useFrame(() => {
    if (gameState === 'PLAYING') setScore(s => s + 1);
  });

  return (
    <div className="w-full h-screen bg-[#05000a] relative overflow-hidden font-mono">
      
      {/* UI OVERLAY */}
      <div className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none text-white">
        {gameState === 'START' && (
          <div className="text-center pointer-events-auto bg-black/80 p-10 border border-pink-500/20">
            <h1 className="text-4xl font-black italic text-pink-500 mb-4">THE_VAN_PROTOCOL</h1>
            <p className="text-[10px] tracking-widest text-gray-400 mb-8">MISSION: ESCAPE GRADE 11 // SPEED: 107,000 KM/H</p>
            <button 
              onClick={() => setGameState('PLAYING')}
              className="px-10 py-4 bg-pink-500 text-black font-black uppercase hover:bg-white transition-all"
            >
              Ignition
            </button>
          </div>
        )}

        {gameState === 'CRASHED' && (
          <div className="text-center pointer-events-auto bg-red-950/90 p-10 border border-red-500">
            <h1 className="text-4xl font-black italic text-red-500 mb-4">CRITICAL_FAILURE</h1>
            <p className="text-xs mb-8 uppercase">The Van didn't make it. Final Velocity: {score} KM</p>
            <button 
              onClick={() => { setScore(0); setGameState('PLAYING'); }}
              className="px-10 py-4 bg-red-500 text-white font-black uppercase hover:bg-white hover:text-red-500 transition-all"
            >
              Re-Spawn
            </button>
          </div>
        )}

        {gameState === 'PLAYING' && (
          <div className="absolute top-10 left-10 text-pink-500 flex flex-col items-start">
             <span className="text-[10px] opacity-50">DISTANCE_TRAVERSED</span>
             <span className="text-3xl font-black italic">{score} KM</span>
             <span className="mt-4 text-[10px] bg-pink-500 text-black px-2 py-1 font-black">107,000 KM/H</span>
          </div>
        )}
      </div>

      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={75} />
        <Suspense fallback={null}>
          <color attach="background" args={['#05000a']} />
          <Stars radius={100} depth={50} count={5000} factor={4} fade />
          <ambientLight intensity={0.5} />
          
          <Van vanRef={vanRef} />

          {gameState === 'PLAYING' && Array.from({ length: 15 }).map((_, i) => (
            <Obstacle key={i} index={i} vanRef={vanRef} onCrash={handleCrash} />
          ))}

          {/* Speed Lines */}
          <gridHelper args={[100, 20, "#ff007f", "#222"]} rotation={[Math.PI / 2, 0, 0]} />
        </Suspense>
      </Canvas>
    </div>
  );
}