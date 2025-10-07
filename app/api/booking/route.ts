import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    
    // Extract form fields
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const location = formData.get('location') as string
    const service = formData.get('service') as string
    const date = formData.get('date') as string
    const message = formData.get('message') as string
    
    // Validate required fields
    if (!name || !email || !phone || !location || !service || !date) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Extract and upload photos/videos to Vercel Blob
    const uploadedFiles: { url: string; filename: string; type: string }[] = []
    const bookingId = `BOOK-${Date.now()}`
    
    for (let i = 0; i < 10; i++) {
      const file = formData.get(`photo_${i}`)
      if (file instanceof File && file.size > 0) {
        try {
          // Create a unique filename with booking ID
          const timestamp = Date.now()
          const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
          const filename = `bookings/${bookingId}/${timestamp}_${sanitizedName}`
          
          // Upload to Vercel Blob
          const blob = await put(filename, file, {
            access: 'public',
            token: process.env.BLOB_READ_WRITE_TOKEN,
          })
          
          uploadedFiles.push({
            url: blob.url,
            filename: file.name,
            type: file.type
          })
        } catch (uploadError) {
          console.error(`Error uploading file ${file.name}:`, uploadError)
        }
      }
    }

    // Log booking details
    console.log('New booking received:', {
      bookingId,
      name,
      email,
      phone,
      location,
      service,
      date,
      message,
      filesUploaded: uploadedFiles.length,
      fileUrls: uploadedFiles.map(f => f.url)
    })
    
    // Here you would typically:
    // 1. Save booking data and file URLs to a database
    // 2. Send confirmation email to customer with file links
    // 3. Send notification to your team with booking details
    // 4. Integrate with calendar/scheduling system
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Booking received successfully',
        bookingId,
        filesUploaded: uploadedFiles.length,
        fileUrls: uploadedFiles.map(f => f.url)
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing booking:', error)
    return NextResponse.json(
      { error: 'Failed to process booking' },
      { status: 500 }
    )
  }
}
