"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
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

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-primary transition-colors font-heading">
              Home
            </Link>
            <Link href="/events" className="text-white hover:text-primary transition-colors font-heading">
              Events
            </Link>
            <Link href="/team" className="text-white hover:text-primary transition-colors font-heading">
              Team
            </Link>
            <Link href="/faculties" className="text-white hover:text-primary transition-colors font-heading">
              Faculty
            </Link>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/events">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading">
                Join Events
              </Button>
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
              className={`block px-3 py-2 text-white hover:text-primary hover:bg-white/5 rounded-md transition-all duration-300 font-heading transform ${
                isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: '100ms' }}
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link
              href="/events"
              className={`block px-3 py-2 text-white hover:text-primary hover:bg-white/5 rounded-md transition-all duration-300 font-heading transform ${
                isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: '150ms' }}
              onClick={closeMobileMenu}
            >
              Events
            </Link>
            <Link
              href="/team"
              className={`block px-3 py-2 text-white hover:text-primary hover:bg-white/5 rounded-md transition-all duration-300 font-heading transform ${
                isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: '200ms' }}
              onClick={closeMobileMenu}
            >
              Team
            </Link>
            <Link
              href="/faculties"
              className={`block px-3 py-2 text-white hover:text-primary hover:bg-white/5 rounded-md transition-all duration-300 font-heading transform ${
                isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: '250ms' }}
              onClick={closeMobileMenu}
            >
              Faculty
            </Link>
            
            {/* Mobile CTA Button */}
            <div className={`pt-2 transition-all duration-300 transform ${
              isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
            }`} style={{ transitionDelay: '300ms' }}>
              <Link href="/events" onClick={closeMobileMenu}>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-heading">
                  Join Events
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
