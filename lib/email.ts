import nodemailer from 'nodemailer'

// Create transporter for Mailcow SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'mail.mobileautorepair.tech',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export interface BookingEmailData {
  bookingId: string
  name: string
  email: string
  phone: string
  location: string
  service: string
  date: string
  message?: string
  uploadedFiles?: { url: string; filename: string; type: string }[]
}

export interface ChatbotEmailData {
  conversationId: string
  timestamp: string
  transcript?: string
  duration?: string
  customerInfo?: {
    name?: string
    phone?: string
    email?: string
  }
}

export async function sendBookingNotification(data: BookingEmailData) {
  const filesSection = data.uploadedFiles && data.uploadedFiles.length > 0
    ? `
    <h3 style="color: #1f2937; margin-top: 20px;">Uploaded Files (${data.uploadedFiles.length})</h3>
    <ul style="list-style: none; padding: 0;">
      ${data.uploadedFiles.map(file => `
        <li style="margin: 10px 0;">
          <a href="${file.url}" style="color: #2563eb; text-decoration: none;">
            📎 ${file.filename} ${file.type.startsWith('video/') ? '(Video)' : '(Image)'}
          </a>
        </li>
      `).join('')}
    </ul>
    `
    : ''

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0;">🚗 New Booking Request</h1>
        </div>
        
        <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="font-size: 16px; color: #4b5563; margin-bottom: 20px;">
            <strong>Booking ID:</strong> ${data.bookingId}
          </p>
          
          <h2 style="color: #1f2937; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">Customer Information</h2>
          <table style="width: 100%; margin: 20px 0;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280;"><strong>Name:</strong></td>
              <td style="padding: 8px 0;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;"><strong>Email:</strong></td>
              <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #2563eb;">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;"><strong>Phone:</strong></td>
              <td style="padding: 8px 0;"><a href="tel:${data.phone}" style="color: #2563eb;">${data.phone}</a></td>
            </tr>
          </table>
          
          <h2 style="color: #1f2937; border-bottom: 2px solid #2563eb; padding-bottom: 10px; margin-top: 30px;">Service Details</h2>
          <table style="width: 100%; margin: 20px 0;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280;"><strong>Service:</strong></td>
              <td style="padding: 8px 0;">${data.service}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;"><strong>Location:</strong></td>
              <td style="padding: 8px 0;">${data.location}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;"><strong>Preferred Date:</strong></td>
              <td style="padding: 8px 0;">${data.date}</td>
            </tr>
          </table>
          
          ${data.message ? `
            <h3 style="color: #1f2937; margin-top: 20px;">Additional Details</h3>
            <p style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #2563eb;">
              ${data.message}
            </p>
          ` : ''}
          
          ${filesSection}
          
          <div style="margin-top: 30px; padding: 20px; background: #dbeafe; border-radius: 5px; text-align: center;">
            <p style="margin: 0; color: #1e40af;">
              <strong>⏰ Action Required:</strong> Contact customer within 2 hours to confirm appointment
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
          <p>Mobile Auto Repair Tech - Professional Service at Your Location</p>
        </div>
      </body>
    </html>
  `

  try {
    const result = await transporter.sendMail({
      from: `"Mobile Auto Repair Tech" <${process.env.SMTP_FROM || 'bookings@mobileautorepair.tech'}>`,
      to: process.env.EMAIL_TO || 'info@mobileautorepair.tech',
      subject: `🚗 New Booking: ${data.name} - ${data.service}`,
      html: htmlContent,
    })

    return { success: true, data: result }
  } catch (error) {
    console.error('Error sending booking email:', error)
    return { success: false, error }
  }
}

export async function sendChatbotNotification(data: ChatbotEmailData) {
  const customerInfoSection = data.customerInfo && (data.customerInfo.name || data.customerInfo.phone || data.customerInfo.email)
    ? `
    <h2 style="color: #1f2937; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">Customer Information</h2>
    <table style="width: 100%; margin: 20px 0;">
      ${data.customerInfo.name ? `
        <tr>
          <td style="padding: 8px 0; color: #6b7280;"><strong>Name:</strong></td>
          <td style="padding: 8px 0;">${data.customerInfo.name}</td>
        </tr>
      ` : ''}
      ${data.customerInfo.email ? `
        <tr>
          <td style="padding: 8px 0; color: #6b7280;"><strong>Email:</strong></td>
          <td style="padding: 8px 0;"><a href="mailto:${data.customerInfo.email}" style="color: #2563eb;">${data.customerInfo.email}</a></td>
        </tr>
      ` : ''}
      ${data.customerInfo.phone ? `
        <tr>
          <td style="padding: 8px 0; color: #6b7280;"><strong>Phone:</strong></td>
          <td style="padding: 8px 0;"><a href="tel:${data.customerInfo.phone}" style="color: #2563eb;">${data.customerInfo.phone}</a></td>
        </tr>
      ` : ''}
    </table>
    `
    : ''

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0;">💬 Chatbot Conversation Log</h1>
        </div>
        
        <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="font-size: 16px; color: #4b5563; margin-bottom: 20px;">
            <strong>Conversation ID:</strong> ${data.conversationId}
          </p>
          
          <table style="width: 100%; margin: 20px 0;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280;"><strong>Timestamp:</strong></td>
              <td style="padding: 8px 0;">${data.timestamp}</td>
            </tr>
            ${data.duration ? `
              <tr>
                <td style="padding: 8px 0; color: #6b7280;"><strong>Duration:</strong></td>
                <td style="padding: 8px 0;">${data.duration}</td>
              </tr>
            ` : ''}
          </table>
          
          ${customerInfoSection}
          
          ${data.transcript ? `
            <h2 style="color: #1f2937; border-bottom: 2px solid #7c3aed; padding-bottom: 10px; margin-top: 30px;">Conversation Transcript</h2>
            <div style="background: white; padding: 20px; border-radius: 5px; border-left: 4px solid #7c3aed; white-space: pre-wrap; font-family: monospace; font-size: 14px; max-height: 400px; overflow-y: auto;">
${data.transcript}
            </div>
          ` : ''}
          
          <div style="margin-top: 30px; padding: 20px; background: #ede9fe; border-radius: 5px; text-align: center;">
            <p style="margin: 0; color: #5b21b6;">
              <strong>ℹ️ Note:</strong> Review this conversation for follow-up opportunities
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
          <p>Mobile Auto Repair Tech - AI Assistant Conversation Log</p>
        </div>
      </body>
    </html>
  `

  try {
    const result = await transporter.sendMail({
      from: `"Mobile Auto Repair Tech AI" <${process.env.SMTP_FROM || 'chatbot@mobileautorepair.tech'}>`,
      to: process.env.EMAIL_TO || 'info@mobileautorepair.tech',
      subject: `💬 Chatbot Conversation: ${data.conversationId}`,
      html: htmlContent,
    })

    return { success: true, data: result }
  } catch (error) {
    console.error('Error sending chatbot email:', error)
    return { success: false, error }
  }
}
