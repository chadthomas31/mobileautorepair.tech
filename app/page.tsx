import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import About from '@/components/About'
import BookingForm from '@/components/BookingForm'
import Footer from '@/components/Footer'
import { ConvAI } from '@/components/ConvAI'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <About />
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Talk to Our AI Assistant
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get instant answers about our services, pricing, and availability. 
              Our AI-powered voice assistant is here to help 24/7.
            </p>
          </div>
          <ConvAI />
        </div>
      </section>
      <BookingForm />
      <Footer />
    </main>
  )
}
