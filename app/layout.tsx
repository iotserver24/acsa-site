import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import LoadingScreen from "@/components/loading-screen"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import "@/lib/init"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "ACSA - Advanced Communication Student Association",
  description: "Electronics & Communication - Advanced Communication Tech Branch",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="font-sans antialiased bg-black">
        <LoadingScreen />
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
