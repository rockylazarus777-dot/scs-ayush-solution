import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";
import LenisProvider from "@/components/common/LenisProvider";
import AnalyticsProvider from "@/components/common/AnalyticsProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://scsayushsolution.com"),
  title: {
    default: "SCS Ayush Solution — Your Trusted Healthcare Service Partner",
    template: "%s | SCS Ayush Solution",
  },
  description:
    "India's premier healthcare consultancy — NABH accreditation, hospital licensing, MRD services, revenue optimization, insurance & TPA support. Serving 20+ hospitals.",
  keywords: [
    "healthcare consultancy",
    "NABH consultancy India",
    "hospital licensing",
    "healthcare management",
    "medical recruitment",
    "TPA support",
    "hospital operations",
    "SCS Ayush Solution",
  ],
  authors: [{ name: "SCS Ayush Solution" }],
  creator: "SCS Ayush Solution",
  publisher: "SCS Ayush Solution",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://scsayushsolution.com",
    siteName: "SCS Ayush Solution",
    title: "SCS Ayush Solution — Your Trusted Healthcare Service Partner",
    description:
      "Premium healthcare consultancy for NABH, licensing, revenue optimization & more. Serving 20+ hospitals across India.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SCS Ayush Solution",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SCS Ayush Solution — Your Trusted Healthcare Service Partner",
    description:
      "India's premier healthcare consultancy — NABH, licensing, revenue optimization.",
    images: ["/images/og-image.jpg"],
    creator: "@scsayushsolution",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || "",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* JSON-LD Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "SCS Ayush Solution",
              url: "https://scsayushsolution.com",
              logo: "https://scsayushsolution.com/images/logo.png",
              description:
                "India's premier healthcare consultancy offering NABH accreditation, hospital licensing, revenue optimization, and more.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Mumbai",
                addressRegion: "Maharashtra",
                addressCountry: "IN",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-98765-43210",
                contactType: "customer service",
                availableLanguage: ["English", "Hindi"],
              },
              sameAs: [
                "https://linkedin.com/company/scs-ayush-solution",
                "https://twitter.com/scsayushsolution",
                "https://facebook.com/scsayushsolution",
              ],
            }),
          }}
        />
        {/* Google Tag Manager */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');`,
            }}
          />
        )}
      </head>
      <body className={`${inter.variable} ${plusJakarta.variable} font-sans antialiased`}>
        {/* GTM noscript */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <LenisProvider>
          <Suspense fallback={null}>
            <AnalyticsProvider>
              <Navbar />
              <div className="pt-0">{children}</div>
              <Footer />
            </AnalyticsProvider>
          </Suspense>
        </LenisProvider>
        <Toaster
          position="top-right"
          richColors
          toastOptions={{
            style: {
              borderRadius: "14px",
              fontFamily: "var(--font-inter)",
            },
          }}
        />
      </body>
    </html>
  );
}
