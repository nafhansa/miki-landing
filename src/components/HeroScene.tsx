'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RunningMan } from './RunningMan';

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

// 1. Single Source of Truth: Definisikan di luar component
const DEFAULT_CAMERA_POSITIONS: CameraPositions = {
  start: { x: -3, y: 0.5, z: -3 },      
  topView: { x: 0, y: 8, z: 0.5 },
  sideView: { x: 5, y: 1.5, z: 0 },
  frontView: { x: 0, y: 1.2, z: 3 },
};

export function HeroScene({ 
  textRefs, 
  cameraPositions = DEFAULT_CAMERA_POSITIONS, // 2. Gunakan sebagai default prop
  cameraFov = 50, 
  model 
}: HeroSceneProps) {
  
  const { camera } = useThree();
  const tl = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    // 3. Langsung set posisi kamera saat mount agar sinkron dengan PerspectiveCamera
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
      <color attach="background" args={['#ffffff']} />
      
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 10, 5]} intensity={2} castShadow />
      <Environment preset="city" />

      {/* 4. Gunakan props yang sama persis, tanpa hardcode '?? 0' lagi */}
      <PerspectiveCamera
        makeDefault
        position={[
          cameraPositions.start.x,
          cameraPositions.start.y,
          cameraPositions.start.z
        ]}
        fov={cameraFov}
      />
      
      <RunningMan
        scale={model?.scale ?? [1, 1, 1]}
        position={model?.position ?? [0, 0, 0]}
      />
    </>
  );
}