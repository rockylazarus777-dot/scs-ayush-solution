"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import EnquiryForm from "@/components/sections/EnquiryForm";
import { COMPANY_INFO } from "@/lib/utils";

export default function ContactPageClient() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#0a1628] to-[#1d4ed8] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="container-xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-blue-200 border border-white/15 text-sm font-semibold mb-6">
              📞 Contact Us
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-5">
              Let&apos;s Talk<br />
              <span className="gradient-text-hero">Healthcare</span>
            </h1>
            <p className="text-xl text-blue-100/70 max-w-xl mx-auto">
              Our healthcare experts are ready to help. Get a free consultation today.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="section-py bg-white">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left — Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-3">Get In Touch</h2>
                <p className="text-slate-500 leading-relaxed">
                  Whether you&apos;re a hospital administrator, doctor, or healthcare entrepreneur —
                  our team is here to help. Reach out through any channel.
                </p>
              </div>

              {/* Contact items */}
              <div className="space-y-4">
                {[
                  { icon: Phone, label: "Phone & WhatsApp", value: COMPANY_INFO.phone, href: `tel:${COMPANY_INFO.phone}` },
                  { icon: Mail, label: "Email", value: COMPANY_INFO.email, href: `mailto:${COMPANY_INFO.email}` },
                  { icon: MapPin, label: "Headquarters", value: COMPANY_INFO.address, href: "#" },
                  { icon: Clock, label: "Working Hours", value: "Mon–Sat: 9 AM – 7 PM IST", href: "#" },
                  {
                    icon: MessageCircle,
                    label: "WhatsApp",
                    value: "Chat directly — fastest response",
                    href: `https://wa.me/${COMPANY_INFO.whatsapp}`,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith("https") ? "_blank" : undefined}
                      rel={item.href.startsWith("https") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-4 p-4 glass-card rounded-2xl hover:shadow-glow-sm transition-all duration-300 group"
                    >
                      <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-medium mb-0.5">{item.label}</p>
                        <p className="text-sm font-bold text-slate-800 group-hover:text-blue-700 transition-colors">{item.value}</p>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Office cities */}
              <div className="glass-card rounded-2xl p-5">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Pan-India Offices</p>
                <div className="flex flex-wrap gap-2">
                  {["Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata"].map((city) => (
                    <span key={city} className="text-xs px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-100">
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div className="lg:col-span-3">
              <div className="mb-5">
                <h2 className="text-3xl font-black text-slate-900 mb-2">Send an Enquiry</h2>
                <p className="text-slate-500 text-sm">
                  Fill in the 4-step form below. We respond within 24 business hours.
                </p>
              </div>
              <EnquiryForm className="shadow-card-float" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
