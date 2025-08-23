"use client"

import { useEffect, useState } from "react"

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative">
        {/* Main Logo Animation */}
        <div className="relative w-32 h-32">
          {/* Outer Ring */}
          <div className="absolute inset-0 border-4 border-cyan-400/30 rounded-full animate-ping"></div>
          
          {/* Middle Ring */}
          <div className="absolute inset-2 border-4 border-cyan-400/50 rounded-full animate-pulse"></div>
          
          {/* Inner Ring */}
          <div className="absolute inset-4 border-4 border-cyan-400 rounded-full animate-spin"></div>
          
          {/* Center Logo */}
          <div className="absolute inset-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-2xl">ACSA</span>
          </div>
        </div>
        
        {/* Loading Text */}
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">ACSA</h2>
          <p className="text-cyan-400 text-sm">Advanced Communication Student Association</p>
          
          {/* Loading Dots */}
          <div className="flex justify-center mt-4 space-x-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
        
        {/* Background Particles */}
        <div className="absolute inset-0 -z-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
