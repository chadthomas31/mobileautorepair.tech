import { Award, Clock, Shield, Users, CheckCircle, Wrench } from 'lucide-react'
import Image from 'next/image'

const features = [
  {
    icon: Award,
    title: 'ASE-Certified Experts',
    description: 'Our mechanics are ASE-certified with 10+ years of experience across all makes and models',
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description: 'Service at your home, office, or roadside—7 days a week with same-day availability',
  },
  {
    icon: Shield,
    title: '90-Day Warranty',
    description: 'All repairs backed by our comprehensive 90-day warranty on parts and labor',
  },
  {
    icon: Users,
    title: 'Transparent Pricing',
    description: 'RepairPal® benchmarked estimates—no surprise bills, no unnecessary parts',
  },
  {
    icon: Wrench,
    title: 'State-of-the-Art Equipment',
    description: 'Our mobile units carry professional diagnostic tools and quality parts',
  },
  {
    icon: CheckCircle,
    title: 'Trusted Service',
    description: '200+ satisfied customers with 5-star reviews across Orange County',
  },
]

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Mobile Auto Repair?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We bring professional auto repair services directly to you—saving you time, money, and the hassle of traditional repair shops.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          <div className="relative order-2 md:order-1">
            <Image
              src="https://placehold.co/600x400/000000/FFFFFF/png?text=Auto+Repair+Team"
              alt="Team of certified mobile auto repair mechanics in Orange County."
              width={600}
              height={400}
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-xl shadow-xl max-w-xs">
              <p className="font-bold text-2xl mb-1">10+ Years</p>
              <p className="text-sm">Serving Orange County with excellence</p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Convenience Meets Expertise
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              We understand that your time is valuable. That's why we bring professional auto repair services directly to you. No more waiting at the shop, arranging rides, or disrupting your day.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Our team of ASE-certified mechanics has the expertise and state-of-the-art equipment to handle everything from routine maintenance to complex diagnostics and repairs—all while you continue with your day.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
              <p className="text-gray-800">
                <strong className="text-blue-900">Our Promise:</strong> We never replace unnecessary parts. We empower you to make educated decisions with transparent, RepairPal®-benchmarked pricing.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
