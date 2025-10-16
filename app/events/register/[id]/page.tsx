"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Calendar, Clock, MapPin, Users, ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAlert } from "@/components/ui/alert"
import Link from "next/link"
import Image from "next/image"
import type { Event } from "@/lib/database"

export default function EventRegistrationPage() {
  const params = useParams()
  const router = useRouter()
  const eventId = params.id as string
  const { showAlert, AlertContainer } = useAlert()

  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isEventFull, setIsEventFull] = useState(false)
  const [registrationStatus, setRegistrationStatus] = useState<'available' | 'maxReached' | 'limitReached'>('available')
  const [formData, setFormData] = useState({
    name: "",
    usn: "",
    email: "",
    phone: "",
    branchName: "",
    academicYear: "",
  })

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${eventId}`)
        if (response.ok) {
          const eventData = await response.json()
          setEvent(eventData)
          
          // Check registration status
          const maxAttendees = eventData.maxAttendees
          const registrationLimit = eventData.registrationLimit || eventData.maxAttendees
          
          if (eventData.attendees >= registrationLimit) {
            setRegistrationStatus('limitReached')
            setIsEventFull(true)
          } else if (eventData.attendees >= maxAttendees) {
            setRegistrationStatus('maxReached')
            setIsEventFull(false)
          } else {
            setRegistrationStatus('available')
            setIsEventFull(false)
          }
        } else {
          console.error('Event not found')
        }
      } catch (error) {
        console.error('Failed to fetch event:', error)
      } finally {
        setLoading(false)
      }
    }

    if (eventId) {
      fetchEvent()
    }
  }, [eventId])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Create registration
      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: parseInt(eventId),
          ...formData,
        })
      })

      if (response.ok) {
        setIsSuccess(true)
      } else {
        let errorMessage = 'Registration failed. Please try again.'
        
        try {
          const errorData = await response.json()
          console.error('Registration failed:', errorData)
          
          // Handle different error response formats
          if (errorData.error) {
            errorMessage = errorData.error
          } else if (errorData.message) {
            errorMessage = errorData.message
          } else if (typeof errorData === 'string') {
            errorMessage = errorData
          } else if (response.status === 400) {
            errorMessage = 'Invalid registration data. Please check your information.'
          } else if (response.status === 409) {
            errorMessage = 'You have already registered for this event.'
          } else if (response.status >= 500) {
            errorMessage = 'Server error. Please try again later.'
          }
        } catch (parseError) {
          console.error('Failed to parse error response:', parseError)
          errorMessage = `Registration failed (${response.status}). Please try again.`
        }
        
        showAlert('error', errorMessage, 'Registration Failed')
      }
    } catch (error) {
      console.error('Registration error:', error)
      showAlert('error', 'Network error. Please check your connection and try again.', 'Error')
    } finally {
      setIsLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold mb-4">Loading Event...</h1>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
          <p className="text-gray-400 mb-6">The event you're looking for doesn't exist or has been removed.</p>
          <Link href="/events">
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500">Back to Events</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (registrationStatus === 'limitReached') {
    const registrationLimit = event.registrationLimit || event.maxAttendees
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="glass-card p-8 rounded-2xl border border-red-400/20 bg-gradient-to-br from-red-500/10 to-red-600/10">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚫</span>
            </div>
            <h1 className="text-2xl font-bold mb-4 text-red-300">Registration Closed</h1>
            <p className="text-gray-300 mb-6">
              Sorry, this event has reached its registration limit of {registrationLimit} registrations. 
              No more registrations are being accepted at this time.
            </p>
            <div className="space-y-3">
              <Link href="/events">
                <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                  Back to Events
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="glass-card p-8 rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">Registration Successful!</h1>
            <p className="text-gray-300 mb-6">
              Thank you for registering for {event.title}. You'll receive a confirmation email shortly.
            </p>
            <div className="space-y-3">
              <Link href="/events">
                <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                  Back to Events
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-full border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/10 bg-transparent"
                onClick={() => window.print()}
              >
                Print Confirmation
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <AlertContainer />
      {/* Header */}
      <div className="border-b border-white/10 bg-gradient-to-r from-cyan-500/5 to-blue-500/5">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Event Details */}
          <div>
            <div className="glass-card p-8 rounded-2xl border border-white/10 mb-8">
              <div className="relative h-64 rounded-xl overflow-hidden mb-6">
                <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              <div className="mb-4">
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium">
                  {event.category}
                </span>
              </div>

              <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
              <p className="text-gray-300 mb-6 leading-relaxed">{event.description}</p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-cyan-400" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-cyan-400" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-cyan-400" />
                  <span>
                    {event.attendees}/{event.registrationLimit || event.maxAttendees} registered
                    {event.registrationLimit && event.registrationLimit > event.maxAttendees && (
                      <span className="text-sm text-gray-400 ml-2">
                        (Max: {event.maxAttendees})
                      </span>
                    )}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <div className="w-full bg-gray-700 rounded-full h-3 relative">
                  {/* Max attendees section (blue) */}
                  <div
                    className="h-3 rounded-l-full transition-all duration-300"
                    style={{ 
                      width: `${Math.min((event.attendees / event.maxAttendees) * 100, 100)}%`,
                      background: 'linear-gradient(to right, #06b6d4, #3b82f6)' // Blue for regular attendees
                    }}
                  />
                  
                  {/* Extra spots section (green) - only show if we have registration limit > max attendees */}
                  {event.registrationLimit && event.registrationLimit > event.maxAttendees && event.attendees > event.maxAttendees && (
                    <div
                      className="h-3 rounded-r-full transition-all duration-300"
                      style={{ 
                        width: `${Math.min(((event.attendees - event.maxAttendees) / (event.registrationLimit - event.maxAttendees)) * 100, 100)}%`,
                        background: 'linear-gradient(to right, #10b981, #059669)', // Green for extras
                        position: 'absolute',
                        left: `${(event.maxAttendees / event.registrationLimit) * 100}%`,
                        top: 0
                      }}
                    />
                  )}
                  
                  {/* Divider line between max attendees and extra spots */}
                  {event.registrationLimit && event.registrationLimit > event.maxAttendees && (
                    <div
                      className="absolute top-0 h-3 w-0.5 bg-white/30"
                      style={{ 
                        left: `${(event.maxAttendees / event.registrationLimit) * 100}%`
                      }}
                    />
                  )}
                </div>
                
                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                      <span className="text-xs text-gray-400">Regular ({event.attendees}/{event.maxAttendees})</span>
                    </div>
                    {event.registrationLimit && event.registrationLimit > event.maxAttendees && (
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-gray-400">Extras ({Math.max(0, event.attendees - event.maxAttendees)}/{event.registrationLimit - event.maxAttendees})</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-400">
                    {(event.registrationLimit || event.maxAttendees) - event.attendees} spots remaining
                  </p>
                </div>
                
                {event.attendees >= event.maxAttendees && event.attendees < (event.registrationLimit || event.maxAttendees) && (
                  <div className="mt-2 p-2 bg-green-500/10 border border-green-500/20 rounded text-center">
                    <p className="text-sm text-green-400 font-medium">
                      🎯 Extra spots available! Register as backup in case others don't attend.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div>
            <div className={`glass-card p-8 rounded-2xl border bg-gradient-to-br ${
              registrationStatus === 'maxReached' 
                ? 'border-green-400/20 from-green-500/5 to-emerald-500/5' 
                : 'border-cyan-400/20 from-cyan-500/5 to-blue-500/5'
            }`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Event Registration</h2>
                {registrationStatus === 'maxReached' && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-medium">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Extra Spots Available
                  </div>
                )}
              </div>
              
              {registrationStatus === 'maxReached' && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 text-lg">ℹ️</span>
                    <div>
                      <p className="text-green-300 font-medium mb-1">Extra Registration Spots Available!</p>
                      <p className="text-green-200 text-sm">
                        The event has reached its maximum capacity of {event.maxAttendees} attendees, 
                        but we're accepting {event.registrationLimit - event.maxAttendees} additional registrations 
                        as extras in case some attendees don't show up.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-300">
                    Full Name *
                  </Label>
                                      <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="mt-1 bg-white/5 border-white/20 text-white placeholder:text-gray-500/50 focus:border-cyan-400"
                      placeholder="Enter your full name"
                    />
                </div>

                <div>
                  <Label htmlFor="usn" className="text-sm font-medium text-gray-300">
                    USN (University Serial Number) *
                  </Label>
                                      <Input
                      id="usn"
                      name="usn"
                      value={formData.usn}
                      onChange={handleInputChange}
                      required
                      className="mt-1 bg-white/5 border-white/20 text-white placeholder:text-gray-500/50 focus:border-cyan-400"
                      placeholder="Enter your USN"
                    />
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-300">
                    Email Address *
                  </Label>
                                      <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1 bg-white/5 border-white/20 text-white placeholder:text-gray-500/50 focus:border-cyan-400"
                      placeholder="Enter your email address"
                    />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-300">
                    Phone Number *
                  </Label>
                                      <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="mt-1 bg-white/5 border-white/20 text-white placeholder:text-gray-500/50 focus:border-cyan-400"
                      placeholder="Enter your phone number"
                    />
                </div>

                <div>
                  <Label htmlFor="branchName" className="text-sm font-medium text-gray-300">
                    Branch Name *
                  </Label>
                                      <Input
                      id="branchName"
                      name="branchName"
                      value={formData.branchName}
                      onChange={handleInputChange}
                      required
                      className="mt-1 bg-white/5 border-white/20 text-white placeholder:text-gray-500/50 focus:border-cyan-400"
                      placeholder="e.g., Electronics & Communication"
                    />
                </div>

                <div>
                  <Label htmlFor="academicYear" className="text-sm font-medium text-gray-300">
                    Academic Year *
                  </Label>
                  <select
                    id="academicYear"
                    name="academicYear"
                    value={formData.academicYear}
                    onChange={handleInputChange}
                    required
                    aria-label="Select Academic Year"
                    className="mt-1 w-full bg-white/5 border border-white/20 text-white rounded-md px-3 py-2 focus:border-cyan-400 focus:outline-none [&>option]:bg-gray-800 [&>option]:text-white"
                  >
                    <option value="">Select Academic Year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full font-medium py-3 rounded-xl transition-all duration-300 hover:shadow-lg disabled:opacity-50 ${
                    registrationStatus === 'maxReached'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 hover:shadow-green-500/25'
                      : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 hover:shadow-cyan-500/25'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Registering...
                    </div>
                  ) : registrationStatus === 'maxReached' ? (
                    "Register as Extra"
                  ) : (
                    "Complete Registration"
                  )}
                </Button>

                <p className="text-xs text-gray-400 text-center">
                  By registering, you agree to receive event updates and communications from ACSA.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
