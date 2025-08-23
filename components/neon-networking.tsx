'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, useTexture } from '@react-three/drei'
import * as THREE from 'three'

// Country coordinates (latitude, longitude)
const countries = [
  { name: 'USA', lat: 39.8283, lng: -98.5795 },
  { name: 'UK', lat: 55.3781, lng: -3.4360 },
  { name: 'Germany', lat: 51.1657, lng: 10.4515 },
  { name: 'France', lat: 46.2276, lng: 2.2137 },
  { name: 'Japan', lat: 36.2048, lng: 138.2529 },
  { name: 'China', lat: 35.8617, lng: 104.1954 },
  { name: 'India', lat: 20.5937, lng: 78.9629 },
  { name: 'Brazil', lat: -14.2350, lng: -51.9253 },
  { name: 'Australia', lat: -25.2744, lng: 133.7751 },
  { name: 'Canada', lat: 56.1304, lng: -106.3468 },
  { name: 'Russia', lat: 61.5240, lng: 105.3188 },
  { name: 'South Africa', lat: -30.5595, lng: 22.9375 },
  { name: 'Mexico', lat: 23.6345, lng: -102.5528 },
  { name: 'Italy', lat: 41.8719, lng: 12.5674 },
  { name: 'Spain', lat: 40.4637, lng: -3.7492 },
  { name: 'Netherlands', lat: 52.1326, lng: 5.2913 },
  { name: 'Sweden', lat: 60.1282, lng: 18.6435 },
  { name: 'Norway', lat: 60.4720, lng: 8.4689 },
  { name: 'Finland', lat: 61.9241, lng: 25.7482 },
  { name: 'Denmark', lat: 56.2639, lng: 9.5018 }
]

// Convert lat/lng to 3D coordinates on a sphere
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const z = radius * Math.sin(phi) * Math.sin(theta)
  const y = radius * Math.cos(phi)
  
  return new THREE.Vector3(x, y, z)
}

// Earth component
function Earth() {
  const earthRef = useRef<THREE.Mesh>(null)
  const earthTexture = useTexture('/earth-texture.jpg')
  
  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001 // Very slow rotation
    }
  })

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial 
        map={earthTexture}
        roughness={0.8}
        metalness={0.1}
        emissive={new THREE.Color(0x001122)}
        emissiveIntensity={0.05}
      />
    </mesh>
  )
}

// Country point component with enhanced glow
function CountryPoint({ position, name }: { position: THREE.Vector3, name: string }) {
  const pointRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (pointRef.current && glowRef.current) {
      // Pulsing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.15
      pointRef.current.scale.setScalar(scale)
      
      // Glow effect
      const glowScale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.3
      glowRef.current.scale.setScalar(glowScale)
      
      // Animate glow opacity
      const glowOpacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2
      if (glowRef.current.material) {
        (glowRef.current.material as THREE.MeshBasicMaterial).opacity = glowOpacity
      }
    }
  })

  return (
    <group position={position}>
      {/* Glow effect */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial 
          color="#00ffff"
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* Main point */}
      <mesh ref={pointRef}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial 
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  )
}

// Flowing networking line component
function FlowingNetworkingLine({ 
  start, 
  end, 
  delay = 0 
}: { 
  start: THREE.Vector3, 
  end: THREE.Vector3, 
  delay?: number 
}) {
  const lineRef = useRef<THREE.Line>(null)
  const flowingLineRef = useRef<THREE.Line>(null)
  
  const points = useMemo(() => {
    const curve = new THREE.CubicBezierCurve3(
      start,
      start.clone().add(new THREE.Vector3(0, 1.5, 0)),
      end.clone().add(new THREE.Vector3(0, 1.5, 0)),
      end
    )
    return curve.getPoints(100)
  }, [start, end])

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [points])

  // Create flowing effect geometry
  const flowingGeometry = useMemo(() => {
    const flowingPoints: THREE.Vector3[] = []
    const totalPoints = points.length
    const flowingLength = Math.floor(totalPoints * 0.3) // 30% of the line length
    
    for (let i = 0; i < totalPoints; i++) {
      flowingPoints.push(points[i].clone())
    }
    
    return new THREE.BufferGeometry().setFromPoints(flowingPoints)
  }, [points])

  useFrame((state) => {
    if (lineRef.current && flowingLineRef.current) {
      const time = state.clock.elapsedTime
      
      // Create flowing pulse effect
      const flowingPoints: THREE.Vector3[] = []
      const totalPoints = points.length
      const pulseWidth = Math.floor(totalPoints * 0.3) // 30% of the line length
      
      // Calculate the pulse position
      const pulsePosition = ((time * 0.8 + delay) % 1) * totalPoints
      
      for (let i = 0; i < totalPoints; i++) {
        const point = points[i].clone()
        
        // Calculate distance from pulse center
        const distanceFromPulse = Math.abs(i - pulsePosition)
        const normalizedDistance = distanceFromPulse / (pulseWidth / 2)
        
        // Create smooth pulse effect
        let intensity = 0.2 // Base intensity
        if (normalizedDistance < 1) {
          // Smooth falloff for the pulse
          intensity = 0.2 + 0.8 * Math.cos(normalizedDistance * Math.PI)
        }
        
        // Apply intensity to the point
        point.multiplyScalar(intensity)
        flowingPoints.push(point)
      }
      
      // Update the flowing geometry
      flowingLineRef.current.geometry.setFromPoints(flowingPoints)
      flowingLineRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <group>
      {/* Base line (dim) */}
      <line ref={lineRef}>
        <primitive object={geometry} />
        <lineBasicMaterial 
          color="#00ffff"
          transparent
          opacity={0.3}
          linewidth={1}
        />
      </line>
      
      {/* Flowing line (bright) */}
      <line ref={flowingLineRef}>
        <primitive object={flowingGeometry} />
        <lineBasicMaterial 
          color="#00ffff"
          transparent
          opacity={1.0}
          linewidth={3}
        />
      </line>
    </group>
  )
}

// Main networking visualization component
function NetworkingVisualization() {
  const countryPositions = useMemo(() => {
    return countries.map(country => ({
      ...country,
      position: latLngToVector3(country.lat, country.lng, 2.1) // Slightly above Earth surface
    }))
  }, [])

  // Create connections between countries
  const connections = useMemo(() => {
    const conns: Array<{ start: THREE.Vector3, end: THREE.Vector3, delay: number }> = []
    
    // Connect major hubs
    const majorConnections = [
      ['USA', 'UK'], ['USA', 'Germany'], ['USA', 'Japan'], ['USA', 'China'],
      ['UK', 'Germany'], ['UK', 'France'], ['UK', 'Netherlands'],
      ['Germany', 'France'], ['Germany', 'Italy'], ['Germany', 'Sweden'],
      ['Japan', 'China'], ['Japan', 'Australia'],
      ['China', 'India'], ['China', 'Russia'],
      ['Brazil', 'USA'], ['Brazil', 'Argentina'],
      ['Australia', 'Japan'], ['Australia', 'India'],
      ['Canada', 'USA'], ['Canada', 'UK'],
      ['Russia', 'China'], ['Russia', 'Germany'], ['Russia', 'Finland'],
      ['South Africa', 'UK'], ['South Africa', 'Brazil'],
      ['Mexico', 'USA'], ['Mexico', 'Brazil'],
      ['Italy', 'France'], ['Italy', 'Spain'],
      ['Spain', 'France'], ['Spain', 'UK'],
      ['Netherlands', 'Germany'], ['Netherlands', 'UK'],
      ['Sweden', 'Norway'], ['Sweden', 'Finland'], ['Sweden', 'Denmark'],
      ['Norway', 'Sweden'], ['Norway', 'Denmark'],
      ['Finland', 'Sweden'], ['Finland', 'Russia'],
      ['Denmark', 'Sweden'], ['Denmark', 'Germany']
    ]

    majorConnections.forEach(([startCountry, endCountry], index) => {
      const start = countryPositions.find(c => c.name === startCountry)
      const end = countryPositions.find(c => c.name === endCountry)
      
      if (start && end) {
        conns.push({
          start: start.position,
          end: end.position,
          delay: index * 0.2
        })
      }
    })

    return conns
  }, [countryPositions])

  return (
    <>
      {/* Country points */}
      {countryPositions.map((country, index) => (
        <CountryPoint 
          key={country.name} 
          position={country.position} 
          name={country.name} 
        />
      ))}
      
             {/* Networking lines */}
       {connections.map((connection, index) => (
         <FlowingNetworkingLine 
           key={index}
           start={connection.start}
           end={connection.end}
           delay={connection.delay}
         />
       ))}
    </>
  )
}

// Main component
export default function NeonNetworking() {
  return (
    <div className="w-full h-screen relative">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'linear-gradient(to bottom, #000011, #001122)' }}
        gl={{ 
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.5,
          antialias: true
        }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <hemisphereLight 
          intensity={0.3} 
          groundColor={new THREE.Color(0x000011)} 
          color={new THREE.Color(0x0044ff)} 
        />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#0044ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#00ffff" />
        
        {/* Background stars */}
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        
        {/* Earth and networking */}
        <Earth />
        <NetworkingVisualization />
        
        {/* Controls */}
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxDistance={12}
          minDistance={4}
        />
      </Canvas>
      
      {/* Overlay text */}
      <div className="absolute top-8 left-8 text-white z-10">
        <h2 className="text-2xl font-bold text-cyan-400 mb-2">Global Network</h2>
        <p className="text-cyan-300 text-sm">Neon blue connections between countries</p>
      </div>
    </div>
  )
}
