"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Calendar, Clock, MapPin, Users, ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Image from "next/image"

export default function EventRegistrationPage() {
  const params = useParams()
  const router = useRouter()
  const eventId = params.id as string

  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    university: "",
    year: "",
    major: "",
    experience: "",
    expectations: "",
    dietaryRestrictions: "",
  })

  const events = {
    "1": {
      id: 1,
      title: "5G Technology Workshop",
      date: "2024-03-15",
      time: "2:00 PM - 5:00 PM",
      location: "Engineering Building, Room 301",
      description:
        "Hands-on workshop exploring the latest 5G communication technologies and their real-world applications.",
      attendees: 45,
      maxAttendees: 60,
      category: "Workshop",
      image: "/5g-workshop-banner.png",
    },
    "2": {
      id: 2,
      title: "AI in Communications Seminar",
      date: "2024-03-22",
      time: "1:00 PM - 3:00 PM",
      location: "Virtual Event",
      description: "Expert panel discussion on how artificial intelligence is revolutionizing communication systems.",
      attendees: 78,
      maxAttendees: 100,
      category: "Seminar",
      image: "/ai-communication-seminar.png",
    },
    "3": {
      id: 3,
      title: "Network Security Bootcamp",
      date: "2024-04-05",
      time: "9:00 AM - 4:00 PM",
      location: "Computer Lab, Building C",
      description: "Intensive bootcamp covering advanced network security protocols and cybersecurity best practices.",
      attendees: 32,
      maxAttendees: 40,
      category: "Bootcamp",
      image: "/network-security-bootcamp.png",
    },
    "4": {
      id: 4,
      title: "IoT Innovation Challenge",
      date: "2024-04-18",
      time: "10:00 AM - 6:00 PM",
      location: "Innovation Hub",
      description: "24-hour hackathon focused on developing innovative IoT solutions for smart cities.",
      attendees: 56,
      maxAttendees: 80,
      category: "Competition",
      image: "/iot-hackathon-smart-cities.png",
    },
  }

  const event = events[eventId as keyof typeof events]

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
      // In a real app, this would be an API call to save the registration
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("[v0] Registration submitted:", { eventId, formData })

      setIsSuccess(true)
    } catch (error) {
      console.error("[v0] Registration error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
          <Link href="/events">
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500">Back to Events</Button>
          </Link>
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
                    {event.attendees}/{event.maxAttendees} registered
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-gray-400 mt-2">{event.maxAttendees - event.attendees} spots remaining</p>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div>
            <div className="glass-card p-8 rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/5 to-blue-500/5">
              <h2 className="text-2xl font-bold mb-6">Event Registration</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-300">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="mt-1 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-300">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="mt-1 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400"
                      placeholder="Enter your last name"
                    />
                  </div>
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
                    className="mt-1 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-300">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="university" className="text-sm font-medium text-gray-300">
                      University *
                    </Label>
                    <Input
                      id="university"
                      name="university"
                      value={formData.university}
                      onChange={handleInputChange}
                      required
                      className="mt-1 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400"
                      placeholder="Your university"
                    />
                  </div>
                  <div>
                    <Label htmlFor="year" className="text-sm font-medium text-gray-300">
                      Academic Year *
                    </Label>
                    <Input
                      id="year"
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      required
                      className="mt-1 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400"
                      placeholder="e.g., 3rd Year"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="major" className="text-sm font-medium text-gray-300">
                    Major/Field of Study *
                  </Label>
                  <Input
                    id="major"
                    name="major"
                    value={formData.major}
                    onChange={handleInputChange}
                    required
                    className="mt-1 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400"
                    placeholder="Your major or field of study"
                  />
                </div>

                <div>
                  <Label htmlFor="experience" className="text-sm font-medium text-gray-300">
                    Relevant Experience
                  </Label>
                  <Textarea
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    rows={3}
                    className="mt-1 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 resize-none"
                    placeholder="Brief description of your relevant experience or background"
                  />
                </div>

                <div>
                  <Label htmlFor="expectations" className="text-sm font-medium text-gray-300">
                    What do you hope to learn?
                  </Label>
                  <Textarea
                    id="expectations"
                    name="expectations"
                    value={formData.expectations}
                    onChange={handleInputChange}
                    rows={3}
                    className="mt-1 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 resize-none"
                    placeholder="What are your expectations and learning goals for this event?"
                  />
                </div>

                <div>
                  <Label htmlFor="dietaryRestrictions" className="text-sm font-medium text-gray-300">
                    Dietary Restrictions
                  </Label>
                  <Input
                    id="dietaryRestrictions"
                    name="dietaryRestrictions"
                    value={formData.dietaryRestrictions}
                    onChange={handleInputChange}
                    className="mt-1 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400"
                    placeholder="Any dietary restrictions or allergies"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Registering...
                    </div>
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
