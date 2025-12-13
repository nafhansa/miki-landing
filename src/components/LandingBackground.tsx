'use client';

import React from 'react';
import * as THREE from 'three';

export function LandingBackground() {
  return (
    <group>
      <mesh scale={[50, 50, 50]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial side={THREE.BackSide} color="#000000" />
      </mesh>
    </group>
  );
}
