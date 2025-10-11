import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin, Clock } from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <Image 
                src="/logo.png" 
                alt="Mobile Auto Repair Tech Logo" 
                width={200} 
                height={67}
                className="h-12 md:h-16 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              ASE-certified mobile mechanics serving Orange County. Professional service at your location with transparent pricing and a 90-day warranty.
            </p>
            <div className="space-y-3">
              <a href="tel:+16577894652" className="flex items-center text-gray-400 hover:text-blue-400 transition">
                <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="text-sm">(657) 789-4652</span>
              </a>
              <a href="mailto:info@mobileautorepair.tech" className="flex items-center text-gray-400 hover:text-blue-400 transition">
                <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="text-sm">info@mobileautorepair.tech</span>
              </a>
              <div className="flex items-start text-gray-400 pt-2">
                <Clock className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                <div className="text-sm leading-tight">
                  <div>Mon-Fri: 7am - 7pm</div>
                  <div>Sat: 8am - 5pm</div>
                  <div>Sun: Emergency only</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-base">Services</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="hover:text-blue-400 transition cursor-pointer py-1">Diagnostics & Repairs</li>
              <li className="hover:text-blue-400 transition cursor-pointer py-1">Oil Changes</li>
              <li className="hover:text-blue-400 transition cursor-pointer py-1">Brake Service</li>
              <li className="hover:text-blue-400 transition cursor-pointer py-1">Battery Replacement</li>
              <li className="hover:text-blue-400 transition cursor-pointer py-1">Electrical Systems</li>
              <li className="hover:text-blue-400 transition cursor-pointer py-1">Scheduled Maintenance</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-base">Service Areas</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-center py-1">
                <MapPin className="h-3 w-3 mr-2 flex-shrink-0" />
                Anaheim
              </li>
              <li className="flex items-center py-1">
                <MapPin className="h-3 w-3 mr-2 flex-shrink-0" />
                Irvine
              </li>
              <li className="flex items-center py-1">
                <MapPin className="h-3 w-3 mr-2 flex-shrink-0" />
                Santa Ana
              </li>
              <li className="flex items-center py-1">
                <MapPin className="h-3 w-3 mr-2 flex-shrink-0" />
                Costa Mesa
              </li>
              <li className="flex items-center py-1">
                <MapPin className="h-3 w-3 mr-2 flex-shrink-0" />
                Fullerton
              </li>
              <li className="text-blue-400 hover:underline cursor-pointer py-1">+ All of Orange County</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-base">Connect With Us</h3>
            <div className="flex space-x-3 mb-4">
              <a href="#" className="hover:text-blue-400 transition p-1" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition p-1" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition p-1" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition p-1" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              Follow us for maintenance tips, special offers, and automotive advice.
            </p>
            <div className="bg-blue-600 text-white text-xs font-semibold px-3 py-2 rounded text-center">
              ⭐ ASE Certified • 90-Day Warranty
            </div>
          </div>
        </div>

        {/* Pricing Reassurance Banner */}
        <div className="mt-8 mb-6 bg-gradient-to-r from-blue-900 to-blue-800 border border-blue-700 rounded-lg p-4 md:p-6 text-center">
          <p className="text-white text-base md:text-lg font-bold mb-2">
            💡 Fair & Transparent Pricing Policy
          </p>
          <p className="text-blue-100 text-sm mb-1">
            We diagnose first, then share a RepairPal®-benchmarked estimate. Your $100 diagnostic + service charge is credited when you approve the repair.
          </p>
          <p className="text-blue-200 text-xs italic">
            No surprise bills. No unnecessary parts. Just honest service.
          </p>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-gray-400">
          <p className="mb-2 text-sm">&copy; {new Date().getFullYear()} Mobile Auto Repair Tech. All rights reserved.</p>
          <p className="text-xs text-gray-500">
            Serving Orange County with professional mobile auto repair services since 2014
          </p>
        </div>
      </div>
    </footer>
  )
}
