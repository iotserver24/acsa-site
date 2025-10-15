"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Clock, ArrowRight, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Event } from "@/lib/database"

export function EventsShowcase() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'upcoming' | 'featured'>('upcoming')

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events?type=upcoming&limit=6')
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
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatTime = (timeString: string) => {
    return timeString
  }

  const getTimeUntilEvent = (dateString: string) => {
    const eventDate = new Date(dateString)
    const now = new Date()
    const diffTime = eventDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) return "Past"
    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Tomorrow"
    if (diffDays < 7) return `${diffDays} days`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks`
    return `${Math.ceil(diffDays / 30)} months`
  }

  if (loading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Upcoming Events</h2>
            <p className="text-lg md:text-xl text-gray-300">Discover our latest workshops and seminars</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-800/50 rounded-2xl h-80"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Upcoming Events</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Join us for cutting-edge workshops, seminars, and competitions that push the boundaries of communication technology
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-gray-900/50 rounded-xl p-1 border border-gray-700">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'upcoming'
                  ? 'bg-cyan-500 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setActiveTab('featured')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'featured'
                  ? 'bg-cyan-500 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Featured Events
            </button>
          </div>
        </div>

        {/* Events Grid */}
        {events.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">No Events Available</h3>
            <p className="text-gray-400 mb-8">We're currently planning our next exciting events. Check back soon!</p>
            <Link href="/events">
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                View All Events
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events
              .filter(event => activeTab === 'upcoming' || event.featured)
              .slice(0, 6)
              .map((event) => (
                <Card
                  key={event.id}
                  className="group glass-card border-gray-700/50 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 overflow-hidden"
                >
                  {/* Event Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Featured Badge */}
                    {event.featured && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-yellow-500/90 text-black font-semibold flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          Featured
                        </Badge>
                      </div>
                    )}
                    
                    {/* Time Until Event */}
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-cyan-500/90 text-white font-semibold">
                        {getTimeUntilEvent(event.date)}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {event.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400 line-clamp-2">
                      {event.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Event Details */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-gray-300">
                        <Calendar className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        <span className="text-sm font-medium">{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <Clock className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        <span className="text-sm font-medium">{formatTime(event.time)}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        <span className="text-sm font-medium">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <Users className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        <span className="text-sm font-medium">
                          {event.attendees}/{event.registrationLimit || event.maxAttendees} registered
                        </span>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="border-cyan-400/30 text-cyan-400">
                        {event.category}
                      </Badge>
                      
                      {/* Registration Status */}
                      {event.attendees >= (event.registrationLimit || event.maxAttendees) ? (
                        <Badge className="bg-red-500/90 text-white">Full</Badge>
                      ) : (
                        <Badge className="bg-green-500/90 text-white">Open</Badge>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      {event.attendees >= (event.registrationLimit || event.maxAttendees) ? (
                        <Button 
                          disabled 
                          className="flex-1 bg-red-500 text-white cursor-not-allowed opacity-75"
                        >
                          Event Full
                        </Button>
                      ) : (
                        <Link href={`/events/register/${event.id}`} className="flex-1">
                          <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white group-hover:scale-105 transition-transform">
                            Register Now
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        )}

        {/* View All Events Button */}
        <div className="text-center mt-12">
          <Link href="/events">
            <Button
              size="lg"
              variant="outline"
              className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 px-8 py-4 rounded-xl text-lg hover:scale-105 transition-all duration-300"
            >
              View All Events
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
