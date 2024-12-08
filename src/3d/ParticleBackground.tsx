import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const ParticleBackground = () => {
  const particlesRef = useRef();

  const particlesCount = 5000;
  const posArray = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    const { clock } = state;
    particlesRef.current.rotation.y = clock.getElapsedTime() * 0.1;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={posArray}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        color="#5786F5" 
        size={0.005} 
        transparent 
        opacity={0.8} 
      />
    </points>
  );
};

export const AnimatedParticleBackground = () => {
  return (
    <Canvas 
      camera={{ position: [0, 0, 5] }}
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        zIndex: -1 
      }}
    >
      <ParticleBackground />
    </Canvas>
  );
};
