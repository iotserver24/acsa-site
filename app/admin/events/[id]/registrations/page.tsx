"use client"

import { useEffect, useState, use } from "react"
import { ArrowLeft, Download, FileText, FileSpreadsheet, Users, Calendar, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Event, Registration } from "@/lib/database"

export default function EventRegistrationsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [event, setEvent] = useState<Event | null>(null)
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventRes, registrationsRes] = await Promise.all([
          fetch(`/api/events/${id}`),
          fetch(`/api/registrations?eventId=${id}`)
        ])
        
        if (eventRes.ok) {
          const eventData = await eventRes.json()
          setEvent(eventData)
        }
        
        if (registrationsRes.ok) {
          const registrationsData = await registrationsRes.json()
          setRegistrations(registrationsData)
        }
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatRegistrationDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const downloadAsTxt = () => {
    if (!event || registrations.length === 0) return

    const headers = ['Name', 'USN', 'Email', 'Phone', 'Branch Name', 'Academic Year', 'Registration Date']
    const rows = registrations.map(reg => [
      reg.name,
      reg.usn,
      reg.email,
      reg.phone,
      reg.branchName,
      reg.academicYear,
      formatRegistrationDate(reg.registeredAt)
    ])

    const createAsciiTable = (headers: string[], rows: string[][]) => {
      const maxWidths = headers.map((header, i) => {
        const maxRowWidth = Math.max(...rows.map(row => row[i]?.length || 0))
        return Math.max(header.length, maxRowWidth)
      })

      const createRow = (cells: string[]) => {
        return '| ' + cells.map((cell, i) => cell.padEnd(maxWidths[i])).join(' | ') + ' |'
      }

      const createSeparator = () => {
        return '+' + maxWidths.map(width => '-'.repeat(width + 2)).join('+') + '+'
      }

      const table = [
        createSeparator(),
        createRow(headers),
        createSeparator(),
        ...rows.map(row => createRow(row)),
        createSeparator()
      ].join('\n')

      return table
    }

    const tableData = createAsciiTable(headers, rows)
    const eventInfo = `
Event: ${event.title}
Date: ${event.date}
Time: ${event.time}
Location: ${event.location}
Total Registrations: ${registrations.length}

Registration List:
${tableData}
    `.trim()

    const blob = new Blob([eventInfo], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${event.title.replace(/[^a-zA-Z0-9]/g, '_')}_registrations.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const downloadAsExcel = () => {
    if (!event || registrations.length === 0) return

    // Create CSV content (Excel can open CSV files)
    const headers = ['Name', 'USN', 'Email', 'Phone', 'Branch Name', 'Academic Year', 'Registration Date']
    const rows = registrations.map(reg => [
      reg.name,
      reg.usn,
      reg.email,
      `="${reg.phone}"`, // Force Excel to treat phone as text
      reg.branchName,
      reg.academicYear,
      formatRegistrationDate(reg.registeredAt)
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${event.title.replace(/[^a-zA-Z0-9]/g, '_')}_registrations.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
          <Link href="/admin" className="text-cyan-400 hover:text-cyan-300">
            Back to Admin Panel
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-gradient-to-r from-cyan-500/5 to-blue-500/5">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Admin Panel
            </Link>
            <div className="flex gap-3">
              <Button
                onClick={downloadAsTxt}
                variant="outline"
                className="border-green-600 text-green-400 hover:bg-green-400/10"
                disabled={registrations.length === 0}
              >
                <FileText className="w-4 h-4 mr-2" />
                Download TXT
              </Button>
              <Button
                onClick={downloadAsExcel}
                variant="outline"
                className="border-blue-600 text-blue-400 hover:bg-blue-400/10"
                disabled={registrations.length === 0}
              >
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Download Excel
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Event Details */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 mb-8">
          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
          
          <div className="flex flex-wrap gap-4 mb-4">
            {event.featured && (
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm font-medium">
                Featured
              </span>
            )}
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium">
              {event.category}
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-cyan-400" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-cyan-400" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-cyan-400" />
              <span>{event.location}</span>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <Users className="w-5 h-5 text-cyan-400" />
            <span className="text-lg font-semibold">
              {registrations.length} registrations
            </span>
            {event.registrationLimit && (
              <span className="text-gray-400">
                (Limit: {event.registrationLimit})
              </span>
            )}
          </div>
        </div>

        {/* Registrations List */}
        <div className="glass-card p-6 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Users className="w-6 h-6 text-cyan-400" />
              Registrations ({registrations.length})
            </h2>
          </div>

          {registrations.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 text-xl">No registrations yet</p>
              <p className="text-gray-500 mt-2">Registrations will appear here once students sign up</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 font-semibold text-cyan-400">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-cyan-400">USN</th>
                    <th className="text-left py-3 px-4 font-semibold text-cyan-400">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-cyan-400">Phone</th>
                    <th className="text-left py-3 px-4 font-semibold text-cyan-400">Branch</th>
                    <th className="text-left py-3 px-4 font-semibold text-cyan-400">Year</th>
                    <th className="text-left py-3 px-4 font-semibold text-cyan-400">Registered</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((registration, index) => (
                    <tr key={registration.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-4 font-medium">{registration.name}</td>
                      <td className="py-3 px-4 text-gray-300">{registration.usn}</td>
                      <td className="py-3 px-4 text-gray-300">{registration.email}</td>
                      <td className="py-3 px-4 text-gray-300">{registration.phone}</td>
                      <td className="py-3 px-4 text-gray-300">{registration.branchName}</td>
                      <td className="py-3 px-4 text-gray-300">{registration.academicYear}</td>
                      <td className="py-3 px-4 text-gray-400 text-sm">
                        {formatRegistrationDate(registration.registeredAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
