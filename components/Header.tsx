'use client'

import { useState } from 'react'
import { Menu, X, Wrench, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Wrench className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-gray-900">Mobile Auto Repair</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-primary transition">
              Services
            </button>
            <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-primary transition">
              About
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-primary transition">
              Contact
            </button>
            <Button onClick={() => scrollToSection('booking')} size="lg">
              <Phone className="mr-2 h-4 w-4" />
              Book Now
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-4">
            <button
              onClick={() => scrollToSection('services')}
              className="block w-full text-left text-gray-700 hover:text-primary transition"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left text-gray-700 hover:text-primary transition"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left text-gray-700 hover:text-primary transition"
            >
              Contact
            </button>
            <Button onClick={() => scrollToSection('booking')} className="w-full">
              <Phone className="mr-2 h-4 w-4" />
              Book Now
            </Button>
          </nav>
        )}
      </div>
    </header>
  )
}
