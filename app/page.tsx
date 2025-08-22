import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Zap, Award, BookOpen, Lightbulb, Target } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="space-y-8">
            <div className="flex justify-center mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full flex items-center justify-center border-2 border-primary/50 animate-pulse hover:animate-spin transition-all duration-500">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold text-2xl">ACSA</span>
                </div>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight animate-fade-in-up">
              <span className="block">ACSA</span>
            </h1>
            <p className="text-2xl md:text-3xl text-primary font-semibold animate-fade-in-up animation-delay-200">
              Advanced Communication Student Association
            </p>
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
              The official student association of Electronics & Communication (Advanced Communication Tech) branch. We
              innovate, collaborate, and lead the way in cutting-edge communication technologies.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12 animate-fade-in-up animation-delay-600">
              <Button
                size="lg"
                className="bg-primary text-black font-semibold px-8 py-4 rounded-xl text-lg hover:bg-primary/90 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
              >
                Explore Events
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 bg-transparent px-8 py-4 rounded-xl text-lg hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              >
                Meet the Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group hover:scale-105 transition-all duration-300">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:animate-pulse">200+</div>
              <div className="text-gray-300">Active Members</div>
            </div>
            <div className="text-center group hover:scale-105 transition-all duration-300">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:animate-pulse">50+</div>
              <div className="text-gray-300">Projects Completed</div>
            </div>
            <div className="text-center group hover:scale-105 transition-all duration-300">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:animate-pulse">5+</div>
              <div className="text-gray-300">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up">About ACSA</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
              Empowering the next generation of communication technology innovators through hands-on learning and
              industry collaboration
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6 animate-fade-in-left">
              <p className="text-lg text-gray-300 leading-relaxed">
                The Advanced Communication Student Association (ACSA) is a vibrant community of passionate students from
                the Electronics & Communication (Advanced Communication Tech) branch. We serve as the bridge between
                academic excellence and industry innovation.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Our association focuses on emerging technologies like 5G/6G networks, IoT systems, satellite
                communications, and AI-driven communication solutions. Through workshops, hackathons, and research
                projects, we prepare students for the future of communication technology.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-3 text-primary hover:scale-105 transition-all duration-300">
                  <Users className="h-6 w-6" />
                  <span className="font-semibold">Strong Community</span>
                </div>
                <div className="flex items-center gap-3 text-primary hover:scale-105 transition-all duration-300">
                  <Zap className="h-6 w-6" />
                  <span className="font-semibold">Innovation Focus</span>
                </div>
                <div className="flex items-center gap-3 text-primary hover:scale-105 transition-all duration-300">
                  <Award className="h-6 w-6" />
                  <span className="font-semibold">Industry Recognition</span>
                </div>
                <div className="flex items-center gap-3 text-primary hover:scale-105 transition-all duration-300">
                  <BookOpen className="h-6 w-6" />
                  <span className="font-semibold">Continuous Learning</span>
                </div>
              </div>
            </div>

            <Card className="glass rounded-2xl hover:shadow-primary/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in-right">
              <CardHeader>
                <CardTitle className="text-primary text-2xl">Our Mission</CardTitle>
                <CardDescription className="text-gray-300 text-lg">
                  Building tomorrow's communication leaders today
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-300 leading-relaxed">
                  To create a collaborative ecosystem where students explore cutting-edge communication technologies,
                  develop practical skills, and build meaningful industry connections.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Target className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-gray-300">
                      Promote technical excellence and innovation in communication tech
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Lightbulb className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Foster industry-academia collaboration and knowledge transfer</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Build a strong professional network for career growth</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-gray-300">
                      Develop practical skills through hands-on projects and workshops
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass rounded-2xl hover:shadow-primary/20 hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in-up animation-delay-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 hover:rotate-12 transition-all duration-300">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-primary">5G/6G Networks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-center">
                  Exploring next-generation wireless communication technologies and their real-world applications.
                </p>
              </CardContent>
            </Card>

            <Card className="glass rounded-2xl hover:shadow-primary/20 hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in-up animation-delay-400">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 hover:rotate-12 transition-all duration-300">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-primary">IoT Systems</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-center">
                  Building smart connected devices and understanding the Internet of Things ecosystem.
                </p>
              </CardContent>
            </Card>

            <Card className="glass rounded-2xl hover:shadow-primary/20 hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in-up animation-delay-600">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 hover:rotate-12 transition-all duration-300">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-primary">AI Communications</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-center">
                  Integrating artificial intelligence with communication systems for smarter networks.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Upcoming Event Highlight */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up">Upcoming Highlight</h2>
            <p className="text-xl text-gray-300 animate-fade-in-up animation-delay-200">
              Don't miss our next exciting event
            </p>
          </div>

          <Card className="glass rounded-2xl max-w-5xl mx-auto hover:shadow-primary/30 hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in-up animation-delay-400">
            <div className="md:flex">
              <div className="md:w-2/5">
                <img
                  src="/5g-workshop-banner.png"
                  alt="5G Workshop Banner"
                  className="w-full h-64 md:h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-t-none hover:scale-105 transition-all duration-500"
                />
              </div>
              <div className="md:w-3/5 p-8">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-3xl text-primary mb-2">5G Technology Workshop</CardTitle>
                  <CardDescription className="text-lg text-gray-300">
                    Comprehensive hands-on workshop exploring 5G fundamentals, implementation, and future applications
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 space-y-6">
                  <div className="flex flex-col sm:flex-row gap-4 text-gray-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span className="font-semibold">March 15, 2024</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span className="font-semibold">Tech Lab A-101</span>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    Join industry experts and fellow students for an intensive workshop covering 5G network
                    architecture, implementation challenges, and emerging applications. Includes hands-on lab sessions,
                    case studies, and networking opportunities with professionals from leading telecom companies.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="bg-primary text-black font-semibold hover:bg-primary/90 px-6 py-3 rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30">
                      Register Now
                    </Button>
                    <Button
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary/10 px-6 py-3 rounded-xl bg-transparent hover:scale-105 transition-all duration-300"
                    >
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
