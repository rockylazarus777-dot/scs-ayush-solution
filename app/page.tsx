import { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ProcessSection from "@/components/sections/ProcessSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import BlogPreviewSection from "@/components/sections/BlogPreviewSection";
import CareersPreviewSection from "@/components/sections/CareersPreviewSection";
import ContactSection from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "SCS Ayush Solution — Your Trusted Healthcare Service Partner",
  description:
    "India's premier healthcare consultancy offering NABH accreditation, hospital licensing, MRD services, IP/OP revenue scanning, insurance & TPA support, recruitment, and medical camps. Serving 20+ hospitals nationwide.",
  keywords: [
    "healthcare consultancy India",
    "NABH consultancy",
    "hospital licensing",
    "healthcare recruitment",
    "hospital operations services",
    "healthcare management consultancy",
    "TPA support",
    "MRD services",
  ],
  openGraph: {
    title: "SCS Ayush Solution — Your Trusted Healthcare Service Partner",
    description:
      "Premium healthcare consultancy for NABH, licensing, revenue optimization & more. Serving 20+ hospitals.",
    url: "https://scsayushsolution.com",
    siteName: "SCS Ayush Solution",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <WhyChooseUs />
      <ProcessSection />
      <TestimonialsSection />
      <BlogPreviewSection />
      <CareersPreviewSection />
      <ContactSection />
      <CTASection />
    </main>
  );
}
