"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users, ArrowLeft, ExternalLink, Star } from "lucide-react"
import Link from "next/link"
import type { Event } from "@/lib/database"

export default function EventDetailPage() {
  const params = useParams()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${params.id}`)
        const data = await response.json()
        setEvent(data)
      } catch (error) {
        console.error('Failed to fetch event:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchEvent()
    }
  }, [params.id])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading event details...</div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-4">Event not found</div>
          <Link href="/events">
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const isUpcoming = new Date(event.date) > new Date()
  const isPast = new Date(event.date) <= new Date()

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
        {/* Back Button */}
        <div className="pt-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Link href="/events">
              <Button variant="ghost" className="text-white hover:text-cyan-400 hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Events
              </Button>
            </Link>
          </div>
        </div>

        {/* Event Detail Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Card className="glass-card rounded-3xl border-cyan-400/20 bg-black/20 backdrop-blur-sm overflow-hidden">
                             {/* Event Image - Full Size */}
               <div className="relative w-full">
                 <img
                   src={event.image || "/placeholder.svg"}
                   alt={event.title}
                   className="w-full h-auto object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                 <div className="absolute bottom-6 left-6 right-6">
                   <div className="flex items-center gap-3 mb-4">
                     <span className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium font-mono backdrop-blur-sm">
                       {event.category}
                     </span>
                     {event.featured && (
                       <span className="px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 rounded-full text-sm font-medium font-mono backdrop-blur-sm flex items-center gap-2">
                         <Star className="w-4 h-4" />
                         Featured
                       </span>
                     )}
                     {isUpcoming && (
                       <span className="px-4 py-2 bg-green-500/20 text-green-300 rounded-full text-sm font-medium font-mono backdrop-blur-sm">
                         Upcoming
                       </span>
                     )}
                     {isPast && (
                       <span className="px-4 py-2 bg-gray-500/20 text-gray-300 rounded-full text-sm font-medium font-mono backdrop-blur-sm">
                         Past Event
                       </span>
                     )}
                   </div>
                   <h1 className="text-4xl md:text-5xl font-bold text-white font-heading mb-2">
                     {event.title}
                   </h1>
                 </div>
               </div>

              {/* Event Content */}
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main Content */}
                  <div className="lg:col-span-2">
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-white font-heading mb-4">Event Description</h2>
                      <p className="text-gray-300 leading-relaxed font-mono text-lg whitespace-pre-line">
                        {event.description}
                      </p>
                    </div>

                    {/* Event Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                        <Calendar className="w-6 h-6 text-cyan-400" />
                        <div>
                          <p className="text-gray-400 text-sm font-mono">Date</p>
                          <p className="text-white font-medium">{formatDate(event.date)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                        <Clock className="w-6 h-6 text-cyan-400" />
                        <div>
                          <p className="text-gray-400 text-sm font-mono">Time</p>
                          <p className="text-white font-medium">{event.time}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                        <MapPin className="w-6 h-6 text-cyan-400" />
                        <div>
                          <p className="text-gray-400 text-sm font-mono">Location</p>
                          <p className="text-white font-medium">{event.location}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                        <Users className="w-6 h-6 text-cyan-400" />
                        <div>
                          <p className="text-gray-400 text-sm font-mono">Capacity</p>
                          <p className="text-white font-medium">{event.maxAttendees} people</p>
                        </div>
                      </div>
                    </div>

                    {/* Registration Progress */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-white font-heading mb-4">Registration Status</h3>
                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-gray-300 font-mono">
                            {event.attendees} of {event.maxAttendees} registered
                          </span>
                          <span className="text-cyan-400 font-mono font-medium">
                            {Math.round((event.attendees / event.maxAttendees) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
                          <div
                            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                          />
                        </div>
                        {event.registrationLimit && event.registrationLimit !== event.maxAttendees && (
                          <p className="text-gray-400 text-sm font-mono">
                            Registration limit: {event.registrationLimit} people
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="lg:col-span-1">
                    <div className="sticky top-8">
                      {/* Action Buttons */}
                      <div className="space-y-4 mb-8">
                        {isUpcoming && (
                          <Link href={`/events/register/${event.id}`} className="block">
                            <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 font-heading text-lg">
                              Register Now
                              <ExternalLink className="w-5 h-5 ml-2" />
                            </Button>
                          </Link>
                        )}
                        
                        <Link href="https://chat.whatsapp.com/KJz1L9Z0rEd5DlNDdsH1Pm" target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" className="w-full border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 font-medium py-4 rounded-xl transition-all duration-300 font-heading">
                            Join ACSA Community
                            <ExternalLink className="w-5 h-5 ml-2" />
                          </Button>
                        </Link>
                      </div>

                      {/* Event Info Card */}
                      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle className="text-white font-heading">Event Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400 font-mono">Category</span>
                            <span className="text-white font-medium">{event.category}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400 font-mono">Created</span>
                            <span className="text-white font-medium">
                              {new Date(event.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400 font-mono">Last Updated</span>
                            <span className="text-white font-medium">
                              {new Date(event.updatedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </div>

      {/* Styled-jsx for stars animation and enhanced glass effects */}
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
        
        /* Enhanced glass card effects for detail page */
        .glass-card {
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 
            0 25px 50px rgba(0, 255, 255, 0.1),
            0 10px 20px rgba(0, 255, 255, 0.05);
        }
        
        .glass-card:hover {
          transform: translateY(-8px);
          box-shadow: 
            0 35px 70px rgba(0, 255, 255, 0.15),
            0 15px 30px rgba(0, 255, 255, 0.08);
        }
        
        /* Smooth image transitions */
        img {
          transition: all 0.5s ease-in-out;
        }
        
        .glass-card:hover img {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  )
}
