'use client'

import { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, useTexture } from '@react-three/drei'
import { Button } from "@/components/ui/button"
import { ArrowRight, Users } from "lucide-react"
import Link from "next/link"
import * as THREE from 'three'

// Simple Earth component that will definitely be visible
function Earth() {
  const earthRef = useRef<THREE.Mesh>(null)
  const earthTexture = useTexture('/earth-texture.jpg')
  
  useFrame((state) => {
    if (earthRef.current) {
      // Simple rotation
      earthRef.current.rotation.y += 0.005
    }
  })

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[8, 32, 32]} />
      <meshStandardMaterial 
        map={earthTexture}
        roughness={0.3}
        metalness={0.1}
      />
    </mesh>
  )
}

// Simple particle system
function ParticleSystem() {
  const particlesRef = useRef<THREE.Points>(null)
  const particleCount = 500
  
  // Initialize particle positions
  const positions = new Float32Array(particleCount * 3)
  
  useEffect(() => {
    // Initialize particles in a spherical shell around the Earth
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * 2 * Math.PI
      const phi = Math.acos(2 * Math.random() - 1)
      const radius = 12 + Math.random() * 4 // Around Earth
      
      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)
      
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
    }
  }, [])

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.2}
        color="#00ffff"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

// ACSA introduction overlay
function ACSAIntro() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
      {/* Main content centered */}
      <div className="text-center max-w-4xl mx-auto px-8">
        {/* Futuristic glow effect */}
        <div 
          className="absolute inset-0 blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, #00ffff20, transparent 70%)',
            transform: 'translate(-50%, -50%)',
            left: '50%',
            top: '50%'
          }}
        />
        
        {/* Main content */}
        <div className="relative">
          {/* Massive Futuristic ACSA title */}
          <h1 
            className="text-8xl md:text-9xl font-black mb-6 tracking-[0.3em] uppercase leading-none"
            style={{
              fontFamily: "'Orbitron', 'Arial', sans-serif",
              background: 'linear-gradient(45deg, #00ffff, #ffffff, #00ffff)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 30px #00ffff, 0 0 60px #00ffff',
              animation: 'gradientShift 3s ease-in-out infinite, textGlow 2s ease-in-out infinite alternate'
            }}
          >
            ACSA
          </h1>
          
          {/* Subtitle with futuristic styling */}
          <h2 
            className="text-xl md:text-2xl font-light mb-8 text-white tracking-[0.15em] uppercase"
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
            className="relative p-6 rounded-2xl backdrop-blur-sm mb-8 max-w-2xl mx-auto"
            style={{
              background: 'rgba(0, 0, 0, 0.4)',
              border: '2px solid #00ffff40',
              boxShadow: '0 0 30px #00ffff20, inset 0 0 30px rgba(0, 255, 255, 0.1)'
            }}
          >
            <p className="text-base md:text-lg text-gray-200 leading-relaxed font-light">
              Exploring the frontiers of communication technology through innovation, collaboration, and cutting-edge research in electronics & communication.
            </p>
            
            {/* Animated border effect */}
            <div 
              className="absolute inset-0 rounded-2xl"
              style={{
                background: 'linear-gradient(45deg, transparent, #00ffff20, transparent)',
                animation: 'borderGlow 3s ease-in-out infinite'
              }}
            />
          </div>
          
          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto">
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
  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* 3D Earth Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 20], fov: 60 }}
          style={{ background: 'linear-gradient(to bottom, #000033, #1a1a4e)' }}
        >
          {/* Basic lighting */}
          <ambientLight intensity={1.0} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={1.0} />
          
          <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
          
          <Earth />
          <ParticleSystem />
        </Canvas>
      </div>
      
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
      `}</style>
      
      {/* Import Orbitron font */}
      <link 
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap" 
        rel="stylesheet" 
      />
    </div>
  )
}
