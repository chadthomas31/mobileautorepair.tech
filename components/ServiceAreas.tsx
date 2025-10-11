import { MapPin, CheckCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const serviceAreas = [
  'Anaheim',
  'Irvine',
  'Santa Ana',
  'Huntington Beach',
  'Costa Mesa',
  'Fullerton',
  'Orange',
  'Tustin',
  'Newport Beach',
  'Fountain Valley',
  'Garden Grove',
  'Lake Forest',
  'Mission Viejo',
  'Yorba Linda',
  'Placentia',
  'Brea',
]

export default function ServiceAreas() {
  return (
    <section id="service-areas" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            We Serve Orange County & Surrounding Areas
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our mobile mechanics travel throughout Orange County to bring professional auto repair services directly to your location.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Map Placeholder */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative w-full h-[400px] bg-gradient-to-br from-blue-100 to-blue-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d424144.59009033114!2d-118.12652984999999!3d33.7174708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dc925c54d5f7cf%3A0xdea6c3618ff0d607!2sOrange%20County%2C%20CA!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Orange County Service Area Map"
                  className="w-full h-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Service Areas List */}
          <div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Mobile Service Throughout Orange County
                  </h3>
                  <p className="text-gray-700 mb-3">
                    We come to you! Whether you're at home, work, or stranded on the roadside, our mobile mechanics bring the shop to your location.
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Service Radius:</strong> We primarily serve Orange County and can accommodate nearby areas. Call us to confirm coverage for your location.
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-semibold text-gray-900 mb-4 text-lg">
              Cities We Serve:
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {serviceAreas.map((city, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{city}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-gray-800">
                <strong>Don't see your city?</strong> We may still be able to help! Contact us at{' '}
                <a href="tel:+16577894652" className="text-blue-600 font-semibold hover:underline">
                  (657) 789-4652
                </a>{' '}
                to check if we can service your area.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center max-w-3xl mx-auto">
          <div className="bg-gray-900 text-white rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4">
              Emergency Roadside Service Available
            </h3>
            <p className="text-gray-300 mb-6">
              Broken down on the highway or stuck in a parking lot? We offer emergency mobile repair services throughout Orange County. Call us now for immediate assistance.
            </p>
            <a href="tel:+16577894652">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
                Call (657) 789-4652 for Emergency Service
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
