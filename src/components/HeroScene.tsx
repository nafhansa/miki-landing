'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { PerspectiveCamera, Trail, Float } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { RunningMan } from './RunningMan';
import { LandingBackground } from './LandingBackground';
import { SpeedLines } from './SpeedLines';

gsap.registerPlugin(ScrollTrigger);

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

export function HeroScene({ textRefs, cameraPositions = DEFAULT_CAMERA_POSITIONS, cameraFov = 50, model }: HeroSceneProps) {
  const { camera } = useThree();
  const tl = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    camera.position.set(cameraPositions.start.x, cameraPositions.start.y, cameraPositions.start.z);

    tl.current = gsap.timeline({
      scrollTrigger: { trigger: '.story-container', start: 'top top', end: 'bottom bottom', scrub: 1.5 }
    });

    if (tl.current) {
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

    const handleTicker = () => { camera.lookAt(0, 1, 0); };
    gsap.ticker.add(handleTicker);

    return () => {
      if (tl.current) tl.current.kill();
      gsap.ticker.remove(handleTicker);
    };
  }, [camera, textRefs, cameraPositions]);

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 5, -2]} intensity={0.5} color="#ffffff" castShadow />
      <spotLight 
        position={[-6, 8, -12]} 
        intensity={30}   
        distance={45}    
        color="#F72585" 
        angle={0.6}      
        penumbra={1} 
      />
      <spotLight position={[5, 2, 5]} intensity={5} color="#CCFF00" angle={0.9} penumbra={1} distance={20} />

      <PerspectiveCamera makeDefault position={[cameraPositions.start.x, cameraPositions.start.y, cameraPositions.start.z]} fov={cameraFov} />
      
      <LandingBackground />

      <group position={[0, -0.01, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[2, 500]} />
          <meshBasicMaterial 
            color="#CCFF00" 
            transparent 
            opacity={0.2}
            blending={THREE.AdditiveBlending} 
          />
        </mesh>
      </group>

      <Float floatIntensity={0.2} rotationIntensity={0.1} speed={2} floatingRange={[0, 0.2]}>
        <Trail width={0.3} length={8} decay={3} stride={0} color="#F72585" attenuation={(w) => w}>
          <group>
            <RunningMan scale={model?.scale ?? [1, 1, 1]} position={model?.position ?? [0, 0, 0]} />
            <SpeedLines />
            <pointLight position={[0.2, 1.2, 0]} intensity={2} color="#F72585" distance={3} />
            <pointLight position={[-0.2, 1.2, 0]} intensity={2} color="#CCFF00" distance={3} />
          </group>
        </Trail>

        <Trail width={0.1} length={5} decay={1} stride={0} color="#CCFF00" attenuation={(w) => w * 0.5}>
          <mesh position={[0, 1.5, -0.2]}>
            <sphereGeometry args={[0.01, 8, 8]} />
            <meshBasicMaterial color="#CCFF00" transparent opacity={0} />
          </mesh>
        </Trail>
      </Float>

      <EffectComposer>
        <Bloom 
            intensity={1.0} 
            luminanceThreshold={0.1} 
            luminanceSmoothing={0.9} 
            mipmapBlur
        />
      </EffectComposer>
    </>
  );
}
