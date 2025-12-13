import React, { useRef } from 'react';
import { render } from '@react-three/offscreen';
import { useThree, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Trail, Float, Stars, Sparkles, useGLTF, useAnimations } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { Group, AnimationClip } from 'three';

const scrollProgressRef: { current: number } = { current: 0 };

self.onmessage = (e: MessageEvent) => {
  const data = e.data as { type?: string; value?: number };
  if (data && data.type === 'scroll' && typeof data.value === 'number') {
    scrollProgressRef.current = Math.min(1, Math.max(0, data.value));
  }
};

function lerpVec(a: [number, number, number], b: [number, number, number], t: number): [number, number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

function CameraController() {
  const { camera } = useThree();
  const start: [number, number, number] = [-3, 0.5, -3];
  const topView: [number, number, number] = [0, 8, 0.5];
  const sideView: [number, number, number] = [5, 1.5, 0];
  const frontView: [number, number, number] = [0, 1.2, 3];

  useFrame(() => {
    const p = scrollProgressRef.current;
    let target: [number, number, number];
    if (p < 0.25) target = lerpVec(start, topView, p / 0.25);
    else if (p < 0.5) target = lerpVec(topView, sideView, (p - 0.25) / 0.25);
    else if (p < 0.75) target = lerpVec(sideView, frontView, (p - 0.5) / 0.25);
    else target = frontView;
    camera.position.lerp(new THREE.Vector3(...target), 0.1);
    camera.lookAt(0, 1, 0);
  });
  return null;
}

function LandingBackground() {
  return (
    <>
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 5, 30]} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={100} scale={10} size={4} speed={0.4} opacity={0.5} color="#ffffff" />
    </>
  );
}

function SpeedLines() {
  const meshRef = React.useRef<THREE.InstancedMesh>(null);
  const count = 140;
  const dummyRef = React.useRef<THREE.Object3D>(new THREE.Object3D());
  const positionsRef = React.useRef<Float32Array>(new Float32Array(count * 3));
  const velocitiesRef = React.useRef<Float32Array>(new Float32Array(count));
  const scaleZRef = React.useRef<Float32Array>(new Float32Array(count));

  const frontZ = 20;
  const backZ = -20;
  const spreadX = 2;
  const spreadY = 3;
  const safeX = 0.5;
  const safeY = 1.5;

  const neonColor = React.useMemo(() => new THREE.Color("#00FFFF").multiplyScalar(10), []);

  React.useEffect(() => {
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
      velocities[i] = 0.08 + Math.random() * 0.12;
      scaleZ[i] = 0.6 + Math.random() * 0.8;
    }
  }, []);

  useFrame(() => {
    const positions = positionsRef.current;
    const velocities = velocitiesRef.current;
    const scaleZ = scaleZRef.current;
    const dummy = dummyRef.current;

    for (let i = 0; i < count; i++) {
      let x = positions[i * 3];
      let y = positions[i * 3 + 1];
      let z = positions[i * 3 + 2];

      z -= velocities[i];
      if (z < backZ) {
        z = frontZ;
      }

      positions[i * 3 + 2] = z;

      dummy.position.set(x, y, z);
      dummy.scale.set(1, 1, scaleZ[i]);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current!.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <boxGeometry args={[0.02, 0.02, 1]} />
      <meshBasicMaterial 
        color={neonColor} 
        transparent 
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </instancedMesh>
  );
}

type GLTFResult = {
  scene: Group;
  animations: AnimationClip[];
};

function getBaseUrl(): string {
  if (typeof window !== 'undefined' && window.location) {
    return window.location.origin;
  }
  if (typeof self !== 'undefined' && 'location' in self) {
    const loc = (self as any).location;
    const origin = loc.origin ?? `${loc.protocol}//${loc.host}`;
    return origin;
  }
  return '';
}

function getModelUrl(): string {
  const base = getBaseUrl();
  const path = '/male_running_20_frames_loop.glb';
  return `${base}${path}`;
}

function RunningMan(props: React.JSX.IntrinsicElements['group']) {
  const group = React.useRef<Group>(null);
  const url = getModelUrl();
  const { scene, animations } = useGLTF(url) as unknown as GLTFResult;
  const { actions, names } = useAnimations(animations, group);

  React.useEffect(() => {
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

function SceneContents() {
  const runnerRef = useRef<Group>(null);

  useFrame(() => {
    const p = scrollProgressRef.current;
    const targetRot = p * Math.PI * 2;
    if (runnerRef.current) {
      runnerRef.current.rotation.y = THREE.MathUtils.lerp(runnerRef.current.rotation.y, targetRot, 0.15);
      runnerRef.current.position.y = THREE.MathUtils.lerp(runnerRef.current.position.y, Math.sin(p * Math.PI) * 0.2, 0.1);
    }
  });

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 5, -2]} intensity={0.5} color="#ffffff" castShadow />
      <spotLight position={[-6, 8, -12]} intensity={30} distance={45} color="#9bf6ff" angle={0.6} penumbra={1} />
      <spotLight position={[5, 2, 5]} intensity={5} color="#a0c4ff" angle={0.9} penumbra={1} distance={20} />

      <PerspectiveCamera makeDefault position={[-3, 0.5, -3]} fov={50} />
      <CameraController />

      <LandingBackground />

      <group position={[0, -0.01, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[2, 500]} />
          <meshBasicMaterial color="#9bf6ff" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>

      <Float floatIntensity={0.2} rotationIntensity={0.1} speed={2} floatingRange={[0, 0.2]}>
        <Trail width={0.3} length={8} decay={3} stride={0} color="#9bf6ff" attenuation={(w) => w}>
          <group ref={runnerRef}>
            <RunningMan scale={[1, 1, 1]} position={[0, 0, 0]} />
            <SpeedLines />
            <pointLight position={[0.2, 1.2, 0]} intensity={2} color="#9bf6ff" distance={3} />
            <pointLight position={[-0.2, 1.2, 0]} intensity={2} color="#a0c4ff" distance={3} />
          </group>
        </Trail>

        <Trail width={0.1} length={5} decay={1} stride={0} color="#9bf6ff" attenuation={(w) => w * 0.5}>
          <mesh position={[0, 1.5, -0.2]}>
            <sphereGeometry args={[0.01, 8, 8]} />
            <meshBasicMaterial color="#9bf6ff" transparent opacity={0} />
          </mesh>
        </Trail>
      </Float>

      <EffectComposer>
        <Bloom intensity={0.8} luminanceThreshold={0.3} luminanceSmoothing={0.8} mipmapBlur resolutionScale={0.5} />
      </EffectComposer>
    </>
  );
}

function Scene() {
  return <SceneContents />;
}

render(<Scene />);

export default Scene;
