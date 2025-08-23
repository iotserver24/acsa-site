'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, useTexture, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// Earth component with enhanced brightness
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

// Networking animation component with neon lines
function NetworkConnections() {
  const groupRef = useRef<THREE.Group>(null)
  const earthRadius = 2.1 // Slightly above Earth surface
  const networkLayerRadius = 2.2 // Much closer to Earth surface
  const animationRef = useRef({ time: 0 })
  
  // Create network nodes with proper connections
  const networkNodes = useMemo(() => {
    const nodes = []
    const numNodes = 20 // Reduced number of nodes
    
    // Create nodes at strategic locations around the globe
    for (let i = 0; i < numNodes; i++) {
      // Distribute nodes more evenly around the globe
      const lat = (Math.random() - 0.5) * Math.PI * 0.9 // More spread
      const lon = (Math.random() * Math.PI * 2)
      
      // Position nodes in the network layer above Earth
      const x = networkLayerRadius * Math.cos(lat) * Math.cos(lon)
      const y = networkLayerRadius * Math.cos(lat) * Math.sin(lon)
      const z = networkLayerRadius * Math.sin(lat)
      
      nodes.push({
        position: new THREE.Vector3(x, y, z),
        id: i,
        connections: [], // Will be filled with connection indices
        color: new THREE.Color().setHSL(0.55, 1, 0.8), // Bright neon blue
        pulse: Math.random() * Math.PI * 2
      })
    }
    
    // Create connections between nodes (like a real network)
    const connections = []
    const maxConnectionsPerNode = 2 // Fewer connections per node
    
    nodes.forEach((node, nodeIndex) => {
      // Connect to nearby nodes and some distant ones for backbone
      const nearbyNodes = nodes
        .map((otherNode, otherIndex) => ({
          node: otherNode,
          index: otherIndex,
          distance: node.position.distanceTo(otherNode.position)
        }))
        .filter(item => item.index !== nodeIndex)
        .sort((a, b) => a.distance - b.distance)
      
      // Connect to fewer nodes for cleaner network
      const connectionsToMake = Math.min(maxConnectionsPerNode, nearbyNodes.length)
      const selectedNodes = [
        ...nearbyNodes.slice(0, Math.floor(connectionsToMake * 0.7)), // 70% nearby
        ...nearbyNodes.slice(Math.floor(connectionsToMake * 0.7)).filter(() => Math.random() < 0.2) // 20% random distant
      ]
      
      selectedNodes.forEach(({ node: targetNode, index: targetIndex }) => {
        // Avoid duplicate connections
        const connectionExists = connections.some(conn => 
          (conn.from === nodeIndex && conn.to === targetIndex) ||
          (conn.from === targetIndex && conn.to === nodeIndex)
        )
        
        if (!connectionExists) {
          connections.push({
            from: nodeIndex,
            to: targetIndex,
            color: new THREE.Color().setHSL(0.55, 1, 0.8), // Bright neon blue
            progress: Math.random(),
            speed: 0.003 + Math.random() * 0.005,
            pulse: Math.random() * Math.PI * 2
          })
        }
      })
    })
    
    return { nodes, connections }
  }, [])

  // Create data packets that travel along connections
  const dataPackets = useMemo(() => {
    const packets = []
    const numPackets = 15 // Reduced number of packets
    
    for (let i = 0; i < numPackets; i++) {
      const connectionIndex = Math.floor(Math.random() * networkNodes.connections.length)
      const connection = networkNodes.connections[connectionIndex]
      
      packets.push({
        connectionIndex,
        progress: Math.random(),
        speed: 0.008 + Math.random() * 0.004,
        size: 0.025 + Math.random() * 0.015, // Bigger packets
        color: new THREE.Color().setHSL(0.55, 1, 0.8) // Bright neon blue
      })
    }
    return packets
  }, [networkNodes])

  useFrame((state) => {
    if (groupRef.current) {
      // Update animation time
      animationRef.current.time = state.clock.elapsedTime
      
      // Rotate the entire network with the Earth (same speed as Earth rotation)
      groupRef.current.rotation.y += 0.002 // Same speed as Earth rotation
      
      // Update node pulses
      networkNodes.nodes.forEach((node) => {
        node.pulse += 0.03
      })
      
      // Update connection animations
      networkNodes.connections.forEach((connection) => {
        connection.progress += connection.speed
        connection.pulse += 0.05
        
        if (connection.progress >= 1) {
          connection.progress = 0
        }
      })

      // Update data packets
      dataPackets.forEach((packet) => {
        packet.progress += packet.speed
        
        if (packet.progress >= 1) {
          packet.progress = 0
          packet.connectionIndex = Math.floor(Math.random() * networkNodes.connections.length)
        }
      })
    }
  })

  return (
    <group ref={groupRef}>
      {/* Network connection lines - curved in network layer above Earth */}
      {networkNodes.connections.map((connection, index) => {
        const fromNode = networkNodes.nodes[connection.from]
        const toNode = networkNodes.nodes[connection.to]
        
        // Create curved connection line that stays in the network layer
        const points = []
        const segments = 40
        
        for (let i = 0; i <= segments; i++) {
          const t = i / segments
          
          // Create a curved path that stays in the network layer above Earth
          const midPoint = fromNode.position.clone().add(toNode.position).multiplyScalar(0.5)
          const midPointNormalized = midPoint.clone().normalize().multiplyScalar(networkLayerRadius + 0.1) // Closer to Earth surface
          
          // Quadratic Bezier curve for smooth curved lines
          const point1 = fromNode.position
          const point2 = midPointNormalized
          const point3 = toNode.position
          
          const point = new THREE.Vector3()
          const u = 1 - t
          const tt = t * t
          const uu = u * u
          
          point.x = uu * point1.x + 2 * u * t * point2.x + tt * point3.x
          point.y = uu * point1.y + 2 * u * t * point2.y + tt * point3.y
          point.z = uu * point1.z + 2 * u * t * point2.z + tt * point3.z
          
          // Ensure the point stays in the network layer above Earth
          const distanceFromCenter = point.length()
          if (distanceFromCenter < networkLayerRadius - 0.1) {
            point.normalize().multiplyScalar(networkLayerRadius - 0.1)
          }
          
          points.push(point.x, point.y, point.z)
        }
        
        // Pulsing opacity effect
        const opacity = 0.3 + 0.4 * Math.sin(connection.pulse) // More visible
        
        return (
          <line key={index}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={segments + 1}
                array={new Float32Array(points)}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color={connection.color}
              transparent
              opacity={opacity}
              linewidth={3} // Thicker lines
            />
          </line>
        )
      })}
      
      {/* Animated data flow along connections */}
      {networkNodes.connections.map((connection, index) => {
        const fromNode = networkNodes.nodes[connection.from]
        const toNode = networkNodes.nodes[connection.to]
        
        // Create animated highlight that moves along the connection
        const highlightProgress = (connection.progress + animationRef.current.time * 0.2) % 1
        const highlightLength = 0.4
        
        const startT = Math.max(0, highlightProgress - highlightLength)
        const endT = Math.min(1, highlightProgress + highlightLength)
        
        const highlightPoints = []
        const segments = 20
        
        for (let i = 0; i <= segments; i++) {
          const t = startT + (endT - startT) * (i / segments)
          
          // Use same curved path as main connection
          const midPoint = fromNode.position.clone().add(toNode.position).multiplyScalar(0.5)
          const midPointNormalized = midPoint.clone().normalize().multiplyScalar(networkLayerRadius + 0.1)
          
          const point1 = fromNode.position
          const point2 = midPointNormalized
          const point3 = toNode.position
          
          const point = new THREE.Vector3()
          const u = 1 - t
          const tt = t * t
          const uu = u * u
          
          point.x = uu * point1.x + 2 * u * t * point2.x + tt * point3.x
          point.y = uu * point1.y + 2 * u * t * point2.y + tt * point3.y
          point.z = uu * point1.z + 2 * u * t * point2.z + tt * point3.z
          
          // Ensure the point stays in the network layer
          const distanceFromCenter = point.length()
          if (distanceFromCenter < networkLayerRadius - 0.1) {
            point.normalize().multiplyScalar(networkLayerRadius - 0.1)
          }
          
          highlightPoints.push(point.x, point.y, point.z)
        }
        
        return (
          <line key={`highlight-${index}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={segments + 1}
                array={new Float32Array(highlightPoints)}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color={connection.color}
              transparent
              opacity={0.9}
              linewidth={4} // Thicker highlights
            />
          </line>
        )
      })}
      
      {/* Data packets traveling along connections */}
      {dataPackets.map((packet, index) => {
        const connection = networkNodes.connections[packet.connectionIndex]
        const fromNode = networkNodes.nodes[connection.from]
        const toNode = networkNodes.nodes[connection.to]
        
        // Calculate packet position along curved path
        const t = packet.progress
        const midPoint = fromNode.position.clone().add(toNode.position).multiplyScalar(0.5)
        const midPointNormalized = midPoint.clone().normalize().multiplyScalar(networkLayerRadius + 0.1)
        
        const point1 = fromNode.position
        const point2 = midPointNormalized
        const point3 = toNode.position
        
        const packetPos = new THREE.Vector3()
        const u = 1 - t
        const tt = t * t
        const uu = u * u
        
        packetPos.x = uu * point1.x + 2 * u * t * point2.x + tt * point3.x
        packetPos.y = uu * point1.y + 2 * u * t * point2.y + tt * point3.y
        packetPos.z = uu * point1.z + 2 * u * t * point2.z + tt * point3.z
        
        // Ensure the packet stays in the network layer
        const distanceFromCenter = packetPos.length()
        if (distanceFromCenter < networkLayerRadius - 0.1) {
          packetPos.normalize().multiplyScalar(networkLayerRadius - 0.1)
        }
        
        return (
          <mesh key={`packet-${index}`} position={packetPos}>
            <sphereGeometry args={[packet.size, 8, 8]} />
            <meshBasicMaterial 
              color={packet.color}
              transparent
              opacity={0.9}
            />
          </mesh>
        )
      })}
      
      {/* Network nodes - smaller */}
      {networkNodes.nodes.map((node, index) => (
        <mesh key={`node-${index}`} position={node.position}>
          <sphereGeometry args={[0.05, 12, 12]} /> {/* Smaller nodes */}
          <meshBasicMaterial 
            color={node.color} 
            transparent 
            opacity={0.8 + 0.2 * Math.sin(node.pulse)}
          />
        </mesh>
      ))}
      
      {/* Node connection points (smaller spheres) - smaller */}
      {networkNodes.nodes.map((node, index) => (
        <mesh key={`node-core-${index}`} position={node.position}>
          <sphereGeometry args={[0.025, 8, 8]} /> {/* Smaller cores */}
          <meshBasicMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  )
}

// Enhanced satellite component with different models
function Satellite({ 
  orbitRadius, 
  speed, 
  inclination = 0, 
  color = "#ffffff",
  satelliteType = "cube"
}: { 
  orbitRadius: number
  speed: number
  inclination?: number
  color?: string
  satelliteType?: "cube" | "sphere" | "cylinder" | "complex"
}) {
  const satelliteRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += speed
      groupRef.current.rotation.x = inclination
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
function Satellites() {
  // Removed all satellites - returning empty fragment
  return <></>
}

// Main Earth Scene component with enhanced lighting
export default function EarthScene() {
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
        
        <Earth />
        <NetworkConnections />
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
