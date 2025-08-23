'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, useTexture, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// Earth component with enhanced brightness and scroll-based movement
function Earth({ scrollProgress }: { scrollProgress: number }) {
  const earthRef = useRef<THREE.Mesh>(null)
  const earthTexture = useTexture('/earth-texture.jpg')
  
  useFrame((state) => {
    if (earthRef.current) {
      // Move Earth to left side when scrolling to About section
      // Start at center (0, 0, 0) and move to left (-8, 0, 0) when scrollProgress reaches 1
      earthRef.current.position.x = scrollProgress * -8
      earthRef.current.position.y = 0
      earthRef.current.position.z = 0
      
      // Keep consistent scale
      earthRef.current.scale.setScalar(1.2)
      
      // No rotation - completely still
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

// Enhanced satellite component with scroll-based movement
function Satellite({ 
  orbitRadius, 
  speed, 
  inclination = 0, 
  color = "#ffffff",
  satelliteType = "cube",
  scrollProgress
}: { 
  orbitRadius: number
  speed: number
  inclination?: number
  color?: string
  satelliteType?: "cube" | "sphere" | "cylinder" | "complex"
  scrollProgress: number
}) {
  const satelliteRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      // Move satellites with Earth to left side
      groupRef.current.position.x = scrollProgress * -8
      groupRef.current.position.y = 0
      groupRef.current.position.z = 0
      
      // No orbital movement - completely still
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
  const satellites = useMemo(() => [
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
    },
    // Geostationary-like satellites
    { 
      orbitRadius: 6.8, 
      speed: 0.002, 
      inclination: 0.05, 
      color: "#54a0ff",
      satelliteType: "complex" as const
    },
    { 
      orbitRadius: 7.2, 
      speed: 0.0015, 
      inclination: -0.1, 
      color: "#5f27cd",
      satelliteType: "cylinder" as const
    }
  ], [])

  return (
    <>
      {satellites.map((sat, index) => (
        <Satellite key={index} {...sat} scrollProgress={scrollProgress} />
      ))}
    </>
  )
}

// Main Earth Scene component with enhanced lighting
export default function EarthScene() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const aboutSectionOffset = windowHeight * 1.5 // Start animation when About section comes into view
      const progress = Math.max(0, Math.min(1, (scrollY - aboutSectionOffset) / (windowHeight * 0.5)))
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', updateScrollProgress)
    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
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
