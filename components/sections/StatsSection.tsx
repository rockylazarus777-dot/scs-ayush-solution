"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { TrendingUp, Shield, Star, Clock } from "lucide-react";

const stats = [
  {
    icon: TrendingUp,
    value: 500,
    suffix: "+",
    label: "Hospitals Served",
    description: "Across India's major healthcare hubs",
    color: "from-blue-500 to-blue-600",
    lightColor: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    icon: Shield,
    value: 150,
    suffix: "+",
    label: "NABH Accreditations",
    description: "Successful accreditation journeys",
    color: "from-cyan-500 to-cyan-600",
    lightColor: "bg-cyan-50",
    textColor: "text-cyan-600",
  },
  {
    icon: Star,
    value: 98,
    suffix: "%",
    label: "Client Satisfaction",
    description: "Measured across all engagements",
    color: "from-violet-500 to-violet-600",
    lightColor: "bg-violet-50",
    textColor: "text-violet-600",
  },
  {
    icon: Clock,
    value: 12,
    suffix: "+",
    label: "Years of Excellence",
    description: "Trusted since 2012",
    color: "from-amber-500 to-amber-600",
    lightColor: "bg-amber-50",
    textColor: "text-amber-600",
  },
];

function AnimatedCounter({ value, suffix, isVisible }: { value: number; suffix: string; isVisible: boolean }) {
  const [count, setCount] = useState(0);
  const countRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!isVisible) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    countRef.current = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), value);
      setCount(current);
      if (current >= value) clearInterval(countRef.current);
    }, duration / steps);

    return () => clearInterval(countRef.current);
  }, [isVisible, value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

const certifications = [
  { name: "NABH", desc: "National Accreditation Board" },
  { name: "ISO", desc: "9001:2015 Certified" },
  { name: "NABL", desc: "Accreditation Partner" },
  { name: "JCI", desc: "Consultancy Support" },
];

export default function StatsSection() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section className="section-py relative overflow-hidden section-mesh">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
      </div>

      <div className="container-xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-badge mb-4 inline-flex">
            📈 Proven Track Record
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Numbers That{" "}
            <span className="gradient-text">Speak for Themselves</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-lg">
            A decade-plus of transforming Indian healthcare, one hospital at a time.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="glass-card rounded-3xl p-8 text-center cursor-default relative overflow-hidden group"
              >
                {/* Glow on hover */}
                <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${stat.color} opacity-[0.03]`} />

                <div className={`w-14 h-14 rounded-2xl mx-auto mb-5 ${stat.lightColor} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>

                <div className={`text-4xl md:text-5xl font-black mb-2 ${stat.textColor}`}>
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    isVisible={inView}
                  />
                </div>

                <div className="text-lg font-bold text-slate-800 mb-1">{stat.label}</div>
                <div className="text-sm text-slate-400">{stat.description}</div>

                {/* Progress bar decoration */}
                <div className="mt-5 h-1 rounded-full bg-slate-100 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "85%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5 + i * 0.1, ease: "easeOut" }}
                    className={`h-full rounded-full bg-gradient-to-r ${stat.color}`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Certifications & Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card rounded-3xl p-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-2">
                Certifications & Accreditations
              </p>
              <h3 className="text-2xl font-black text-slate-900">
                Trusted by the Healthcare Industry
              </h3>
            </div>
            <div className="flex flex-wrap gap-4 justify-center md:justify-end">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="text-center px-6 py-4 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 hover:shadow-glow-sm transition-all duration-300"
                >
                  <div className="text-xl font-black text-blue-700 mb-1">{cert.name}</div>
                  <div className="text-xs text-slate-500 font-medium">{cert.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Partner logos strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-slate-400 mb-6 font-medium">
            Trusted by leading hospital networks across India
          </p>
          <div className="flex flex-wrap justify-center gap-6 items-center">
            {[
              "Apollo Hospitals", "Fortis Healthcare", "Max Hospitals",
              "Manipal Hospitals", "Narayana Health", "Cloudnine Group"
            ].map((partner) => (
              <div
                key={partner}
                className="px-5 py-2.5 rounded-xl bg-white border border-slate-100 text-slate-400 text-sm font-semibold hover:text-blue-600 hover:border-blue-100 transition-all duration-300 shadow-sm"
              >
                {partner}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
