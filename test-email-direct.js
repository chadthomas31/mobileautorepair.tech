// Direct email test - bypasses the API
require('dotenv').config({ path: '.env.local' });

async function testEmail() {
  console.log('🧪 Testing email configuration...\n');
  
  // Check environment variables
  console.log('📧 Email Configuration:');
  console.log('   SMTP_HOST:', process.env.SMTP_HOST || '❌ NOT SET');
  console.log('   SMTP_PORT:', process.env.SMTP_PORT || '❌ NOT SET');
  console.log('   SMTP_USER:', process.env.SMTP_USER || '❌ NOT SET');
  console.log('   SMTP_PASSWORD:', process.env.SMTP_PASSWORD ? '✅ SET' : '❌ NOT SET');
  console.log('   SMTP_FROM:', process.env.SMTP_FROM || '❌ NOT SET');
  console.log('   EMAIL_TO:', process.env.EMAIL_TO || '❌ NOT SET');
  console.log('   BLOB_READ_WRITE_TOKEN:', process.env.BLOB_READ_WRITE_TOKEN ? '✅ SET' : '❌ NOT SET');
  console.log('');

  // Try to send a test email
  const nodemailer = require('nodemailer');
  
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  console.log('📤 Attempting to send test email...\n');

  try {
    const result = await transporter.sendMail({
      from: `"Mobile Auto Repair Test" <${process.env.SMTP_FROM}>`,
      to: process.env.EMAIL_TO,
      subject: '🧪 Test Email - Booking System',
      html: `
        <h1>Test Email</h1>
        <p>This is a test email from your booking system.</p>
        <p>If you receive this, your email configuration is working correctly!</p>
        <hr>
        <p><small>Sent at: ${new Date().toISOString()}</small></p>
      `,
    });

    console.log('✅ Email sent successfully!');
    console.log('   Message ID:', result.messageId);
    console.log('   Response:', result.response);
    console.log('\n📬 Check', process.env.EMAIL_TO, 'for the test email!');
  } catch (error) {
    console.error('❌ Failed to send email:');
    console.error('   Error:', error.message);
    
    if (error.code === 'EAUTH') {
      console.log('\n💡 Authentication failed. Check:');
      console.log('   - SMTP_USER is correct');
      console.log('   - SMTP_PASSWORD is correct');
    } else if (error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
      console.log('\n💡 Connection failed. Check:');
      console.log('   - SMTP_HOST is correct');
      console.log('   - SMTP_PORT is correct');
      console.log('   - Server firewall allows SMTP');
    }
  }
}

testEmail();
