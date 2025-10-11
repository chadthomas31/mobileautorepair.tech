import { Wrench, Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Wrench className="h-6 w-6" />
              <span className="text-lg font-bold">Mobile Auto Repair</span>
            </div>
            <p className="text-gray-400 mb-4">
              ASE-certified mobile mechanics serving Orange County. Professional service at your location with transparent pricing and a 90-day warranty.
            </p>
            <div className="space-y-2">
              <a href="tel:+16577894652" className="flex items-center text-gray-400 hover:text-blue-400 transition">
                <Phone className="h-4 w-4 mr-2" />
                (657) 789-4652
              </a>
              <a href="mailto:info@mobileautorepair.tech" className="flex items-center text-gray-400 hover:text-blue-400 transition">
                <Mail className="h-4 w-4 mr-2" />
                info@mobileautorepair.tech
              </a>
              <div className="flex items-start text-gray-400 pt-2">
                <Clock className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                <div className="text-sm">
                  <div>Mon-Fri: 7am - 7pm</div>
                  <div>Sat: 8am - 5pm</div>
                  <div>Sun: Emergency only</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="hover:text-blue-400 transition cursor-pointer">Diagnostics & Repairs</li>
              <li className="hover:text-blue-400 transition cursor-pointer">Oil Changes</li>
              <li className="hover:text-blue-400 transition cursor-pointer">Brake Service</li>
              <li className="hover:text-blue-400 transition cursor-pointer">Battery Replacement</li>
              <li className="hover:text-blue-400 transition cursor-pointer">Electrical Systems</li>
              <li className="hover:text-blue-400 transition cursor-pointer">Scheduled Maintenance</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Service Areas</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-center">
                <MapPin className="h-3 w-3 mr-2 flex-shrink-0" />
                Anaheim
              </li>
              <li className="flex items-center">
                <MapPin className="h-3 w-3 mr-2 flex-shrink-0" />
                Irvine
              </li>
              <li className="flex items-center">
                <MapPin className="h-3 w-3 mr-2 flex-shrink-0" />
                Santa Ana
              </li>
              <li className="flex items-center">
                <MapPin className="h-3 w-3 mr-2 flex-shrink-0" />
                Costa Mesa
              </li>
              <li className="flex items-center">
                <MapPin className="h-3 w-3 mr-2 flex-shrink-0" />
                Fullerton
              </li>
              <li className="text-blue-400 hover:underline cursor-pointer">+ All of Orange County</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="hover:text-blue-400 transition" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Follow us for maintenance tips, special offers, and automotive advice.
            </p>
            <div className="bg-blue-600 text-white text-xs font-semibold px-3 py-2 rounded inline-block">
              ⭐ ASE Certified • 90-Day Warranty
            </div>
          </div>
        </div>

        {/* Pricing Reassurance Banner */}
        <div className="mt-8 mb-8 bg-gradient-to-r from-blue-900 to-blue-800 border border-blue-700 rounded-lg p-6 text-center">
          <p className="text-white text-lg font-bold mb-2">
            💡 Fair & Transparent Pricing Policy
          </p>
          <p className="text-blue-100 text-sm mb-1">
            We diagnose first, then share a RepairPal®-benchmarked estimate. Your $100 diagnostic + service charge is credited when you approve the repair.
          </p>
          <p className="text-blue-200 text-xs italic">
            No surprise bills. No unnecessary parts. Just honest service.
          </p>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p className="mb-2">&copy; {new Date().getFullYear()} Mobile Auto Repair. All rights reserved.</p>
          <p className="text-xs text-gray-500">
            Serving Orange County with professional mobile auto repair services since 2014
          </p>
        </div>
      </div>
    </footer>
  )
}
