"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "Alex Chen",
    role: "Final Year Student",
    department: "Electronics & Communication",
    image: "/professional-caucasian-student.png",
    content: "ACSA has been instrumental in my growth as a communication engineer. The hands-on workshops and industry connections have opened doors I never thought possible.",
    rating: 5,
    event: "5G Network Workshop",
    year: "2024"
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Third Year Student",
    department: "Electronics & Communication",
    image: "/professional-indian-student-portrait.png",
    content: "The IoT hackathon organized by ACSA was an incredible learning experience. Working with real-world problems and collaborating with industry experts was invaluable.",
    rating: 5,
    event: "IoT Smart Cities Hackathon",
    year: "2024"
  },
  {
    id: 3,
    name: "David Kim",
    role: "Second Year Student",
    department: "Electronics & Communication",
    image: "/korean-male-student-portrait.png",
    content: "ACSA's mentorship program helped me understand the practical applications of theoretical concepts. The faculty advisors are incredibly supportive and knowledgeable.",
    rating: 5,
    event: "Mentorship Program",
    year: "2024"
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    role: "Third Year Student",
    department: "Electronics & Communication",
    image: "/professional-hispanic-student.png",
    content: "The blockchain conference was eye-opening. ACSA consistently brings cutting-edge technology discussions to our campus, keeping us ahead of industry trends.",
    rating: 5,
    event: "Blockchain in Telecom Conference",
    year: "2024"
  },
  {
    id: 5,
    name: "Raj Patel",
    role: "Final Year Student",
    department: "Electronics & Communication",
    image: "/indian-male-student-portrait.png",
    content: "ACSA's project showcase gave me the platform to present my research. The feedback from industry professionals helped me refine my work significantly.",
    rating: 5,
    event: "Research Project Showcase",
    year: "2024"
  },
  {
    id: 6,
    name: "Sarah Johnson",
    role: "Second Year Student",
    department: "Electronics & Communication",
    image: "/professional-female-student-portrait.png",
    content: "The network security bootcamp was intense but incredibly rewarding. ACSA's events always push us to learn beyond the curriculum and think innovatively.",
    rating: 5,
    event: "Network Security Bootcamp",
    year: "2024"
  }
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">What Our Members Say</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Hear from our students about their experiences with ACSA events and activities
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Main Testimonial */}
          <div className="max-w-4xl mx-auto">
            <Card className="glass-card border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Profile Section */}
                  <div className="flex-shrink-0 text-center md:text-left">
                    <div className="relative w-24 h-24 mx-auto md:mx-0 mb-4">
                      <Image
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        fill
                        className="object-cover rounded-full border-2 border-cyan-400/30"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {testimonials[currentIndex].name}
                    </h3>
                    <p className="text-cyan-400 text-sm font-medium mb-2">
                      {testimonials[currentIndex].role}
                    </p>
                    <p className="text-gray-400 text-sm mb-3">
                      {testimonials[currentIndex].department}
                    </p>
                    
                    {/* Rating */}
                    <div className="flex justify-center md:justify-start gap-1 mb-3">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    
                    {/* Event Badge */}
                    <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-400/30">
                      {testimonials[currentIndex].event}
                    </Badge>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1">
                    <div className="relative">
                      <Quote className="absolute -top-2 -left-2 w-8 h-8 text-cyan-400/30" />
                      <p className="text-lg text-gray-300 leading-relaxed pl-6">
                        "{testimonials[currentIndex].content}"
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gray-900/80 hover:bg-cyan-500/20 border border-gray-700 hover:border-cyan-400/50 rounded-full flex items-center justify-center text-white hover:text-cyan-400 transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gray-900/80 hover:bg-cyan-500/20 border border-gray-700 hover:border-cyan-400/50 rounded-full flex items-center justify-center text-white hover:text-cyan-400 transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-cyan-400 scale-125'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-cyan-400 mb-2">98%</div>
            <div className="text-gray-300">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-cyan-400 mb-2">500+</div>
            <div className="text-gray-300">Students Engaged</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-cyan-400 mb-2">4.9/5</div>
            <div className="text-gray-300">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  )
}
