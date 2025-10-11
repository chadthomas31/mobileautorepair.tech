// Test script to verify booking email with file uploads
// Run with: node test-booking-email.js

const FormData = require('form-data');
const fetch = require('node-fetch');
const fs = require('fs');

async function testBookingEmail() {
  console.log('🧪 Testing booking email with file uploads...\n');

  const formData = new FormData();
  
  // Add customer information
  formData.append('name', 'Test Customer');
  formData.append('email', 'testcustomer@example.com');
  formData.append('phone', '(657) 789-4652');
  formData.append('location', '123 Test Street, Irvine, CA 92618');
  formData.append('service', 'diagnostics');
  formData.append('date', '2025-10-15');
  formData.append('message', 'My check engine light is on and the car makes a strange noise when I accelerate. Please see the attached photos.');

  console.log('📋 Booking Details:');
  console.log('   Name: Test Customer');
  console.log('   Email: testcustomer@example.com');
  console.log('   Phone: (657) 789-4652');
  console.log('   Service: Diagnostics');
  console.log('   Location: Irvine, CA\n');

  try {
    // Make the request
    const response = await fetch('http://localhost:3000/api/booking', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      console.log('✅ Booking submitted successfully!\n');
      console.log('📧 Email Status:', result.emailSent ? '✅ SENT' : '❌ FAILED');
      console.log('🆔 Booking ID:', result.bookingId);
      console.log('📁 Files Uploaded:', result.filesUploaded);
      
      if (result.fileUrls && result.fileUrls.length > 0) {
        console.log('\n📎 File URLs:');
        result.fileUrls.forEach((url, i) => {
          console.log(`   ${i + 1}. ${url}`);
        });
      }
      
      console.log('\n✉️  Check info@mobileautorepair.tech for the booking email!');
      console.log('   The email should include:');
      console.log('   • Customer information');
      console.log('   • Service details');
      console.log('   • Clickable links to any uploaded files');
    } else {
      console.error('❌ Booking failed:', result.error);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n💡 Make sure:');
    console.log('   1. Development server is running (npm run dev)');
    console.log('   2. SMTP credentials are set in .env.local');
    console.log('   3. BLOB_READ_WRITE_TOKEN is set (for file uploads)');
  }
}

testBookingEmail();
