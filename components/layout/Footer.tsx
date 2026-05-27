"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { COMPANY_INFO, SERVICES } from "@/lib/utils";
import {
  Phone, Mail, MapPin, Linkedin, Facebook,
  Instagram, Twitter, ArrowRight, Heart, ExternalLink
} from "lucide-react";

const footerServices = SERVICES.slice(0, 6);

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "All Services", href: "/services" },
  { label: "Careers", href: "/careers" },
  { label: "Blog & Insights", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
];

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-slate-900 to-[#050d1f] text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute -top-20 right-0 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-[600px] h-40 bg-blue-900/20 rounded-full blur-3xl -translate-x-1/2" />
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }}
        />
      </div>

      <div className="relative container-xl pt-20 pb-0">
        {/* Top CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-dark rounded-3xl p-8 md:p-12 mb-16 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-3xl" />
          <div className="relative">
            <div className="section-badge mb-4 text-blue-300 bg-blue-500/10 border-blue-500/20 mx-auto w-fit">
              🚀 Ready to Transform Your Hospital?
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Let&apos;s Build Something{" "}
              <span className="gradient-text-hero">Extraordinary</span>
            </h2>
            <p className="text-blue-200/70 max-w-xl mx-auto mb-8 text-base">
              Join 20+ hospitals that trust SCS Ayush Solution for their operations, compliance, and growth.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="btn-primary text-sm px-8 py-3.5 text-white rounded-xl inline-flex items-center gap-2"
              >
                Get Free Consultation <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366]/30 transition-all duration-300"
              >
                💬 Chat on WhatsApp
              </a>
            </div>
          </div>
        </motion.div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-sm">SCS</span>
              </div>
              <div>
                <div className="font-black text-white text-base leading-none">SCS Ayush Solution</div>
                <div className="text-[10px] text-blue-400 font-medium tracking-wider mt-0.5">HEALTHCARE PARTNER</div>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              India&apos;s premier healthcare consultancy delivering end-to-end hospital
              operations, compliance, and growth solutions since 2012.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: Linkedin, href: COMPANY_INFO.social.linkedin, label: "LinkedIn" },
                { icon: Facebook, href: COMPANY_INFO.social.facebook, label: "Facebook" },
                { icon: Instagram, href: COMPANY_INFO.social.instagram, label: "Instagram" },
                { icon: Twitter, href: COMPANY_INFO.social.twitter, label: "Twitter" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-blue-600/30 border border-white/10 hover:border-blue-500/40 flex items-center justify-center transition-all duration-300 group"
                >
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-blue-300 transition-colors" />
                </a>
              ))}
            </div>

            {/* Certifications */}
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="text-[10px] px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 font-medium">
                NABH Certified
              </span>
              <span className="text-[10px] px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 font-medium">
                ISO 9001:2015
              </span>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-sm font-bold text-white mb-5 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500" />
              Our Services
            </h3>
            <ul className="space-y-3">
              {footerServices.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-slate-400 hover:text-blue-300 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium mt-2"
                >
                  View all services <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-sm font-bold text-white mb-5 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-blue-300 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-4 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500" />
                Legal
              </h3>
              <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs text-slate-500 hover:text-slate-300 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-sm font-bold text-white mb-5 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500" />
              Contact Us
            </h3>
            <div className="space-y-4">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="flex items-start gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-600/30 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Phone</div>
                  <div className="text-sm text-slate-300 group-hover:text-white transition-colors">
                    {COMPANY_INFO.phone}
                  </div>
                </div>
              </a>

              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-start gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg bg-cyan-600/20 border border-cyan-500/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-cyan-600/30 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Email</div>
                  <div className="text-sm text-slate-300 group-hover:text-white transition-colors">
                    {COMPANY_INFO.email}
                  </div>
                </div>
              </a>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-violet-600/20 border border-violet-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-violet-400" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Address</div>
                  <div className="text-sm text-slate-300 leading-relaxed">
                    {COMPANY_INFO.address}
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-8">
              <p className="text-xs font-semibold text-white mb-3">Subscribe to Our Insights</p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2.5 rounded-xl text-sm bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300"
                  style={{ background: "linear-gradient(135deg, #1d4ed8, #0891b2)" }}
                >
                  Go
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 flex items-center gap-1">
            © {new Date().getFullYear()} SCS Ayush Solution. Made with{" "}
            <Heart className="w-3 h-3 text-red-400 fill-red-400" /> for Healthcare India.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-slate-600">All rights reserved</span>
            <Link href="/admin" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hi, I'd like to know more about your healthcare consultancy services.`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[200] w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-green-500/40"
        style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-7 h-7 text-white fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full animate-ping opacity-30 bg-green-400" />
      </a>
    </footer>
  );
}
