"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { COMPANY_INFO } from "@/lib/utils";

export default function CTASection() {
  return (
    <section className="section-py relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-600">
      {/* Decorative */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "30px 30px" }}
        />
      </div>

      <div className="container-xl relative text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 bg-white/15 text-white border border-white/20">
            🚀 Limited Slots Available This Month
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Ready to Elevate Your<br />Hospital Operations?
          </h2>
          <p className="text-xl text-blue-100/80 max-w-2xl mx-auto mb-10">
            Book a free 30-minute strategy session with our healthcare experts.
            No commitment. Pure value.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-700 rounded-2xl font-bold text-base hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-white/20 hover:-translate-y-1"
            >
              Book Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/15 border border-white/30 text-white rounded-2xl font-bold text-base hover:bg-white/25 transition-all duration-300 hover:-translate-y-1"
            >
              <Phone className="w-5 h-5" /> Call Us Now
            </a>
          </div>
          <p className="mt-8 text-blue-200/60 text-sm">
            📍 Serving hospitals across Mumbai, Pune, Delhi, Bangalore, Ahmedabad & 40+ cities
          </p>
        </motion.div>
      </div>
    </section>
  );
}
