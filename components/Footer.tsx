import { Wrench, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

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
            <p className="text-gray-400">
              Professional mobile auto repair services at your convenience. Quality work, honest pricing.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Oil Changes</li>
              <li>Brake Service</li>
              <li>Battery Replacement</li>
              <li>Electrical Systems</li>
              <li>General Maintenance</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li>About Us</li>
              <li>Our Team</li>
              <li>Careers</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="hover:text-primary transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              Follow us for tips, updates, and special offers.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Mobile Auto Repair. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
