"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Zap, Award, BookOpen, Target, Lightbulb, ArrowRight } from "lucide-react"
import Link from "next/link"
import type { Event } from "@/lib/database"
import HeroSection from "@/components/hero-section"
import EarthScene from "@/components/earth-scene"

export default function HomePage() {
  const [latestEvent, setLatestEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)

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

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const aboutSectionOffset = windowHeight * 1.5 // Start animation when About section comes into view
      const progress = Math.max(0, Math.min(1, (scrollY - aboutSectionOffset) / (windowHeight * 0.5)))
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black relative">
      {/* Fixed 3D Earth Scene - stays above all content */}
      <EarthScene />

      {/* 3D Earth Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group hover:scale-105 transition-all duration-300">
              <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2 group-hover:animate-pulse">200+</div>
              <div className="text-gray-300">Active Members</div>
            </div>
            <div className="text-center group hover:scale-105 transition-all duration-300">
              <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2 group-hover:animate-pulse">50+</div>
              <div className="text-gray-300">Projects Completed</div>
            </div>
            <div className="text-center group hover:scale-105 transition-all duration-300">
              <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2 group-hover:animate-pulse">5+</div>
              <div className="text-gray-300">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section with Right-Side Layout */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">About ACSA</h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Empowering the next generation of communication technology innovators through hands-on learning and
              industry collaboration
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div 
              className="space-y-6 transition-transform duration-700 ease-out"
              style={{
                transform: `translateX(${scrollProgress * 100}px)`
              }}
            >
              <p className="text-lg text-gray-300 leading-relaxed">
                The Advanced Communication Student Association (ACSA) is a vibrant community of passionate students from
                the Electronics & Communication (Advanced Communication Tech) branch. We serve as the bridge between
                academic excellence and industry innovation.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Our association focuses on emerging technologies like 5G/6G networks, IoT systems, satellite
                communications, and AI-driven communication solutions. Through workshops, hackathons, and research
                projects, we prepare students for the future of communication technology.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-3 text-cyan-400 hover:scale-105 transition-all duration-300">
                  <Users className="h-6 w-6" />
                  <span className="font-semibold">Strong Community</span>
                </div>
                <div className="flex items-center gap-3 text-cyan-400 hover:scale-105 transition-all duration-300">
                  <Zap className="h-6 w-6" />
                  <span className="font-semibold">Innovation Focus</span>
                </div>
                <div className="flex items-center gap-3 text-cyan-400 hover:scale-105 transition-all duration-300">
                  <Award className="h-6 w-6" />
                  <span className="font-semibold">Industry Recognition</span>
                </div>
                <div className="flex items-center gap-3 text-cyan-400 hover:scale-105 transition-all duration-300">
                  <BookOpen className="h-6 w-6" />
                  <span className="font-semibold">Continuous Learning</span>
                </div>
              </div>
            </div>

            <Card className="glass-card rounded-2xl hover:shadow-cyan-500/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-black/20 backdrop-blur-sm border-cyan-400/20">
              <CardHeader>
                <CardTitle className="text-cyan-400 text-2xl">Our Mission</CardTitle>
                <CardDescription className="text-gray-300 text-lg">
                  Building tomorrow's communication leaders today
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
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
                <CardTitle className="text-cyan-400">5G/6G Networks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-center">
                  Exploring next-generation wireless communication technologies and their real-world applications.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card rounded-2xl hover:shadow-cyan-500/20 hover:shadow-xl transition-all duration-500 hover:scale-105 bg-black/20 backdrop-blur-sm border-cyan-400/20">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 hover:rotate-12 transition-all duration-300">
                  <BookOpen className="h-8 w-8 text-cyan-400" />
                </div>
                <CardTitle className="text-cyan-400">IoT Systems</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-center">
                  Building smart connected devices and understanding the Internet of Things ecosystem.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card rounded-2xl hover:shadow-cyan-500/20 hover:shadow-xl transition-all duration-500 hover:scale-105 bg-black/20 backdrop-blur-sm border-cyan-400/20">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 hover:rotate-12 transition-all duration-300">
                  <Award className="h-8 w-8 text-cyan-400" />
                </div>
                <CardTitle className="text-cyan-400">AI Communications</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-center">
                  Integrating artificial intelligence with communication systems for smarter networks.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Upcoming Event Highlight */}
      {latestEvent && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-20">
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
                        <span className="font-semibold">{latestEvent.attendees}/{latestEvent.maxAttendees} registered</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link href={`/events/register/${latestEvent.id}`}>
                        <Button className="bg-cyan-500 text-white font-semibold hover:bg-cyan-600 px-6 py-3 rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30">
                          Register Now
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
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
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-20">
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
