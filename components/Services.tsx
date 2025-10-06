import { Wrench, Battery, Droplet, Gauge, Zap, Settings } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const services = [
  {
    icon: Wrench,
    title: 'General Repairs',
    description: 'Comprehensive diagnostics and repairs for all vehicle makes and models.',
  },
  {
    icon: Battery,
    title: 'Battery Service',
    description: 'Battery testing, replacement, and jump-start services on-site.',
  },
  {
    icon: Droplet,
    title: 'Oil Changes',
    description: 'Quick and professional oil changes with premium quality oils.',
  },
  {
    icon: Gauge,
    title: 'Brake Service',
    description: 'Complete brake inspection, pad replacement, and rotor resurfacing.',
  },
  {
    icon: Zap,
    title: 'Electrical Systems',
    description: 'Troubleshooting and repair of electrical issues and components.',
  },
  {
    icon: Settings,
    title: 'Maintenance',
    description: 'Scheduled maintenance to keep your vehicle running at peak performance.',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From routine maintenance to complex repairs, we handle it all at your convenience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
