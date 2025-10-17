'use client'

import { ArrowRight, Star, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ServicesHero() {
  const scrollToEstimate = () => {
    const element = document.getElementById('booking')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = '/#booking'
    }
  }

  return (
    <section className="min-h-[80vh] flex items-center bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Star className="h-4 w-4 mr-2 fill-yellow-400 text-yellow-400" />
            Best Price for Quality Mobile Auto Repair
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="block">Expert Auto Repair Services</span>
            <span className="block text-blue-200 mt-2">At Your Location</span>
          </h1>
          
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Mobile technicians come to you. Transparent pricing, 90-day warranty.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              onClick={scrollToEstimate}
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 w-full sm:w-auto"
            >
              Get an Estimate
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <a href="tel:+16577894652" className="w-full sm:w-auto">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 w-full"
              >
                Call (657) 789-4652
              </Button>
            </a>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <CheckCircle className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <h3 className="font-semibold text-sm">Mobile Service</h3>
            </div>
            <div className="text-center">
              <CheckCircle className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <h3 className="font-semibold text-sm">Certified Techs</h3>
            </div>
            <div className="text-center">
              <CheckCircle className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <h3 className="font-semibold text-sm">Fair Pricing</h3>
            </div>
            <div className="text-center">
              <CheckCircle className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <h3 className="font-semibold text-sm">90-Day Warranty</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
