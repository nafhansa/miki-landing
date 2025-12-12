'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { PerspectiveCamera, ContactShadows, Environment } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RunningMan } from './RunningMan';
import { LandingBackground } from './LandingBackground'; // <--- Import background baru

gsap.registerPlugin(ScrollTrigger);

interface Vec3 { x: number; y: number; z: number }
interface CameraPositions {
  start: Vec3; topView: Vec3; sideView: Vec3; frontView: Vec3;
}
interface HeroSceneProps {
  textRefs: React.MutableRefObject<HTMLDivElement | null>[];
  cameraPositions?: CameraPositions;
  cameraFov?: number;
  model?: { position?: [number, number, number]; scale?: [number, number, number] };
}

// 🔒 POSISI KAMERA LOCKED (Sesuai request)
const DEFAULT_CAMERA_POSITIONS: CameraPositions = {
  start: { x: -3, y: 0.5, z: -3 },      
  topView: { x: 0, y: 8, z: 0.5 },
  sideView: { x: 5, y: 1.5, z: 0 },
  frontView: { x: 0, y: 1.2, z: 3 },
};

export function HeroScene({ 
  textRefs, 
  cameraPositions = DEFAULT_CAMERA_POSITIONS, 
  cameraFov = 50, 
  model 
}: HeroSceneProps) {
  
  const { camera } = useThree();
  const tl = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    // Set posisi awal
    camera.position.set(
      cameraPositions.start.x, 
      cameraPositions.start.y, 
      cameraPositions.start.z
    );

    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: ".story-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    if (tl.current) {
      tl.current
        .to(camera.position, { ...cameraPositions.topView, duration: 2 })
        .to(textRefs[0].current, { opacity: 0, y: -50, duration: 0.5 }, "<")
        .fromTo(textRefs[1].current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5 }, ">-0.5");

      tl.current
        .to(camera.position, { ...cameraPositions.sideView, duration: 2 })
        .to(textRefs[1].current, { opacity: 0, x: -50, duration: 0.5 }, "<")
        .fromTo(textRefs[2].current, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.5 }, ">-0.5");

      tl.current
        .to(camera.position, { ...cameraPositions.frontView, duration: 2 })
        .to(textRefs[2].current, { opacity: 0, duration: 0.5 }, "<")
        .fromTo(textRefs[3].current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5 }, ">-0.5");
    }

    const handleTicker = () => {
      camera.lookAt(0, 1, 0);
    };
    gsap.ticker.add(handleTicker);

    return () => {
      if (tl.current) tl.current.kill();
      gsap.ticker.remove(handleTicker);
    }
  }, [camera, textRefs, cameraPositions]);

  return (
    <>
      {/* 1. Pencahayaan Studio Modern */}
      {/* Ambient light redup agar tidak flat */}
      <ambientLight intensity={0.4} /> 
      
      {/* Main Light (Kanan Depan) - Cahaya utama */}
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={2} 
        color="#ffffff" 
        castShadow 
      />
      
      {/* Rim Light (Kiri Belakang) - Warna Biru Muda/Cyan */}
      {/* Ini kunci agar karakter terlihat 'tech' dan terpisah dari background gelap */}
      <spotLight 
        position={[-5, 5, -5]} 
        intensity={5} 
        color="#00d2ff" 
        angle={0.5} 
        penumbra={1} 
      />

      {/* Fill Light (Kanan Bawah) - Warna Ungu */}
      <spotLight 
        position={[5, 0, 5]} 
        intensity={2} 
        color="#bd00ff" 
        angle={1} 
        penumbra={1} 
      />

      {/* Environment map untuk pantulan kulit/baju agar lebih real */}
      <Environment preset="city" />

      <PerspectiveCamera
        makeDefault
        position={[
          cameraPositions.start.x,
          cameraPositions.start.y,
          cameraPositions.start.z
        ]}
        fov={cameraFov}
      />
      
      {/* 2. BACKGROUND GRADIENT MODERN */}
      <LandingBackground />

      <RunningMan
        scale={model?.scale ?? [1, 1, 1]}
        position={model?.position ?? [0, 0, 0]}
      />

      {/* 3. SHADOW */}
      {/* Bayangan tetap penting agar karakter tidak terlihat melayang */}
      <ContactShadows 
        resolution={1024} 
        scale={10} 
        blur={2} 
        opacity={0.5} 
        far={2} 
        color="#000000" 
      />
    </>
  );
}