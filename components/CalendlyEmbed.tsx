'use client'

import { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function CalendlyEmbed() {
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Schedule Your Appointment</CardTitle>
        <CardDescription>
          Choose a convenient time for your mobile auto repair service
        </CardDescription>
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
          <p className="font-medium mb-1">📋 What to expect at your appointment:</p>
          <p>We confirm the issue on-site, share a RepairPal-based estimate, and apply your $100 diagnostic + service charge as a credit when you approve.</p>
        </div>
      </CardHeader>
      <CardContent>
        <div 
          className="calendly-inline-widget" 
          data-url="https://calendly.com/YOUR_CALENDLY_USERNAME?hide_gdpr_banner=1&primary_color=2563eb"
          style={{ minWidth: '320px', height: '700px' }}
        />
        <p className="text-sm text-gray-500 mt-4 text-center">
          Don't have a Calendly account yet? 
          <a 
            href="https://calendly.com/signup" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline ml-1"
          >
            Sign up for free
          </a>
          {' '}and replace YOUR_CALENDLY_USERNAME in the code.
        </p>
      </CardContent>
    </Card>
  )
}
