import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Award, BookOpen } from "lucide-react"

const facultyAdvisors = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    designation: "Professor & Head of Department",
    department: "Electronics & Communication Engineering",
    specialization: ["5G Networks", "Wireless Communications", "Signal Processing"],
    experience: "20+ years",
    education: "Ph.D. in Electronics Engineering, IIT Delhi",
    image: "/dr-rajesh-kumar-portrait.png",
    bio: "Leading researcher in 5G technology with extensive industry collaboration experience.",
    contact: {
      email: "rajesh.kumar@university.edu",
      phone: "+91-9876543210",
      office: "ECE Block, Room 301",
    },
    achievements: ["IEEE Senior Member", "50+ Research Publications", "Best Teacher Award 2023"],
  },
  {
    id: 2,
    name: "Dr. Priya Mehta",
    designation: "Associate Professor",
    department: "Electronics & Communication Engineering",
    specialization: ["VLSI Design", "Embedded Systems", "IoT Applications"],
    experience: "15+ years",
    education: "Ph.D. in VLSI Design, IISc Bangalore",
    image: "/dr-priya-mehta-portrait.png",
    bio: "Expert in VLSI design and embedded systems with focus on IoT innovations.",
    contact: {
      email: "priya.mehta@university.edu",
      phone: "+91-9876543211",
      office: "ECE Block, Room 205",
    },
    achievements: ["Women in Engineering Award", "30+ Research Papers", "Industry Collaboration Expert"],
  },
  {
    id: 3,
    name: "Dr. Michael Anderson",
    designation: "Assistant Professor",
    department: "Electronics & Communication Engineering",
    specialization: ["RF & Microwave Engineering", "Antenna Design", "Satellite Communications"],
    experience: "12+ years",
    education: "Ph.D. in RF Engineering, Stanford University",
    image: "/dr-michael-anderson-portrait.png",
    bio: "Specialist in RF engineering and satellite communication systems.",
    contact: {
      email: "michael.anderson@university.edu",
      phone: "+91-9876543212",
      office: "ECE Block, Room 158",
    },
    achievements: ["NASA Research Collaboration", "25+ IEEE Publications", "Innovation in Teaching Award"],
  },
  {
    id: 4,
    name: "Dr. Arun Sharma",
    designation: "Associate Professor",
    department: "Electronics & Communication Engineering",
    specialization: ["Digital Signal Processing", "Image Processing", "Machine Learning"],
    experience: "18+ years",
    education: "Ph.D. in Signal Processing, IIT Bombay",
    image: "/dr-arun-sharma-portrait.png",
    bio: "Research focus on advanced signal processing and AI applications in communications.",
    contact: {
      email: "arun.sharma@university.edu",
      phone: "+91-9876543213",
      office: "ECE Block, Room 267",
    },
    achievements: ["Best Research Paper Award", "40+ International Publications", "AI Research Grant Recipient"],
  },
  {
    id: 5,
    name: "Dr. Sarah Chen",
    designation: "Assistant Professor",
    department: "Electronics & Communication Engineering",
    specialization: ["Optical Communications", "Photonics", "Fiber Optic Networks"],
    experience: "10+ years",
    education: "Ph.D. in Optical Engineering, MIT",
    image: "/dr-sarah-chen-portrait.png",
    bio: "Leading expert in optical communication systems and photonic technologies.",
    contact: {
      email: "sarah.chen@university.edu",
      phone: "+91-9876543214",
      office: "ECE Block, Room 189",
    },
    achievements: ["Photonics Society Award", "20+ Journal Publications", "Industry Partnership Leader"],
  },
  {
    id: 6,
    name: "Dr. Vikram Patel",
    designation: "Professor",
    department: "Electronics & Communication Engineering",
    specialization: ["Network Security", "Cryptography", "Cyber Security"],
    experience: "22+ years",
    education: "Ph.D. in Computer Networks, IIT Madras",
    image: "/dr-vikram-patel-portrait.png",
    bio: "Cybersecurity expert with extensive research in network security protocols.",
    contact: {
      email: "vikram.patel@university.edu",
      phone: "+91-9876543215",
      office: "ECE Block, Room 312",
    },
    achievements: ["Cybersecurity Excellence Award", "60+ Security Publications", "Government Advisory Panel Member"],
  },
]

export default function FacultiesPage() {
  return (
    <div className="min-h-screen bg-black">

      {/* Header Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="text-primary">Faculty Advisors</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Distinguished educators and researchers guiding the next generation of communication engineers
          </p>
        </div>
      </section>

      {/* Faculty Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {facultyAdvisors.map((faculty) => (
              <Card
                key={faculty.id}
                className="glass rounded-2xl group hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 border-white/10 hover:border-primary/30"
              >
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Profile Image */}
                    <div className="flex-shrink-0">
                      <div className="w-32 h-32 rounded-2xl overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all duration-300">
                        <img
                          src={faculty.image || "/placeholder.svg"}
                          alt={faculty.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </div>

                    {/* Faculty Info */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors mb-1">
                          {faculty.name}
                        </h3>
                        <p className="text-primary font-medium">{faculty.designation}</p>
                        <p className="text-sm text-gray-300">{faculty.department}</p>
                      </div>

                      <p className="text-gray-300 leading-relaxed">{faculty.bio}</p>

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
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
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
                            <Phone className="h-4 w-4 text-primary" />
                            <span>{faculty.contact.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300 sm:col-span-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span>{faculty.contact.office}</span>
                          </div>
                        </div>
                      </div>

                      {/* Education & Experience */}
                      <div className="pt-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-white font-medium">Experience: </span>
                            <span className="text-gray-300">{faculty.experience}</span>
                          </div>
                          <div>
                            <span className="text-white font-medium">Education: </span>
                            <span className="text-gray-300">{faculty.education}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Academic Guidance</h2>
          <p className="text-xl text-gray-300 mb-8">
            Our faculty advisors are available for academic guidance, research opportunities, and career counseling.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:faculty@acsa.edu"
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
      </section>
    </div>
  )
}
