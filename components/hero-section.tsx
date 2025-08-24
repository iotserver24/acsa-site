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
<<<<<<< HEAD
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
=======
    <div ref={heroRef} className="relative w-full h-screen overflow-hidden">
      {/* Background - Only visible on desktop */}
      <div className="absolute inset-0 z-0 hidden md:block bg-gradient-to-br from-black via-gray-900 to-blue-900">
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-[radial-gradient(circle_at_1px_1px,rgba(156,146,172,0.1)_1px,transparent_0)] bg-[length:20px_20px]"></div>
        </div>
      </div>
      
      {/* Mobile Background - Original Earth scene background */}
      <div className="absolute inset-0 z-0 md:hidden">
        <EarthScene />
      </div>
      
      {/* Overlay Content */}
      <div className="absolute inset-0 z-10 flex flex-col md:flex-row items-center justify-between px-8">
        {/* Left Side - Earth Scene (Desktop only) */}
        <div className="hidden md:flex w-full md:w-1/2 h-full items-center justify-center">
          <div className="w-full h-full">
            <EarthScene />
          </div>
        </div>
        
        {/* Right Side - ACSA Information */}
        <div 
          ref={textRef}
          className="w-full md:w-1/2 text-center md:text-center text-white transition-all duration-1000"
        >
          {/* Main Logo Animation */}
          <div className={`flex justify-center mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative group">
              <div className="w-32 h-32 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-full flex items-center justify-center border-2 border-cyan-400/50 animate-pulse hover:animate-spin transition-all duration-500 group-hover:scale-110">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-400/40 to-blue-500/40 rounded-full flex items-center justify-center border border-cyan-400/30">
                  <span className="text-cyan-400 font-bold text-2xl group-hover:text-white transition-colors">ACSA</span>
                </div>
              </div>
              
              {/* Orbiting Elements */}
              <div className="absolute inset-0 animate-spin">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full"></div>
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-cyan-300 rounded-full"></div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-300 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Main Title */}
          <div className={`space-y-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-200 to-purple-600 bg-clip-text text-transparent animate-pulse">
              ACSA
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-cyan-400 font-semibold">
              Advanced Communication Student Association
            </p>
            <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto">
              Exploring the frontiers of communication technology through innovation, 
              collaboration, and cutting-edge research in electronics & communication.
>>>>>>> f71d4efb4f5b617119fb33d8f4b318679b6747bb
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
<<<<<<< HEAD
        </div>
      </div>
=======

          {/* Stats Section */}
          <div className={`flex gap-6 mt-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {stats.map((stat, index) => (
              <Card key={index} className="glass-card border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 hover:scale-105 group bg-black/20 backdrop-blur-sm flex-1">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                    <stat.icon className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div className="text-xl font-bold text-cyan-400 mb-1 group-hover:text-white transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-gray-300 text-xs font-medium">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      

>>>>>>> f71d4efb4f5b617119fb33d8f4b318679b6747bb
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
