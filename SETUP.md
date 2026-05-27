# 🚀 Quick Setup Guide — SCS Ayush Solution

## Step 1: Install Dependencies

```bash
npm install
```

**Additional packages needed for email (Nodemailer):**
```bash
npm install nodemailer @types/nodemailer
```

---

## Step 2: Configure Environment Variables

```bash
cp .env.example .env.local
```

Fill in `.env.local` with your actual values:

### Minimum Required Variables:
```env
# Supabase (create free project at supabase.com)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...

# Gmail SMTP (enable 2FA → create App Password)
GMAIL_USER=yourgmail@gmail.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop

# Admin & notifications
ADMIN_EMAIL=admin@scsayushsolution.com
HR_EMAIL=hr@scsayushsolution.com

# Your website URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Step 3: Set Up Supabase Database

1. Go to [supabase.com](https://supabase.com) → Create project
2. Open **SQL Editor** (left sidebar)
3. Copy-paste ALL contents of `lib/supabase-schema.sql`
4. Click **Run** (green button)
5. All 8 tables, policies & indexes created ✅

---

## Step 4: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## Step 5: Access Admin Panel

Go to: [http://localhost:3000/admin](http://localhost:3000/admin)

**Default password:** `SCSAdmin@2024`

To change the password, set in `.env.local`:
```env
NEXT_PUBLIC_ADMIN_PASSWORD=YourNewPassword@123
```

---

## Step 6: Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

When prompted, add all environment variables from `.env.local`.

**Or deploy via GitHub:**
1. Push to GitHub
2. Connect repo at [vercel.com/new](https://vercel.com/new)
3. Add env variables in Vercel dashboard
4. Auto-deploy on every push 🚀

---

## Gmail SMTP Setup (Important!)

**Do NOT use your regular Gmail password.** Use an App Password:

1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Security → 2-Step Verification → **Enable it**
3. Search "App passwords" in Google Account search
4. Create → Select "Mail" → Any device → Generate
5. Copy the **16-character password**
6. Use this as `GMAIL_APP_PASSWORD` in `.env.local`

---

## Troubleshooting

| Issue | Solution |
|-------|---------|
| Email not sending | Check Gmail App Password, enable 2FA first |
| Supabase errors | Verify URL & keys in `.env.local` |
| Admin login fails | Check `NEXT_PUBLIC_ADMIN_PASSWORD` in `.env.local` |
| Build errors | Run `npm install` first |
| Port 3000 in use | Run `npm run dev -- --port 3001` |

---

## File Structure Quick Reference

```
Key files to customize:
├── lib/utils.ts          → Update COMPANY_INFO (phone, email, address)
├── .env.local           → All secrets & API keys
├── tailwind.config.ts   → Colors & design tokens
└── app/layout.tsx       → Site metadata & GTM
```

---

*For issues or customization, contact the development team.*
