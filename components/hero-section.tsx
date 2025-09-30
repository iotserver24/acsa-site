'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, useTexture } from '@react-three/drei'
import { Button } from "@/components/ui/button"
import { ArrowRight, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import * as THREE from 'three'

// Earth component with texture loading and proper animation
function Earth() {
  const earthRef = useRef<THREE.Mesh>(null)
  const [animationPhase, setAnimationPhase] = useState(0) // 0: entrance, 1: normal
  const animationStartTime = useRef<number>(0)
  const hasStartedAnimation = useRef<boolean>(false)
  const introFlagSetRef = useRef<boolean>(false)
  
  // Load Earth texture with error handling
  const earthTexture = useTexture('/earth-texture.jpg', (texture) => {
    console.log('Earth texture loaded successfully')
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(1, 1)
  })
  
  useEffect(() => {
    console.log('Earth component mounted')
    // If intro has already played this session, skip entrance animation
    try {
      if (typeof window !== 'undefined' && sessionStorage.getItem('earthIntroPlayed') === 'true') {
        setAnimationPhase(1)
        introFlagSetRef.current = true
      }
    } catch (e) {
      // Ignore storage errors
    }
  }, [])
  
  useFrame((state) => {
    if (earthRef.current) {
      const time = state.clock.getElapsedTime()
      
      // Initialize animation start time
      if (!hasStartedAnimation.current) {
        animationStartTime.current = time
        hasStartedAnimation.current = true
        console.log('Animation started')
      }
      
      const animationTime = time - animationStartTime.current
      
      if (animationPhase === 0 && animationTime < 3) {
        // Entrance animation: fast rotation + movement from left to right and back
        const progress = animationTime / 3
        
        // Fast rotation during entrance
        earthRef.current.rotation.y += 0.02
        
        // Movement from left to right and back to center
        // Using a sine wave that goes from -1 to 1 and back to 0
        const moveProgress = Math.sin(progress * Math.PI * 2) // This creates a full cycle
        earthRef.current.position.x = moveProgress * 6 // Reduced range for smaller Earth
        
        // Zoom effect - closer and farther
        earthRef.current.position.z = 12 + Math.sin(progress * Math.PI * 2) * 3
        
        // Scale effect
        const scale = 1 + Math.sin(progress * Math.PI * 4) * 0.2
        earthRef.current.scale.setScalar(scale)
        
        // Transition to normal phase
        if (progress >= 1) {
          setAnimationPhase(1)
          console.log('Animation phase 1 reached')
          // Mark that the intro animation has been shown this session
          if (!introFlagSetRef.current) {
            try {
              if (typeof window !== 'undefined') {
                sessionStorage.setItem('earthIntroPlayed', 'true')
              }
            } catch (e) {
              // Ignore storage errors
            }
            introFlagSetRef.current = true
          }
        }
      } else {
        // Normal phase: gentle rotation and hover
        earthRef.current.rotation.y += 0.005
        earthRef.current.position.x = 0 // Back to center
        earthRef.current.position.z = 12 // Back to original distance
        earthRef.current.scale.setScalar(1) // Back to normal size
        
        // Subtle hover effect
        const hoverOffset = Math.sin(time * 0.5) * 0.1
        earthRef.current.position.y = hoverOffset
      }
    }
  })

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[4, 64, 64]} />
      <meshStandardMaterial 
        map={earthTexture}
        roughness={0.3}
        metalness={0.1}
        emissive={new THREE.Color(0x111111)}
        emissiveIntensity={0.2}
      />
    </mesh>
  )
}

// ACSA introduction overlay with staggered text animation
function ACSAIntro() {
  const [textVisible, setTextVisible] = useState(false)
  
  useEffect(() => {
    console.log('ACSAIntro component mounted')
    // If intro already played in this session, show immediately
    let timer: number | undefined
    try {
      if (typeof window !== 'undefined' && sessionStorage.getItem('earthIntroPlayed') === 'true') {
        setTextVisible(true)
        return
      }
    } catch (e) {
      // Ignore storage errors and fallback to timed reveal
    }
    // Otherwise show after Earth intro duration
    timer = window.setTimeout(() => {
      setTextVisible(true)
      console.log('Text should be visible now')
    }, 3000)
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [])
  
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
      <div className="text-center max-w-4xl mx-auto px-8">
        {/* Futuristic glow effect */}
        <div 
          className={`absolute inset-0 blur-3xl opacity-20 transition-opacity duration-1000 ${
            textVisible ? 'opacity-20' : 'opacity-0'
          }`}
          style={{
            background: 'radial-gradient(circle, #00ffff20, transparent 70%)',
            transform: 'translate(-50%, -50%)',
            left: '50%',
            top: '50%'
          }}
        />
        
        {/* Main content */}
        <div className="relative">
          {/* ACSA wordmark image */}
          <div
            className={`mb-6 transition-all duration-1000 ${
              textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <Image
              src="/ACSA_white-logo_text.png"
              alt="ACSA"
              width={1000}
              height={220}
              priority
              className="mx-auto h-auto w-[58vw] md:w-[42vw] max-w-3xl drop-shadow-[0_0_40px_rgba(0,255,255,0.8)] filter blur-[0.5px]"
            />
          </div>
          
          {/* Subtitle with futuristic styling */}
          <h2 
            className={`text-xl md:text-2xl font-light mb-8 text-white tracking-[0.15em] uppercase transition-all duration-1000 delay-300 ${
              textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{
              fontFamily: "'Orbitron', 'Arial', sans-serif",
              textShadow: '0 0 15px #00ffff, 0 0 30px #00ffff',
              letterSpacing: '0.15em'
            }}
          >
            Advanced Communication Student Association
          </h2>
          
          {/* Description with futuristic border */}
          <div 
            className={`relative p-6 rounded-2xl backdrop-blur-sm mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-600 ${
              textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{
              background: 'rgba(0, 0, 0, 0.4)',
              border: '2px solid #00ffff40',
              boxShadow: '0 0 30px #00ffff20, inset 0 0 30px rgba(0, 255, 255, 0.1)'
            }}
          >
            <p className="text-base md:text-lg text-gray-200 leading-relaxed font-light"
              style={{
                fontFamily: "'Space Grotesk', 'Arial', sans-serif",
                letterSpacing: '0.03em'
              }}
            >
              Exploring the frontiers of communication technology through innovation, collaboration, and cutting-edge research in electronics & communication.
            </p>
            
            {/* Animated border effect */}
            <div 
              className="absolute inset-0 rounded-2xl"
              style={{
                background: 'linear-gradient(45deg, transparent, #00ffff20, transparent)',
                animation: textVisible ? 'borderGlow 3s ease-in-out infinite' : 'none'
              }}
            />
          </div>
          
          {/* Call to Action Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto transition-all duration-1000 delay-900 ${
            textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <Link href="/events">
              <Button
                size="lg"
                className="group font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 hover:scale-105 uppercase tracking-wider"
                style={{
                  background: 'linear-gradient(45deg, #00ffff, #00ffff80)',
                  color: 'white',
                  border: '2px solid #00ffff',
                  boxShadow: '0 0 20px #00ffff40, inset 0 0 20px rgba(0, 255, 255, 0.2)',
                  fontFamily: "'Orbitron', 'Arial', sans-serif"
                }}
              >
                Explore Events
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/team">
              <Button
                size="lg"
                className="group font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 hover:scale-105 uppercase tracking-wider"
                style={{
                  background: 'transparent',
                  color: '#00ffff',
                  border: '2px solid #00ffff',
                  boxShadow: '0 0 15px #00ffff20',
                  fontFamily: "'Orbitron', 'Arial', sans-serif"
                }}
              >
                Meet the Team
                <Users className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Hero Section
export default function HeroSection() {
  useEffect(() => {
    console.log('HeroSection component mounted')
  }, [])
  
  return (
    <div className="w-full h-screen relative overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
      {/* 3D Earth Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 25], fov: 45 }}
          style={{ background: 'linear-gradient(to bottom, #000033, #1a1a4e)' }}
          onCreated={(gl) => {
            console.log('Canvas created', gl)
          }}
        >
          {/* Enhanced lighting */}
          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 5, 5]} intensity={2.0} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          
          <Stars radius={100} depth={50} count={3200} factor={6} saturation={0} fade speed={0.8} />
          
          <Earth />
        </Canvas>
      </div>

      {/* Neon circuits overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none circuits-overlay" />
      
      {/* ACSA Introduction overlay */}
      <ACSAIntro />
      
      {/* Custom animations */}
      <style jsx>{`
        @keyframes borderGlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes textGlow {
          0% { text-shadow: 0 0 30px #00ffff, 0 0 60px #00ffff; }
          100% { text-shadow: 0 0 50px #00ffff, 0 0 100px #00ffff; }
        }
        @keyframes circuitsPan {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 100%; }
        }
        .circuits-overlay {
          opacity: 0.22;
          background:
            radial-gradient(circle at 20% 30%, rgba(0, 255, 255, 0.12), transparent 60%),
            radial-gradient(circle at 80% 70%, rgba(0, 128, 255, 0.10), transparent 55%),
            repeating-linear-gradient(0deg, rgba(0, 238, 255, 0.18) 0 1px, transparent 1px 60px),
            repeating-linear-gradient(90deg, rgba(0, 238, 255, 0.12) 0 1px, transparent 1px 80px);
          background-size: auto, auto, 100% 60px, 80px 100%;
          animation: circuitsPan 40s linear infinite;
        }
      `}</style>
      
      {/* Import Orbitron, Michroma and Space Grotesk fonts */}
      <link 
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap" 
        rel="stylesheet" 
      />
      <link 
        href="https://fonts.googleapis.com/css2?family=Michroma&display=swap" 
        rel="stylesheet" 
      />
      <link 
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" 
        rel="stylesheet" 
      />
    </div>
  )
}
