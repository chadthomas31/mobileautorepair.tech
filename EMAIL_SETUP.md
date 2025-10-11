# Email Configuration Guide - Mailcow SMTP

This guide will help you set up email notifications using your Mailcow email server on Hetzner.

## Overview

The site is now configured to send emails to **info@mobileautorepair.tech** for:
- 📋 **Booking form submissions** (with customer details, photos, and videos)
- 💬 **Chatbot conversation logs** (with transcripts and duration)

## Setup Steps

### 1. Verify Mailcow is Running

Your Mailcow server should be accessible at:
- **SMTP:** `mail.mobileautorepair.tech:587` (STARTTLS)
- **SMTP SSL:** `mail.mobileautorepair.tech:465` (SSL/TLS)
- **IMAP:** `mail.mobileautorepair.tech:993`

### 2. Get SMTP Credentials

You need the password for `info@mobileautorepair.tech`:

1. Log into your Mailcow admin panel (usually at `https://mail.mobileautorepair.tech`)
2. Go to **Mailboxes**
3. Find `info@mobileautorepair.tech`
4. Note the password (or reset it if needed)

### 3. Configure Environment Variables

Add these to your `.env.local` file:

```bash
# Mailcow SMTP Configuration
SMTP_HOST=mail.mobileautorepair.tech
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@mobileautorepair.tech
SMTP_PASSWORD=your_actual_mailcow_password
SMTP_FROM=info@mobileautorepair.tech
EMAIL_TO=info@mobileautorepair.tech
```

**Port Options:**
- **587** with `SMTP_SECURE=false` - STARTTLS (recommended)
- **465** with `SMTP_SECURE=true` - SSL/TLS

### 4. For Vercel Deployment

Add these environment variables in Vercel:

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add each variable:
   - `SMTP_HOST` = `mail.mobileautorepair.tech`
   - `SMTP_PORT` = `587`
   - `SMTP_SECURE` = `false`
   - `SMTP_USER` = `info@mobileautorepair.tech`
   - `SMTP_PASSWORD` = `[your password]`
   - `SMTP_FROM` = `info@mobileautorepair.tech`
   - `EMAIL_TO` = `info@mobileautorepair.tech`
4. Redeploy your site

## Email Sending Configuration

All emails are sent:
- **FROM:** `info@mobileautorepair.tech`
- **TO:** `info@mobileautorepair.tech`

This means you'll receive all booking and chatbot notifications in the same inbox.

## Testing

### Test Booking Form
1. Go to your website
2. Fill out the booking form
3. Upload a photo or video (optional)
4. Submit the form
5. Check `info@mobileautorepair.tech` inbox

### Test Chatbot
1. Start a conversation with the AI assistant
2. Have a brief conversation
3. End the conversation
4. Check `info@mobileautorepair.tech` inbox for the conversation log

## Email Content

### Booking Emails Include:
- Customer name, email, phone
- Service location and type
- Preferred date
- Additional message
- Links to uploaded photos/videos (stored in Vercel Blob)

### Chatbot Emails Include:
- Conversation ID and timestamp
- Duration of conversation
- Full transcript of the conversation
- Any customer information collected

## Troubleshooting

### Emails Not Sending?

1. **Check SMTP Credentials:**
   - Verify `SMTP_USER` and `SMTP_PASSWORD` are correct
   - Try logging into webmail with same credentials
   
2. **Check Mailcow Server:**
   - Ensure Mailcow is running on Hetzner
   - Check if port 587 is open: `telnet mail.mobileautorepair.tech 587`
   
3. **Check Logs:**
   - Vercel function logs for errors
   - Mailcow logs in admin panel
   - Local console output

4. **Firewall Issues:**
   - Ensure Hetzner firewall allows outbound SMTP (587/465)
   - Vercel needs to connect to your Mailcow server

### Connection Refused?

1. **Check Mailcow Status:**
   ```bash
   # SSH into your Hetzner server
   docker-compose ps
   ```
   
2. **Verify DNS:**
   ```bash
   nslookup mail.mobileautorepair.tech
   ```
   
3. **Test SMTP Connection:**
   ```bash
   openssl s_client -connect mail.mobileautorepair.tech:587 -starttls smtp
   ```

### Emails Going to Spam?

1. Ensure SPF, DKIM, and DMARC records are configured in Mailcow
2. Check your domain's email reputation
3. Verify reverse DNS (PTR record) for your Hetzner server IP

### Authentication Failed?

1. Double-check password in `.env.local`
2. Reset password in Mailcow admin panel
3. Ensure `info@mobileautorepair.tech` mailbox exists and is active

## Security Notes

- ⚠️ Never commit `.env.local` to Git (it's already in `.gitignore`)
- ⚠️ Never share your SMTP password publicly
- ✅ Use environment variables for all sensitive data
- ✅ Use strong passwords for email accounts
- ✅ Enable 2FA on Mailcow admin panel

## Mailcow Best Practices

1. **Keep Mailcow Updated:** Regularly update via `docker-compose pull && docker-compose up -d`
2. **Monitor Logs:** Check for failed login attempts
3. **Backup Configuration:** Backup Mailcow data regularly
4. **Rate Limiting:** Configure rate limits to prevent abuse
5. **SSL/TLS:** Ensure valid SSL certificates (Let's Encrypt)

## Support

- **Mailcow Docs:** [https://docs.mailcow.email](https://docs.mailcow.email)
- **Mailcow Community:** [https://community.mailcow.email](https://community.mailcow.email)
- **Hetzner Support:** For server/network issues
- **Nodemailer Docs:** [https://nodemailer.com](https://nodemailer.com)

---

**Status:** ✅ Email integration is fully configured for Mailcow SMTP! Just add your credentials to `.env.local`
