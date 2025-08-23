'use client'

import { useEffect, useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, useTexture } from '@react-three/drei'
import * as THREE from 'three'

// Earth component for background with enhanced brightness
function BackgroundEarth({ scrollProgress }: { scrollProgress: number }) {
  const earthRef = useRef<THREE.Mesh>(null)
  const earthTexture = useTexture('/earth-texture.jpg')
  
  useFrame((state) => {
    if (earthRef.current) {
      // Very slow rotation
      earthRef.current.rotation.y += 0.001
      
      // Move Earth based on scroll
      earthRef.current.position.y = scrollProgress * -3
      earthRef.current.position.x = scrollProgress * 2
      
      // Scale Earth based on scroll
      const scale = 1.5 - scrollProgress * 0.3
      earthRef.current.scale.setScalar(scale)
    }
  })

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial 
        map={earthTexture}
        roughness={0.5}
        metalness={0.1}
        emissive={new THREE.Color(0x111111)}
        emissiveIntensity={0.1}
        transparent
        opacity={0.4}
      />
    </mesh>
  )
}

// Background satellites with diverse models
function BackgroundSatellites({ scrollProgress }: { scrollProgress: number }) {
  const satellites = [
    { orbitRadius: 3.5, speed: 0.005, inclination: 0.2, color: "#ff6b6b", satelliteType: "sphere" },
    { orbitRadius: 4.2, speed: 0.004, inclination: -0.3, color: "#4ecdc4", satelliteType: "cylinder" },
    { orbitRadius: 5.0, speed: 0.003, inclination: 0.1, color: "#45b7d1", satelliteType: "complex" },
  ]

  return (
    <>
      {satellites.map((sat, index) => (
        <BackgroundSatellite key={index} {...sat} scrollProgress={scrollProgress} />
      ))}
    </>
  )
}

function BackgroundSatellite({ 
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
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += speed
      groupRef.current.rotation.x = inclination
      
      // Move satellites based on scroll
      groupRef.current.position.y = scrollProgress * -1.5
      groupRef.current.position.x = scrollProgress * 1
    }
  })

  const renderSatelliteModel = () => {
    switch (satelliteType) {
      case "sphere":
        return (
          <mesh position={[orbitRadius, 0, 0]}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshStandardMaterial color={color} transparent opacity={0.6} />
          </mesh>
        )
      case "cylinder":
        return (
          <mesh position={[orbitRadius, 0, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.2, 6]} />
            <meshStandardMaterial color={color} transparent opacity={0.6} />
          </mesh>
        )
      case "complex":
        return (
          <group position={[orbitRadius, 0, 0]}>
            {/* Main body */}
            <mesh>
              <boxGeometry args={[0.08, 0.08, 0.15]} />
              <meshStandardMaterial color={color} transparent opacity={0.6} />
            </mesh>
            {/* Solar panels */}
            <mesh position={[0.12, 0, 0]}>
              <boxGeometry args={[0.15, 0.04, 0.08]} />
              <meshStandardMaterial color="#444444" transparent opacity={0.6} />
            </mesh>
            <mesh position={[-0.12, 0, 0]}>
              <boxGeometry args={[0.15, 0.04, 0.08]} />
              <meshStandardMaterial color="#444444" transparent opacity={0.6} />
            </mesh>
          </group>
        )
      default: // cube
        return (
          <mesh position={[orbitRadius, 0, 0]}>
            <boxGeometry args={[0.05, 0.05, 0.2]} />
            <meshStandardMaterial color={color} transparent opacity={0.6} />
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

// Main Background Earth Scene component
export default function BackgroundEarthScene() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const maxScroll = windowHeight * 4 // Adjust based on your content
      const progress = Math.min(scrollY / maxScroll, 1)
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ 
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.6
        }}
      >
        {/* Enhanced lighting for brighter Earth */}
        <ambientLight intensity={0.3} />
        <hemisphereLight 
          intensity={0.4} 
          groundColor={new THREE.Color(0x000000)} 
          color={new THREE.Color(0xffffff)} 
        />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.6} />
        
        <BackgroundEarth scrollProgress={scrollProgress} />
        <BackgroundSatellites scrollProgress={scrollProgress} />
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  )
}
