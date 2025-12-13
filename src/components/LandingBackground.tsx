'use client';

import React from 'react';
import { Stars, Sparkles } from '@react-three/drei';

export function LandingBackground() {
  return (
    <>
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 5, 30]} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={100} scale={10} size={4} speed={0.4} opacity={0.5} color="#ffffff" />
    </>
  );
}
