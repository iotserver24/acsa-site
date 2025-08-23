'use client'

import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, useTexture } from '@react-three/drei'
import * as THREE from 'three'

// Earth component with scroll-based transformations and enhanced brightness
function Earth({ scrollProgress }: { scrollProgress: number }) {
  const earthRef = useRef<THREE.Mesh>(null)
  const earthTexture = useTexture('/earth-texture.jpg')
  
  useFrame((state) => {
    if (earthRef.current) {
      // Slow rotation
      earthRef.current.rotation.y += 0.002
      
      // Move Earth based on scroll
      earthRef.current.position.y = scrollProgress * -2
      earthRef.current.position.x = scrollProgress * 1
      
      // Scale Earth based on scroll
      const scale = 2 - scrollProgress * 0.5
      earthRef.current.scale.setScalar(scale)
    }
  })

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial 
        map={earthTexture}
        roughness={0.5}
        metalness={0.1}
        emissive={new THREE.Color(0x111111)}
        emissiveIntensity={0.1}
      />
    </mesh>
  )
}

// Enhanced satellite component with different models
function Satellite({ 
  orbitRadius, 
  speed, 
  inclination = 0, 
  color = "#ffffff",
  scrollProgress,
  satelliteType = "cube"
}: { 
  orbitRadius: number
  speed: number
  inclination?: number
  color?: string
  scrollProgress: number
  satelliteType?: "cube" | "sphere" | "cylinder" | "complex"
}) {
  const satelliteRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += speed
      groupRef.current.rotation.x = inclination
      
      // Move satellites based on scroll
      groupRef.current.position.y = scrollProgress * -1
      groupRef.current.position.x = scrollProgress * 0.5
    }
  })

  const renderSatelliteModel = () => {
    switch (satelliteType) {
      case "sphere":
        return (
          <mesh ref={satelliteRef} position={[orbitRadius, 0, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color={color} />
          </mesh>
        )
      case "cylinder":
        return (
          <mesh ref={satelliteRef} position={[orbitRadius, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
            <meshStandardMaterial color={color} />
          </mesh>
        )
      case "complex":
        return (
          <group ref={satelliteRef} position={[orbitRadius, 0, 0]}>
            {/* Main body */}
            <mesh>
              <boxGeometry args={[0.1, 0.1, 0.2]} />
              <meshStandardMaterial color={color} />
            </mesh>
            {/* Solar panels */}
            <mesh position={[0.15, 0, 0]}>
              <boxGeometry args={[0.2, 0.05, 0.1]} />
              <meshStandardMaterial color="#444444" />
            </mesh>
            <mesh position={[-0.15, 0, 0]}>
              <boxGeometry args={[0.2, 0.05, 0.1]} />
              <meshStandardMaterial color="#444444" />
            </mesh>
            {/* Antenna */}
            <mesh position={[0, 0, 0.15]}>
              <cylinderGeometry args={[0.01, 0.01, 0.1, 8]} />
              <meshStandardMaterial color="#666666" />
            </mesh>
          </group>
        )
      default: // cube
        return (
          <mesh ref={satelliteRef} position={[orbitRadius, 0, 0]}>
            <boxGeometry args={[0.1, 0.1, 0.3]} />
            <meshStandardMaterial color={color} />
          </mesh>
        )
    }
  }

  return (
    <group ref={groupRef}>
      {renderSatelliteModel()}
    </group>
  )
}

// Multiple satellites with diverse orbits and models
function Satellites({ scrollProgress }: { scrollProgress: number }) {
  const satellites = [
    // Low Earth Orbit (LEO) satellites
    { 
      orbitRadius: 3.2, 
      speed: 0.015, 
      inclination: 0.1, 
      color: "#ff6b6b",
      satelliteType: "complex" as const
    },
    { 
      orbitRadius: 3.5, 
      speed: 0.012, 
      inclination: -0.2, 
      color: "#4ecdc4",
      satelliteType: "sphere" as const
    },
    // Medium Earth Orbit (MEO) satellites
    { 
      orbitRadius: 4.2, 
      speed: 0.008, 
      inclination: 0.3, 
      color: "#45b7d1",
      satelliteType: "cylinder" as const
    },
    { 
      orbitRadius: 4.8, 
      speed: 0.006, 
      inclination: -0.4, 
      color: "#96ceb4",
      satelliteType: "complex" as const
    },
    // High Earth Orbit satellites
    { 
      orbitRadius: 5.5, 
      speed: 0.004, 
      inclination: 0.15, 
      color: "#feca57",
      satelliteType: "sphere" as const
    },
    { 
      orbitRadius: 6.0, 
      speed: 0.003, 
      inclination: -0.25, 
      color: "#ff9ff3",
      satelliteType: "cube" as const
    }
  ]

  return (
    <>
      {satellites.map((sat, index) => (
        <Satellite key={index} {...sat} scrollProgress={scrollProgress} />
      ))}
    </>
  )
}

// Main Scroll Earth Scene component
export default function ScrollEarthScene() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const maxScroll = windowHeight * 2 // Adjust based on your content
      const progress = Math.min(scrollY / maxScroll, 1)
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="w-full h-screen relative">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'linear-gradient(to bottom, #000000, #1a1a2e)' }}
        gl={{ 
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.8
        }}
      >
        {/* Enhanced lighting for brighter Earth */}
        <ambientLight intensity={0.4} />
        <hemisphereLight 
          intensity={0.6} 
          groundColor={new THREE.Color(0x000000)} 
          color={new THREE.Color(0xffffff)} 
        />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-10, -10, -10]} intensity={0.8} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={0.5} 
          castShadow 
        />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <Earth scrollProgress={scrollProgress} />
        <Satellites scrollProgress={scrollProgress} />
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}
