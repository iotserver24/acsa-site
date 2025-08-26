"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="group">
            <Image
              src="/ACSA_white-logo.png"
              alt="ACSA logo"
              width={180}
              height={50}
              className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </Link>

          {/* Navigation Links */}
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

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <Link href="/events">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading">
                Join Events
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
