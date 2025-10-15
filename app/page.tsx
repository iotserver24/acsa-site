"use client"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Zap, Award, BookOpen, Target, Lightbulb, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Event } from "@/lib/database"
import HeroSection from "@/components/hero-section"

export default function HomePage() {
  const [latestEvent, setLatestEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)

  // Visibility states for reveal animations
  const [statsVisible, setStatsVisible] = useState(false)
  const [aboutVisible, setAboutVisible] = useState(false)
  const [missionVisible, setMissionVisible] = useState(false)

  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchLatestEvent = async () => {
      try {
        const response = await fetch('/api/events?type=upcoming&limit=1')
        const events = await response.json()
        if (events.length > 0) {
          setLatestEvent(events[0])
        }
      } catch (error) {
        console.error('Failed to fetch latest event:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLatestEvent()
  }, [])

  // Observe sections for reveal animation
  useEffect(() => {
    if (typeof window === 'undefined') return

    const observers: IntersectionObserver[] = []

    const makeObserver = (
      selector: string,
      setVisible: (v: boolean) => void
    ) => {
      const el = document.querySelector(selector)
      if (!el) return
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisible(true)
              obs.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.15 }
      )
      obs.observe(el)
      observers.push(obs)
    }

    makeObserver('#stats-section', setStatsVisible)
    makeObserver('#about-left', setAboutVisible)
    makeObserver('#mission-card', setMissionVisible)

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.88), rgba(0,0,0,0.88)), url('/glowing-circuit-matrix-stockcake.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >

      {/* 3D Earth Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <section id="stats-section" className={`py-16 px-4 sm:px-6 lg:px-8 relative z-10`}>
        <div className="max-w-7xl mx-auto">
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8`}>
            <div className={`text-center group hover:scale-105 transition-all duration-500 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2 group-hover:animate-pulse"
                   style={{ fontFamily: "'Orbitron', 'Arial', sans-serif", letterSpacing: '0.06em' }}>200+</div>
              <div className="text-gray-300" style={{ fontFamily: "'Space Grotesk', 'Arial', sans-serif" }}>ACT STUDENTS</div>
            </div>
            <div className={`text-center group hover:scale-105 transition-all duration-500 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2 group-hover:animate-pulse"
                   style={{ fontFamily: "'Orbitron', 'Arial', sans-serif", letterSpacing: '0.06em' }}>20+</div>
              <div className="text-gray-300" style={{ fontFamily: "'Space Grotesk', 'Arial', sans-serif" }}>CORE MEMBERS</div>
            </div>
            <div className={`text-center group hover:scale-105 transition-all duration-500 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2 group-hover:animate-pulse"
                   style={{ fontFamily: "'Orbitron', 'Arial', sans-serif", letterSpacing: '0.06em' }}>2024</div>
              <div className="text-gray-300" style={{ fontFamily: "'Space Grotesk', 'Arial', sans-serif" }}>ACSA FOUNDED</div>
            </div>
          </div>
        </div>
      </section>

      {/* Group Picture Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Orbitron', 'Arial', sans-serif", letterSpacing: '0.06em' }}>
              ACSA 2025-26
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto rounded-full"></div>
          </div>
          
          {/* Group Picture */}
          <div className="flex justify-center">
            <div className="relative group">
              <Image
                src="/group_pic.JPG"
                alt="ACSA Team Group Photo"
                width={1000}
                height={600}
                className="rounded-lg shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:shadow-cyan-400/20 border-2 border-cyan-400/50"
                style={{
                  boxShadow: '0 0 30px rgba(34, 211, 238, 0.1)',
                }}
              />
              {/* Permanent neon blue border */}
              <div className="absolute inset-0 rounded-lg border-2 border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.3)]"></div>
              {/* Animated glow effect on hover */}
              <div className="absolute inset-0 rounded-lg border border-cyan-400/30 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-700`} id="about-left">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "'Orbitron', 'Arial', sans-serif", letterSpacing: '0.06em' }}>About ACSA</h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto" style={{ fontFamily: "'Space Grotesk', 'Arial', sans-serif", letterSpacing: '0.02em' }}>
              Empowering the next generation of communication technology innovators through hands-on learning and
              industry collaboration
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed" style={{ fontFamily: "'JetBrains Mono', 'Consolas', 'Monaco', monospace" }}>
                The Advanced Communication Student Association (ACSA) is a vibrant community of passionate students from
                the Electronics & Communication (Advanced Communication Tech) branch. We serve as the bridge between
                academic excellence and industry innovation.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed" style={{ fontFamily: "'JetBrains Mono', 'Consolas', 'Monaco', monospace" }}>
                Our association focuses on emerging technologies like 5G/6G networks, IoT systems, satellite
                communications, and AI-driven communication solutions. Through workshops, hackathons, and research
                projects, we prepare students for the future of communication technology.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-3 text-cyan-400 hover:scale-105 transition-all duration-300">
                  <Users className="h-6 w-6" />
                  <span className="font-semibold" style={{ fontFamily: "'JetBrains Mono', 'Consolas', 'Monaco', monospace" }}>Strong Community</span>
                </div>
                <div className="flex items-center gap-3 text-cyan-400 hover:scale-105 transition-all duration-300">
                  <Zap className="h-6 w-6" />
                  <span className="font-semibold" style={{ fontFamily: "'JetBrains Mono', 'Consolas', 'Monaco', monospace" }}>Innovation Focus</span>
                </div>
                <div className="flex items-center gap-3 text-cyan-400 hover:scale-105 transition-all duration-300">
                  <Award className="h-6 w-6" />
                  <span className="font-semibold" style={{ fontFamily: "'JetBrains Mono', 'Consolas', 'Monaco', monospace" }}>Industry Recognition</span>
                </div>
                <div className="flex items-center gap-3 text-cyan-400 hover:scale-105 transition-all duration-300">
                  <BookOpen className="h-6 w-6" />
                  <span className="font-semibold" style={{ fontFamily: "'JetBrains Mono', 'Consolas', 'Monaco', monospace" }}>Continuous Learning</span>
                </div>
              </div>
            </div>

            <Card className={`glass-card rounded-2xl hover:shadow-cyan-500/20 hover:shadow-2xl transition-all duration-700 hover:scale-105 bg-black/20 backdrop-blur-sm border-cyan-400/20 ${missionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} id="mission-card">
              <CardHeader>
                <CardTitle className="text-cyan-400 text-2xl" style={{ fontFamily: "'Orbitron', 'Arial', sans-serif", letterSpacing: '0.06em' }}>Our Mission</CardTitle>
                <CardDescription className="text-gray-300 text-lg" style={{ fontFamily: "'Space Grotesk', 'Arial', sans-serif" }}>
                  Building tomorrow's communication leaders today
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6" style={{ fontFamily: "'Space Grotesk', 'Arial', sans-serif" }}>
                <p className="text-gray-300 leading-relaxed">
                  To create a collaborative ecosystem where students explore cutting-edge communication technologies,
                  develop practical skills, and build meaningful industry connections.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Target className="h-5 w-5 text-cyan-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">
                      Promote technical excellence and innovation in communication tech
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Lightbulb className="h-5 w-5 text-cyan-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Foster industry-academia collaboration and knowledge transfer</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-cyan-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Build a strong professional network for career growth</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-cyan-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">
                      Develop practical skills through hands-on projects and workshops
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-card rounded-2xl hover:shadow-cyan-500/20 hover:shadow-xl transition-all duration-500 hover:scale-105 bg-black/20 backdrop-blur-sm border-cyan-400/20">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 hover:rotate-12 transition-all duration-300">
                  <Zap className="h-8 w-8 text-cyan-400" />
                </div>
                <CardTitle className="text-cyan-400" style={{ fontFamily: "'JetBrains Mono', 'Consolas', 'Monaco', monospace" }}>5G/6G Networks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-center" style={{ fontFamily: "'JetBrains Mono', 'Consolas', 'Monaco', monospace" }}>
                  Exploring next-generation wireless communication technologies and their real-world applications.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card rounded-2xl hover:shadow-cyan-500/20 hover:shadow-xl transition-all duration-500 hover:scale-105 bg-black/20 backdrop-blur-sm border-cyan-400/20">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 hover:rotate-12 transition-all duration-300">
                  <BookOpen className="h-8 w-8 text-cyan-400" />
                </div>
                <CardTitle className="text-cyan-400" style={{ fontFamily: "'JetBrains Mono', 'Consolas', 'Monaco', monospace" }}>IoT Systems</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-center" style={{ fontFamily: "'JetBrains Mono', 'Consolas', 'Monaco', monospace" }}>
                  Building smart connected devices and understanding the Internet of Things ecosystem.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card rounded-2xl hover:shadow-cyan-500/20 hover:shadow-xl transition-all duration-500 hover:scale-105 bg-black/20 backdrop-blur-sm border-cyan-400/20">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 hover:rotate-12 transition-all duration-300">
                  <Award className="h-8 w-8 text-cyan-400" />
                </div>
                <CardTitle className="text-cyan-400" style={{ fontFamily: "'JetBrains Mono', 'Consolas', 'Monaco', monospace" }}>AI Communications</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-center" style={{ fontFamily: "'JetBrains Mono', 'Consolas', 'Monaco', monospace" }}>
                  Integrating artificial intelligence with communication systems for smarter networks.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Upcoming Event Highlight */}
      {latestEvent && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up">Upcoming Highlight</h2>
              <p className="text-lg md:text-xl text-gray-300 animate-fade-in-up animation-delay-200">
                Don't miss our next exciting event
              </p>
            </div>

            <Card className="glass rounded-2xl max-w-5xl mx-auto hover:shadow-cyan-500/30 hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in-up animation-delay-400 bg-black/20 backdrop-blur-sm border-cyan-400/20">
              <div className="md:flex">
                <div className="md:w-2/5">
                  <img
                    src={latestEvent.image || "/placeholder.svg"}
                    alt={latestEvent.title}
                    className="w-full h-64 md:h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-t-none hover:scale-105 transition-all duration-500"
                  />
                </div>
                <div className="md:w-3/5 p-8">
                  <CardHeader className="p-0 mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-2xl md:text-3xl text-cyan-400">{latestEvent.title}</CardTitle>
                      {latestEvent.featured && (
                        <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm font-medium">
                          Featured
                        </span>
                      )}
                    </div>
                    <CardDescription className="text-lg text-gray-300">
                      {latestEvent.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 space-y-6">
                    <div className="flex flex-col sm:flex-row gap-4 text-gray-300">
                      <div className="flex items-center gap-2">
                        <ArrowRight className="h-5 w-5 text-cyan-400" />
                        <span className="font-semibold">{new Date(latestEvent.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ArrowRight className="h-5 w-5 text-cyan-400" />
                        <span className="font-semibold">{latestEvent.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-cyan-400" />
                        <span className="font-semibold">{latestEvent.attendees}/{latestEvent.registrationLimit || latestEvent.maxAttendees} registered</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      {latestEvent.attendees >= (latestEvent.registrationLimit || latestEvent.maxAttendees) ? (
                        <Button 
                          disabled 
                          className="bg-red-500 text-white font-semibold px-6 py-3 rounded-xl cursor-not-allowed opacity-75"
                        >
                          Event Full
                        </Button>
                      ) : (
                        <Link href={`/events/register/${latestEvent.id}`}>
                          <Button className="bg-cyan-500 text-white font-semibold hover:bg-cyan-600 px-6 py-3 rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30">
                            Register Now
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      )}
                      <Link href="/events">
                        <Button
                          variant="outline"
                          className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 px-6 py-3 rounded-xl bg-transparent hover:scale-105 transition-all duration-300"
                        >
                          View All Events
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* No Events Message */}
      {!loading && !latestEvent && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto text-center">
            <div className="glass rounded-2xl max-w-2xl mx-auto p-12 bg-black/20 backdrop-blur-sm border-cyan-400/20">
              <h2 className="text-3xl font-bold text-white mb-4">No Upcoming Events</h2>
              <p className="text-gray-300 mb-8">
                We're currently planning our next exciting events. Check back soon for updates!
              </p>
              <Link href="/events">
                <Button className="bg-cyan-500 text-white font-semibold hover:bg-cyan-600 px-6 py-3 rounded-xl hover:scale-105 transition-all duration-300">
                  View All Events
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
