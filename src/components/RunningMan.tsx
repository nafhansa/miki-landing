'use client';

import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { Group, AnimationClip } from 'three';

type GLTFResult = {
  scene: Group;
  animations: AnimationClip[];
};

function getBaseUrl(): string {
  if (typeof window !== 'undefined' && window.location) {
    return window.location.origin;
  }
  if (typeof self !== 'undefined' && 'location' in self) {
    const loc = (self as unknown as { location: Location }).location;
    const origin = (loc as Location & { origin?: string }).origin ?? `${loc.protocol}//${loc.host}`;
    return origin;
  }
  return '';
}

function getModelUrl(): string {
  const base = getBaseUrl();
  const path = '/male_running_20_frames_loop.glb';
  return `${base}${path}`;
}

export function RunningMan(props: React.JSX.IntrinsicElements['group']) {
  const group = useRef<Group>(null);

  const url = getModelUrl();
  const { scene, animations } = useGLTF(url) as unknown as GLTFResult;
  
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    if (names.length > 0 && actions[names[0]]) {
        actions[names[0]]?.reset().fadeIn(0.5).play();
    }
  }, [actions, names]);

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(getModelUrl());
