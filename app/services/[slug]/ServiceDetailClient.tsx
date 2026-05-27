"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Phone } from "lucide-react";
import { SERVICES, COMPANY_INFO } from "@/lib/utils";
import EnquiryForm from "@/components/sections/EnquiryForm";

interface Service {
  id: string;
  title: string;
  slug: string;
  icon: string;
  color: string;
  shortDesc: string;
  description: string;
  features: string[];
}

export default function ServiceDetailClient({ service }: { service: Service }) {
  const related = SERVICES.filter((s) => s.id !== service.id).slice(0, 3);

  const faqs = [
    {
      q: `How long does ${service.title} take?`,
      a: `Timeline varies by hospital size and complexity, but our typical ${service.title.toLowerCase()} engagement ranges from 2–8 weeks. We provide a specific timeline after our initial assessment.`,
    },
    {
      q: `What is the cost of your ${service.title} service?`,
      a: "We offer customized pricing based on your hospital's specific needs, size, and scope. Contact us for a free assessment and transparent quote — no hidden fees.",
    },
    {
      q: "Do you provide on-site support?",
      a: "Yes. Our consultants visit your facility as needed throughout the engagement. For most services, we combine on-site visits with remote support for efficiency.",
    },
    {
      q: "What happens after the project is complete?",
      a: "We provide post-project support for 3 months at no additional cost, plus optional ongoing maintenance packages to ensure sustained results.",
    },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-end bg-gradient-to-br from-[#0a1628] via-[#0f2562] to-[#0891b2] pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="container-xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-3 mb-4">
              <Link href="/services" className="text-blue-300/60 hover:text-blue-200 text-sm transition-colors">Services</Link>
              <span className="text-white/20">/</span>
              <span className="text-blue-200 text-sm">{service.title}</span>
            </div>
            <div className="text-5xl mb-5">{service.icon}</div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-5 leading-tight">
              {service.title}
            </h1>
            <p className="text-xl text-blue-100/70 max-w-2xl leading-relaxed">
              {service.shortDesc}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#enquire" className="btn-primary inline-flex items-center gap-2 text-sm px-7 py-3.5 rounded-2xl text-white">
                Get Free Consultation <ArrowRight className="w-4 h-4" />
              </a>
              <a href={`tel:${COMPANY_INFO.phone}`} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold border border-white/20 text-white/80 hover:bg-white/10 transition-all duration-300 text-sm">
                <Phone className="w-4 h-4" /> Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content + Form */}
      <section className="section-py bg-white">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <span className="section-badge mb-4 inline-flex">Overview</span>
                <h2 className="text-3xl font-black text-slate-900 mb-5">What is {service.title}?</h2>
                <p className="text-lg text-slate-600 leading-relaxed">{service.description}</p>
              </motion.div>

              {/* Features */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <span className="section-badge mb-4 inline-flex">What&apos;s Included</span>
                <h2 className="text-3xl font-black text-slate-900 mb-6">Service Deliverables</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feature) => (
                    <div key={feature} className="glass-card rounded-2xl p-5 flex items-start gap-4">
                      <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">{feature}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* FAQ */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <span className="section-badge mb-4 inline-flex">FAQ</span>
                <h2 className="text-3xl font-black text-slate-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqs.map((faq, i) => (
                    <div key={i} className="glass-card rounded-2xl p-6">
                      <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar — Enquiry Form */}
            <div className="lg:col-span-1">
              <div id="enquire" className="sticky top-28">
                <div className="mb-4">
                  <h3 className="text-xl font-black text-slate-900 mb-1">Get a Free Quote</h3>
                  <p className="text-slate-500 text-sm">Fill in your details and we&apos;ll get back to you within 24 hours.</p>
                </div>
                <EnquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="section-py bg-slate-50">
        <div className="container-xl">
          <h2 className="text-3xl font-black text-slate-900 mb-8">Related Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {related.map((s) => (
              <Link key={s.id} href={`/services/${s.slug}`} className="glass-card rounded-3xl p-6 hover-lift block group">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-700 transition-colors mb-2">{s.title}</h3>
                <p className="text-sm text-slate-500 mb-4">{s.shortDesc}</p>
                <span className="text-xs font-bold text-blue-600 flex items-center gap-1">Learn More <ArrowRight className="w-3 h-3" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
