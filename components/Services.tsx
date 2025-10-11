import { Wrench, Battery, Droplet, Gauge, Zap, Settings } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const services = [
  {
    icon: Wrench,
    title: 'Diagnostics & General Repairs',
    description: 'State-of-the-art diagnostic equipment to identify issues quickly. Comprehensive repairs for all vehicle makes and models at your location.',
  },
  {
    icon: Battery,
    title: 'Battery Service & Jump-Starts',
    description: 'On-site battery testing, replacement with quality batteries, and emergency jump-start services. We come to you—home, work, or roadside.',
  },
  {
    icon: Droplet,
    title: 'Oil Changes & Fluid Services',
    description: 'Professional oil changes with premium synthetic or conventional oils. Includes fluid level checks and filter replacement.',
  },
  {
    icon: Gauge,
    title: 'Brake Inspection & Repair',
    description: 'Complete brake system inspection, pad and rotor replacement, and brake fluid service. Safety is our priority.',
  },
  {
    icon: Zap,
    title: 'Electrical System Repair',
    description: 'Expert troubleshooting and repair of alternators, starters, wiring issues, and dashboard warning lights.',
  },
  {
    icon: Settings,
    title: 'Scheduled Maintenance',
    description: 'Follow your manufacturer\'s service schedule with our comprehensive maintenance packages to keep your vehicle running at peak performance.',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            From routine maintenance to complex repairs, we handle it all at your convenience.
          </p>
          
          {/* Pricing Policy Callout */}
          <div className="mt-6 md:mt-8 max-w-3xl mx-auto bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-4 md:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
              <div className="bg-blue-600 text-white rounded-full p-2 sm:p-3 flex-shrink-0">
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Fair Pricing Policy</h3>
                <p className="text-gray-700 mb-2 text-sm sm:text-base">
                  We use <span className="font-semibold">RepairPal®</span> for your year/make/model and ZIP. The $100 diagnostic + service charge are credited on approval.
                </p>
                <p className="text-xs sm:text-sm text-gray-600 italic">
                  No surprise bills—diagnose first, then approve. Diagnostic + service credited with any repair.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-shadow relative overflow-hidden min-h-[200px] bg-black"
                aria-label={`${service.title} service in Orange County`}
              >
                <CardHeader className="relative p-6 flex flex-col items-center text-center">
                  <div className="h-20 w-20 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-white text-lg">{service.title}</CardTitle>
                  <CardDescription className="text-gray-300 text-sm leading-relaxed">{service.description}</CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
