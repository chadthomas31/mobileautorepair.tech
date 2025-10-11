'use client'

import { ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Hero() {
  const scrollToBooking = () => {
    const element = document.getElementById('booking')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="pt-32 lg:pt-40 pb-12 md:pb-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              ⭐ ASE-Certified Mechanics • 90-Day Warranty
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
              Mobile Auto Repair at Your Home or Workplace
              <span className="text-primary block mt-2">Serving Orange County & Surrounding Areas</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8">
              Our mobile mechanics come to you—at home, work, or roadside—saving you time and hassle. Enjoy convenient car repair without the wait, backed by fair pricing and expert service.
            </p>
            <div className="space-y-3 mb-8">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700"><strong>ASE-Certified Technicians</strong> with years of experience</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700"><strong>Same-Day Service Available</strong> for most repairs</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700"><strong>90-Day Warranty</strong> on all parts and labor</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700"><strong>Fair & Transparent Pricing</strong> with RepairPal® estimates</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button onClick={scrollToBooking} size="lg" className="text-base md:text-lg px-6 md:px-8 w-full sm:w-auto">
                Schedule Service Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <a href="tel:+16577894652" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="text-base md:text-lg px-6 md:px-8 w-full border-2 border-primary text-primary hover:bg-primary hover:text-white">
                  Call (657) 789-4652
                </Button>
              </a>
            </div>
            <p className="text-sm text-gray-600 max-w-xl bg-blue-50 border border-blue-200 rounded-lg p-3">
              <span className="font-semibold">💡 How it works:</span> We diagnose first, then share a RepairPal-based estimate. Your $100 diagnostic + service charge is credited when you approve the repair.
            </p>
          </div>
          <div className="relative mt-8 md:mt-0">
            <Image
              src="https://placehold.co/600x400/000000/FFFFFF/png?text=Mechanic+Working+on+Car"
              alt="Professional mobile mechanic in Orange County working on the engine of a car."
              width={600}
              height={400}
              className="rounded-2xl shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
