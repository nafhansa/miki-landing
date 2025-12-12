'use client';

import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { Group, AnimationClip } from 'three';

type GLTFResult = {
  scene: Group;
  animations: AnimationClip[];
};

export function RunningMan(props: React.JSX.IntrinsicElements['group']) {
  const group = useRef<Group>(null);

  // Casting hasil load ke tipe GLTFResult
  const { scene, animations } = useGLTF('/male_running_20_frames_loop.glb') as unknown as GLTFResult;
  
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    // Memastikan animasi ada sebelum dijalankan
    if (names.length > 0 && actions[names[0]]) {
        actions[names[0]]?.reset().fadeIn(0.5).play();
    }
  }, [actions, names]);

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Menggunakan primitive object scene agar aman */}
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/male_running_20_frames_loop.glb');
