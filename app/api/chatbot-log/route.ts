import { NextResponse } from 'next/server'
import { sendChatbotNotification } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const {
      conversationId,
      transcript,
      duration,
      customerInfo
    } = body
    
    // Validate required fields
    if (!conversationId) {
      return NextResponse.json(
        { error: 'Missing conversationId' },
        { status: 400 }
      )
    }

    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
      dateStyle: 'full',
      timeStyle: 'long'
    })

    // Log conversation details
    console.log('Chatbot conversation logged:', {
      conversationId,
      timestamp,
      duration,
      hasTranscript: !!transcript,
      customerInfo
    })
    
    // Send email notification to info@mobileautorepair.tech
    const emailResult = await sendChatbotNotification({
      conversationId,
      timestamp,
      transcript,
      duration,
      customerInfo
    })
    
    if (!emailResult.success) {
      console.error('Failed to send chatbot email notification:', emailResult.error)
    }
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Conversation logged successfully',
        emailSent: emailResult.success
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error logging chatbot conversation:', error)
    return NextResponse.json(
      { error: 'Failed to log conversation' },
      { status: 500 }
    )
  }
}
