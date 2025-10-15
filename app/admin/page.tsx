"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAlert } from "@/components/ui/alert"
import { Trash2, Edit, Plus, Users, Calendar, Eye, Lock, LogOut, Settings, UserCheck, UserX, Clock, Download, Menu, X } from "lucide-react"
import type { Event, Registration } from "@/lib/database"

interface AdminCredentials {
  username: string
  password: string
}

export default function AdminPage() {
  const { showAlert, AlertContainer } = useAlert()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loginError, setLoginError] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const [events, setEvents] = useState<Event[]>([])
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [showEventForm, setShowEventForm] = useState(false)
  const [showRegistrations, setShowRegistrations] = useState(false)
  const [activeTab, setActiveTab] = useState<'events' | 'past-events' | 'registrations' | 'settings'>('events')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: ""
  })
  
  const [eventForm, setEventForm] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    maxAttendees: "",
    category: "",
    featured: false,
    image: "",
    registrationLimit: "",
    isActive: true,
  })

  useEffect(() => {
    // Check if already authenticated
    const authStatus = localStorage.getItem('adminAuthenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
      fetchData()
    }
    setIsLoading(false)
  }, [])

  const fetchData = async () => {
    await Promise.all([fetchEvents(), fetchRegistrations()])
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")
    
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      })
      
      if (response.ok) {
        setIsAuthenticated(true)
        localStorage.setItem('adminAuthenticated', 'true')
        fetchData()
      } else {
        setLoginError("Invalid credentials")
      }
    } catch (error) {
      setLoginError("Login failed. Please try again.")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('adminAuthenticated')
    setEvents([])
    setRegistrations([])
  }

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events')
      const data = await response.json()
      setEvents(data)
    } catch (error) {
      console.error('Failed to fetch events:', error)
    }
  }

  const fetchRegistrations = async () => {
    try {
      const response = await fetch('/api/registrations')
      const data = await response.json()
      setRegistrations(data)
    } catch (error) {
      console.error('Failed to fetch registrations:', error)
    }
  }

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    console.log('Form submitted with data:', eventForm)
    
    const eventData = {
      ...eventForm,
      maxAttendees: parseInt(eventForm.maxAttendees),
      registrationLimit: eventForm.registrationLimit ? parseInt(eventForm.registrationLimit) : undefined,
      attendees: 0,
    }
    
    console.log('Sending event data:', eventData)
    
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData)
      })
      
      console.log('Response status:', response.status)
      
      if (response.ok) {
        const result = await response.json()
        console.log('Event created successfully:', result)
        await fetchEvents()
        setShowEventForm(false)
        resetForm()
        showAlert('success', 'Event created successfully!', 'Success')
      } else {
        const errorData = await response.json()
        console.error('Failed to create event:', errorData)
        showAlert('error', `Failed to create event: ${errorData.error || 'Unknown error'}`, 'Error')
      }
    } catch (error) {
      console.error('Failed to create event:', error)
      showAlert('error', `Failed to create event: ${error instanceof Error ? error.message : 'Network error'}`, 'Error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedEvent) return
    
    setIsSubmitting(true)
    console.log('Updating event with data:', eventForm)
    
    const eventData = {
      ...eventForm,
      maxAttendees: parseInt(eventForm.maxAttendees),
      registrationLimit: eventForm.registrationLimit ? parseInt(eventForm.registrationLimit) : undefined,
    }
    
    console.log('Sending update data:', eventData)
    
    try {
      const response = await fetch(`/api/events/${selectedEvent.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData)
      })
      
      console.log('Update response status:', response.status)
      
      if (response.ok) {
        const result = await response.json()
        console.log('Event updated successfully:', result)
        await fetchEvents()
        setShowEventForm(false)
        setSelectedEvent(null)
        resetForm()
        showAlert('success', 'Event updated successfully!', 'Success')
      } else {
        const errorData = await response.json()
        console.error('Failed to update event:', errorData)
        showAlert('error', `Failed to update event: ${errorData.error || 'Unknown error'}`, 'Error')
      }
    } catch (error) {
      console.error('Failed to update event:', error)
      showAlert('error', `Failed to update event: ${error instanceof Error ? error.message : 'Network error'}`, 'Error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteEvent = async (id: number) => {
    if (!confirm('Are you sure you want to delete this event? This will also delete all registrations for this event.')) return
    
    try {
      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        await fetchEvents()
        await fetchRegistrations()
      }
    } catch (error) {
      console.error('Failed to delete event:', error)
    }
  }

  const handleToggleEventStatus = async (event: Event) => {
    try {
      const response = await fetch(`/api/events/${event.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...event,
          isActive: !event.isActive
        })
      })
      
      if (response.ok) {
        await fetchEvents()
      }
    } catch (error) {
      console.error('Failed to toggle event status:', error)
    }
  }

  const resetForm = () => {
    setEventForm({
      title: "",
      date: "",
      time: "",
      location: "",
      description: "",
      maxAttendees: "",
      category: "",
      featured: false,
      image: "",
      registrationLimit: "",
      isActive: true,
    })
  }

  const editEvent = (event: Event) => {
    setSelectedEvent(event)
    setEventForm({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      description: event.description,
      maxAttendees: event.maxAttendees.toString(),
      category: event.category,
      featured: event.featured || false,
      image: event.image,
      registrationLimit: event.registrationLimit?.toString() || "",
      isActive: event.isActive !== false,
    })
    setShowEventForm(true)
  }

  const getEventRegistrations = (eventId: number) => {
    return registrations.filter(reg => reg.eventId === eventId)
  }

  const getRegistrationStats = () => {
    const activeEvents = events.filter(e => e.isActive !== false)
    const totalEvents = events.length
    const upcomingEvents = events.filter(e => new Date(e.date) > new Date() && e.isActive !== false)
    const pastEvents = events.filter(e => new Date(e.date) < new Date())
    
    return {
      totalEvents,
      activeEvents: activeEvents.length,
      upcomingEvents: upcomingEvents.length,
      pastEvents: pastEvents.length
    }
  }

  const downloadAllRegistrationsAsExcel = () => {
    if (registrations.length === 0) return

    // Create CSV content (Excel can open CSV files)
    const headers = ['Name', 'USN', 'Email', 'Phone', 'Branch Name', 'Academic Year', 'Event Title', 'Registration Date']
    const rows = registrations.map(reg => {
      const event = events.find(e => e.id === reg.eventId)
      return [
        reg.name,
        reg.usn,
        reg.email,
        `="${reg.phone}"`, // Force Excel to treat phone as text
        reg.branchName,
        reg.academicYear,
        event?.title || 'Unknown',
        new Date(reg.registeredAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        })
      ]
    })

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `all_registrations_${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Function to check and mark events as past
  const checkPastEvents = () => {
    const now = new Date()
    const pastEvents = events.filter(e => new Date(e.date) < now && e.isActive !== false)
    
    if (pastEvents.length > 0) {
      console.log(`Found ${pastEvents.length} events that have ended and should be marked as past`)
      // You can add automatic marking logic here if needed
    }
  }

  // Function to move event to past events
  const handleMoveToPastEvents = async (event: Event) => {
    if (!confirm(`Are you sure you want to move "${event.title}" to Past Events? This will mark it as inactive.`)) return
    
    try {
      const response = await fetch(`/api/events/${event.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...event,
          isActive: false
        })
      })
      
      if (response.ok) {
        await fetchEvents()
        showAlert('success', `"${event.title}" has been moved to Past Events successfully!`, 'Success')
      } else {
        const errorData = await response.json()
        showAlert('error', `Failed to move event: ${errorData.error || 'Unknown error'}`, 'Error')
      }
    } catch (error) {
      console.error('Failed to move event to past events:', error)
      showAlert('error', 'Failed to move event to past events. Please try again.', 'Error')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 sm:p-6">
        <Card className="w-full max-w-md bg-gray-900 border-gray-700">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-400/80 to-cyan-600/80 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-white">Admin Login</CardTitle>
            <p className="text-gray-400">Enter your credentials to access the admin panel</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username" className="text-gray-300">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                  required
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  required
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              {loginError && (
                <p className="text-red-400 text-sm">{loginError}</p>
              )}
              <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  const stats = getRegistrationStats()

  return (
    <div className="min-h-screen bg-black text-white p-2 sm:p-4 lg:p-6">
      <AlertContainer />
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Admin Panel</h1>
            <p className="text-gray-400 mt-1 text-sm sm:text-base">Manage events, registrations, and settings</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-red-600 text-red-400 hover:bg-red-400/10 w-full sm:w-auto text-sm sm:text-base"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6 lg:mb-8">
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm">Total Events</p>
                  <p className="text-lg sm:text-2xl font-bold text-white">{stats.totalEvents}</p>
                </div>
                <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm">Active Events</p>
                  <p className="text-lg sm:text-2xl font-bold text-white">{stats.activeEvents}</p>
                </div>
                <UserCheck className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm">Upcoming</p>
                  <p className="text-lg sm:text-2xl font-bold text-white">{stats.upcomingEvents}</p>
                </div>
                <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm">Past Events</p>
                  <p className="text-lg sm:text-2xl font-bold text-white">{stats.pastEvents}</p>
                </div>
                <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden mb-3">
          <Button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            variant="outline"
            className="w-full border-gray-600 text-gray-300 text-sm"
          >
            {isMobileMenuOpen ? (
              <>
                <X className="w-4 h-4 mr-2" />
                Close Menu
              </>
            ) : (
              <>
                <Menu className="w-4 h-4 mr-2" />
                Open Menu
              </>
            )}
          </Button>
        </div>

        {/* Navigation Tabs */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:block mb-4 sm:mb-6`}>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-4">
            <Button
              onClick={() => {
                setActiveTab('events')
                setIsMobileMenuOpen(false)
              }}
              variant={activeTab === 'events' ? 'default' : 'outline'}
              className={activeTab === 'events' ? 'bg-cyan-500 hover:bg-cyan-600' : 'border-gray-600 text-gray-300'}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Events
            </Button>
            <Button
              onClick={() => {
                setActiveTab('past-events')
                setIsMobileMenuOpen(false)
              }}
              variant={activeTab === 'past-events' ? 'default' : 'outline'}
              className={activeTab === 'past-events' ? 'bg-cyan-500 hover:bg-cyan-600' : 'border-gray-600 text-gray-300'}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Past Events
            </Button>
            <Button
              onClick={() => {
                setActiveTab('registrations')
                setIsMobileMenuOpen(false)
              }}
              variant={activeTab === 'registrations' ? 'default' : 'outline'}
              className={activeTab === 'registrations' ? 'bg-cyan-500 hover:bg-cyan-600' : 'border-gray-600 text-gray-300'}
            >
              <Users className="w-4 h-4 mr-2" />
              Registrations
            </Button>
            <Button
              onClick={() => {
                setActiveTab('settings')
                setIsMobileMenuOpen(false)
              }}
              variant={activeTab === 'settings' ? 'default' : 'outline'}
              className={activeTab === 'settings' ? 'bg-cyan-500 hover:bg-cyan-600' : 'border-gray-600 text-gray-300'}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Events Management</h2>
              <Button
                onClick={() => {
                  setShowEventForm(true)
                  setSelectedEvent(null)
                  resetForm()
                }}
                className="bg-cyan-500 hover:bg-cyan-600 w-full sm:w-auto text-sm sm:text-base"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Event
              </Button>
            </div>

            {/* Event Form */}
            {showEventForm && (
              <Card className="mb-8 bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">
                    {selectedEvent ? 'Edit Event' : 'Create New Event'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={selectedEvent ? handleUpdateEvent : handleCreateEvent} className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title" className="text-gray-300">Title</Label>
                        <Input
                          id="title"
                          value={eventForm.title}
                          onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
                          required
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="category" className="text-gray-300">Category</Label>
                        <Input
                          id="category"
                          value={eventForm.category}
                          onChange={(e) => setEventForm({...eventForm, category: e.target.value})}
                          required
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="date" className="text-gray-300">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={eventForm.date}
                          onChange={(e) => setEventForm({...eventForm, date: e.target.value})}
                          required
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="time" className="text-gray-300">Time</Label>
                        <Input
                          id="time"
                          value={eventForm.time}
                          onChange={(e) => setEventForm({...eventForm, time: e.target.value})}
                          required
                          className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500/50"
                          placeholder="e.g., 2:00 PM - 5:00 PM"
                        />
                      </div>
                      <div>
                        <Label htmlFor="maxAttendees" className="text-gray-300">
                          🏢 Max Attendees
                        </Label>
                        <Input
                          id="maxAttendees"
                          type="number"
                          value={eventForm.maxAttendees}
                          onChange={(e) => setEventForm({...eventForm, maxAttendees: e.target.value})}
                          required
                          className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500/50"
                          placeholder="Venue capacity"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="location" className="text-gray-300">Location</Label>
                        <Input
                          id="location"
                          value={eventForm.location}
                          onChange={(e) => setEventForm({...eventForm, location: e.target.value})}
                          required
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="registrationLimit" className="text-gray-300">
                          📝 Registration Limit
                        </Label>
                        <Input
                          id="registrationLimit"
                          type="number"
                          value={eventForm.registrationLimit}
                          onChange={(e) => setEventForm({...eventForm, registrationLimit: e.target.value})}
                          className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500/50"
                          placeholder="Sign-up cap (Optional)"
                        />
                      </div>
                    </div>

                    {/* Helpful explanation */}
                    <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-4 mb-4">
                      <h4 className="text-sm font-medium text-cyan-300 mb-2">💡 Understanding the Difference:</h4>
                      <div className="text-xs text-gray-300 space-y-1">
                        <p><strong>🏢 Max Attendees:</strong> Physical venue capacity (how many can actually attend)</p>
                        <p><strong>📝 Registration Limit:</strong> How many people can sign up (may be different from venue capacity)</p>
                        <p className="text-gray-400 mt-2">Example: Venue fits 50 people, but you allow 100 registrations expecting no-shows</p>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="image" className="text-gray-300">Image URL</Label>
                      <Input
                        id="image"
                        value={eventForm.image}
                        onChange={(e) => setEventForm({...eventForm, image: e.target.value})}
                        className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500/50"
                        placeholder="e.g., /event-banner.png"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description" className="text-gray-300">Description</Label>
                      <Textarea
                        id="description"
                        value={eventForm.description}
                        onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
                        required
                        className="bg-gray-800 border-gray-600 text-white"
                        rows={3}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="featured"
                          checked={eventForm.featured}
                          onChange={(e) => setEventForm({...eventForm, featured: e.target.checked})}
                          className="w-4 h-4 text-cyan-600 bg-gray-800 border-gray-600 rounded"
                          aria-label="Mark as featured event"
                        />
                        <Label htmlFor="featured" className="text-gray-300">Featured Event</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="isActive"
                          checked={eventForm.isActive}
                          onChange={(e) => setEventForm({...eventForm, isActive: e.target.checked})}
                          className="w-4 h-4 text-cyan-600 bg-gray-800 border-gray-600 rounded"
                          aria-label="Mark as active event"
                        />
                        <Label htmlFor="isActive" className="text-gray-300">Active Event</Label>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button 
                        type="submit" 
                        className="bg-cyan-500 hover:bg-cyan-600 w-full sm:w-auto"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Creating...' : (selectedEvent ? 'Update Event' : 'Create Event')}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setShowEventForm(false)
                          setSelectedEvent(null)
                          resetForm()
                        }}
                        className="border-gray-600 text-gray-300 w-full sm:w-auto"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Events List */}
            <div className="grid gap-4">
              {events.filter(e => e.isActive !== false).length === 0 ? (
                <p className="text-gray-400">No active events found.</p>
              ) : (
                events.filter(e => e.isActive !== false).map((event) => (
                  <Card key={event.id} className="bg-gray-900 border-gray-700">
                    <CardContent className="p-3 sm:p-4 lg:p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-1 sm:gap-2 lg:gap-3 mb-2">
                            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white truncate">{event.title}</h3>
                            {event.featured && (
                              <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded">
                                Featured
                              </span>
                            )}
                            {event.isActive === false && (
                              <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-red-500/20 text-red-300 text-xs rounded">
                                Inactive
                              </span>
                            )}
                            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded">
                              {event.category}
                            </span>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 lg:gap-6 text-gray-300 text-xs sm:text-sm mb-2">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span className="truncate">{event.date} • {event.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span className="truncate">{event.attendees}/{event.maxAttendees} registered
                              {event.registrationLimit && ` (Limit: ${event.registrationLimit})`}</span>
                            </div>
                          </div>
                          <p className="text-gray-400 text-xs sm:text-sm truncate">{event.location}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                          <Button
                            onClick={() => window.open(`/admin/events/${event.id}/registrations`, '_blank')}
                            variant="outline"
                            size="sm"
                            className="border-gray-600 text-gray-300 h-8 w-8 sm:h-9 sm:w-9 p-0"
                            title="View Registrations"
                          >
                            <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Button>

                          <Button
                            onClick={() => editEvent(event)}
                            variant="outline"
                            size="sm"
                            className="border-gray-600 text-gray-300 h-8 w-8 sm:h-9 sm:w-9 p-0"
                          >
                            <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Button>

                          <Button
                            onClick={() => handleMoveToPastEvents(event)}
                            variant="outline"
                            size="sm"
                            className="border-purple-600 text-purple-400 hover:bg-purple-400/10 h-8 w-8 sm:h-9 sm:w-9 p-0"
                            title="Move to Past Events"
                          >
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Button>
                          <Button
                            onClick={() => handleDeleteEvent(event.id)}
                            variant="outline"
                            size="sm"
                            className="border-red-600 text-red-400 h-8 w-8 sm:h-9 sm:w-9 p-0"
                          >
                            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        )}

        {/* Past Events Tab */}
        {activeTab === 'past-events' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold text-white">Past Events</h2>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={() => {
                    const pastEvents = events.filter(e => e.isActive === false)
                    if (pastEvents.length === 0) {
                      showAlert('info', 'No past events found.', 'Info')
                    } else {
                      showAlert('info', `Found ${pastEvents.length} past events.`, 'Info')
                    }
                  }}
                  variant="outline"
                  className="border-gray-600 text-gray-300 w-full sm:w-auto"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Check Past Events
                </Button>
                <Button
                  onClick={() => {
                    const pastEvents = events.filter(e => e.isActive === false)
                    console.log('All past events:', pastEvents)
                    showAlert('info', `Found ${pastEvents.length} past events. Check console for details.`, 'Info')
                  }}
                  variant="outline"
                  className="border-gray-600 text-gray-300 w-full sm:w-auto"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </div>
            </div>

            {/* Past Events List */}
            <div className="grid gap-4">
              {events.filter(e => e.isActive === false).length === 0 ? (
                <p className="text-gray-400">No past events found.</p>
              ) : (
                events
                  .filter(e => e.isActive === false)
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((event) => (
                    <Card key={event.id} className="bg-gray-900 border-gray-700">
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                              <h3 className="text-lg sm:text-xl font-bold text-white">{event.title}</h3>
                              {event.featured && (
                                <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded">
                                  Featured
                                </span>
                              )}
                              <span className="px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded">
                                Past Event
                              </span>
                              <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded">
                                {event.category}
                              </span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-gray-300 text-sm mb-2">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {event.date} • {event.time}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {event.attendees}/{event.maxAttendees} attended
                                {event.registrationLimit && ` (Limit: ${event.registrationLimit})`}
                              </div>
                            </div>
                            <p className="text-gray-400 text-sm">{event.location}</p>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <Button
                              onClick={() => window.open(`/admin/events/${event.id}/registrations`, '_blank')}
                              variant="outline"
                              size="sm"
                              className="border-gray-600 text-gray-300"
                              title="View Registrations"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>

                            <Button
                              onClick={() => editEvent(event)}
                              variant="outline"
                              size="sm"
                              className="border-gray-600 text-gray-300"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              onClick={() => handleDeleteEvent(event.id)}
                              variant="outline"
                              size="sm"
                              className="border-red-600 text-red-400"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
              )}
            </div>
          </div>
        )}

        {/* Registrations Tab */}
        {activeTab === 'registrations' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold text-white">All Registrations</h2>
              <Button
                onClick={downloadAllRegistrationsAsExcel}
                variant="outline"
                className="border-green-600 text-green-400 hover:bg-green-400/10 w-full sm:w-auto"
                disabled={registrations.length === 0}
              >
                <Download className="w-4 h-4 mr-2" />
                Export All to Excel
              </Button>
            </div>
            {registrations.length === 0 ? (
              <p className="text-gray-400">No registrations found.</p>
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
                      <th className="text-left py-3 px-4 font-semibold text-cyan-400">Event</th>
                      <th className="text-left py-3 px-4 font-semibold text-cyan-400">Registered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((registration) => {
                      const event = events.find(e => e.id === registration.eventId)
                      return (
                        <tr key={registration.id} className="border-b border-white/5 hover:bg-white/5">
                          <td className="py-3 px-4 font-medium">{registration.name}</td>
                          <td className="py-3 px-4 text-gray-300">{registration.usn}</td>
                          <td className="py-3 px-4 text-gray-300">{registration.email}</td>
                          <td className="py-3 px-4 text-gray-300">{registration.phone}</td>
                          <td className="py-3 px-4 text-gray-300">{registration.branchName}</td>
                          <td className="py-3 px-4 text-gray-300">{registration.academicYear}</td>
                          <td className="py-3 px-4 text-gray-300">{event?.title || 'Unknown'}</td>
                          <td className="py-3 px-4 text-gray-400 text-sm">
                            {new Date(registration.registeredAt).toLocaleDateString()}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Admin Settings</h2>
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">System Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Total Events: <span className="text-white">{stats.totalEvents}</span></p>
                        <p className="text-gray-400">Active Events: <span className="text-white">{stats.activeEvents}</span></p>
                        <p className="text-gray-400">Past Events: <span className="text-white">{stats.pastEvents}</span></p>
                      </div>
                      <div>
                        <p className="text-gray-400">Upcoming Events: <span className="text-white">{stats.upcomingEvents}</span></p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-700 pt-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Quick Actions</h3>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        onClick={() => setActiveTab('events')}
                        variant="outline"
                        className="border-gray-600 text-gray-300 w-full sm:w-auto"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Event
                      </Button>
                      <Button
                        onClick={() => setActiveTab('registrations')}
                        variant="outline"
                        className="border-gray-600 text-gray-300 w-full sm:w-auto"
                      >
                        <Users className="w-4 h-4 mr-2" />
                        View Registrations
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
