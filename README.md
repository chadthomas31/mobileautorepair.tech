# Mobile Auto Repair Website

A modern, professional website for mobile auto repair services built with Next.js, React, TypeScript, and TailwindCSS.

## Features

- 🎨 Modern, responsive design with TailwindCSS
- ⚡ Fast performance with Next.js 14
- 📱 Mobile-first approach
- 🎯 SEO optimized
- 📝 Booking form with API integration
- 🎭 Beautiful UI components with shadcn/ui
- 🔧 TypeScript for type safety

## Tech Stack

- **Framework:** Next.js 14 (React 18)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **UI Components:** Radix UI + shadcn/ui
- **Icons:** Lucide React
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. For production deployment:
```bash
vercel --prod
```

### Option 2: Deploy via GitHub + Vercel Dashboard

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/mobileautorepair.tech.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure your domain (mobileautorepair.tech)
6. Click "Deploy"

### Custom Domain Setup

1. In Vercel Dashboard, go to your project settings
2. Navigate to "Domains"
3. Add your domain: `mobileautorepair.tech`
4. Follow the DNS configuration instructions
5. Add these DNS records to your domain registrar:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## Project Structure

```
├── app/
│   ├── api/
│   │   └── booking/
│   │       └── route.ts          # API endpoint for bookings
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/
│   ├── ui/                       # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── textarea.tsx
│   ├── About.tsx                 # About section
│   ├── BookingForm.tsx           # Booking form component
│   ├── Footer.tsx                # Footer component
│   ├── Header.tsx                # Header/navigation
│   ├── Hero.tsx                  # Hero section
│   └── Services.tsx              # Services section
├── lib/
│   └── utils.ts                  # Utility functions
├── public/                       # Static assets
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies
```

## Customization

### Update Contact Information

Edit the contact details in:
- `components/BookingForm.tsx` - Contact information card
- `components/Footer.tsx` - Footer contact details

### Modify Services

Edit the services array in `components/Services.tsx`

### Change Colors/Theme

Update the color scheme in:
- `app/globals.css` - CSS variables
- `tailwind.config.ts` - Tailwind theme

### Add Email Notifications

To add email notifications for bookings, integrate with:
- **SendGrid:** [sendgrid.com](https://sendgrid.com)
- **Resend:** [resend.com](https://resend.com)
- **Mailgun:** [mailgun.com](https://mailgun.com)

Example integration in `app/api/booking/route.ts`

### Add Database

To persist bookings, integrate with:
- **Vercel Postgres:** Built-in PostgreSQL
- **MongoDB Atlas:** NoSQL database
- **Supabase:** PostgreSQL with real-time features
- **PlanetScale:** MySQL database

## Environment Variables

Create a `.env.local` file for sensitive data:

```env
# Email Service
SENDGRID_API_KEY=your_key_here

# Database
DATABASE_URL=your_database_url

# Other services
GOOGLE_MAPS_API_KEY=your_key_here
```

## Performance Optimization

- Images are optimized with Next.js Image component
- Code splitting and lazy loading enabled
- CSS is purged in production
- Static generation where possible

## SEO

The site includes:
- Semantic HTML
- Meta tags for social sharing
- Structured data for search engines
- Sitemap generation
- robots.txt

## Support

For issues or questions, please open an issue on GitHub or contact support.

## License

MIT License - feel free to use this for your business!
