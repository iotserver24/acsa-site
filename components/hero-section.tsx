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
  )
}
