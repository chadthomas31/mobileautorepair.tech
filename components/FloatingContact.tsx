'use client'

import { useState } from 'react'
import { Phone, Mail, MessageCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 bg-white rounded-lg shadow-2xl p-4 space-y-3 animate-in slide-in-from-bottom">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-gray-900">Contact Us</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <a
            href="tel:+16577894652"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition group"
          >
            <div className="bg-blue-100 p-2 rounded-full group-hover:bg-blue-200 transition">
              <Phone className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Call Now</p>
              <p className="text-sm text-gray-600">(657) 789-4652</p>
            </div>
          </a>

          <a
            href="mailto:info@mobileautorepair.tech"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-green-50 transition group"
          >
            <div className="bg-green-100 p-2 rounded-full group-hover:bg-green-200 transition">
              <Mail className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Email Us</p>
              <p className="text-sm text-gray-600">info@mobileautorepair.tech</p>
            </div>
          </a>

          <button
            onClick={() => {
              document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
              setIsOpen(false)
            }}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-50 transition group w-full text-left"
          >
            <div className="bg-purple-100 p-2 rounded-full group-hover:bg-purple-200 transition">
              <MessageCircle className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Book Service</p>
              <p className="text-sm text-gray-600">Schedule appointment</p>
            </div>
          </button>
        </div>
      )}

      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="lg"
        className="rounded-full h-16 w-16 shadow-2xl hover:scale-110 transition-transform"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Phone className="h-6 w-6" />
        )}
      </Button>
    </div>
  )
}
