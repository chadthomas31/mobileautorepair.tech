# Quick Start: Mailcow Email Setup

## 🚀 2-Minute Setup

### Step 1: Get Mailcow Password
1. Log into Mailcow admin: `https://mail.mobileautorepair.tech`
2. Go to **Mailboxes**
3. Find `info@mobileautorepair.tech` and copy/note the password

### Step 2: Add to Environment
Add to your `.env.local` file:
```bash
SMTP_HOST=mail.mobileautorepair.tech
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@mobileautorepair.tech
SMTP_PASSWORD=your_actual_password_here
SMTP_FROM=info@mobileautorepair.tech
EMAIL_TO=info@mobileautorepair.tech
```

### Step 3: Deploy
```bash
# Local testing
npm run dev

# Deploy to Vercel (add all SMTP_* variables to environment variables)
vercel --prod
```

## ✅ What's Already Configured

- ✅ Nodemailer package installed
- ✅ Mailcow SMTP integration complete
- ✅ Email templates created (beautiful HTML)
- ✅ Booking form sends emails with photos/videos
- ✅ Chatbot logs conversations via email
- ✅ All emails go to: **info@mobileautorepair.tech**

## 📧 Email Types

### Booking Notifications
**From:** info@mobileautorepair.tech  
**To:** info@mobileautorepair.tech  
**Contains:**
- Customer details (name, email, phone)
- Service type and location
- Preferred date
- Photos/videos links (Vercel Blob storage)

### Chatbot Logs
**From:** info@mobileautorepair.tech  
**To:** info@mobileautorepair.tech  
**Contains:**
- Conversation transcript
- Duration
- Timestamp
- Customer info (if collected)

## 🧪 Test It

1. **Test Booking:** Submit a booking form with a photo
2. **Test Chatbot:** Have a conversation and end it
3. **Check:** info@mobileautorepair.tech inbox

## 📚 Full Documentation

See `EMAIL_SETUP.md` for complete setup guide and troubleshooting.
