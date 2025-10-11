'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, MapPin, Phone, Mail, CheckCircle, Camera, X, Video, Bot } from 'lucide-react'
import CalendlyEmbed from '@/components/CalendlyEmbed'

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    service: '',
    date: '',
    message: '',
  })
  const [photos, setPhotos] = useState<File[]>([])
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [bookingMethod, setBookingMethod] = useState<'form' | 'calendly'>('form')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value)
      })
      
      // Add photos to form data
      photos.forEach((photo, index) => {
        formDataToSend.append(`photo_${index}`, photo)
      })

      const response = await fetch('/api/booking', {
        method: 'POST',
        body: formDataToSend,
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          location: '',
          service: '',
          date: '',
          message: '',
        })
        setPhotos([])
        setPhotoPreviews([])
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    
    // Check file size (max 50MB per file)
    const oversizedFiles = files.filter(f => f.size > 50 * 1024 * 1024)
    if (oversizedFiles.length > 0) {
      alert('Some files are too large. Maximum file size is 50MB per file.')
      return
    }
    
    if (files.length + photos.length > 10) {
      alert('Maximum 10 files allowed (photos + videos combined)')
      return
    }

    setPhotos([...photos, ...files])
    
    // Create preview URLs
    files.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreviews(prev => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index))
    setPhotoPreviews(photoPreviews.filter((_, i) => i !== index))
  }

  if (isSubmitted) {
    return (
      <section id="booking" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Received!</h3>
                  <p className="text-gray-600 mb-4">
                    Thank you for choosing Mobile Auto Repair. We'll contact you shortly to confirm your appointment.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 text-left">
                    <p className="text-sm text-blue-900 font-medium mb-2">📋 At your appointment:</p>
                    <p className="text-sm text-blue-800">
                      We confirm the issue, share a RepairPal-based estimate, and apply your $100 diagnostic + service charge as a credit when you approve the repair.
                    </p>
                  </div>
                  <Button onClick={() => setIsSubmitted(false)}>Book Another Service</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="booking" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Book Your Service</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your preferred booking method below
          </p>
          
          {/* AI Assistant CTA */}
          <div className="mt-6 mb-8 max-w-md mx-auto">
            <a href="#ai-assistant">
              <Button 
                variant="outline" 
                size="lg"
                className="w-full bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-300 hover:from-purple-100 hover:to-blue-100 text-purple-900 font-semibold h-auto py-4"
              >
                <Bot className="h-5 w-5 mr-2" />
                <div className="text-left">
                  <div className="font-bold">Ask our AI assistant about pricing/availability</div>
                  <div className="text-xs font-normal opacity-75">Get instant answers 24/7</div>
                </div>
              </Button>
            </a>
          </div>
          
          {/* Booking Method Toggle */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant={bookingMethod === 'form' ? 'default' : 'outline'}
              onClick={() => setBookingMethod('form')}
              size="lg"
            >
              Quick Form
            </Button>
            <Button
              variant={bookingMethod === 'calendly' ? 'default' : 'outline'}
              onClick={() => setBookingMethod('calendly')}
              size="lg"
            >
              Schedule with Calendar
            </Button>
          </div>
        </div>

        {bookingMethod === 'calendly' ? (
          <div className="max-w-4xl mx-auto">
            <CalendlyEmbed />
          </div>
        ) : (
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Schedule an Appointment</CardTitle>
              <CardDescription>We'll come to your preferred location</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(657) 789-4652"
                    defaultValue="(657) 789-4652"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Service Location *
                  </label>
                  <Input
                    id="location"
                    name="location"
                    type="text"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="123 Main St, City, State"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                    Service Needed *
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Select a service</option>
                    <option value="oil-change">Oil Change</option>
                    <option value="battery">Battery Service</option>
                    <option value="brakes">Brake Service</option>
                    <option value="electrical">Electrical Systems</option>
                    <option value="maintenance">General Maintenance</option>
                    <option value="diagnostics">Diagnostics</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Date *
                  </label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Details
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your vehicle and the issue..."
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Camera className="inline h-4 w-4 mr-1" />
                    <Video className="inline h-4 w-4 mr-1" />
                    Upload Photos or Videos (Optional)
                  </label>
                  
                  {/* Helpful Tips Section */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <p className="text-sm font-semibold text-blue-900 mb-2">📸 Help us diagnose faster:</p>
                    <ul className="text-xs text-blue-800 space-y-1 ml-4">
                      <li>• Take clear photos of the problem area</li>
                      <li>• Include dashboard warning lights if any</li>
                      <li>• Show fluid leaks or unusual wear</li>
                      <li>• Record videos of strange noises or behaviors</li>
                      <li>• Capture VIN number if visible</li>
                    </ul>
                    <p className="text-xs text-blue-700 mt-2 italic">
                      Better visuals = More accurate estimates before we arrive!
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    {photoPreviews.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-gray-600">
                          {photos.length} file{photos.length !== 1 ? 's' : ''} uploaded ({10 - photos.length} remaining)
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {photoPreviews.map((preview, index) => (
                            <div key={index} className="relative group">
                              {photos[index]?.type.startsWith('video/') ? (
                                <div className="relative w-full h-28 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg border-2 border-purple-300 flex flex-col items-center justify-center">
                                  <Video className="h-10 w-10 text-purple-600 mb-1" />
                                  <span className="text-xs font-medium text-purple-700">
                                    {photos[index].name.length > 15 
                                      ? photos[index].name.substring(0, 12) + '...' 
                                      : photos[index].name}
                                  </span>
                                  <span className="text-xs text-purple-600 mt-1">
                                    {formatFileSize(photos[index].size)}
                                  </span>
                                </div>
                              ) : (
                                <div className="relative">
                                  <img
                                    src={preview}
                                    alt={`Preview ${index + 1}`}
                                    className="w-full h-28 object-cover rounded-lg border-2 border-gray-300"
                                  />
                                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent rounded-b-lg p-1">
                                    <p className="text-xs text-white truncate">
                                      {photos[index].name.length > 15 
                                        ? photos[index].name.substring(0, 12) + '...' 
                                        : photos[index].name}
                                    </p>
                                    <p className="text-xs text-gray-300">
                                      {formatFileSize(photos[index].size)}
                                    </p>
                                  </div>
                                </div>
                              )}
                              <button
                                type="button"
                                onClick={() => removePhoto(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-lg hover:bg-red-600 transition-colors"
                                title="Remove file"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {photos.length < 10 && (
                      <label className="flex flex-col items-center justify-center w-full min-h-[140px] border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary hover:bg-blue-50 transition-all duration-200 bg-white">
                        <div className="flex flex-col items-center justify-center py-6 px-4">
                          <div className="flex gap-3 mb-3">
                            <div className="bg-blue-100 p-3 rounded-full">
                              <Camera className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="bg-purple-100 p-3 rounded-full">
                              <Video className="h-6 w-6 text-purple-600" />
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 font-semibold mb-1">
                            {photos.length === 0 ? 'Click or tap to upload' : 'Add more files'}
                          </p>
                          <p className="text-xs text-gray-500 text-center">
                            Photos & Videos • Max 50MB each
                          </p>
                          {photos.length > 0 && (
                            <p className="text-xs text-primary font-medium mt-2">
                              {10 - photos.length} slot{10 - photos.length !== 1 ? 's' : ''} remaining
                            </p>
                          )}
                        </div>
                        <input
                          type="file"
                          accept="image/*,video/*"
                          multiple
                          capture="environment"
                          onChange={handlePhotoChange}
                          className="hidden"
                        />
                      </label>
                    )}
                    
                    {photos.length >= 10 && (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">
                        <p className="text-sm text-amber-800 font-medium">
                          ✓ Maximum files reached (10/10)
                        </p>
                        <p className="text-xs text-amber-700 mt-1">
                          Remove a file to add a different one
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                  <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-sm text-blue-900">
                    <p className="font-medium mb-1">Fair Pricing Policy</p>
                    <p>We'll confirm the issue on-site first. $100 diagnostic + service charge credited when you approve the repair.</p>
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Request Appointment'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <a href="tel:+16577894652" className="text-primary hover:underline">(657) 789-4652</a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <a href="mailto:info@mobileautorepair.tech" className="text-primary hover:underline">info@mobileautorepair.tech</a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Service Area</p>
                    <p className="text-gray-600">We serve the entire metro area</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Hours</p>
                    <p className="text-gray-600">Mon-Fri: 7am - 7pm</p>
                    <p className="text-gray-600">Sat: 8am - 5pm</p>
                    <p className="text-gray-600">Sun: Emergency only</p>
                    <a href="tel:+16577894652" className="text-primary hover:underline text-sm mt-2 inline-block">Call (657) 789-4652</a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary text-white">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4">Emergency Service Available</h3>
                <p className="mb-4">
                  Need immediate assistance? We offer 24/7 emergency mobile repair services for urgent situations.
                </p>
                <a href="tel:+16577894652" className="w-full">
                  <Button variant="secondary" size="lg" className="w-full">
                    Call (657) 789-4652
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
        )}
      </div>
    </section>
  )
}
