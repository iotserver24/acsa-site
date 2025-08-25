"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { X, Menu, Zap, Users, Calendar, GraduationCap } from "lucide-react"

const navigation = [
  { name: "Home", href: "/", icon: Zap },
  { name: "Events", href: "/events", icon: Calendar },
  { name: "Team", href: "/team", icon: Users },
  { name: "Faculties", href: "/faculties", icon: GraduationCap },
]

export function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={cn(
      "sticky top-0 z-50 transition-all duration-500 ease-in-out",
      scrolled 
        ? "bg-black/95 backdrop-blur-xl border-b border-cyan-400/20 shadow-2xl shadow-cyan-500/10" 
        : "bg-black/80 backdrop-blur-md border-b border-cyan-400/10"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="group relative flex items-center">
              <Image
                src="/ACSA_white-logo.png"
                alt="ACSA logo"
                width={140}
                height={40}
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                priority
              />
              <span className="sr-only">ACSA</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-2">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "group relative px-6 py-3 rounded-xl transition-all duration-300 font-semibold tracking-wider",
                      "hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20",
                      isActive
                        ? "text-cyan-400 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 shadow-lg shadow-cyan-500/20"
                        : "text-white hover:text-cyan-400 hover:bg-white/5 border border-transparent hover:border-cyan-400/20"
                    )}
                    style={{
                      fontFamily: "'Orbitron', 'Arial', sans-serif"
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className={cn(
                        "h-4 w-4 transition-all duration-300",
                        isActive ? "text-cyan-400" : "text-gray-400 group-hover:text-cyan-400"
                      )} />
                      <span className="relative z-10">{item.name}</span>
                    </div>
                    
                    {/* Glow effect */}
                    <div className={cn(
                      "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300",
                      isActive ? "opacity-20" : "group-hover:opacity-10"
                    )}
                         style={{
                           background: 'radial-gradient(circle, #00ffff20, transparent 70%)'
                         }} />
                    
                    {/* Animated border */}
                    <div className={cn(
                      "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300",
                      isActive ? "opacity-100" : "group-hover:opacity-50"
                    )}
                         style={{
                           background: 'linear-gradient(45deg, transparent, #00ffff20, transparent)',
                           animation: isActive ? 'borderGlow 2s ease-in-out infinite' : 'none'
                         }} />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative p-3 rounded-xl border border-cyan-400/20 bg-black/50 backdrop-blur-sm hover:bg-cyan-500/10 transition-all duration-300 group"
            >
              <div className="relative z-10">
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-cyan-400 group-hover:text-white transition-colors" />
                ) : (
                  <Menu className="h-6 w-6 text-cyan-400 group-hover:text-white transition-colors" />
                )}
              </div>
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                   style={{
                     background: 'radial-gradient(circle, #00ffff20, transparent 70%)'
                   }} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-500 ease-in-out bg-black/95 backdrop-blur-xl border-t border-cyan-400/10",
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 py-6 space-y-3">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 font-semibold tracking-wider",
                  "hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20",
                  isActive
                    ? "text-cyan-400 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 shadow-lg shadow-cyan-500/20"
                    : "text-white hover:text-cyan-400 hover:bg-white/5 border border-transparent hover:border-cyan-400/20"
                )}
                style={{
                  fontFamily: "'Orbitron', 'Arial', sans-serif"
                }}
              >
                <Icon className={cn(
                  "h-5 w-5 transition-all duration-300",
                  isActive ? "text-cyan-400" : "text-gray-400 group-hover:text-cyan-400"
                )} />
                <span className="relative z-10">{item.name}</span>
                
                {/* Glow effect */}
                <div className={cn(
                  "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300",
                  isActive ? "opacity-20" : "group-hover:opacity-10"
                )}
                     style={{
                       background: 'radial-gradient(circle, #00ffff20, transparent 70%)'
                     }} />
              </Link>
            )
          })}
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes borderGlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>
      
      {/* Import Orbitron font */}
      <link 
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap" 
        rel="stylesheet" 
      />
    </nav>
  )
}
