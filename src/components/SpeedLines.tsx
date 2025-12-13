'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function SpeedLines() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 140;
  const dummyRef = useRef<THREE.Object3D>(new THREE.Object3D());
  const positionsRef = useRef<Float32Array>(new Float32Array(count * 3));
  const velocitiesRef = useRef<Float32Array>(new Float32Array(count));
  const scaleZRef = useRef<Float32Array>(new Float32Array(count));
  const frontZ = 20;
  const backZ = -20;
  const spreadX = 2;
  const spreadY = 3;
  const safeX = 0.5;
  const safeY = 1.5;

  useEffect(() => {
    const positions = positionsRef.current;
    const velocities = velocitiesRef.current;
    const scaleZ = scaleZRef.current;
    for (let i = 0; i < count; i++) {
      let x = (Math.random() * 2 - 1) * spreadX;
      let y = (Math.random() * 2 - 1) * spreadY;
      while (Math.abs(x) < safeX && Math.abs(y) < safeY) {
        x = (Math.random() * 2 - 1) * spreadX;
        y = (Math.random() * 2 - 1) * spreadY;
      }
      const z = Math.random() * (frontZ - backZ) + backZ;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      velocities[i] = Math.random() * 0.2 + 0.2;
      scaleZ[i] = Math.random() * 5 + 2;
    }
    if (meshRef.current) {
      const dummy = dummyRef.current;
      for (let i = 0; i < count; i++) {
        dummy.position.set(
          positions[i * 3],
          positions[i * 3 + 1],
          positions[i * 3 + 2]
        );
        dummy.scale.set(1, 1, scaleZ[i]);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [count, frontZ, backZ, spreadX, spreadY, safeX, safeY]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const positions = positionsRef.current;
    const velocities = velocitiesRef.current;
    const scaleZ = scaleZRef.current;
    const dummy = dummyRef.current;

    for (let i = 0; i < count; i++) {
      positions[i * 3 + 2] -= velocities[i] * (delta * 40);
      if (positions[i * 3 + 2] < backZ) {
        positions[i * 3 + 2] = frontZ;
      }

      const x = positions[i * 3];
      const y = positions[i * 3 + 1];
      if (Math.abs(x) < 0.5 && Math.abs(y) < 1.5) {
         positions[i * 3] = x > 0 ? 0.8 : -0.8;
      }

      dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      dummy.scale.set(1, 1, scaleZ[i]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh 
      ref={meshRef} 
      args={[undefined, undefined, count]} 
      frustumCulled={false}
    >
      <boxGeometry args={[0.01, 0.01, 1]} />
      <meshBasicMaterial 
        color="#CCFF00"
        transparent 
        opacity={0.2} 
        blending={THREE.AdditiveBlending}
        depthWrite={false} 
      />
    </instancedMesh>
  );
}
