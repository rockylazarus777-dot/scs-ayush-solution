"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import EnquiryForm from "./EnquiryForm";
import { COMPANY_INFO } from "@/lib/utils";

export default function ContactSection() {
  return (
    <section id="contact" className="section-py bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 section-mesh pointer-events-none opacity-60" />

      <div className="container-xl relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="section-badge mb-5 inline-flex">📞 Get In Touch</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Start Your{" "}
            <span className="gradient-text">Transformation Today</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Fill out the form and our experts will get back to you within 24 hours
            with a customized solution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start max-w-5xl mx-auto">
          {/* Left — Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-black text-slate-900 mb-2">
              Let&apos;s Talk Healthcare
            </h3>
            <p className="text-slate-500 mb-8 text-sm leading-relaxed">
              Whether you need NABH guidance, licensing support, revenue optimization,
              or any other healthcare service — we&apos;re here to help. Reach out through
              any channel below.
            </p>

            <div className="space-y-4 mb-8">
              {[
                {
                  icon: Phone,
                  label: "Phone / WhatsApp",
                  value: COMPANY_INFO.phone,
                  href: `tel:${COMPANY_INFO.phone}`,
                  color: "blue",
                },
                {
                  icon: Mail,
                  label: "Email Address",
                  value: COMPANY_INFO.email,
                  href: `mailto:${COMPANY_INFO.email}`,
                  color: "cyan",
                },
                {
                  icon: MapPin,
                  label: "Office Location",
                  value: COMPANY_INFO.address,
                  href: "#",
                  color: "violet",
                },
                {
                  icon: MessageCircle,
                  label: "WhatsApp",
                  value: "Chat directly on WhatsApp",
                  href: `https://wa.me/${COMPANY_INFO.whatsapp}`,
                  color: "emerald",
                },
              ].map((item) => {
                const Icon = item.icon;
                const colorClasses: Record<string, string> = {
                  blue: "from-blue-50 to-blue-100 border-blue-100",
                  cyan: "from-cyan-50 to-cyan-100 border-cyan-100",
                  violet: "from-violet-50 to-violet-100 border-violet-100",
                  emerald: "from-emerald-50 to-emerald-100 border-emerald-100",
                };
                const iconClasses: Record<string, string> = {
                  blue: "text-blue-600",
                  cyan: "text-cyan-600",
                  violet: "text-violet-600",
                  emerald: "text-emerald-600",
                };
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("https") ? "_blank" : undefined}
                    rel={item.href.startsWith("https") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br hover:shadow-md transition-all duration-300 border glass-card group"
                  >
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${colorClasses[item.color]} border flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 ${iconClasses[item.color]}`} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{item.label}</p>
                      <p className="text-sm font-bold text-slate-800 group-hover:text-blue-700 transition-colors">{item.value}</p>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Map placeholder */}
            <div className="rounded-3xl overflow-hidden border border-slate-200 h-40 bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-600">Mumbai, Maharashtra</p>
                <p className="text-xs text-slate-400">Serving Pan-India</p>
              </div>
            </div>
          </motion.div>

          {/* Right — Enquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <EnquiryForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
