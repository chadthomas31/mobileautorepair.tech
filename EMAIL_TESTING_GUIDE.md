# Email Testing Guide - Booking Form with File Uploads

## ✅ Current Configuration Status

Your booking system is **fully configured** and ready to send emails to `info@mobileautorepair.tech` with all customer information and uploaded files.

### What's Already Set Up

1. **Email Service** ✅
   - SMTP configured to send from: `info@mobileautorepair.tech`
   - Emails sent to: `info@mobileautorepair.tech`
   - Using Mailcow SMTP server

2. **File Upload System** ✅
   - Photos/videos uploaded to Vercel Blob Storage
   - Files stored in organized folders: `bookings/{BOOKING_ID}/`
   - Supports up to 10 files per booking
   - Max 50MB per file
   - Supports both images and videos

3. **Email Content** ✅
   - Customer information (name, email, phone)
   - Service details (type, location, date)
   - Additional message from customer
   - **Clickable links to all uploaded files**
   - Professional HTML formatting
   - Action reminder to contact customer within 2 hours

## How It Works

### When a Customer Submits the Booking Form:

1. **Form Submission** → Customer fills out the form at `/#booking`
2. **File Upload** → Photos/videos are uploaded to Vercel Blob Storage
3. **Email Sent** → Beautiful HTML email sent to `info@mobileautorepair.tech`
4. **Confirmation** → Customer sees success message

### Email Contains:

```
Subject: 🚗 New Booking: [Customer Name] - [Service Type]

Content:
├── Booking ID (e.g., BOOK-1728612345678)
├── Customer Information
│   ├── Name
│   ├── Email (clickable mailto link)
│   └── Phone (clickable tel link)
├── Service Details
│   ├── Service Type
│   ├── Location
│   └── Preferred Date
├── Additional Details (if provided)
└── Uploaded Files (if any)
    ├── 📎 filename1.jpg (Image) → clickable link
    ├── 📎 filename2.mp4 (Video) → clickable link
    └── ...
```

## Testing the System

### Option 1: Test via Website (Recommended)

1. **Start the dev server** (if not already running):
   ```bash
   npm run dev
   ```

2. **Open your browser**:
   ```
   http://localhost:3000
   ```

3. **Scroll to the booking form** (or click "Book Now")

4. **Fill out the form**:
   - Name: Test Customer
   - Email: your-test@email.com
   - Phone: (657) 789-4652
   - Location: 123 Test St, Irvine, CA
   - Service: Select any service
   - Date: Pick a future date
   - Message: "Testing the booking system with file uploads"

5. **Upload test files**:
   - Click the upload area
   - Select 1-2 photos or videos from your device
   - Verify they appear in the preview

6. **Submit the form**

7. **Check the email**:
   - Log into `info@mobileautorepair.tech`
   - Look for email: "🚗 New Booking: Test Customer - [Service]"
   - Verify all information is present
   - **Click the file links** to ensure they work

### Option 2: Test via API (Advanced)

Use the provided test script:

```bash
node test-booking-email.js
```

Or use curl:

```bash
curl -X POST http://localhost:3000/api/booking \
  -F "name=Test Customer" \
  -F "email=test@example.com" \
  -F "phone=(657) 789-4652" \
  -F "location=123 Test St, Irvine, CA" \
  -F "service=diagnostics" \
  -F "date=2025-10-15" \
  -F "message=Test booking"
```

## What to Verify

### ✅ Checklist:

- [ ] Email arrives at `info@mobileautorepair.tech`
- [ ] Subject line includes customer name and service
- [ ] Customer name, email, phone are correct
- [ ] Service details (type, location, date) are accurate
- [ ] Additional message appears (if provided)
- [ ] **Uploaded files section appears** (if files were uploaded)
- [ ] **File links are clickable and work**
- [ ] **Images open in browser**
- [ ] **Videos play correctly**
- [ ] Email formatting looks professional
- [ ] Action reminder is visible

## Troubleshooting

### Email Not Arriving

1. **Check SMTP credentials**:
   ```bash
   # Verify .env.local has correct values
   cat .env.local | grep SMTP
   ```

2. **Check server logs**:
   - Look at terminal where `npm run dev` is running
   - Look for "Error sending booking email" messages

3. **Check spam folder**:
   - Sometimes emails go to spam on first send

### Files Not Uploading

1. **Check Vercel Blob token**:
   ```bash
   # Verify token is set
   grep BLOB_READ_WRITE_TOKEN .env.local
   ```

2. **Check file size**:
   - Max 50MB per file
   - Max 10 files total

3. **Check browser console**:
   - Open DevTools (F12)
   - Look for upload errors

### Files Upload But Links Don't Work

1. **Check Vercel Blob access**:
   - Files should be set to `public` access
   - Verify in Vercel dashboard

2. **Check URL format**:
   - URLs should start with `https://`
   - Should be publicly accessible

## File Storage Details

### Where Files Are Stored:

- **Service**: Vercel Blob Storage
- **Path**: `bookings/{BOOKING_ID}/{timestamp}_{filename}`
- **Access**: Public (anyone with link can view)
- **Retention**: Permanent (until manually deleted)

### Example File Structure:

```
bookings/
└── BOOK-1728612345678/
    ├── 1728612345679_engine_photo.jpg
    ├── 1728612345680_dashboard_warning.jpg
    └── 1728612345681_strange_noise.mp4
```

## Email Code Reference

### Booking API Route:
`app/api/booking/route.ts`
- Lines 26-54: File upload logic
- Lines 70-81: Email sending

### Email Template:
`lib/email.ts`
- Lines 38-52: File links section
- Lines 127-132: Email sending configuration

## Production Deployment

When you deploy to production (Vercel):

1. **Set environment variables** in Vercel dashboard:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_USER`
   - `SMTP_PASSWORD`
   - `SMTP_FROM`
   - `EMAIL_TO`
   - `BLOB_READ_WRITE_TOKEN`

2. **Test the production form** after deployment

3. **Monitor email delivery** for first few bookings

## Additional Features

### Chatbot Emails

The system also sends emails when customers use the AI chatbot:
- Sent to: `info@mobileautorepair.tech`
- Subject: "💬 Chatbot Conversation: [ID]"
- Contains: Conversation transcript and duration
- API: `app/api/chatbot-log/route.ts`

### Future Enhancements

Consider adding:
- [ ] Customer confirmation email (auto-reply)
- [ ] SMS notifications via Twilio
- [ ] Calendar integration (Google Calendar)
- [ ] Automated follow-up emails
- [ ] File compression for large uploads

## Support

If you encounter issues:

1. Check the logs in terminal
2. Verify all environment variables are set
3. Test with a simple booking (no files) first
4. Then test with files
5. Check email spam folder

## Summary

✅ **Your system is ready!** All customer bookings with uploaded photos/videos will be sent to `info@mobileautorepair.tech` with clickable links to view the files.

Just test it once to verify everything works as expected.
