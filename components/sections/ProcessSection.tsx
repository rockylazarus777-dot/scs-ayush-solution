"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageSquare, Clipboard, Shield, BarChart3, Rocket, ArrowRight } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: MessageSquare,
    title: "Discovery Consultation",
    description:
      "We begin with a deep-dive consultation to understand your hospital's current state, goals, challenges, and regulatory requirements. No templates — 100% personalized.",
    color: "blue",
    duration: "Day 1–3",
  },
  {
    step: "02",
    icon: Clipboard,
    title: "Gap Analysis & Planning",
    description:
      "Our experts conduct a comprehensive gap assessment and build a customized roadmap with clear milestones, timelines, and resource requirements.",
    color: "cyan",
    duration: "Day 4–7",
  },
  {
    step: "03",
    icon: Shield,
    title: "Compliance Implementation",
    description:
      "We work alongside your team to implement every required process, documentation standard, and protocol — from MRD setup to NABH pre-assessment.",
    color: "violet",
    duration: "Week 2–4",
  },
  {
    step: "04",
    icon: BarChart3,
    title: "Optimization & Revenue",
    description:
      "With compliance in place, we turn our focus to performance — revenue scanning, TPA empanelment, staff training, and operational efficiency improvements.",
    color: "emerald",
    duration: "Week 4–6",
  },
  {
    step: "05",
    icon: Rocket,
    title: "Growth & Ongoing Support",
    description:
      "Post-project, we remain your strategic partner — providing monthly reviews, regulatory updates, marketing support, and continuous improvement plans.",
    color: "amber",
    duration: "Ongoing",
  },
];

const colors: Record<string, { bg: string; light: string; text: string; border: string; glow: string }> = {
  blue:    { bg: "from-blue-500 to-blue-600",    light: "bg-blue-50",    text: "text-blue-600",    border: "border-blue-200",    glow: "shadow-blue-500/20" },
  cyan:    { bg: "from-cyan-500 to-cyan-600",    light: "bg-cyan-50",    text: "text-cyan-600",    border: "border-cyan-200",    glow: "shadow-cyan-500/20" },
  violet:  { bg: "from-violet-500 to-violet-600", light: "bg-violet-50", text: "text-violet-600",  border: "border-violet-200",  glow: "shadow-violet-500/20" },
  emerald: { bg: "from-emerald-500 to-emerald-600", light: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200", glow: "shadow-emerald-500/20" },
  amber:   { bg: "from-amber-500 to-amber-600",  light: "bg-amber-50",   text: "text-amber-600",   border: "border-amber-200",   glow: "shadow-amber-500/20" },
};

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section className="section-py bg-white relative overflow-hidden">
      <div className="absolute inset-0 section-mesh opacity-50 pointer-events-none" />

      <div className="container-xl relative" ref={containerRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="section-badge mb-5 inline-flex">⚙️ Our Process</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-5">
            How We{" "}
            <span className="gradient-text">Deliver Results</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            A battle-tested 5-step methodology that transforms hospital operations
            from compliance gaps to growth engines.
          </p>
        </motion.div>

        {/* Process Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-100 md:-translate-x-0.5">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-blue-500 via-cyan-500 to-amber-500 rounded-full origin-top"
            />
          </div>

          {steps.map((step, i) => {
            const Icon = step.icon;
            const c = colors[step.color];
            const isRight = i % 2 !== 0;

            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: isRight ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`relative flex items-center mb-10 md:mb-16 ${
                  isRight ? "md:flex-row-reverse" : "md:flex-row"
                } flex-row`}
              >
                {/* Mobile/Desktop icon node */}
                <div className="absolute left-0 md:left-1/2 z-10 md:-translate-x-1/2">
                  <motion.div
                    whileInView={{ scale: [0.5, 1.1, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.bg} flex items-center justify-center shadow-xl ${c.glow} border-4 border-white`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>
                </div>

                {/* Content card */}
                <div className={`ml-20 md:ml-0 md:w-[46%] ${isRight ? "md:mr-auto md:ml-0 md:pr-8" : "md:ml-auto md:pl-8"}`}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="glass-card rounded-3xl p-6 hover:shadow-card-hover transition-all duration-400"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-black uppercase tracking-widest ${c.text}`}>
                        Step {step.step}
                      </span>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${c.light} ${c.text} border ${c.border}`}>
                        {step.duration}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-3">{step.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-4"
        >
          <div className="inline-flex items-center gap-6 glass-card rounded-3xl px-8 py-6">
            <div className="text-left">
              <p className="font-black text-slate-900 text-lg">Ready to start your transformation?</p>
              <p className="text-slate-500 text-sm">Join 20+ hospitals on their success journey.</p>
            </div>
            <a href="/contact" className="btn-primary whitespace-nowrap inline-flex items-center gap-2 text-sm px-7 py-3.5 rounded-2xl text-white shrink-0">
              Start Now <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
