'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import vertexShader from '../shaders/ascii_vertex.glsl';
import fragmentShader from '../shaders/ascii_fragment.glsl';

const CHARACTERS = ['.', ':', '·', '+', '=', '-', '#', '█', '░', '▒', '/', '\\', '|', '<', '>', '0', '1', '*', '≡', '≈'];
const COLS = 5;
const ROWS = 4;
const COUNT = 12000;

function generateAsciiTexture() {
  const canvas = document.createElement('canvas');
  const size = 512;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.Texture();

  // Clear transparent
  ctx.clearRect(0, 0, size, size);
  
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  const cellW = size / COLS;
  const cellH = size / ROWS;
  ctx.font = `bold ${cellH * 0.6}px monospace`;

  for (let i = 0; i < CHARACTERS.length; i++) {
    const char = CHARACTERS[i];
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    const x = col * cellW + cellW / 2;
    const y = row * cellH + cellH / 2;
    ctx.fillText(char, x, y);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearMipMapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

export default function AsciiBackground() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { camera } = useThree();
  
  const texture = useMemo(() => generateAsciiTexture(), []);
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector3(0, 0, 0) },
    uTexture: { value: texture }
  }), [texture]);

  const { positions, charIndices, scales, speeds, phases } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const charIndices = new Float32Array(COUNT);
    const scales = new Float32Array(COUNT);
    const speeds = new Float32Array(COUNT);
    const phases = new Float32Array(COUNT);
    
    for (let i = 0; i < COUNT; i++) {
      // Spread widely across X and Y, vary Z for depth (Foreground, Mid, Background)
      const x = (Math.random() - 0.5) * 40;
      const y = (Math.random() - 0.5) * 30;
      const z = (Math.random() - 0.5) * 15 - 5; // -12.5 to 2.5 (Background to foreground)
      
      positions[i * 3 + 0] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      charIndices[i] = Math.floor(Math.random() * CHARACTERS.length);
      
      // Density naturally varies. Make background characters smaller, foreground slightly larger
      const baseScale = 0.05 + Math.random() * 0.15;
      scales[i] = baseScale * (1.0 + (z + 12.5) * 0.05);
      
      speeds[i] = 0.1 + Math.random() * 0.3;
      phases[i] = Math.random() * Math.PI * 2;
    }
    
    return { positions, charIndices, scales, speeds, phases };
  }, []);

  useEffect(() => {
    if (meshRef.current) {
      const matrix = new THREE.Matrix4();
      for (let i = 0; i < COUNT; i++) {
        matrix.setPosition(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
        meshRef.current.setMatrixAt(i, matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [positions]);

  useFrame((state) => {
    if (!materialRef.current) return;
    
    materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    
    // Unproject mouse to a world plane
    const vector = new THREE.Vector3(state.pointer.x, state.pointer.y, 0.5);
    vector.unproject(camera);
    const dir = vector.sub(camera.position).normalize();
    // Intersect with a plane around Z=-2 (mid-depth of the particles)
    const distance = (-2 - camera.position.z) / dir.z;
    const pos = camera.position.clone().add(dir.multiplyScalar(distance));
    
    // Smooth mouse position for 'magnetic' feeling (no jittering/snapping)
    materialRef.current.uniforms.uMouse.value.lerp(pos, 0.05);
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]}>
      <planeGeometry args={[1, 1]}>
        <instancedBufferAttribute attach="attributes-aCharIndex" args={[charIndices, 1]} />
        <instancedBufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <instancedBufferAttribute attach="attributes-aSpeed" args={[speeds, 1]} />
        <instancedBufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
      </planeGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
}
