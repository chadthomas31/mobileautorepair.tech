# Calendly Integration Setup

Your booking form now includes a Calendly calendar integration option! Here's how to set it up.

## Quick Setup (5 minutes)

### Step 1: Create Free Calendly Account

1. Go to [https://calendly.com/signup](https://calendly.com/signup)
2. Sign up with your email: `info@mobileautorepair.tech`
3. Choose the **Free** plan (perfect for getting started)
4. Complete the onboarding

### Step 2: Create Your Event Type

1. In Calendly dashboard, click **+ New Event Type**
2. Choose **One-on-One**
3. Configure your event:
   - **Event name:** "Mobile Auto Repair Service"
   - **Duration:** 30 minutes (for consultation)
   - **Location:** Ask invitee (they'll provide their address)
   - **Description:** "Schedule your mobile auto repair service. We'll come to your location!"

### Step 3: Set Your Availability

1. Go to **Availability** in the sidebar
2. Set your working hours:
   - Mon-Fri: 7am - 7pm
   - Sat: 8am - 5pm
   - Sun: Off (or emergency only)
3. Set your timezone
4. Save changes

### Step 4: Get Your Calendly Link

1. Go to your event type
2. Click **Copy Link**
3. Your link will look like: `https://calendly.com/your-username/mobile-auto-repair`
4. Note your username (the part after `calendly.com/`)

### Step 5: Update the Website

Edit `/components/CalendlyEmbed.tsx` and replace `YOUR_CALENDLY_USERNAME` with your actual username:

```tsx
data-url="https://calendly.com/YOUR_USERNAME/mobile-auto-repair?hide_gdpr_banner=1&primary_color=2563eb"
```

For example, if your link is `https://calendly.com/mobileautorepair/mobile-auto-repair`:

```tsx
data-url="https://calendly.com/mobileautorepair/mobile-auto-repair?hide_gdpr_banner=1&primary_color=2563eb"
```

### Step 6: Configure Notifications

1. In Calendly, go to **Account** → **Notifications**
2. Enable email notifications for:
   - New event scheduled
   - Event canceled
   - Event rescheduled
3. Notifications will go to `info@mobileautorepair.tech`

## Features Included

### Free Plan Includes:
- ✅ Unlimited event types
- ✅ Calendar connections (Google, Outlook, iCloud)
- ✅ Email notifications
- ✅ Automated reminders
- ✅ Time zone detection
- ✅ Custom branding (basic)

### Booking Options on Your Site:
1. **Quick Form** - Traditional form with photo/video upload
2. **Schedule with Calendar** - Calendly integration for direct booking

## Advanced Configuration (Optional)

### Connect Your Google Calendar

1. Go to **Account** → **Calendar Connection**
2. Click **Connect** next to Google Calendar
3. Authorize Calendly to access your calendar
4. This prevents double-bookings

### Add Custom Questions

1. Edit your event type
2. Scroll to **Invitee Questions**
3. Add custom questions:
   - Vehicle make and model
   - Service needed
   - Description of issue
   - Upload photos (requires paid plan)

### Email Reminders

Calendly automatically sends:
- Confirmation email immediately
- Reminder 24 hours before
- Reminder 1 hour before

### Customize Confirmation Page

1. Edit event type
2. Go to **Confirmation page**
3. Add custom message:
   ```
   Thank you for booking with Mobile Auto Repair!
   
   We'll call you at (657) 789-4652 to confirm details.
   Questions? Email info@mobileautorepair.tech
   ```

## Integration with Your Email System

When someone books via Calendly:
1. **Calendly sends** confirmation to customer
2. **Calendly notifies** you at `info@mobileautorepair.tech`
3. **Your form** (if they use that instead) sends detailed email with photos

Both methods ensure you never miss a booking!

## Upgrade Options (If Needed)

### Essentials Plan ($10/month)
- Remove Calendly branding
- Send SMS reminders
- Collect payments
- More customization

### Professional Plan ($15/month)
- Multiple event types
- Round-robin scheduling (for team)
- Salesforce integration
- Advanced analytics

## Testing

1. Visit your website
2. Go to booking section
3. Click **"Schedule with Calendar"**
4. Try booking an appointment
5. Check your email for confirmation

## Support

- **Calendly Help:** [https://help.calendly.com](https://help.calendly.com)
- **Calendly Community:** [https://community.calendly.com](https://community.calendly.com)

---

**Status:** ✅ Calendly integration ready! Just sign up and add your username to the code.
