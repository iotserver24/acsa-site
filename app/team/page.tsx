import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail } from "lucide-react"

const teamMembers = [
  {
    id: 1,
    name: "Alex Chen",
    role: "President",
    department: "Electronics & Communication",
    year: "Final Year",
    image: "/placeholder-virxh.png",
    bio: "Leading ACSA with passion for 5G technology and IoT innovations.",
    skills: ["5G Networks", "IoT", "Signal Processing"],
    social: {
      github: "#",
      linkedin: "#",
      email: "alex.chen@acsa.edu",
    },
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Vice President",
    department: "Electronics & Communication",
    year: "Final Year",
    image: "/professional-female-student-portrait.png",
    bio: "Coordinating technical events and fostering innovation in communication systems.",
    skills: ["RF Design", "Antenna Systems", "Project Management"],
    social: {
      github: "#",
      linkedin: "#",
      email: "sarah.johnson@acsa.edu",
    },
  },
  {
    id: 3,
    name: "Raj Patel",
    role: "Technical Lead",
    department: "Electronics & Communication",
    year: "Third Year",
    image: "/indian-male-student-portrait.png",
    bio: "Spearheading technical workshops and hands-on project development.",
    skills: ["Embedded Systems", "VLSI Design", "PCB Design"],
    social: {
      github: "#",
      linkedin: "#",
      email: "raj.patel@acsa.edu",
    },
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    role: "Events Coordinator",
    department: "Electronics & Communication",
    year: "Third Year",
    image: "/professional-hispanic-student.png",
    bio: "Organizing engaging events and building industry connections.",
    skills: ["Event Management", "Digital Communications", "Networking"],
    social: {
      github: "#",
      linkedin: "#",
      email: "emily.rodriguez@acsa.edu",
    },
  },
  {
    id: 5,
    name: "David Kim",
    role: "Treasurer",
    department: "Electronics & Communication",
    year: "Second Year",
    image: "/korean-male-student-portrait.png",
    bio: "Managing club finances and supporting member initiatives.",
    skills: ["Financial Planning", "Microwave Engineering", "Data Analysis"],
    social: {
      github: "#",
      linkedin: "#",
      email: "david.kim@acsa.edu",
    },
  },
  {
    id: 6,
    name: "Priya Sharma",
    role: "Secretary",
    department: "Electronics & Communication",
    year: "Second Year",
    image: "/professional-indian-student-portrait.png",
    bio: "Maintaining club records and facilitating smooth operations.",
    skills: ["Documentation", "Optical Communications", "Team Coordination"],
    social: {
      github: "#",
      linkedin: "#",
      email: "priya.sharma@acsa.edu",
    },
  },
  {
    id: 7,
    name: "Michael Thompson",
    role: "Web Developer",
    department: "Electronics & Communication",
    year: "Third Year",
    image: "/professional-caucasian-student.png",
    bio: "Developing and maintaining ACSA's digital presence and platforms.",
    skills: ["Web Development", "Database Systems", "UI/UX Design"],
    social: {
      github: "#",
      linkedin: "#",
      email: "michael.thompson@acsa.edu",
    },
  },
  {
    id: 8,
    name: "Aisha Hassan",
    role: "Research Coordinator",
    department: "Electronics & Communication",
    year: "Final Year",
    image: "/professional-african-student-portrait.png",
    bio: "Coordinating research initiatives and academic collaborations.",
    skills: ["Research Methodology", "Machine Learning", "Signal Analysis"],
    social: {
      github: "#",
      linkedin: "#",
      email: "aisha.hassan@acsa.edu",
    },
  },
]

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Header Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Meet Our <span className="text-primary">Team</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Passionate students driving innovation in advanced communication technologies
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <Card
                key={member.id}
                className="glass rounded-2xl group hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 border-white/10 hover:border-primary/30"
              >
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    {/* Profile Image */}
                    <div className="relative mx-auto w-24 h-24 rounded-full overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all duration-300">
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Member Info */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                        {member.name}
                      </h3>
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        {member.role}
                      </Badge>
                      <p className="text-sm text-muted-foreground">{member.year}</p>
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1 justify-center">
                      {member.skills.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs border-white/20 text-white/80 hover:border-primary/50 hover:text-primary transition-colors"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center space-x-4 pt-2">
                      <a
                        href={member.social.github}
                        className="text-white/60 hover:text-primary transition-colors"
                        aria-label={`${member.name}'s GitHub`}
                      >
                        <Github className="h-4 w-4" />
                      </a>
                      <a
                        href={member.social.linkedin}
                        className="text-white/60 hover:text-primary transition-colors"
                        aria-label={`${member.name}'s LinkedIn`}
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                      <a
                        href={`mailto:${member.social.email}`}
                        className="text-white/60 hover:text-primary transition-colors"
                        aria-label={`Email ${member.name}`}
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Want to Join Our Team?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            We're always looking for passionate students to join our mission of advancing communication technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contact@acsa.edu"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Get in Touch
            </a>
            <a
              href="/events"
              className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors font-medium"
            >
              Attend Our Events
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
