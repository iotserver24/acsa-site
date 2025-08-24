import { Github, Linkedin, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black/95 border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-primary">ACSA</h3>
            <p className="text-gray-300 text-sm">Advanced Communication Student Association</p>
          </div>

          <div className="flex space-x-6">
            <a href="#" className="text-white hover:text-primary transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-white hover:text-primary transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-white hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/10 text-center text-sm text-gray-300">
          <p>&copy; 2025 ACSA - Advanced Communication Student Association. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
