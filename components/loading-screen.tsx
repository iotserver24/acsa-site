"use client"

import { useEffect, useState } from "react"

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500) // Reduced loading time from 3000ms to 2500ms

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer)
          return 100
        }
        return prev + 2.5 // Increased progress increment for smoother animation
      })
    }, 60) // Slightly slower progress updates

    return () => {
      clearTimeout(timer)
      clearInterval(progressTimer)
    }
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-cyan-400/60 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main loading content */}
      <div className="relative z-10 text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-cyan-400/80 to-cyan-600/80 rounded-full flex items-center justify-center animate-pulse">
          <span className="text-xl font-bold text-black">ACSA</span>
        </div>

        {/* Loading text with subtle fade-in */}
        <h1 className="text-3xl font-bold text-white mb-3 animate-fade-in">Advanced Communication</h1>
        <h2 className="text-xl text-cyan-400/90 mb-6 animate-fade-in-delay">Student Association</h2>

        <div className="w-56 h-1.5 bg-gray-800/60 rounded-full mx-auto mb-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400/80 to-cyan-600/80 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-cyan-400/80 text-sm font-mono">{progress}%</p>

        <div className="flex justify-center space-x-1.5 mt-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-cyan-400/70 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
