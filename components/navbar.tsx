"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="group" onClick={closeMobileMenu}>
            <Image
              src="/ACSA_white-logo.png"
              alt="ACSA logo"
              width={180}
              height={50}
              className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop Navigation Links - Moved to Right */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="relative group text-white font-orbitron text-base tracking-wider uppercase transition-all duration-500 ease-out hover:scale-105 px-4 py-2">
              <span className="relative z-10 transition-all duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-blue-400 group-hover:to-purple-400">
                Home
              </span>
              {/* Permanent Neon Blue Border */}
              <div className="absolute inset-0 border border-cyan-400/50 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.2)] shadow-cyan-400/20"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-blue-400/5 to-purple-400/5 rounded-lg"></div>
              {/* Animated Border Glow */}
              <div className="absolute inset-0 rounded-lg">
                <div className="absolute inset-0 rounded-lg border border-cyan-400/30 animate-pulse"></div>
                <div className="absolute inset-0 rounded-lg border border-cyan-400/20 animate-ping"></div>
              </div>
            </Link>
            <Link href="/events" className="relative group text-white font-orbitron text-base tracking-wider uppercase transition-all duration-500 ease-out hover:scale-105 px-4 py-2">
              <span className="relative z-10 transition-all duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-blue-400 group-hover:to-purple-400">
                Events
              </span>
              {/* Permanent Neon Blue Border */}
              <div className="absolute inset-0 border border-cyan-400/50 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.2)] shadow-cyan-400/20"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-blue-400/5 to-purple-400/5 rounded-lg"></div>
              {/* Animated Border Glow */}
              <div className="absolute inset-0 rounded-lg">
                <div className="absolute inset-0 rounded-lg border border-cyan-400/30 animate-pulse"></div>
                <div className="absolute inset-0 rounded-lg border border-cyan-400/20 animate-ping"></div>
              </div>
            </Link>
            <Link href="/team" className="relative group text-white font-orbitron text-base tracking-wider uppercase transition-all duration-500 ease-out hover:scale-105 px-4 py-2">
              <span className="relative z-10 transition-all duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-blue-400 group-hover:to-purple-400">
                Team
              </span>
              {/* Permanent Neon Blue Border */}
              <div className="absolute inset-0 border border-cyan-400/50 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.2)] shadow-cyan-400/20"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-blue-400/5 to-purple-400/5 rounded-lg"></div>
              {/* Animated Border Glow */}
              <div className="absolute inset-0 rounded-lg">
                <div className="absolute inset-0 rounded-lg border border-cyan-400/30 animate-pulse"></div>
                <div className="absolute inset-0 rounded-lg border border-cyan-400/20 animate-ping"></div>
              </div>
            </Link>
            <Link href="/faculties" className="relative group text-white font-orbitron text-base tracking-wider uppercase transition-all duration-500 ease-out hover:scale-105 px-4 py-2">
              <span className="relative z-10 transition-all duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-blue-400 group-hover:to-purple-400">
                Faculty
              </span>
              {/* Permanent Neon Blue Border */}
              <div className="absolute inset-0 border border-cyan-400/50 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.2)] shadow-cyan-400/20"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-blue-400/5 to-purple-400/5 rounded-lg"></div>
              {/* Animated Border Glow */}
              <div className="absolute inset-0 rounded-lg">
                <div className="absolute inset-0 rounded-lg border border-cyan-400/30 animate-pulse"></div>
                <div className="absolute inset-0 rounded-lg border border-cyan-400/20 animate-ping"></div>
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-primary transition-colors p-2"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-black/95 backdrop-blur-md border-t border-white/10">
            {/* Mobile Navigation Links */}
            <Link
              href="/"
              className={`relative group block px-4 py-3 text-white font-orbitron text-base tracking-wider uppercase transition-all duration-500 ease-out hover:scale-105 transform ${
                isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: '100ms' }}
              onClick={closeMobileMenu}
            >
              <span className="relative z-10 transition-all duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-blue-400 group-hover:to-purple-400">
                Home
              </span>
              {/* Permanent Neon Blue Border */}
              <div className="absolute inset-0 border border-cyan-400/50 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.2)] shadow-cyan-400/20"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-blue-400/5 to-purple-400/5 rounded-lg"></div>
              {/* Animated Border Glow */}
              <div className="absolute inset-0 rounded-lg">
                <div className="absolute inset-0 rounded-lg border border-cyan-400/30 animate-pulse"></div>
                <div className="absolute inset-0 rounded-lg border border-cyan-400/20 animate-ping"></div>
              </div>
            </Link>
            <Link
              href="/events"
              className={`relative group block px-4 py-3 text-white font-orbitron text-base tracking-wider uppercase transition-all duration-500 ease-out hover:scale-105 transform ${
                isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: '150ms' }}
              onClick={closeMobileMenu}
            >
              <span className="relative z-10 transition-all duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-blue-400 group-hover:to-purple-400">
                Events
              </span>
              {/* Permanent Neon Blue Border */}
              <div className="absolute inset-0 border border-cyan-400/50 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.2)] shadow-cyan-400/20"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-blue-400/5 to-purple-400/5 rounded-lg"></div>
              {/* Animated Border Glow */}
              <div className="absolute inset-0 rounded-lg">
                <div className="absolute inset-0 rounded-lg border border-cyan-400/30 animate-pulse"></div>
                <div className="absolute inset-0 rounded-lg border border-cyan-400/20 animate-ping"></div>
              </div>
            </Link>
            <Link
              href="/team"
              className={`relative group block px-4 py-3 text-white font-orbitron text-base tracking-wider uppercase transition-all duration-500 ease-out hover:scale-105 transform ${
                isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: '200ms' }}
              onClick={closeMobileMenu}
            >
              <span className="relative z-10 transition-all duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-blue-400 group-hover:to-purple-400">
                Team
              </span>
              {/* Permanent Neon Blue Border */}
              <div className="absolute inset-0 border border-cyan-400/50 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.2)] shadow-cyan-400/20"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-blue-400/5 to-purple-400/5 rounded-lg"></div>
              {/* Animated Border Glow */}
              <div className="absolute inset-0 rounded-lg">
                <div className="absolute inset-0 rounded-lg border border-cyan-400/30 animate-pulse"></div>
                <div className="absolute inset-0 rounded-lg border border-cyan-400/20 animate-ping"></div>
              </div>
            </Link>
            <Link
              href="/faculties"
              className={`relative group block px-4 py-3 text-white font-orbitron text-base tracking-wider uppercase transition-all duration-500 ease-out hover:scale-105 transform ${
                isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: '250ms' }}
              onClick={closeMobileMenu}
            >
              <span className="relative z-10 transition-all duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-blue-400 group-hover:to-purple-400">
                Faculty
              </span>
              {/* Permanent Neon Blue Border */}
              <div className="absolute inset-0 border border-cyan-400/50 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.2)] shadow-cyan-400/20"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-blue-400/5 to-purple-400/5 rounded-lg"></div>
              {/* Animated Border Glow */}
              <div className="absolute inset-0 rounded-lg">
                <div className="absolute inset-0 rounded-lg border border-cyan-400/30 animate-pulse"></div>
                <div className="absolute inset-0 rounded-lg border border-cyan-400/20 animate-ping"></div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
