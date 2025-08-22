"use client"

import { useEffect, useState } from "react"
import { Calendar, Clock, MapPin, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import type { Event } from "@/lib/database"

export default function EventsPage() {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([])
  const [pastEvents, setPastEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const [upcomingRes, pastRes] = await Promise.all([
          fetch('/api/events?type=upcoming'),
          fetch('/api/events?type=past')
        ])
        
        const upcoming = await upcomingRes.json()
        const past = await pastRes.json()
        
        setUpcomingEvents(upcoming)
        setPastEvents(past)
      } catch (error) {
        console.error('Failed to fetch events:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10" />
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
            Events & Activities
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join us for cutting-edge workshops, seminars, and competitions that push the boundaries of communication
            technology
          </p>
        </div>
      </section>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
        </div>
      ) : (
        <>
          {/* Upcoming Events */}
          <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-12">
                <Calendar className="w-8 h-8 text-cyan-400" />
                <h2 className="text-4xl font-bold">Upcoming Events</h2>
              </div>

              {upcomingEvents.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-xl">No upcoming events at the moment.</p>
                  <p className="text-gray-500 mt-2">Check back soon for new exciting events!</p>
                </div>
              ) : (
                <div className="grid gap-8">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className={`glass-card p-8 rounded-2xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/20 ${
                  event.featured
                    ? "border-cyan-400/50 bg-gradient-to-br from-cyan-500/10 to-blue-500/10"
                    : "border-white/10 hover:border-cyan-400/30"
                }`}
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="lg:w-80">
                    <div className="relative h-48 lg:h-full min-h-[200px] rounded-xl overflow-hidden">
                      <Image
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium">
                        {event.category}
                      </span>
                      {event.featured && (
                        <span className="px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 rounded-full text-sm font-medium">
                          Featured
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold mb-3 text-white">{event.title}</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">{event.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Calendar className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm">{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Clock className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <MapPin className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-64 flex flex-col justify-between">
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm text-gray-300">
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
                          <span className="text-xs text-gray-400">
                            Registration limit: {event.registrationLimit}
                          </span>
                        </div>
                      )}
                    </div>

                    <Link href={`/events/register/${event.id}`}>
                      <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25">
                        Register Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
                </div>
              )}
            </div>
          </section>

          {/* Past Events */}
          <section className="py-16 px-4 bg-gradient-to-b from-transparent to-gray-900/20">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-12">
                <Clock className="w-8 h-8 text-gray-400" />
                <h2 className="text-4xl font-bold">Past Events</h2>
              </div>

              {pastEvents.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-xl">No past events to display.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {pastEvents.map((event) => (
              <div
                key={event.id}
                className="glass-card p-6 rounded-2xl border border-white/10 hover:border-gray-400/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gray-500/10"
              >
                <div className="relative h-40 rounded-lg overflow-hidden mb-4">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <div className="mb-4">
                  <span className="px-3 py-1 bg-gray-500/20 text-gray-300 rounded-full text-sm font-medium">
                    {event.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3 text-white">{event.title}</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{event.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-3 h-3" />
                      <span className="text-xs">{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Users className="w-3 h-3" />
                      <span className="text-xs">{event.attendees}/{event.maxAttendees} attendees</span>
                    </div>
                    {event.registrationLimit && event.registrationLimit !== event.maxAttendees && (
                      <div className="flex items-center gap-2 text-gray-400">
                        <span className="text-xs">Reg. limit: {event.registrationLimit}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
                </div>
              )}
            </div>
          </section>
        </>
      )}

      {/* Call to Action */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-12 rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
            <h2 className="text-3xl font-bold mb-4 text-white">Stay Updated</h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Don't miss out on our upcoming events! Join our community to receive notifications about new workshops,
              seminars, and competitions.
            </p>
            <div className="flex justify-center">
              <Link href="https://chat.whatsapp.com/KJz1L9Z0rEd5DlNDdsH1Pm" target="_blank" rel="noopener noreferrer">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium px-8 py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25">
                  Join ACSA Community
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
