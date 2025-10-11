'use client'

import { useState } from 'react'
import { Menu, X, Phone, Mail } from 'lucide-react'
import Image from 'next/image'
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
      {/* Top Contact Bar - Desktop Only */}
      <div className="hidden lg:block bg-gray-900 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <a href="tel:+16577894652" className="flex items-center gap-2 hover:text-blue-400 transition">
                <Phone className="h-4 w-4" />
                <span className="font-medium">(657) 789-4652</span>
              </a>
              <a href="mailto:info@mobileautorepair.tech" className="flex items-center gap-2 hover:text-blue-400 transition">
                <Mail className="h-4 w-4" />
                <span>info@mobileautorepair.tech</span>
              </a>
            </div>
            <div className="text-gray-300">
              <span className="font-medium">Service Hours:</span> Mon-Fri 7am-7pm | Sat 8am-5pm
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-2 py-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="Mobile Auto Repair Tech Logo" 
              width={1200} 
              height={400}
              className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto"
              priority
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-primary transition">
              Services
            </button>
            <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-primary transition">
              About
            </button>
            <button onClick={() => scrollToSection('testimonials')} className="text-gray-700 hover:text-primary transition">
              Reviews
            </button>
            <button onClick={() => scrollToSection('service-areas')} className="text-gray-700 hover:text-primary transition">
              Service Areas
            </button>
            <Button onClick={() => scrollToSection('booking')} size="lg">
              <Phone className="mr-2 h-4 w-4" />
              Book Now
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-2 pb-6 space-y-3 bg-white border-t border-gray-100">
            <a 
              href="tel:+16577894652" 
              className="flex items-center gap-3 text-primary font-semibold text-lg border-b border-gray-200 pb-3 pt-3 px-2"
            >
              <Phone className="h-5 w-5" />
              (657) 789-4652
            </a>
            <button
              onClick={() => scrollToSection('services')}
              className="block w-full text-left text-gray-700 hover:text-primary transition py-3 px-2 hover:bg-gray-50"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left text-gray-700 hover:text-primary transition py-3 px-2 hover:bg-gray-50"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="block w-full text-left text-gray-700 hover:text-primary transition py-3 px-2 hover:bg-gray-50"
            >
              Reviews
            </button>
            <button
              onClick={() => scrollToSection('service-areas')}
              className="block w-full text-left text-gray-700 hover:text-primary transition py-3 px-2 hover:bg-gray-50"
            >
              Service Areas
            </button>
            <Button onClick={() => scrollToSection('booking')} className="w-full mt-3 mx-2">
              <Phone className="mr-2 h-4 w-4" />
              Book Now
            </Button>
          </nav>
        )}
      </div>
    </header>
  )
}
