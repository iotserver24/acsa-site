"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Calendar, Clock, MapPin, Users, Mail, Phone, User } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    university: "",
    year: "",
    experience: "",
    motivation: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    alert("Registration submitted successfully! We'll contact you soon.")
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back button */}
        <Link
          href="/events"
          className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Events
        </Link>

        {/* Event details header */}
        <div className="glass-card p-8 mb-8 animate-fade-in">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">
                5G Technology Workshop
              </h1>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Join us for an intensive workshop on 5G technology and its applications in modern communication systems.
                Learn from industry experts and get hands-on experience with cutting-edge technology.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center text-gray-300">
                  <Calendar className="w-5 h-5 mr-3 text-cyan-400" />
                  <span>March 15, 2024</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Clock className="w-5 h-5 mr-3 text-cyan-400" />
                  <span>2:00 PM - 6:00 PM</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <MapPin className="w-5 h-5 mr-3 text-cyan-400" />
                  <span>Tech Auditorium, Block A</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Users className="w-5 h-5 mr-3 text-cyan-400" />
                  <span>Limited to 50 participants</span>
                </div>
              </div>
            </div>

            <div className="lg:w-80">
              <img src="/5g-workshop-banner.png" alt="5G Workshop" className="w-full h-48 object-cover rounded-lg" />
            </div>
          </div>
        </div>

        {/* Registration form */}
        <div className="glass-card p-8 animate-fade-in-delay">
          <h2 className="text-2xl font-bold mb-6 text-center">Register for Workshop</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name *
                </label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-900/50 border-gray-700 text-white focus:border-cyan-400"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address *
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-900/50 border-gray-700 text-white focus:border-cyan-400"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number *
                </label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-900/50 border-gray-700 text-white focus:border-cyan-400"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">University/Institution *</label>
                <Input
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-900/50 border-gray-700 text-white focus:border-cyan-400"
                  placeholder="Enter your university"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Year of Study *</label>
              <select
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-900/50 border border-gray-700 text-white focus:border-cyan-400 rounded-md px-3 py-2"
              >
                <option value="">Select your year</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="Graduate">Graduate</option>
                <option value="PhD">PhD</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Previous Experience with 5G/Networking
              </label>
              <Textarea
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="bg-gray-900/50 border-gray-700 text-white focus:border-cyan-400 min-h-[100px]"
                placeholder="Briefly describe any relevant experience (optional)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Why do you want to attend this workshop? *
              </label>
              <Textarea
                name="motivation"
                value={formData.motivation}
                onChange={handleInputChange}
                required
                className="bg-gray-900/50 border-gray-700 text-white focus:border-cyan-400 min-h-[120px]"
                placeholder="Tell us about your motivation and what you hope to learn"
              />
            </div>

            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </div>
                ) : (
                  "Register Now"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
