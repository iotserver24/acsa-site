'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, useTexture } from '@react-three/drei'
import * as THREE from 'three'

// Earth component with enhanced brightness and bigger size
function Earth() {
  const earthRef = useRef<THREE.Mesh>(null)
  const earthTexture = useTexture('/earth-texture.jpg')
  
  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.002 // Slow rotation
    }
  })

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[3, 64, 64]} />
      <meshStandardMaterial 
        map={earthTexture}
        roughness={0.2}
        metalness={0.1}
        emissive={new THREE.Color(0x444444)}
        emissiveIntensity={0.5}
      />
    </mesh>
  )
}

// Enhanced neon dot component for Earth surface points
function NeonDot({ 
  position, 
  color = "#ffffff"
}: { 
  position: [number, number, number]
  color?: string
}) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshBasicMaterial 
        color={color}
        emissive={new THREE.Color(color)}
        emissiveIntensity={2.0}
      />
    </mesh>
  )
}

// Create straight lines that follow Earth's curvature
function NetworkLine({ 
  startPoint, 
  endPoint, 
  color = "#ffffff"
}: { 
  startPoint: [number, number, number]
  endPoint: [number, number, number]
  color?: string
}) {
  const lineRef = useRef<THREE.Line>(null)

  const points = useMemo(() => {
    if (!startPoint || !endPoint || !Array.isArray(startPoint) || !Array.isArray(endPoint)) {
      return []
    }
    
    const start = new THREE.Vector3(startPoint[0], startPoint[1], startPoint[2])
    const end = new THREE.Vector3(endPoint[0], endPoint[1], endPoint[2])
    
    // Create points along a straight line between start and end
    const numPoints = 20
    const points = []
    
    for (let i = 0; i <= numPoints; i++) {
      const t = i / numPoints
      const point = new THREE.Vector3()
      point.lerpVectors(start, end, t)
      points.push(point)
    }
    
    return points
  }, [startPoint, endPoint])

  return (
    <line ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color={color}
        linewidth={8}
      />
    </line>
  )
}

// Generate nodes positioned just above Earth surface
function generateEarthNodes() {
  const nodes = []
  const radius = 3.3 // Just above Earth surface
  
  // Generate nodes using spherical coordinates with better distribution
  for (let i = 0; i < 40; i++) {
    // Use golden ratio to distribute points evenly
    const phi = Math.acos(1 - 2 * (i + 0.5) / 40)
    const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5)
    
    const x = radius * Math.sin(phi) * Math.cos(theta)
    const y = radius * Math.sin(phi) * Math.sin(theta)
    const z = radius * Math.cos(phi)
    
    nodes.push([x, y, z] as [number, number, number])
  }
  
  return nodes
}

// Network of neon dots and lines connecting nodes
function CommunicationNetwork() {
  const networkNodes = useMemo(() => generateEarthNodes(), [])

  // Create connections between nearby nodes
  const networkConnections = useMemo(() => {
    const connections = []
    
    for (let i = 0; i < networkNodes.length; i++) {
      for (let j = i + 1; j < networkNodes.length; j++) {
        const node1 = networkNodes[i]
        const node2 = networkNodes[j]
        
        // Calculate distance between nodes
        const distance = Math.sqrt(
          Math.pow(node1[0] - node2[0], 2) + 
          Math.pow(node1[1] - node2[1], 2) + 
          Math.pow(node1[2] - node2[2], 2)
        )
        
        // Connect nodes that are within a reasonable distance
        if (distance < 2.5) {
          connections.push({
            start: node1,
            end: node2,
            color: "#ffffff"
          })
        }
      }
    }
    
    return connections
  }, [networkNodes])

  return (
    <>
      {/* Render neon dots */}
      {networkNodes.map((node, index) => (
        <NeonDot 
          key={`dot-${index}`}
          position={node}
          color="#ffffff"
        />
      ))}
      
      {/* Render network lines */}
      {networkConnections.map((connection, index) => (
        <NetworkLine 
          key={`line-${index}`}
          startPoint={connection.start}
          endPoint={connection.end}
          color={connection.color}
        />
      ))}
    </>
  )
}

// Enhanced satellite component
function Satellite({ 
  orbitRadius, 
  speed, 
  color = "#ffffff"
}: { 
  orbitRadius: number
  speed: number
  color?: string
}) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += speed
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main satellite body */}
      <mesh position={[orbitRadius, 0, 0]}>
        <boxGeometry args={[0.4, 0.4, 1.0]} />
        <meshStandardMaterial 
          color={color}
          emissive={new THREE.Color(color)}
          emissiveIntensity={0.8}
        />
      </mesh>
      
      {/* Solar panels */}
      <mesh position={[orbitRadius + 0.6, 0, 0]}>
        <boxGeometry args={[0.8, 0.1, 0.4]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      <mesh position={[orbitRadius - 0.6, 0, 0]}>
        <boxGeometry args={[0.8, 0.1, 0.4]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      
      {/* Antenna */}
      <mesh position={[orbitRadius, 0, 0.6]}>
        <cylinderGeometry args={[0.03, 0.03, 0.5, 8]} />
        <meshStandardMaterial color="#666666" />
      </mesh>
      
      {/* Glowing core */}
      <mesh position={[orbitRadius, 0, 0]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshBasicMaterial 
          color={color}
          emissive={new THREE.Color(color)}
          emissiveIntensity={2.0}
        />
      </mesh>
    </group>
  )
}

// Two satellites orbiting in opposite directions
function Satellites() {
  return (
    <>
      {/* Satellite 1 - clockwise */}
      <Satellite 
        orbitRadius={6.0}
        speed={0.015}
        color="#00ffff"
      />
      {/* Satellite 2 - counter-clockwise */}
      <Satellite 
        orbitRadius={6.8}
        speed={-0.012}
        color="#ffffff"
      />
    </>
  )
}

// Main Earth Scene component with enhanced lighting
export default function EarthScene() {
  return (
    <div className="w-1/2 h-screen relative">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        style={{ background: 'linear-gradient(to bottom, #000033, #1a1a4e)' }}
        gl={{ 
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 2.5
        }}
      >
        {/* Enhanced lighting for brighter Earth */}
        <ambientLight intensity={1.0} />
        <hemisphereLight 
          intensity={1.2} 
          groundColor={new THREE.Color(0x000000)} 
          color={new THREE.Color(0xffffff)} 
        />
        <pointLight position={[10, 10, 10]} intensity={2.5} />
        <pointLight position={[-10, -10, -10]} intensity={2.0} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1.5} 
          castShadow 
        />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <Earth />
        <CommunicationNetwork />
        <Satellites />
        
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
