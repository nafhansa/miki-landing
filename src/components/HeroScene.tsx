'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { PerspectiveCamera, Trail, Float, MeshReflectorMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import komponen yang sudah dipisah
import { RunningMan } from './RunningMan';
import { LandingBackground } from './LandingBackground';
import { SpeedLines } from './SpeedLines'; // <--- Import file baru tadi

gsap.registerPlugin(ScrollTrigger);

// --- TIPE DATA & DEFAULT PROPS ---

interface Vec3 { x: number; y: number; z: number }
interface CameraPositions { start: Vec3; topView: Vec3; sideView: Vec3; frontView: Vec3 }
interface HeroSceneProps {
  textRefs: React.MutableRefObject<HTMLDivElement | null>[];
  cameraPositions?: CameraPositions;
  cameraFov?: number;
  model?: { position?: [number, number, number]; scale?: [number, number, number] };
}

const DEFAULT_CAMERA_POSITIONS: CameraPositions = {
  start: { x: -3, y: 0.5, z: -3 },
  topView: { x: 0, y: 8, z: 0.5 },
  sideView: { x: 5, y: 1.5, z: 0 },
  frontView: { x: 0, y: 1.2, z: 3 },
};

// --- KOMPONEN UTAMA ---

export function HeroScene({ textRefs, cameraPositions = DEFAULT_CAMERA_POSITIONS, cameraFov = 50, model }: HeroSceneProps) {
  const { camera } = useThree();
  const tl = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    // Set posisi awal kamera
    camera.position.set(cameraPositions.start.x, cameraPositions.start.y, cameraPositions.start.z);

    // Timeline ScrollTrigger
    tl.current = gsap.timeline({
      scrollTrigger: { trigger: '.story-container', start: 'top top', end: 'bottom bottom', scrub: 1.5 }
    });

    if (tl.current) {
      // Sequence Animasi Kamera & Text
      tl.current.set(textRefs[0].current, { opacity: 1, y: 0 });
      tl.current
        .to(camera.position, { ...cameraPositions.topView, duration: 2 })
        .to(textRefs[0].current, { opacity: 0, y: -50, duration: 1 }, '<')
        .fromTo(textRefs[1].current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5 }, '>-0.2')
        .to(camera.position, { ...cameraPositions.sideView, duration: 2 })
        .to(textRefs[1].current, { opacity: 0, x: -50, duration: 0.5 }, '<')
        .fromTo(textRefs[2].current, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.5 }, '>-0.5')
        .to(camera.position, { ...cameraPositions.frontView, duration: 2 })
        .to(textRefs[2].current, { opacity: 0, duration: 0.5 }, '<')
        .fromTo(textRefs[3].current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5 }, '>-0.5');
    }

    // Agar kamera selalu menatap ke tengah (objek lari)
    const handleTicker = () => { camera.lookAt(0, 1, 0); };
    gsap.ticker.add(handleTicker);

    return () => {
      if (tl.current) tl.current.kill();
      gsap.ticker.remove(handleTicker);
    };
  }, [camera, textRefs, cameraPositions]);

  return (
    <>
      {/* --- A. PENCAHAYAAN NEON --- */}
      <ambientLight intensity={0.2} />
      {/* Cahaya Utama Putih Halus */}
      <directionalLight position={[0, 5, 2]} intensity={0.5} color="#ffffff" castShadow />
      
      {/* SpotLight KIRI (Magenta #F72585) - Memberi highlight pink di sisi kiri pelari */}
      <spotLight position={[-5, 5, -2]} intensity={8} color="#F72585" angle={0.6} penumbra={1} distance={20} />
      
      {/* SpotLight KANAN (Lime #CCFF00) - Memberi highlight hijau di sisi kanan pelari */}
      <spotLight position={[5, 2, 5]} intensity={5} color="#CCFF00" angle={0.9} penumbra={1} distance={20} />

      {/* --- B. KAMERA & BACKGROUND --- */}
      <PerspectiveCamera makeDefault position={[cameraPositions.start.x, cameraPositions.start.y, cameraPositions.start.z]} fov={cameraFov} />
      <LandingBackground />
      
      <group position={[0, 0, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]} receiveShadow>
          <planeGeometry args={[40, 40]} />
          <MeshReflectorMaterial
            color="#0a0a0a"
            blur={[0, 0]}
            mixBlur={0.25}
            mixStrength={1}
            roughness={0.9}
            metalness={0.2}
            mirror={0}
            depthScale={0}
          />
        </mesh>

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} scale={[2, 220, 1]}>
          <circleGeometry args={[1, 64]} />
          <meshBasicMaterial color="#CCFF00" transparent opacity={0.08} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>
      
      {/* --- C. GROUP KARAKTER & EFEK --- */}
      {/* Float membuat karakter & garis naik turun perlahan (hovering effect) */}
      <Float floatIntensity={0.2} rotationIntensity={0.1} speed={2} floatingRange={[0, 0.2]}>
        
        {/* Trail 1: Jejak Utama (Magenta) */}
        <Trail
          width={0.3}          
          length={8}          
          decay={3}            
          stride={0}        
          color="#F72585"      
          attenuation={(w) => w} 
        >
          <group>
            <RunningMan scale={model?.scale ?? [1, 1, 1]} position={model?.position ?? [0, 0, 0]} />
            
            {/* SpeedLines dipanggil disini, jadi ikut bergerak/floating bareng pelari */}
            <SpeedLines />

            {/* Lampu 'Inner Glow' yang menempel di badan pelari */}
            <pointLight position={[0.2, 1.2, 0]} intensity={2} color="#F72585" distance={3} />
            <pointLight position={[-0.2, 1.2, 0]} intensity={2} color="#CCFF00" distance={3} />
          </group>
        </Trail>

        {/* Trail 2: Jejak Partikel Tambahan (Lime) */}
        <Trail
          width={0.1}
          length={5}
          decay={1}
          stride={0}
          color="#CCFF00"
          attenuation={(w) => w * 0.5}
        >
          <mesh position={[0, 1.5, -0.2]}>
            <sphereGeometry args={[0.01, 8, 8]} />
            <meshBasicMaterial color="#CCFF00" transparent opacity={0} />
          </mesh>
        </Trail>
      </Float>

      {/* --- D. SHADOW & POST PROCESSING --- */}
      {/* Bayangan lantai berwarna Neon Lime pudar */}


      {/* Efek Bloom membuat semua yang terang (SpeedLines, Trail, SpotLight) jadi GLOWING */}
      <EffectComposer>
        <Bloom 
            intensity={0.8} 
            luminanceThreshold={0.2} 
            luminanceSmoothing={0.5} 
        />
      </EffectComposer>
    </>
  );
}
