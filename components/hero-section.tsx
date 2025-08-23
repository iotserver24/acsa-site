'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Users, Award, Zap } from "lucide-react"
import Link from "next/link"
import EarthScene from './earth-scene'

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoaded(true)
      setIsVisible(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current || !textRef.current) return
      
      const scrollY = window.scrollY
      const heroHeight = window.innerHeight // Use viewport height for more responsive movement
      const scrollProgress = Math.min(scrollY / heroHeight, 1)
      
      console.log('Hero scroll progress:', scrollProgress, 'Scroll Y:', scrollY)
      
      // Move text to the right as user scrolls
      textRef.current.style.transform = `translateX(${scrollProgress * 400}px)`
      textRef.current.style.opacity = `${1 - scrollProgress * 0.3}`
      
      // Update scroll progress for Earth movement
      setScrollProgress(scrollProgress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const stats = [
    { icon: Users, value: "200+", label: "Active Members" },
    { icon: Award, value: "50+", label: "Projects Completed" },
    { icon: Zap, value: "5+", label: "Years of Excellence" },
  ]

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
      {/* Overlay Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div 
          ref={textRef}
          className="text-center text-white px-4 transition-all duration-1000"
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
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Exploring the frontiers of communication technology through innovation, 
              collaboration, and cutting-edge research in electronics & communication.
            </p>
          </div>
          
          {/* Call to Action Buttons */}
          <div className={`mt-8 flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Link href="/events">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold px-8 py-3 rounded-lg text-lg hover:from-cyan-600 hover:to-blue-600 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30"
              >
                Explore Events
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/team">
              <Button
                size="lg"
                variant="outline"
                className="group border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 bg-transparent px-8 py-3 rounded-lg text-lg hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20"
              >
                Meet the Team
                <Users className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Stats Section */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {stats.map((stat, index) => (
              <Card key={index} className="glass-card border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 hover:scale-105 group bg-black/20 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <stat.icon className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1 group-hover:text-white transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-gray-300 text-sm font-medium">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex flex-col items-center text-cyan-400/60 animate-bounce">
          <span className="text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-cyan-400/60 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cyan-400/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
