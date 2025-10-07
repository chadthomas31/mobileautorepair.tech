'use client'

import { ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Hero() {
  const scrollToBooking = () => {
    const element = document.getElementById('booking')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="pt-24 md:pt-32 pb-12 md:pb-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
              Professional Auto Repair
              <span className="text-primary block">At Your Location</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8">
              Skip the shop! Our certified mechanics come to you with all the tools and expertise needed to get your vehicle running smoothly.
            </p>
            <div className="space-y-3 mb-8">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Certified & Experienced Mechanics</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Same-Day Service Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Competitive Pricing & Warranty</span>
              </div>
            </div>
            <Button onClick={scrollToBooking} size="lg" className="text-base md:text-lg px-6 md:px-8 w-full sm:w-auto">
              Schedule Service
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="relative mt-8 md:mt-0">
            <div className="bg-gradient-to-br from-primary to-blue-600 rounded-2xl p-6 md:p-8 shadow-2xl">
              <div className="bg-white rounded-xl p-4 md:p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Available Now</span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    Online
                  </span>
                </div>
                <div className="border-t pt-4">
                  <p className="text-2xl font-bold text-gray-900">Fast Response Time</p>
                  <p className="text-gray-600 mt-2">We arrive within 2 hours for emergency repairs</p>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-3xl font-bold text-primary">500+</p>
                    <p className="text-sm text-gray-600">Repairs Done</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary">4.9</p>
                    <p className="text-sm text-gray-600">Rating</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary">100%</p>
                    <p className="text-sm text-gray-600">Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
