<<<<<<< HEAD
'use client'

import { useEffect, useRef, useState } from 'react'
import EarthScene from './earth-scene'

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current || !textRef.current) return
      
      const scrollY = window.scrollY
      const heroHeight = heroRef.current.offsetHeight
      const scrollProgress = Math.min(scrollY / heroHeight, 1)
      
      // Move text up as user scrolls
      textRef.current.style.transform = `translateY(${-scrollProgress * 100}px)`
      textRef.current.style.opacity = `${1 - scrollProgress}`
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isLoaded) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl font-bold animate-pulse">
          ACSA Loading...
        </div>
      </div>
    )
  }

  return (
    <div ref={heroRef} className="relative w-full h-screen overflow-hidden">
      {/* 3D Earth Scene */}
      <div className="absolute inset-0 z-0">
        <EarthScene />
      </div>
      
      {/* Overlay Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div 
          ref={textRef}
          className="text-center text-white px-4 transition-all duration-1000"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            ACSA
          </h1>
          <p className="text-xl md:text-2xl mb-6 text-gray-300">
            Advanced Communication Student Association
          </p>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Exploring the frontiers of communication technology through innovation, 
            collaboration, and cutting-edge research in electronics & communication.
          </p>
          
          {/* Call to Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-300">
              Explore Events
            </button>
            <button className="px-8 py-3 border border-white text-white hover:bg-white hover:text-black rounded-lg font-semibold transition-all duration-300">
              Join Our Team
            </button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <svg 
            className="w-6 h-6 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </div>
      </div>
    </div>
=======
"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Play, Users, Award, Zap, BookOpen } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const stats = [
    { icon: Users, value: "200+", label: "Active Members" },
    { icon: Award, value: "50+", label: "Projects Completed" },
    { icon: Zap, value: "5+", label: "Years of Excellence" },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Main Logo Animation */}
          <div className={`flex justify-center mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative group">
              <div className="w-40 h-40 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-full flex items-center justify-center border-2 border-cyan-400/50 animate-pulse hover:animate-spin transition-all duration-500 group-hover:scale-110">
                <div className="w-28 h-28 bg-gradient-to-br from-cyan-400/40 to-blue-500/40 rounded-full flex items-center justify-center border border-cyan-400/30">
                  <span className="text-cyan-400 font-bold text-3xl group-hover:text-white transition-colors">ACSA</span>
                </div>
              </div>
              
              {/* Orbiting Elements */}
              <div className="absolute inset-0 animate-spin">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-cyan-400 rounded-full"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-400 rounded-full"></div>
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-cyan-300 rounded-full"></div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-blue-300 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Main Title */}
          <div className={`space-y-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tight">
              <span className="block bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                ACSA
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-cyan-400 font-semibold">
              Advanced Communication Student Association
            </p>
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              The official student association of Electronics & Communication (Advanced Communication Tech) branch. 
              We innovate, collaborate, and lead the way in cutting-edge communication technologies.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center mt-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Link href="/events">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold px-8 py-4 rounded-xl text-lg hover:from-cyan-600 hover:to-blue-600 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30"
              >
                Explore Events
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/team">
              <Button
                size="lg"
                variant="outline"
                className="group border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 bg-transparent px-8 py-4 rounded-xl text-lg hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20"
              >
                Meet the Team
                <Users className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Stats Section */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {stats.map((stat, index) => (
              <Card key={index} className="glass-card border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 hover:scale-105 group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <stat.icon className="h-8 w-8 text-cyan-400" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2 group-hover:text-white transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-gray-300 text-sm font-medium">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex flex-col items-center text-cyan-400/60 animate-bounce">
              <span className="text-sm mb-2">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-cyan-400/60 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-cyan-400/60 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
>>>>>>> ce12bc17cff178e96efca0c0e36ba786002699c0
  )
}
