"use client"

import { HeroSection } from "@/components/hero-section"
import { EventsShowcase } from "@/components/events-showcase"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Zap, Award, BookOpen, Target, Lightbulb, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">About ACSA</h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Empowering the next generation of communication technology innovators through hands-on learning and
              industry collaboration
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
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

            <Card className="glass-card rounded-2xl hover:shadow-cyan-500/20 hover:shadow-2xl transition-all duration-500 hover:scale-105">
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
            <Card className="glass-card rounded-2xl hover:shadow-cyan-500/20 hover:shadow-xl transition-all duration-500 hover:scale-105">
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

            <Card className="glass-card rounded-2xl hover:shadow-cyan-500/20 hover:shadow-xl transition-all duration-500 hover:scale-105">
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

            <Card className="glass-card rounded-2xl hover:shadow-cyan-500/20 hover:shadow-xl transition-all duration-500 hover:scale-105">
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

      {/* Events Showcase */}
      <EventsShowcase />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Contact Section */}
      <ContactSection />
    </div>
  )
}
