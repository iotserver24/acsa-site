"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Linkedin, Mail, Instagram, Github } from "lucide-react"
import { useState } from "react"

type TeamMember = {
  id: number
  name: string
  role: string
  usn: string
  image: string
  social: {
    instagram: string
    linkedin?: string
    github?: string
  }
}

const teamMembers = [
  // 1. President
  {
    id: 1,
    name: "Adwaith H U",
    role: "President",
    usn: "NNM23AC002",
    image: "/team/nnm23ac002.JPG",
    social: {
      instagram: "https://www.instagram.com/adwaith.hu?igsh=c21weWEwMm01ZzJq",
      linkedin: "https://www.linkedin.com/in/adwaithhu/",
    },
  },
  // 2. Vice President
  {
    id: 2,
    name: "Pratham",
    role: "Vice President",
    usn: "NNM23AC043",
    image: "/team/nnm23ac043.JPG",
    social: {
      instagram: "https://www.instagram.com/prath.dev?igsh=a29vcmVhNmd1aGN0",
      linkedin: "https://www.linkedin.com/in/pratham-devadiga-115bbb358?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
  },
  // 3. Secretary
  {
    id: 3,
    name: "Aishwarya Hegde",
    role: "Secretary",
    usn: "NNM23AC003",
    image: "/team/nnm23ac003.JPG",
    social: {
      instagram: "https://www.instagram.com/aishu_hegde2545?igsh=N2R0c2xrbXB5Nms5",
      linkedin: "https://www.linkedin.com/in/aishwarya-hegde-4910a8298",
    },
  },
  // 4. Joint Secretary
  {
    id: 4,
    name: "Adarsh Acharya",
    role: "Joint Secretary",
    usn: "NNM24AC001",
    image: "/team/nnm24ac001.png",
    social: {
      instagram: "https://www.instagram.com/_acharya_adarsh_?igsh=M3ZmcDk4eGI3aWtt",
      linkedin: "https://www.linkedin.com/in/adarsh-acharya-693253290?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
  },
  // 5. Branch Captain
  {
    id: 5,
    name: "Deekshith H Poojary",
    role: "Branch Captain",
    usn: "NNM23AC017",
    image: "/team/nnm23ac017.JPG",
    social: {
      instagram: "https://www.instagram.com/deekshithhpoojary_?igsh=dThza2phNTVwdmtv",
      linkedin: "https://www.linkedin.com/in/deekshith-poojary-148a49295?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
  },
  // 6. Treasurer
  {
    id: 6,
    name: "Mohammed Ibrahim Zahi",
    role: "Treasurer",
    usn: "NNM23AC035",
    image: "/team/nnm23ac035.png",
    social: {
      instagram: "https://www.instagram.com/_ibrahimzahi?utm_source=qr&igsh=MXVpMTF0MHMza3dtNg==",
      linkedin: "https://www.linkedin.com/in/mohammed-ibrahim-zahi-1a77b1291?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
  },
  // 7. Joint Treasurer
  {
    id: 7,
    name: "Sonal Hegde",
    role: "Joint Treasurer",
    usn: "NNM24AC050",
    image: "/team/nnm24ac050.jpeg",
    social: {
      instagram: "https://www.instagram.com/_sonalhegde?igsh=MW54d2NmbnA0dGxtcQ%3D%3D&utm_source=qr",
      linkedin: "https://www.linkedin.com/in/sonalhegde?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    },
  },
  // 8. Cultural Head
  {
    id: 8,
    name: "Dhanushree",
    role: "Cultural Head",
    usn: "NNM23AC019",
    image: "/team/nnm23ac019.JPG",
    social: {
      instagram: "https://www.instagram.com/kamath_dhanushree24?igsh=NnNyejV2b3l6NXQ5",
      linkedin: "https://www.linkedin.com/in/dhanushree-kamath-a92053291",
    },
  },
  // 9. Cultural Co-Head
  {
    id: 9,
    name: "Chittha Shetty",
    role: "Cultural Co-Head",
    usn: "NNM24AC012",
    image: "/team/nnm24ac012.jpg",
    social: {
      instagram: "https://www.instagram.com/chittha_shetty?igsh=MXFuMDJmZzViaXk0NQ==",
      linkedin: "https://www.linkedin.com/in/chittha-shetty-bb645b380?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
  },
  // 10. Event Management Head
  {
    id: 10,
    name: "Chinmay Shetty",
    role: "Event Management Head",
    usn: "NNM23AC011",
    image: "/team/nnm23ac012.JPG",
    social: {
      instagram: "https://www.instagram.com/i.chinn.x?igsh=MXRvMGo4ODRtMnd4bw==",
      linkedin: "https://www.linkedin.com/in/chinmay-shetty-u-786a15254?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
  },
  // 11. Event Management Co-Head
  {
    id: 11,
    name: "Kavana Kori",
    role: "Event Management Co-Head",
    usn: "NNM24AC021",
    image: "/team/nnm24ac021.jpg",
    social: {
      instagram: "https://www.instagram.com/kavana_kori?igsh=NG11emd5bzZqMXdq",
      linkedin: "https://www.linkedin.com/in/kori-kavana-3863b8376?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
  },
  // 12. Sports Head
  {
    id: 12,
    name: "Nidish Shetty",
    role: "Sports Head",
    usn: "NNM23AC040",
    image: "/team/nnm23ac040.JPG",
    social: {
      instagram: "https://www.instagram.com/shetty.nidhish18?utm_source=qr&igsh=MTRubnhldGxpcWh1eQ==",
      linkedin: "https://www.linkedin.com/in/nidhish-shetty-21968b356?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
  },
  // 13. Sports Co-Head
  {
    id: 13,
    name: "Hithesh P M",
    role: "Sports Co-Head",
    usn: "NNM24AC019",
    image: "/team/nnm24ac019.jpg",
    social: {
      instagram: "https://www.instagram.com/_hithesh_polya?igsh=MXN3NXBsd2xvejZrOA==",
      linkedin: "#",
    },
  },
  // 14. Technical Head
  {
    id: 14,
    name: "Mohammed Farhan Riaz",
    role: "Technical Head",
    usn: "NNM23AC034",
    image: "/team/nnm23ac034.png",
    social: {
      instagram: "https://www.instagram.com/farhanriaz15/?next=%2F&hl=en",
      linkedin: "https://www.linkedin.com/in/farhan-riaz/",
      github: "https://github.com/farhanriaz15",
    },
  },
  // 15. Technical Co-Head
  {
    id: 15,
    name: "Anish Kumar",
    role: "Technical Co-Head",
    usn: "NNM24AC008",
    image: "/team/nnm24ac008.jpg",
    social: {
      instagram: "https://www.instagram.com/anish_kumar1006/",
      linkedin: "https://www.linkedin.com/in/anish-kumar-1a5bb133a/",
      github: "https://github.com/iotserver24",
    },
  },
  // 16. Social Media Head
  {
    id: 16,
    name: "Akash K M",
    role: "Social Media Head",
    usn: "NNM23AC004",
    image: "/team/nnm23ac004.JPG",
    social: {
      instagram: "https://www.instagram.com/akashh_elukoti?utm_source=qr&igsh=MzV5ZTNucXNmYjR2",
      linkedin: "https://www.linkedin.com/in/akash-k-m-b81737349",
    },
  },
  // 17. Social Media Coordinator
  {
    id: 17,
    name: "Manvith",
    role: "Social Media Coordinator",
    usn: "NNM24AC026",
    image: "/team/nnm24ac019.png",
    social: {
      instagram: "https://www.instagram.com/manvithh_?utm_source=qr&igsh=YzZ3eGJ5bGwzZGpm",
      linkedin: "https://www.linkedin.com/in/manvith-m-44233737a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
  },
  // 18. Social Media Coordinator
  {
    id: 18,
    name: "Manish",
    role: "Social Media Coordinator",
    usn: "NNM24AC025",
    image: "/team/nnm24ac025.png",
    social: {
      instagram: "https://www.instagram.com/manish__achar_?igsh=dm1uaTZyZWxodDF0",
      linkedin: "https://www.linkedin.com/in/manish-achar-23a8a635a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
  },
  // 19. Class Representative (5th Sem)
  {
    id: 19,
    name: "Darshan Sadashivanagouda Linganagoudra",
    role: "Class Representative (5th Sem)",
    usn: "NNM23AC016",
    image: "/team/nnm23ac016.png",
    social: {
      instagram: "https://www.instagram.com/darshan.s.linganagoudra?igsh=dHF5ZXc0bm9zc2hk",
      linkedin: "https://www.linkedin.com/in/darshan-sadashivanagouda-linganagoudra-220367311?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
  },
  // 20. Class Representative (3rd Sem)
  {
    id: 20,
    name: "Ashlesh N Acharya",
    role: "Class Representative (3rd Sem)",
    usn: "NNM24AC010",
    image: "/team/nnm24ac010.jpg",
    social: {
      instagram: "https://www.instagram.com/_ashuacharya_?igsh=em03NG5wdDNqZjYz",
      linkedin: "#",
    },
  },
  // 21. 1st Year CR
  {
    id: 21,
    name: "Jevin Lesten Dsouza",
    role: "1st Year CR",
    usn: "NU25T23",
    image: "/team/nu25t23.png",
    social: {
      instagram: "https://www.instagram.com/jevin.dsouza?igsh=YzhoZWd5dnpmeWR6&utm_source=qr",
      linkedin: "https://www.linkedin.com/in/jevin-undefined-973344304?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    },
  },
]

export default function TeamPage() {
  const [hoveredMember, setHoveredMember] = useState<TeamMember | null>(null)

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
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-white via-primary to-blue-400 bg-clip-text text-transparent">
              <span style={{ fontFamily: "'Orbitron', 'Arial', sans-serif" }}>Meet Our <span className="text-primary">Team</span></span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in-up delay-200 leading-relaxed tracking-wide" style={{ fontFamily: "'Orbitron', 'Arial', sans-serif" }}>
              Passionate students driving innovation in advanced communication technologies
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="relative pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setHoveredMember(member)}
              >
                <Card className="glass rounded-2xl group hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/30 border-white/10 hover:border-primary/50 bg-black/20 backdrop-blur-sm relative overflow-hidden cursor-pointer h-96">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                  
                  <CardContent className="p-6 relative z-10 h-full flex flex-col justify-between">
                    <div className="text-center space-y-4 flex-1 flex flex-col justify-center">
                      {/* Profile Image */}
                      <div className="relative mx-auto w-28 h-28 rounded-full overflow-hidden ring-4 ring-primary/20 group-hover:ring-primary/50 transition-all duration-500 group-hover:scale-110">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <img
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                          style={{ objectPosition: 'center 30%' }}
                        />
                      </div>

                      {/* Member Info */}
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-300" style={{ fontFamily: "'Orbitron', 'Arial', sans-serif" }}>
                          {member.name}
                        </h3>
                        <div className="flex flex-col items-center space-y-2">
                          {member.role === "President" || member.role === "Vice President" ? (
                            <div className="relative">
                              {/* Ribbon Badge */}
                              <div className={`relative px-6 py-2 text-sm font-bold uppercase tracking-wider shadow-lg ${
                                member.role === "President" 
                                  ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900" 
                                  : "bg-gradient-to-r from-gray-300 to-gray-500 text-gray-900"
                              }`} style={{ fontFamily: "'Orbitron', 'Arial', sans-serif" }}>
                                {member.role}
                                {/* Ribbon tails */}
                                <div className={`absolute -left-2 top-0 w-0 h-0 border-t-[16px] border-b-[16px] border-r-[8px] ${
                                  member.role === "President" ? "border-t-yellow-400 border-b-yellow-400 border-r-yellow-600" : "border-t-gray-300 border-b-gray-300 border-r-gray-500"
                                }`}></div>
                                <div className={`absolute -right-2 top-0 w-0 h-0 border-t-[16px] border-b-[16px] border-l-[8px] ${
                                  member.role === "President" ? "border-t-yellow-400 border-b-yellow-400 border-l-yellow-600" : "border-t-gray-300 border-b-gray-300 border-l-gray-500"
                                }`}></div>
                                {/* Ribbon fold effect */}
                                <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-b-[6px] ${
                                  member.role === "President" ? "border-l-transparent border-r-transparent border-b-yellow-700" : "border-l-transparent border-r-transparent border-b-gray-600"
                                }`}></div>
                              </div>
                            </div>
                          ) : (
                            <Badge 
                              variant="secondary" 
                              className="text-sm font-medium transition-all duration-300 inline-block bg-primary/20 text-primary border-primary/30 group-hover:bg-primary/30 group-hover:border-primary/50"
                              style={{ fontFamily: "'Orbitron', 'Arial', sans-serif" }}
                            >
                              {member.role}
                            </Badge>
                          )}
                          <p className="text-sm text-gray-300 bg-gray-800/50 px-3 py-1 rounded-full" style={{ fontFamily: "'Orbitron', 'Arial', sans-serif" }}>
                            {member.usn}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Social Links - Fixed at bottom */}
                    <div className="flex justify-center space-x-4 pt-4">
                      <a
                        href={member.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-primary transition-all duration-300 hover:scale-110 p-2 rounded-full hover:bg-primary/10"
                        aria-label={`${member.name}'s Instagram`}
                      >
                        <Instagram className="h-5 w-5" />
                      </a>
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-primary transition-all duration-300 hover:scale-110 p-2 rounded-full hover:bg-primary/10"
                        aria-label={`${member.name}'s LinkedIn`}
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                      {member.social.github && (
                        <a
                          href={member.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/60 hover:text-primary transition-all duration-300 hover:scale-110 p-2 rounded-full hover:bg-primary/10"
                          aria-label={`${member.name}'s GitHub`}
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hover Modal */}
      {hoveredMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setHoveredMember(null)}
          />
          
          {/* Modal Content */}
          <div className="relative glass rounded-3xl p-8 max-w-md w-full mx-4 animate-fade-in-up">
            <div className="text-center space-y-6">
              {/* Large Profile Image */}
              <div className="relative mx-auto w-40 h-40 rounded-full overflow-hidden ring-8 ring-primary/30">
                <img
                  src={hoveredMember.image || "/placeholder.svg"}
                  alt={hoveredMember.name}
                  className="w-full h-full object-cover object-center"
                  style={{ objectPosition: 'center 30%' }}
                />
              </div>

              {/* Member Details */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "'Orbitron', 'Arial', sans-serif" }}>
                  {hoveredMember.name}
                </h2>
                <div className="flex flex-col items-center space-y-3">
                  {hoveredMember.role === "President" || hoveredMember.role === "Vice President" ? (
                    <div className="relative">
                      {/* Ribbon Badge */}
                      <div className={`relative px-8 py-3 text-lg font-bold uppercase tracking-wider shadow-xl ${
                        hoveredMember.role === "President" 
                          ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900" 
                          : "bg-gradient-to-r from-gray-300 to-gray-500 text-gray-900"
                      }`} style={{ fontFamily: "'Orbitron', 'Arial', sans-serif" }}>
                        {hoveredMember.role}
                        {/* Ribbon tails */}
                        <div className={`absolute -left-3 top-0 w-0 h-0 border-t-[20px] border-b-[20px] border-r-[10px] ${
                          hoveredMember.role === "President" ? "border-t-yellow-400 border-b-yellow-400 border-r-yellow-600" : "border-t-gray-300 border-b-gray-300 border-r-gray-500"
                        }`}></div>
                        <div className={`absolute -right-3 top-0 w-0 h-0 border-t-[20px] border-b-[20px] border-l-[10px] ${
                          hoveredMember.role === "President" ? "border-t-yellow-400 border-b-yellow-400 border-l-yellow-600" : "border-t-gray-300 border-b-gray-300 border-l-gray-500"
                        }`}></div>
                        {/* Ribbon fold effect */}
                        <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-b-[8px] ${
                          hoveredMember.role === "President" ? "border-l-transparent border-r-transparent border-b-yellow-700" : "border-l-transparent border-r-transparent border-b-gray-600"
                        }`}></div>
                      </div>
                    </div>
                  ) : (
                    <Badge 
                      variant="secondary" 
                      className="text-lg font-semibold px-6 py-2 transition-all duration-300 inline-block bg-primary/30 text-primary border-primary/50"
                      style={{ fontFamily: "'Orbitron', 'Arial', sans-serif" }}
                    >
                      {hoveredMember.role}
                    </Badge>
                  )}
                  <p className="text-lg text-gray-300 bg-gray-800/70 px-4 py-2 rounded-full" style={{ fontFamily: "'Orbitron', 'Arial', sans-serif" }}>
                    {hoveredMember.usn}
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex justify-center space-x-6 pt-6">
                <a
                  href={hoveredMember.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-primary transition-all duration-300 hover:scale-125 p-3 rounded-full hover:bg-primary/20"
                  aria-label={`${hoveredMember.name}'s Instagram`}
                >
                  <Instagram className="h-8 w-8" />
                </a>
                <a
                  href={hoveredMember.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-primary transition-all duration-300 hover:scale-125 p-3 rounded-full hover:bg-primary/20"
                  aria-label={`${hoveredMember.name}'s LinkedIn`}
                >
                  <Linkedin className="h-8 w-8" />
                </a>
                {hoveredMember.social.github && (
                  <a
                    href={hoveredMember.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-primary transition-all duration-300 hover:scale-125 p-3 rounded-full hover:bg-primary/20"
                    aria-label={`${hoveredMember.name}'s GitHub`}
                  >
                    <Github className="h-8 w-8" />
                  </a>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={() => setHoveredMember(null)}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors duration-300"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

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
