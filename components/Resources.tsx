'use client'

import { BookOpen, Wrench, AlertTriangle, Calendar } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const resources = [
  {
    icon: Calendar,
    title: 'Seasonal Maintenance Checklist',
    description: 'Prepare your vehicle for changing weather conditions with our comprehensive seasonal maintenance guide.',
    tips: [
      'Check tire pressure and tread depth',
      'Inspect windshield wipers and fluid levels',
      'Test battery and charging system',
      'Verify heating/cooling system operation',
    ],
  },
  {
    icon: AlertTriangle,
    title: 'Warning Signs to Watch For',
    description: 'Learn to recognize common warning signs that indicate your vehicle needs professional attention.',
    tips: [
      'Dashboard warning lights staying illuminated',
      'Unusual noises (grinding, squealing, knocking)',
      'Vibrations or pulling while driving',
      'Fluid leaks under your vehicle',
    ],
  },
  {
    icon: Wrench,
    title: 'Basic Car Care Tips',
    description: 'Simple maintenance tasks you can do yourself to keep your vehicle running smoothly between services.',
    tips: [
      'Check oil level monthly',
      'Inspect tire pressure weekly',
      'Keep your car clean inside and out',
      'Follow your manufacturer\'s service schedule',
    ],
  },
  {
    icon: BookOpen,
    title: 'Understanding Your Estimate',
    description: 'We believe in transparency. Here\'s what to expect when you receive a repair estimate from us.',
    tips: [
      'Detailed breakdown of parts and labor',
      'RepairPal® benchmarked pricing',
      'Explanation of necessary vs. recommended repairs',
      'Written warranty information included',
    ],
  },
]

export default function Resources() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Helpful Resources & Tips
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Empower yourself with knowledge about your vehicle. We're here to educate, not just repair.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {resources.map((resource, index) => {
            const Icon = resource.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{resource.title}</CardTitle>
                  <CardDescription className="text-base">{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {resource.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold mt-1">•</span>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Emergency Tips */}
        <div className="mt-12 max-w-4xl mx-auto">
          <Card className="bg-red-50 border-red-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="bg-red-600 text-white rounded-full p-3 flex-shrink-0">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    What to Do If Your Car Breaks Down
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                    <div>
                      <p className="font-semibold mb-2">Immediate Steps:</p>
                      <ol className="list-decimal list-inside space-y-1">
                        <li>Pull over safely to the shoulder</li>
                        <li>Turn on hazard lights</li>
                        <li>Stay in your vehicle if on highway</li>
                        <li>Call for help</li>
                      </ol>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">We Can Help:</p>
                      <ul className="space-y-1">
                        <li>✓ Emergency roadside service</li>
                        <li>✓ On-site diagnostics</li>
                        <li>✓ Same-day repairs when possible</li>
                        <li>✓ Towing coordination if needed</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-red-200">
                    <p className="font-semibold text-gray-900">
                      Emergency Service:{' '}
                      <a href="tel:+16577894652" className="text-red-600 hover:underline">
                        (657) 789-4652
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Preview */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Have more questions? Our AI assistant can answer common questions about pricing, services, and scheduling.{' '}
            <button
              onClick={() => document.getElementById('ai-assistant')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-blue-600 font-semibold hover:underline"
            >
              Talk to our AI Assistant
            </button>
          </p>
        </div>
      </div>
    </section>
  )
}
