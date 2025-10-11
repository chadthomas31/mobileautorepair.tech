import { Star, Quote } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const testimonials = [
  {
    name: 'Sarah Johnson',
    location: 'Irvine, CA',
    rating: 5,
    text: 'Absolutely fantastic service! The mechanic came to my office and fixed my brake issue in under an hour. Professional, honest, and saved me so much time. Highly recommend!',
    service: 'Brake Service',
  },
  {
    name: 'Michael Chen',
    location: 'Anaheim, CA',
    rating: 5,
    text: 'I was skeptical about mobile mechanics, but these guys exceeded my expectations. Fair pricing, quality work, and the convenience of having them come to my home was priceless.',
    service: 'Oil Change & Diagnostics',
  },
  {
    name: 'Jennifer Martinez',
    location: 'Santa Ana, CA',
    rating: 5,
    text: 'My car broke down on the way to an important meeting. They came out same-day and got me back on the road quickly. The technician was knowledgeable and explained everything clearly.',
    service: 'Battery Replacement',
  },
  {
    name: 'David Thompson',
    location: 'Costa Mesa, CA',
    rating: 5,
    text: 'Transparent pricing and excellent communication. They diagnosed the problem, gave me a fair estimate, and completed the repair professionally. Will definitely use again!',
    service: 'Engine Diagnostics',
  },
  {
    name: 'Lisa Rodriguez',
    location: 'Tustin, CA',
    rating: 5,
    text: 'As a busy mom, having a mechanic come to my house was a game-changer. No more waiting at the shop with kids! The service was top-notch and reasonably priced.',
    service: 'General Maintenance',
  },
  {
    name: 'Robert Kim',
    location: 'Fullerton, CA',
    rating: 5,
    text: 'Professional, punctual, and honest. They could have easily upsold me on unnecessary repairs, but instead gave me straightforward advice. That kind of integrity is rare!',
    service: 'Electrical System Repair',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it—see why hundreds of customers trust us with their vehicle repairs.
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-lg font-semibold text-gray-900">5.0 Average Rating</span>
            <span className="text-gray-600">• 200+ Reviews</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <Quote className="h-8 w-8 text-blue-600 opacity-50" />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                  <p className="text-xs text-blue-600 mt-1 font-medium">{testimonial.service}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">200+</div>
            <div className="text-sm text-gray-600 mt-1">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">10+</div>
            <div className="text-sm text-gray-600 mt-1">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">90-Day</div>
            <div className="text-sm text-gray-600 mt-1">Warranty</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">ASE</div>
            <div className="text-sm text-gray-600 mt-1">Certified</div>
          </div>
        </div>
      </div>
    </section>
  )
}
