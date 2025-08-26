'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, useTexture, useScroll } from '@react-three/drei'
import * as THREE from 'three'

// Animated star particles component
function StarParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001
      particlesRef.current.rotation.x += 0.0005
    }
  })

  // Create star particles
  const particleCount = 200
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)
  
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3
    // Random positions in a sphere around the Earth
    const radius = 20 + Math.random() * 30
    const theta = Math.random() * Math.PI * 2
    const phi = Math.random() * Math.PI
    
    positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i3 + 2] = radius * Math.cos(phi)
    
    // Neon blue colors with some variation
    const blueIntensity = 0.8 + Math.random() * 0.2
    colors[i3] = 0.0 // R
    colors[i3 + 1] = blueIntensity // G
    colors[i3 + 2] = 1.0 // B
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.5}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

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
        emissive={new THREE.Color(0x004080)}
        emissiveIntensity={0.4}
      />
    </mesh>
  )
}

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
      
      {/* Enhanced stars with neon blue colors */}
      <Stars 
        radius={100} 
        depth={50} 
        count={8000} 
        factor={6} 
        saturation={0.3} 
        fade 
        speed={1.5}
        color="#00ffff"
      />
      
      {/* Additional star field for more density */}
      <Stars 
        radius={150} 
        depth={30} 
        count={3000} 
        factor={3} 
        saturation={0.1} 
        fade 
        speed={0.8}
        color="#0080ff"
      />
      
      <Earth />
      <StarParticles />
    </Canvas>
  )
}

// Futuristic content overlay component (2D, no R3F hooks)
function ContentOverlay() {
  const [currentSection, setCurrentSection] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  
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
    </div>
  )
}
