# 🏥 SCS Ayush Solution — Website

> **Your Trusted Healthcare Service Partner**  
> Ultra-premium futuristic healthcare consultancy platform built with Next.js 15, Supabase, and Gmail SMTP.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment file and fill in values
cp .env.example .env.local

# 3. Set up Supabase database
# Open Supabase SQL Editor → paste contents of lib/supabase-schema.sql → Run

# 4. Start development server
npm run dev

# 5. Open browser
open http://localhost:3000
```

---

## 📁 Project Structure

```
scs-ayush-solution/
├── app/
│   ├── page.tsx                    # Home page
│   ├── layout.tsx                  # Root layout (Navbar, Footer, Analytics)
│   ├── globals.css                 # Global styles & design tokens
│   ├── about/                      # About Us page
│   ├── services/                   # Services listing + [slug] detail pages
│   ├── careers/                    # Careers page with job listings + application form
│   ├── blog/                       # Blog listing + [slug] detail pages
│   ├── contact/                    # Contact page
│   ├── admin/                      # Admin dashboard (password protected)
│   │   ├── page.tsx               # Dashboard with stats
│   │   ├── enquiries/             # Enquiry management + export
│   │   ├── blog/                  # Blog CMS
│   │   ├── careers/               # Job listings manager
│   │   ├── applications/          # Job applications manager
│   │   ├── testimonials/          # Testimonials manager
│   │   └── settings/              # Admin settings
│   └── api/
│       ├── enquiry/route.ts       # Enquiry submission API
│       ├── career/route.ts        # Job application API
│       ├── newsletter/route.ts    # Newsletter subscription API
│       └── sitemap/route.ts       # Dynamic XML sitemap
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx             # Premium animated navbar with mega menu
│   │   └── Footer.tsx             # Full footer with newsletter + WhatsApp CTA
│   ├── sections/
│   │   ├── HeroSection.tsx        # Cinematic hero with video + floating cards
│   │   ├── StatsSection.tsx       # Animated counters + certifications
│   │   ├── ServicesSection.tsx    # Interactive service cards bento grid
│   │   ├── WhyChooseUs.tsx        # Performance metrics + reasons
│   │   ├── ProcessSection.tsx     # 5-step animated timeline
│   │   ├── TestimonialsSection.tsx # Auto-carousel with transition
│   │   ├── BlogPreviewSection.tsx # Latest blog cards
│   │   ├── CareersPreviewSection.tsx # Job preview cards
│   │   ├── ContactSection.tsx     # Contact info + enquiry form
│   │   ├── CTASection.tsx         # Final conversion CTA
│   │   └── EnquiryForm.tsx        # 4-step lead gen form
│   └── common/
│       ├── LenisProvider.tsx      # Smooth scroll
│       └── AnalyticsProvider.tsx  # GA4, Meta Pixel, Clarity
│
├── lib/
│   ├── utils.ts                   # Utilities, SERVICES data, COMPANY_INFO
│   ├── supabase.ts                # Supabase client (browser + server + admin)
│   ├── email.ts                   # Gmail SMTP email functions (Nodemailer)
│   └── supabase-schema.sql        # Full PostgreSQL schema for Supabase
│
└── types/
    └── database.ts                # TypeScript types for all Supabase tables
```

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env.local` and configure:

### Required — Core
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=https://scsayushsolution.com
```

### Required — Gmail SMTP (Email)
```env
GMAIL_USER=your-gmail@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password
ADMIN_EMAIL=admin@scsayushsolution.com
HR_EMAIL=hr@scsayushsolution.com
```

> **How to get Gmail App Password:**
> 1. Go to Google Account → Security
> 2. Enable 2-Step Verification
> 3. Go to App Passwords → Create password for "Mail"
> 4. Copy the 16-character password

### Optional — Analytics
```env
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=your-pixel-id
NEXT_PUBLIC_CLARITY_ID=your-clarity-id
```

### Admin Panel
```env
NEXT_PUBLIC_ADMIN_PASSWORD=SCSAdmin@2024
```

---

## 🗄️ Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor**
3. Paste the contents of `lib/supabase-schema.sql`
4. Click **Run**
5. All tables, RLS policies, and indexes are created automatically

### Tables Created:
| Table | Purpose |
|-------|---------|
| `enquiries` | Lead management from all forms |
| `blog_posts` | CMS for blog content |
| `job_listings` | Open positions management |
| `job_applications` | Career applications |
| `testimonials` | Client testimonials |
| `newsletter_subscribers` | Email list |
| `contact_requests` | Contact form submissions |
| `admin_users` | Admin panel users |

---

## 📧 Email System (Gmail SMTP)

Install Nodemailer:
```bash
npm install nodemailer @types/nodemailer
```

### Email Flows:
| Trigger | Admin Receives | Customer Receives |
|---------|---------------|-------------------|
| New enquiry | 🔔 Lead alert with all details | ✅ Confirmation with next steps |
| Job application | 👤 Application notification | ✅ Application received confirmation |
| Newsletter signup | — | 📬 Welcome email |

---

## 🚀 Deployment to Vercel

### Option 1: Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Option 2: Vercel Dashboard
1. Push code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository
4. Add all environment variables
5. Deploy

### Vercel Settings:
- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

---

## 🔐 Admin Panel

Access at: `https://yourdomain.com/admin`

**Default Password**: `SCSAdmin@2024`  
*(Change via `NEXT_PUBLIC_ADMIN_PASSWORD` env variable)*

### Admin Features:
- 📊 Dashboard with live stats
- 📬 Enquiry management (view, update status, export CSV)
- 📝 Blog CMS (create, edit, publish)
- 💼 Job listings management
- 👥 Applications review
- ⭐ Testimonials management
- ⚙️ Settings

---

## 📦 Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion, GSAP, Lenis |
| Database | Supabase (PostgreSQL) |
| Email | Nodemailer + Gmail SMTP |
| Forms | React Hook Form + Zod |
| Deployment | Vercel |
| UI Components | Radix UI + Shadcn |

---

## 📱 Pages

| Page | Route |
|------|-------|
| Home | `/` |
| About | `/about` |
| Services | `/services` |
| Service Detail | `/services/[slug]` |
| Careers | `/careers` |
| Blog | `/blog` |
| Blog Detail | `/blog/[slug]` |
| Contact | `/contact` |
| Admin Dashboard | `/admin` |
| Admin Enquiries | `/admin/enquiries` |
| Admin Blog | `/admin/blog` |
| Admin Careers | `/admin/careers` |
| Admin Applications | `/admin/applications` |

---

## 🎨 Design System

### Colors
- **Primary**: Royal Blue `#1d4ed8`
- **Dark**: Navy `#0f2562`
- **Accent**: Electric Cyan `#06b6d4`
- **Background**: White + Soft Blue Gradients
- **Pastels**: Blue `#dbeafe`, Purple `#ede9fe`, Teal `#ccfbf1`

### Animations
- **Smooth scroll**: Lenis (1.2s duration)
- **Page animations**: Framer Motion
- **Counters**: Custom GSAP-style counters
- **Hero**: Floating cards, particle system, word cycling

### Components
- Glassmorphism cards
- Gradient buttons with hover effects
- Interactive service bento grid
- Multi-step lead form
- Animated process timeline
- Auto-carousel testimonials

---

## 📈 SEO

- ✅ Dynamic metadata per page
- ✅ OpenGraph + Twitter cards
- ✅ JSON-LD Organization schema
- ✅ Dynamic sitemap.xml
- ✅ robots.txt
- ✅ Semantic HTML structure
- ✅ Image optimization (Next/Image)
- ✅ Core Web Vitals optimized

---

## 🛡️ Security

- ✅ Input validation (Zod)
- ✅ Rate limiting on API routes
- ✅ XSS protection headers
- ✅ Content Security Policy
- ✅ Supabase RLS policies
- ✅ Admin panel password protection
- ✅ Environment variable security

---

## 📞 Support

For questions or customization:
- 📧 **Email**: info@scsayushsolution.com  
- 📱 **Phone**: +91 98765 43210
- 💬 **WhatsApp**: wa.me/919876543210

---

*Built with ❤️ for India's Healthcare Transformation*
