'use client';
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

function Model({ url, width, height }: { url: string, width: number, height: number }) {
  const texture = useTexture(url);
  const mesh = useRef<THREE.Mesh>(null!);
  
  // Calculate aspect ratio
  const aspect = texture.image ? (texture.image as any).width / (texture.image as any).height : 1;
  const planeWidth = aspect > 1 ? 5 : 5 * aspect;
  const planeHeight = aspect > 1 ? 5 / aspect : 5;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Gentle floating
    mesh.current.position.y = Math.sin(t * 1.5) * 0.15;
    // Interactive mouse tilt
    const targetRotX = (state.pointer.y * Math.PI) / 8;
    const targetRotY = (state.pointer.x * Math.PI) / 8;
    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, -targetRotX, 0.1);
    mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, targetRotY, 0.1);
  });

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[planeWidth, planeHeight, 16, 16]} />
      <meshBasicMaterial map={texture} transparent alphaTest={0.01} side={THREE.DoubleSide} />
    </mesh>
  );
}

export default function ThreeImage({ src, className }: { src: string, className?: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <img src={src} className={className} alt="" style={{ opacity: 0 }} />; // placeholder

  return (
    <div className={className} style={{ perspective: '800px', zIndex: 10 }}>
      <Canvas camera={{ position: [0, 0, 4.5], fov: 60 }} style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        <ambientLight intensity={1} />
        <Model url={src} width={100} height={100} />
      </Canvas>
    </div>
  );
}
