import type React from "react"
import type { Metadata } from "next"
import { Orbitron, JetBrains_Mono, Inter, Quantico } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import "@/lib/init"

const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-orbitron",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const quantico = Quantico({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-quantico",
})

export const metadata: Metadata = {
  title: "ACSA - Advanced Communication Student Association",
  description: "Electronics & Communication - Advanced Communication Tech Branch",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${jetbrainsMono.variable} ${inter.variable} ${quantico.variable} dark`}>
      <body className="font-quantico antialiased bg-black">
        <div className="min-h-screen flex flex-col bg-black">
          <Navbar />
          <main className="flex-1 bg-black">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
