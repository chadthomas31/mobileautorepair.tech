import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import About from '@/components/About'
import Testimonials from '@/components/Testimonials'
import ServiceAreas from '@/components/ServiceAreas'
import Resources from '@/components/Resources'
import BookingForm from '@/components/BookingForm'
import Footer from '@/components/Footer'
import FloatingContact from '@/components/FloatingContact'
import AnnouncementBar from '@/components/AnnouncementBar'
import { ConvAI } from '@/components/ConvAI'

export default function Home() {
  return (
    <main className="min-h-screen">
      <AnnouncementBar />
      <Header />
      <Hero />
      <Services />
      <About />
      <Testimonials />
      <ServiceAreas />
      <Resources />
      <section id="ai-assistant" className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              24/7 AI Assistant
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get instant answers about our services, pricing, and availability. 
              Our AI-powered voice assistant is available around the clock to help you.
            </p>
          </div>
          <ConvAI />
        </div>
      </section>
      <BookingForm />
      <Footer />
      <FloatingContact />
    </main>
  )
}
