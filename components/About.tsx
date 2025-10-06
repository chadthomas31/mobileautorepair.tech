import { Award, Clock, Shield, Users } from 'lucide-react'

const features = [
  {
    icon: Award,
    title: 'Certified Experts',
    description: 'ASE-certified mechanics with years of experience',
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description: 'Service at your home, office, or any location',
  },
  {
    icon: Shield,
    title: 'Quality Guarantee',
    description: '90-day warranty on all parts and labor',
  },
  {
    icon: Users,
    title: 'Customer First',
    description: 'Transparent pricing and honest recommendations',
  },
]

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why Choose Mobile Auto Repair?
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              We understand that your time is valuable. That's why we bring professional auto repair services directly to you. No more waiting at the shop or arranging rides.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Our team of certified mechanics has the expertise and equipment to handle everything from routine maintenance to complex repairs, all while you continue with your day.
            </p>
            <div className="space-y-4">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-primary to-blue-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Our Promise</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                  <span>Upfront, transparent pricing</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                  <span>No hidden fees or surprises</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                  <span>Quality parts from trusted suppliers</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                  <span>Professional, courteous service</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                  <span>Same-day service when possible</span>
                </li>
              </ul>
              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-3xl font-bold">10+ Years</p>
                <p className="text-white/90">Serving the Community</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
