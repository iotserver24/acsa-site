import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <Image
              src="/ACSA_white-logo_text.png"
              alt="ACSA"
              width={200}
              height={44}
              className="h-8 w-auto object-contain"
              priority
            />
            <p className="text-gray-300 text-sm font-mono mt-2">Advanced Communication Student Association</p>
            <p className="text-gray-400 text-sm mt-4 font-mono">
              Empowering the next generation of communication technology innovators through hands-on learning and industry collaboration.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 font-heading">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors font-mono">Home</a></li>
              <li><a href="/events" className="text-gray-300 hover:text-white transition-colors font-mono">Events</a></li>
              <li><a href="/team" className="text-gray-300 hover:text-white transition-colors font-mono">Team</a></li>
              <li><a href="/faculties" className="text-gray-300 hover:text-white transition-colors font-mono">Faculty</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4 font-heading">Contact</h3>
            <div className="space-y-2 text-sm font-mono">
              <p className="text-gray-300">Email: info@acsa.edu</p>
              <p className="text-gray-300">Phone: +91-9876543210</p>
              <p className="text-gray-300">Location: ECE Block, Room 301</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 pt-6 border-t border-white/10 text-center text-sm text-gray-300 font-mono">
          <p>&copy; 2025 ACSA - Advanced Communication Student Association. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
