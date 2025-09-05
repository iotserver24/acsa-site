"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Award, BookOpen, Calendar, GraduationCap } from "lucide-react"

const facultyAdvisors = [
  {
    id: 1,
    name: "Dr. DURGA PRASAD",
    designation: "Professor & HoD of A.C.T department",
    department: "Advanced Communication Technology",
    specialization: ["Wireless Body Sensor Networks", "Power Electronics", "Electronics Engineering"],
    experience: "24+ years",
    education: "Ph.D. in Wireless Body Sensor Networks from Manipal Academy of Higher Education, Manipal",
    image: "/faculty/durgaprasadsir.png",
    bio: "Leading expert in Wireless Body Sensor Networks with extensive research experience in power electronics and electronics engineering.",
    contact: {
      email: "durgaprasad@nitte.edu.in",
      phone: "+91-XXXXXXXXXX",
      office: "A.C.T Department, NMAM Institute of Technology",
    },
    achievements: ["Ph.D. in Wireless Body Sensor Networks", "M.E. in Power Electronics", "B.E. in Electronics", "24+ Years of Experience"],
    joiningDate: "10-03-2000",
    qualifications: [
      "Ph.D. in the area of Wireless Body Sensor Networks from Manipal Academy of Higher Education, Manipal",
      "M.E. in Power Electronics from B.M.S. College of Engineering, Bangalore in the year 2000",
      "B.E. in Electronics from University Visvesvaraya College of Engineering, Bangalore in the year 1995"
    ]
  },
  {
    id: 2,
    name: "Dr. MADAN H T",
    designation: "Associate Professor and Club Advisor",
    department: "Advanced Communication Technology",
    specialization: ["Wireless Communication", "Artificial Intelligence and Robotics", "Autonomous Systems", "Computer Network Engineering"],
    experience: "15+ years",
    education: "Ph.D. in Electronics and Communication Engineering from REVA University, Bengaluru",
    image: "/faculty/madansir.png",
    bio: "Distinguished researcher with expertise in wireless communication, AI, robotics, and autonomous systems. Published approximately 15 research papers in reputed international journals and conferences.",
    contact: {
      email: "madan.ht@nitte.edu.in",
      phone: "+91-XXXXXXXXXX",
      office: "A.C.T Department, NMAM Institute of Technology",
    },
    achievements: ["15+ Years Teaching Experience", "15+ Research Publications", "Interdisciplinary Research Expert", "Multiple Institution Experience"],
    joiningDate: "24-07-2024",
    qualifications: [
      "Ph.D. in Electronics and Communication Engineering from REVA University, Bengaluru",
      "M.Tech in Computer Network Engineering from National Institute of Engineering, Mysuru affiliated to Visvesvaraya Technological University, Belagavi",
      "B.E in Electronics and Communication Engineering from Malnad College of Engineering, Hassan affiliated to Visvesvaraya Technological University"
    ]
  },
]

export default function FacultiesPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

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
              }}
            />
          ))}
        </div>
      </div>

      {/* Header Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-white via-primary to-blue-400 bg-clip-text text-transparent" style={{ fontFamily: "'Orbitron', 'Arial', sans-serif" }}>
              Our <span className="text-primary">Faculty Advisors</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in-up delay-200 leading-relaxed tracking-wide" style={{ fontFamily: "'Orbitron', 'Arial', sans-serif" }}>
              Distinguished educators and researchers guiding the next generation of communication engineers
            </p>
          </div>
        </div>
      </section>

      {/* Faculty Grid */}
      <section className="relative pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {facultyAdvisors.map((faculty, index) => (
              <div
                key={faculty.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <Card className={`glass rounded-2xl group hover:scale-[1.02] transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 border-white/10 hover:border-primary/30 backdrop-blur-sm relative overflow-hidden ${
                  faculty.id === 2 ? 'bg-black/60' : 'bg-black/20'
                }`}>
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                  
                  <CardContent className="p-8 relative z-10">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Profile Image */}
                      <div className="flex-shrink-0">
                        <div className="w-32 h-32 rounded-2xl overflow-hidden ring-4 ring-primary/20 group-hover:ring-primary/50 transition-all duration-500">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <img
                            src={faculty.image || "/placeholder.svg"}
                            alt={faculty.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      </div>

                      {/* Faculty Info */}
                      <div className="flex-1 space-y-4">
                        <div>
                          <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors duration-300 mb-1">
                            {faculty.name}
                          </h3>
                          <Badge 
                            variant="secondary" 
                            className="bg-primary/20 text-primary border-primary/30 group-hover:bg-primary/30 group-hover:border-primary/50 transition-all duration-300 text-sm font-medium mb-2"
                          >
                            {faculty.designation}
                          </Badge>
                          <p className="text-sm text-gray-300">{faculty.department}</p>
                        </div>

                        <p className="text-gray-300 leading-relaxed">{faculty.bio}</p>

                        {/* Joining Date */}
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span>Joined: {faculty.joiningDate}</span>
                        </div>

                        {/* Specializations */}
                        <div>
                          <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-primary" />
                            Specializations
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {faculty.specialization.map((spec, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs border-white/20 text-white/80 hover:border-primary/50 hover:text-primary transition-colors"
                              >
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Educational Qualifications */}
                        <div>
                          <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                            <GraduationCap className="h-4 w-4 text-primary" />
                            Educational Qualifications
                          </h4>
                          <ul className="space-y-1">
                            {faculty.qualifications.map((qualification, index) => (
                              <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                                <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                                <span>{qualification}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Achievements */}
                        <div>
                          <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                            <Award className="h-4 w-4 text-primary" />
                            Key Achievements
                          </h4>
                          <ul className="space-y-1">
                            {faculty.achievements.map((achievement, index) => (
                              <li key={index} className="text-sm text-gray-300 flex items-center gap-2">
                                <span className="w-1 h-1 bg-primary rounded-full"></span>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="pt-4 border-t border-white/10">
                          <div className="grid grid-cols-1 gap-3 text-sm">
                            <div className="flex items-center gap-2 text-gray-300">
                              <Mail className="h-4 w-4 text-primary" />
                              <a
                                href={`mailto:${faculty.contact.email}`}
                                className="hover:text-primary transition-colors truncate"
                              >
                                {faculty.contact.email}
                              </a>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                              <MapPin className="h-4 w-4 text-primary" />
                              <span>{faculty.contact.office}</span>
                            </div>
                          </div>
                        </div>

                        {/* Experience & Education */}
                        <div className="pt-2">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="text-white font-medium">Experience: </span>
                              <span className="text-gray-300">{faculty.experience}</span>
                            </div>
                            <div>
                              <span className="text-white font-medium">Education: </span>
                              <span className="text-gray-300">Ph.D. Level</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      {/* <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Academic Guidance</h2>
          <p className="text-xl text-gray-300 mb-8">
            Our faculty advisors are available for academic guidance, research opportunities, and career counseling.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:durgaprasad@nitte.edu.in"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Contact Faculty
            </a>
            <a
              href="/events"
              className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors font-medium"
            >
              Research Opportunities
            </a>
          </div>
        </div>
      </section> */}

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
