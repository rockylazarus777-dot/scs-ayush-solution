"use client";

import { motion } from "framer-motion";
import { CheckCircle, Clock, Shield, Users, TrendingUp, Award } from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "10+ Years Specialized Expertise",
    description:
      "Our team brings over a decade of focused healthcare consultancy experience, having navigated hundreds of hospitals through licensing, accreditation, and operations.",
    stat: "12+ Years",
    color: "blue",
  },
  {
    icon: Shield,
    title: "End-to-End Compliance Support",
    description:
      "From initial gap assessment to final audit, we handle every compliance requirement — NABH, licensing, documentation, and beyond — under one roof.",
    stat: "100% Coverage",
    color: "cyan",
  },
  {
    icon: Clock,
    title: "30-Day Turnaround Guarantee",
    description:
      "Our process-driven approach ensures lightning-fast results without compromising quality. Hospital licensing in 30 days or we continue for free.",
    stat: "30-Day SLA",
    color: "emerald",
  },
  {
    icon: Users,
    title: "Dedicated Account Manager",
    description:
      "Every client gets a dedicated healthcare consultant — a single point of contact who knows your facility inside-out and is always reachable.",
    stat: "1-on-1 Support",
    color: "violet",
  },
  {
    icon: TrendingUp,
    title: "Measurable ROI",
    description:
      "Our revenue scanning and TPA services have collectively recovered ₹25Cr+ in lost revenue for clients. We don't just consult — we deliver financial results.",
    stat: "₹25Cr+ Recovered",
    color: "amber",
  },
  {
    icon: CheckCircle,
    title: "Pan-India Presence",
    description:
      "With operations across 15+ states and 40+ cities, we understand local regulatory nuances and have established relationships with licensing authorities nationwide.",
    stat: "40+ Cities",
    color: "pink",
  },
];

const colorClasses: Record<string, { icon: string; bg: string; border: string; stat: string }> = {
  blue:    { icon: "text-blue-600",    bg: "bg-blue-50",    border: "border-blue-100",    stat: "text-blue-700 bg-blue-50" },
  cyan:    { icon: "text-cyan-600",    bg: "bg-cyan-50",    border: "border-cyan-100",    stat: "text-cyan-700 bg-cyan-50" },
  emerald: { icon: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", stat: "text-emerald-700 bg-emerald-50" },
  violet:  { icon: "text-violet-600",  bg: "bg-violet-50",  border: "border-violet-100",  stat: "text-violet-700 bg-violet-50" },
  amber:   { icon: "text-amber-600",   bg: "bg-amber-50",   border: "border-amber-100",   stat: "text-amber-700 bg-amber-50" },
  pink:    { icon: "text-pink-600",    bg: "bg-pink-50",    border: "border-pink-100",    stat: "text-pink-700 bg-pink-50" },
};

export default function WhyChooseUs() {
  return (
    <section className="section-py bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 section-mesh pointer-events-none opacity-60" />

      <div className="container-xl relative">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Left — Header & Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12 lg:mb-0"
          >
            <span className="section-badge mb-5 inline-flex">
              ✨ Why SCS Ayush Solution
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
              The Smarter Choice for{" "}
              <span className="gradient-text">Hospital Operations</span>
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed mb-8">
              We&apos;re not a generic consultancy. We live and breathe healthcare operations —
              built by healthcare professionals, for healthcare facilities.
            </p>

            {/* Visual dashboard mockup */}
            <div className="glass-card rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-50" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Hospital Performance Score</p>
                    <p className="text-2xl font-black text-slate-900 mt-1">Before & After SCS</p>
                  </div>
                  <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-100">
                    +47% Average
                  </span>
                </div>
                {[
                  { label: "Compliance Score", before: 42, after: 98 },
                  { label: "Revenue Recovery", before: 55, after: 95 },
                  { label: "Staff Efficiency", before: 60, after: 88 },
                  { label: "Patient Satisfaction", before: 65, after: 91 },
                ].map((metric) => (
                  <div key={metric.label} className="mb-4">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="font-medium text-slate-600">{metric.label}</span>
                      <div className="flex gap-3">
                        <span className="text-red-400 font-semibold">Before: {metric.before}%</span>
                        <span className="text-emerald-600 font-bold">After: {metric.after}%</span>
                      </div>
                    </div>
                    <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 rounded-full bg-red-200"
                        style={{ width: `${metric.before}%` }}
                      />
                      <motion.div
                        initial={{ width: `${metric.before}%` }}
                        whileInView={{ width: `${metric.after}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Reasons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((reason, i) => {
              const Icon = reason.icon;
              const colors = colorClasses[reason.color];
              return (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-5 hover-lift group"
                >
                  <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center mb-4`}>
                    <Icon className={`w-5 h-5 ${colors.icon}`} />
                  </div>
                  <div className={`inline-block text-xs font-bold px-2.5 py-1 rounded-lg mb-3 ${colors.stat} border ${colors.border}`}>
                    {reason.stat}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2 leading-tight">{reason.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{reason.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
