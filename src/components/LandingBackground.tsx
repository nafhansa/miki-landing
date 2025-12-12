'use client';

import React from 'react';
// HAPUS BARIS LAMINA, KITA TIDAK PAKAI
import { GradientTexture, Stars } from '@react-three/drei';
import * as THREE from 'three';

export function LandingBackground() {
  return (
    <group>
      {/* 1. Bola Raksasa sebagai Kanvas Background 
        Kita pakai Sphere dengan 'BackSide' agar warnanya muncul di bagian dalam bola.
      */}
      <mesh scale={[50, 50, 50]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial side={THREE.BackSide}>
          {/* GradientTexture: Membuat efek gradasi warna modern.
            stops: Posisi warna (0% sampai 100%)
            colors: Pilihan warna (Midnight Blue Gradient)
          */}
          <GradientTexture
            stops={[0, 0.3, 1]} 
            colors={['#050505', '#1a1a2e', '#16213e']} 
            size={1024} 
          />
        </meshBasicMaterial>
      </mesh>

      {/* 2. Bintang/Partikel Halus (Opsional) */}
      <Stars 
        radius={20} 
        depth={50} 
        count={2000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1} 
      />
    </group>
  );
}