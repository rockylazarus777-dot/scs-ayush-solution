"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES } from "@/lib/utils";
import { ArrowRight, Building2, Award, FileText, TrendingUp, Shield, UserCheck, Megaphone, Users, Tent, CheckCircle } from "lucide-react";

const icons: Record<string, React.ElementType> = {
  "hospital-licensing": Building2,
  "nabh-consultancy": Award,
  "mrd-services": FileText,
  "ip-op-revenue-scanning": TrendingUp,
  "insurance-tpa-support": Shield,
  "doctor-referral-services": UserCheck,
  "hospital-marketing": Megaphone,
  "recruitment": Users,
  "medical-camps": Tent,
};

const colorMap: Record<string, { bg: string; light: string; gradient: string; text: string; border: string }> = {
  blue:    { bg: "from-blue-500 to-blue-600",     light: "bg-blue-50",    gradient: "from-blue-50 to-blue-100/50",   text: "text-blue-600",   border: "border-blue-100" },
  cyan:    { bg: "from-cyan-500 to-cyan-600",     light: "bg-cyan-50",    gradient: "from-cyan-50 to-cyan-100/50",   text: "text-cyan-600",   border: "border-cyan-100" },
  purple:  { bg: "from-violet-500 to-violet-600", light: "bg-violet-50",  gradient: "from-violet-50 to-violet-100/50", text: "text-violet-600", border: "border-violet-100" },
  emerald: { bg: "from-emerald-500 to-emerald-600", light: "bg-emerald-50", gradient: "from-emerald-50 to-emerald-100/50", text: "text-emerald-600", border: "border-emerald-100" },
  orange:  { bg: "from-orange-500 to-orange-600", light: "bg-orange-50",  gradient: "from-orange-50 to-orange-100/50", text: "text-orange-600", border: "border-orange-100" },
  teal:    { bg: "from-teal-500 to-teal-600",     light: "bg-teal-50",    gradient: "from-teal-50 to-teal-100/50",   text: "text-teal-600",   border: "border-teal-100" },
  pink:    { bg: "from-pink-500 to-pink-600",     light: "bg-pink-50",    gradient: "from-pink-50 to-pink-100/50",   text: "text-pink-600",   border: "border-pink-100" },
  violet:  { bg: "from-violet-500 to-purple-600", light: "bg-violet-50",  gradient: "from-violet-50 to-purple-100/50", text: "text-violet-600", border: "border-violet-100" },
  amber:   { bg: "from-amber-500 to-amber-600",   light: "bg-amber-50",   gradient: "from-amber-50 to-amber-100/50", text: "text-amber-600",  border: "border-amber-100" },
};

export default function ServicesSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeService, setActiveService] = useState<string | null>(null);

  return (
    <section id="services" className="section-py bg-white relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-50/40 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="container-xl relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-badge mb-5 inline-flex">
            ⚕️ Healthcare Services
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-5 leading-tight">
            Comprehensive Solutions<br />
            <span className="gradient-text">For Every Hospital Need</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            From licensing to revenue optimization, we cover every dimension of
            healthcare operations management.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, i) => {
            const Icon = icons[service.slug] || Building2;
            const colors = colorMap[service.color] || colorMap.blue;
            const isActive = activeService === service.id;
            const isHovered = hoveredId === service.id;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onHoverStart={() => setHoveredId(service.id)}
                onHoverEnd={() => setHoveredId(null)}
                onClick={() => setActiveService(isActive ? null : service.id)}
                className={`service-card cursor-pointer ${i === 0 || i === 6 ? "md:col-span-2 lg:col-span-1" : ""}`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-14 h-14 rounded-2xl ${colors.light} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${colors.light} ${colors.text} border ${colors.border}`}>
                      Premium
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">
                  {service.shortDesc}
                </p>

                {/* Expandable features */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${colors.gradient} border ${colors.border} mb-4`}>
                        <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3">What&apos;s Included</p>
                        <ul className="space-y-2">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-2">
                              <CheckCircle className={`w-4 h-4 ${colors.text} shrink-0 mt-0.5`} />
                              <span className="text-sm text-slate-600">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Footer CTA */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveService(isActive ? null : service.id);
                    }}
                    className={`text-xs font-semibold ${colors.text} hover:underline`}
                  >
                    {isActive ? "Show Less" : "View Features →"}
                  </button>
                  <Link
                    href={`/services/${service.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl ${colors.light} ${colors.text} hover:shadow-sm transition-all duration-200`}
                  >
                    Learn More <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Hover glow underline */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r ${colors.bg} origin-left`}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-14"
        >
          <p className="text-slate-500 mb-6">
            Not sure which service you need? Let our experts guide you.
          </p>
          <Link
            href="/contact"
            className="btn-primary inline-flex items-center gap-2 text-sm px-8 py-4 rounded-2xl text-white"
          >
            Schedule a Free Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
