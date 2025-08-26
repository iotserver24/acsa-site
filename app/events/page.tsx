"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users, ArrowRight } from "lucide-react"
import Link from "next/link"
import type { Event } from "@/lib/database"

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events')
        const data = await response.json()
        setEvents(data)
      } catch (error) {
        console.error('Failed to fetch events:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const upcomingEvents = events.filter(event => new Date(event.date) > new Date())
  const pastEvents = events.filter(event => new Date(event.date) <= new Date())

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading events...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Stars Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="stars-container">
          {[...Array(150)].map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-heading">Events & Workshops</h1>
            <p className="text-lg md:text-xl text-gray-300 font-mono">
              Join us for exciting workshops, hackathons, and networking events
            </p>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <Calendar className="w-8 h-8 text-cyan-400" />
              <h2 className="text-4xl font-bold font-heading">Upcoming Events</h2>
            </div>

            {upcomingEvents.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-xl font-mono">No upcoming events at the moment.</p>
                <p className="text-gray-500 mt-2 font-mono text-base">Check back soon for new exciting events!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {upcomingEvents.map((event) => (
                  <Card
                    key={event.id}
                    className="glass-card rounded-2xl hover:shadow-cyan-500/20 hover:shadow-xl transition-all duration-500 hover:scale-105 bg-black/20 backdrop-blur-sm border-cyan-400/20"
                  >
                    <div className="md:flex">
                      <div className="md:w-2/5">
                        <img
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          className="w-full h-48 md:h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-t-none"
                        />
                      </div>
                      <div className="md:w-3/5 p-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium font-mono">
                              {event.category}
                            </span>
                            {event.featured && (
                              <span className="px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 rounded-full text-sm font-medium font-mono">
                                Featured
                              </span>
                            )}
                          </div>

                          <h3 className="text-2xl font-bold mb-3 text-white font-heading">{event.title}</h3>
                          <p className="text-gray-300 mb-6 leading-relaxed font-mono text-base">{event.description}</p>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="flex items-center gap-2 text-gray-300">
                              <Calendar className="w-4 h-4 text-cyan-400" />
                              <span className="text-sm font-mono">{formatDate(event.date)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                              <Clock className="w-4 h-4 text-cyan-400" />
                              <span className="text-sm font-mono">{event.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                              <MapPin className="w-4 h-4 text-cyan-400" />
                              <span className="text-sm font-mono">{event.location}</span>
                            </div>
                          </div>

                          <div className="mb-6">
                            <div className="flex items-center gap-2 mb-2">
                              <Users className="w-4 h-4 text-cyan-400" />
                              <span className="text-sm text-gray-300 font-mono">
                                {event.attendees}/{event.maxAttendees} registered
                              </span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                              <div
                                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                              />
                            </div>
                            {event.registrationLimit && event.registrationLimit !== event.maxAttendees && (
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-400 font-mono">
                                  Registration limit: {event.registrationLimit}
                                </span>
                              </div>
                            )}
                          </div>

                          <Link href={`/events/register/${event.id}`}>
                            <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 font-heading">
                              Register Now
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Past Events */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <Clock className="w-8 h-8 text-gray-400" />
              <h2 className="text-4xl font-bold font-heading">Past Events</h2>
            </div>

            {pastEvents.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-xl font-mono">No past events to display.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map((event) => (
                  <Card
                    key={event.id}
                    className="glass-card rounded-2xl hover:shadow-gray-500/20 hover:shadow-xl transition-all duration-500 hover:scale-105 bg-black/20 backdrop-blur-sm border-gray-400/20"
                  >
                    <div className="p-6">
                      <div className="mb-4">
                        <span className="px-3 py-1 bg-gray-500/20 text-gray-300 rounded-full text-sm font-medium font-mono">
                          {event.category}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold mb-3 text-white font-heading">{event.title}</h3>
                      <p className="text-gray-400 text-sm mb-4 leading-relaxed font-mono">{event.description}</p>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-gray-400">
                            <Calendar className="w-3 h-3" />
                            <span className="text-xs font-mono">{formatDate(event.date)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-400">
                            <Users className="w-3 h-3" />
                            <span className="text-xs font-mono">{event.attendees}/{event.maxAttendees} attendees</span>
                          </div>
                          {event.registrationLimit && event.registrationLimit !== event.maxAttendees && (
                            <div className="flex items-center gap-2 text-gray-400">
                              <span className="text-xs font-mono">Reg. limit: {event.registrationLimit}</span>
                            </div>
                          )}
                        </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="glass-card p-12 rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
              <h2 className="text-3xl font-bold mb-4 text-white font-heading">Stay Updated</h2>
              <p className="text-gray-300 mb-8 leading-relaxed font-mono text-base">
                Don't miss out on our upcoming events! Join our community to receive notifications about new workshops,
                seminars, and competitions.
              </p>
              <div className="flex justify-center">
                <Link href="https://chat.whatsapp.com/KJz1L9Z0rEd5DlNDdsH1Pm" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium px-8 py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 font-heading">
                    Join ACSA Community
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Styled-jsx for stars animation */}
      <style jsx>{`
        .stars-container {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: #00ffff;
          border-radius: 50%;
          box-shadow: 
            0 0 4px #00ffff,
            0 0 8px #00ffff,
            0 0 12px #00ffff;
          animation: twinkle 3s ease-in-out infinite;
        }
        @keyframes twinkle {
          0%, 100% { 
            opacity: 0.3; 
            transform: scale(1);
          }
          50% { 
            opacity: 1; 
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  )
}
