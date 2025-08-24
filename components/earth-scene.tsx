'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, useTexture, useScroll } from '@react-three/drei'
import * as THREE from 'three'

// Interactive Earth component with scroll-driven rotation and cursor response
function Earth() {
  const earthRef = useRef<THREE.Mesh>(null)
  const earthTexture = useTexture('/earth-texture.jpg')
  const scroll = useScroll()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  // Track mouse movement for cursor response
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  useFrame((state) => {
    if (earthRef.current) {
      // Scroll-driven rotation (loops seamlessly)
      const scrollRotation = scroll.offset * Math.PI * 4 // 2 full rotations
      earthRef.current.rotation.y = scrollRotation
      
      // Cursor-responsive movement
      const cursorInfluence = 0.1
      earthRef.current.rotation.x = mousePosition.y * cursorInfluence
      earthRef.current.rotation.z = mousePosition.x * cursorInfluence * 0.5
      
      // Subtle hover effect
      const hoverOffset = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.02
      earthRef.current.position.y = hoverOffset
    }
  })

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[8, 128, 128]} />
      <meshStandardMaterial 
        map={earthTexture}
        roughness={0.2}
        metalness={0.05}
        emissive={new THREE.Color(0x111111)}
        emissiveIntensity={0.3}
      />
    </mesh>
  )
}

<<<<<<< HEAD
// 3D Scene component that contains all Canvas elements
function EarthScene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 45 }}
      style={{ background: 'linear-gradient(to bottom, #000033, #1a1a4e)' }}
    >
      {/* Enhanced lighting for horizon effect */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={2.0} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} intensity={1.0} />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <Earth />
    </Canvas>
  )
}

// Futuristic content overlay component (2D, no R3F hooks)
function ContentOverlay() {
  const [currentSection, setCurrentSection] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
=======
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
>>>>>>> f71d4efb4f5b617119fb33d8f4b318679b6747bb
  
  const sections = [
    {
      title: "ACSA",
      subtitle: "Advanced Communication Student Association",
      description: "Exploring the frontiers of communication technology through innovation, collaboration, and cutting-edge research in electronics & communication.",
      color: "#00ffff"
    },
    {
      title: "About Us",
      subtitle: "Our Mission",
      description: "We are a community of passionate students dedicated to advancing communication technologies and fostering innovation in the field of electronics and telecommunications.",
      color: "#ff00ff"
    },
    {
      title: "Upcoming Events",
      subtitle: "What's Next",
      description: "Join us for exciting workshops, hackathons, and networking events. Stay tuned for our latest tech meetups and industry collaborations.",
      color: "#ffff00"
    },
    {
      title: "Join Us",
      subtitle: "Be Part of the Future",
      description: "Ready to explore the cutting edge of communication technology? Join ACSA and connect with like-minded innovators.",
      color: "#00ff00"
    }
  ]
  
  // Track scroll progress for content changes
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const progress = scrollTop / documentHeight
      
      setScrollProgress(progress)
      
      // Calculate current section based on scroll progress
      const sectionIndex = Math.floor(progress * sections.length) % sections.length
      setCurrentSection(sectionIndex)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections.length])
  
  const currentContent = sections[currentSection]
  
  return (
<<<<<<< HEAD
    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
      <div className="text-center max-w-4xl mx-auto px-8">
        {/* Futuristic glow effect */}
        <div 
          className="absolute inset-0 blur-3xl opacity-30"
          style={{
            background: `radial-gradient(circle, ${currentContent.color}20, transparent 70%)`,
            transform: 'translate(-50%, -50%)',
            left: '50%',
            top: '50%'
          }}
        />
        
        {/* Main content */}
        <div className="relative">
          {/* Animated title */}
          <h1 
            className="text-8xl md:text-9xl font-bold mb-4 tracking-wider"
            style={{
              background: `linear-gradient(45deg, ${currentContent.color}, #ffffff)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: `0 0 30px ${currentContent.color}40`
            }}
          >
            {currentContent.title}
          </h1>
          
          {/* Subtitle with glow */}
          <h2 
            className="text-2xl md:text-3xl font-semibold mb-6 text-white"
            style={{
              textShadow: `0 0 20px ${currentContent.color}`
            }}
          >
            {currentContent.subtitle}
          </h2>
          
          {/* Description with animated border */}
          <div 
            className="relative p-8 rounded-2xl backdrop-blur-sm"
            style={{
              background: 'rgba(0, 0, 0, 0.3)',
              border: `2px solid ${currentContent.color}40`,
              boxShadow: `0 0 50px ${currentContent.color}20`
            }}
          >
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
              {currentContent.description}
            </p>
            
            {/* Animated border effect */}
            <div 
              className="absolute inset-0 rounded-2xl"
              style={{
                background: `linear-gradient(45deg, transparent, ${currentContent.color}20, transparent)`,
                animation: 'borderGlow 3s ease-in-out infinite'
              }}
            />
          </div>
          
          {/* Scroll indicator */}
          <div className="mt-12 flex justify-center">
            <div className="flex space-x-2">
              {sections.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSection ? 'bg-white scale-125' : 'bg-gray-500'
                  }`}
                  style={{
                    boxShadow: index === currentSection ? `0 0 10px ${currentContent.color}` : 'none'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Earth Scene component with full-page horizon
export default function EarthScene() {
  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Full-page scrollable container */}
      <div className="h-[400vh] relative">
        {/* 3D Earth Scene */}
        <div className="sticky top-0 h-screen">
          <EarthScene3D />
        </div>
        
        {/* Content overlay */}
        <ContentOverlay />
      </div>
      
      {/* Custom scrollbar styling */}
      <style jsx>{`
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #00ffff, #ff00ff);
          border-radius: 4px;
        }
        @keyframes borderGlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>
=======
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
>>>>>>> f71d4efb4f5b617119fb33d8f4b318679b6747bb
    </div>
  )
}
