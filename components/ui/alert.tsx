import { AlertCircle, CheckCircle, X } from "lucide-react"
import { useState, useEffect } from "react"

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  onClose?: () => void
  autoClose?: boolean
  autoCloseDelay?: number
}

export function Alert({ 
  type, 
  title, 
  message, 
  onClose, 
  autoClose = true, 
  autoCloseDelay = 5000 
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(onClose, 300) // Wait for fade out animation
      }, autoCloseDelay)
      return () => clearTimeout(timer)
    }
  }, [autoClose, autoCloseDelay, onClose])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => onClose?.(), 300)
  }

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-400" />
      case 'info':
        return <AlertCircle className="w-5 h-5 text-blue-400" />
    }
  }

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'border-green-500/20 bg-green-500/10 text-green-300'
      case 'error':
        return 'border-red-500/20 bg-red-500/10 text-red-300'
      case 'warning':
        return 'border-yellow-500/20 bg-yellow-500/10 text-yellow-300'
      case 'info':
        return 'border-blue-500/20 bg-blue-500/10 text-blue-300'
    }
  }

  if (!isVisible) return null

  return (
    <div className={`
      fixed top-4 right-4 z-50 max-w-md w-full
      border rounded-lg p-4 shadow-lg backdrop-blur-sm
      transition-all duration-300 ease-in-out
      ${getStyles()}
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
    `}>
      <div className="flex items-start gap-3">
        {getIcon()}
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className="font-semibold mb-1">{title}</h4>
          )}
          <p className="text-sm leading-relaxed">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={handleClose}
            className="flex-shrink-0 p-1 rounded-md hover:bg-white/10 transition-colors"
            aria-label="Close alert"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}

// Hook for managing alerts
export function useAlert() {
  const [alerts, setAlerts] = useState<Array<{
    id: string
    type: 'success' | 'error' | 'warning' | 'info'
    title?: string
    message: string
  }>>([])

  const showAlert = (type: 'success' | 'error' | 'warning' | 'info', message: string, title?: string) => {
    const id = Math.random().toString(36).substr(2, 9)
    setAlerts(prev => [...prev, { id, type, title, message }])
  }

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id))
  }

  const AlertContainer = () => (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          type={alert.type}
          title={alert.title}
          message={alert.message}
          onClose={() => removeAlert(alert.id)}
        />
      ))}
    </div>
  )

  return { showAlert, AlertContainer }
}
