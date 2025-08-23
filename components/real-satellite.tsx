'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface RealSatelliteProps {
  position: [number, number, number]
  color?: string
  scale?: number
}

// Realistic satellite model based on actual satellite designs
export default function RealSatellite({ position, color = "#ffffff", scale = 1 }: RealSatelliteProps) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      // Slow rotation to simulate satellite orientation
      groupRef.current.rotation.y += 0.002
    }
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Main satellite body */}
      <mesh>
        <boxGeometry args={[0.15, 0.12, 0.25]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Solar panels - left side */}
      <mesh position={[-0.2, 0, 0]}>
        <boxGeometry args={[0.25, 0.08, 0.15]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Solar panels - right side */}
      <mesh position={[0.2, 0, 0]}>
        <boxGeometry args={[0.25, 0.08, 0.15]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Communication antenna - top */}
      <mesh position={[0, 0, 0.15]}>
        <cylinderGeometry args={[0.02, 0.02, 0.1, 8]} />
        <meshStandardMaterial 
          color="#666666" 
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      
      {/* Communication antenna - bottom */}
      <mesh position={[0, 0, -0.15]}>
        <cylinderGeometry args={[0.015, 0.015, 0.08, 8]} />
        <meshStandardMaterial 
          color="#666666" 
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      
      {/* Side antennas */}
      <mesh position={[0.08, 0.06, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.05, 6]} />
        <meshStandardMaterial 
          color="#888888" 
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>
      
      <mesh position={[-0.08, 0.06, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.05, 6]} />
        <meshStandardMaterial 
          color="#888888" 
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>
      
      {/* Solar panel details - left */}
      <mesh position={[-0.2, 0, 0]}>
        <boxGeometry args={[0.23, 0.06, 0.13]} />
        <meshStandardMaterial 
          color="#0066cc" 
          metalness={0.3}
          roughness={0.7}
          emissive="#003366"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Solar panel details - right */}
      <mesh position={[0.2, 0, 0]}>
        <boxGeometry args={[0.23, 0.06, 0.13]} />
        <meshStandardMaterial 
          color="#0066cc" 
          metalness={0.3}
          roughness={0.7}
          emissive="#003366"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Thermal control panels */}
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[0.13, 0.02, 0.23]} />
        <meshStandardMaterial 
          color="#444444" 
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>
      
      <mesh position={[0, -0.08, 0]}>
        <boxGeometry args={[0.13, 0.02, 0.23]} />
        <meshStandardMaterial 
          color="#444444" 
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>
    </group>
  )
}
