"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SERVICES } from "@/lib/utils";
import { ArrowRight, Building2, Award, FileText, TrendingUp, Shield, UserCheck, Megaphone, Users, Tent } from "lucide-react";

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

const colorGradients: Record<string, string> = {
  blue: "from-blue-500 to-blue-600",
  cyan: "from-cyan-500 to-cyan-600",
  purple: "from-violet-500 to-violet-600",
  emerald: "from-emerald-500 to-emerald-600",
  orange: "from-orange-500 to-orange-600",
  teal: "from-teal-500 to-teal-600",
  pink: "from-pink-500 to-pink-600",
  violet: "from-violet-500 to-purple-600",
  amber: "from-amber-500 to-amber-600",
};

export default function ServicesPageClient() {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center bg-gradient-to-br from-[#0a1628] via-[#1d4ed8] to-[#0891b2] pt-24 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="container-xl relative z-10 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-blue-200 border border-white/15 text-sm font-semibold mb-6">
              ⚕️ Our Services
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-5">
              Healthcare Solutions<br />
              <span className="gradient-text-hero">Built for Hospitals</span>
            </h1>
            <p className="text-xl text-blue-100/70 max-w-2xl">
              From licensing to revenue — we cover every operational dimension your
              hospital needs to thrive in today&apos;s competitive healthcare landscape.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-py bg-white">
        <div className="container-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {SERVICES.map((service, i) => {
              const Icon = icons[service.slug] || Building2;
              const gradient = colorGradients[service.color] || "from-blue-500 to-blue-600";

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link href={`/services/${service.slug}`} className="glass-card rounded-3xl p-7 block hover-lift group h-full">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-5 shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    <h2 className="text-xl font-black text-slate-900 group-hover:text-blue-700 transition-colors mb-3">
                      {service.title}
                    </h2>
                    <p className="text-slate-500 text-sm leading-relaxed mb-5">{service.description.substring(0, 140)}...</p>

                    {/* Features preview */}
                    <ul className="space-y-1.5 mb-6">
                      {service.features.slice(0, 3).map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-xs text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 shrink-0" />
                          {feature}
                        </li>
                      ))}
                      {service.features.length > 3 && (
                        <li className="text-xs text-blue-500 font-semibold pl-3.5">
                          +{service.features.length - 3} more
                        </li>
                      )}
                    </ul>

                    <div className="flex items-center gap-2 text-sm font-bold text-blue-600 group-hover:gap-3 transition-all duration-200">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py bg-gradient-to-br from-blue-700 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="container-xl relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
              Not Sure Which Service You Need?
            </h2>
            <p className="text-blue-100/80 text-xl max-w-xl mx-auto mb-8">
              Book a free 30-minute consultation with our experts. We&apos;ll assess your needs
              and recommend the right solution.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-10 py-4 bg-white text-blue-700 font-bold rounded-2xl hover:bg-blue-50 transition-all duration-300 shadow-2xl text-base hover:-translate-y-1">
              Book Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
