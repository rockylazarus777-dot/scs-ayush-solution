"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    designation: "Medical Director",
    hospital: "Sunrise Multispecialty Hospital, Mumbai",
    avatar: "RK",
    content:
      "SCS Ayush Solution transformed our hospital's compliance journey. We achieved NABH accreditation in just 4 months — a process we thought would take a year. Their team's depth of knowledge and hands-on support made all the difference.",
    rating: 5,
    service: "NABH Consultancy",
    color: "blue",
  },
  {
    id: 2,
    name: "Ms. Priya Sharma",
    designation: "Hospital Administrator",
    hospital: "Lifeline Hospital, Pune",
    avatar: "PS",
    content:
      "Their revenue scanning team identified ₹42 lakhs in billing leakages within the first month. The ROI was immediate and incredible. Professional, thorough, and genuinely committed to results.",
    rating: 5,
    service: "IP & OP Revenue Scanning",
    color: "cyan",
  },
  {
    id: 3,
    name: "Dr. Anil Mehta",
    designation: "CEO",
    hospital: "Green Valley Medical Centre, Ahmedabad",
    avatar: "AM",
    content:
      "Getting our hospital licensed was a nightmare until we found SCS. They managed every document, liaison, and regulatory requirement seamlessly. We received our license in 28 days — well within their guarantee!",
    rating: 5,
    service: "Hospital Licensing",
    color: "violet",
  },
  {
    id: 4,
    name: "Mrs. Sunita Patel",
    designation: "HR Director",
    hospital: "Care Plus Hospital, Bangalore",
    avatar: "SP",
    content:
      "Their recruitment service placed 12 qualified clinical staff within 6 weeks. The candidates were pre-screened, reference-verified, and perfectly matched to our culture. Exceptional quality of service.",
    rating: 5,
    service: "Recruitment",
    color: "emerald",
  },
  {
    id: 5,
    name: "Dr. Vikram Singh",
    designation: "Chairman",
    hospital: "Vcare Hospital Group, Delhi",
    avatar: "VS",
    content:
      "SCS handled our TPA empanelment with 8 insurance companies simultaneously. Their expertise in insurance documentation and their relationships with TPAs saved us months of struggle.",
    rating: 5,
    service: "Insurance & TPA Support",
    color: "amber",
  },
];

const colorMap: Record<string, string> = {
  blue: "from-blue-500 to-blue-600",
  cyan: "from-cyan-500 to-cyan-600",
  violet: "from-violet-500 to-violet-600",
  emerald: "from-emerald-500 to-emerald-600",
  amber: "from-amber-500 to-amber-600",
};

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const timerRef = useRef<NodeJS.Timeout>();

  const next = () => setActive((p) => (p + 1) % testimonials.length);
  const prev = () => setActive((p) => (p - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (!autoplay) return;
    timerRef.current = setInterval(next, 4500);
    return () => clearInterval(timerRef.current);
  }, [autoplay, active]);

  const current = testimonials[active];

  return (
    <section className="section-py bg-gradient-to-b from-[#0a1628] to-[#0f2562] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
      </div>

      <div className="container-xl relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-5 bg-white/10 text-blue-200 border border-white/15">
            ⭐ Client Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
            Trusted by{" "}
            <span className="gradient-text-hero">20+ Hospitals</span>
          </h2>
          <p className="text-blue-200/60 max-w-xl mx-auto text-lg">
            Real results, real hospitals, real transformations.
          </p>
        </motion.div>

        {/* Main Testimonial Card */}
        <div className="max-w-4xl mx-auto mb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="glass-dark rounded-3xl p-8 md:p-12 relative overflow-hidden"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-16 h-16 text-blue-300" />
              </div>

              {/* Service badge */}
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-6 bg-gradient-to-r ${colorMap[current.color]} text-white shadow-lg`}>
                {current.service}
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-xl md:text-2xl text-white/90 leading-relaxed font-medium mb-8">
                &ldquo;{current.content}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colorMap[current.color]} flex items-center justify-center text-white font-black text-lg shadow-lg`}>
                  {current.avatar}
                </div>
                <div>
                  <div className="text-white font-bold text-lg">{current.name}</div>
                  <div className="text-blue-300/70 text-sm">{current.designation}</div>
                  <div className="text-blue-400/60 text-xs mt-0.5">{current.hospital}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => { prev(); setAutoplay(false); }}
            className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 hover:bg-white/15 text-white transition-all duration-200 flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setActive(i); setAutoplay(false); }}
                className={`transition-all duration-300 rounded-full ${
                  i === active
                    ? "w-8 h-2.5 bg-gradient-to-r from-blue-400 to-cyan-400"
                    : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => { next(); setAutoplay(false); }}
            className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 hover:bg-white/15 text-white transition-all duration-200 flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Mini cards row */}
        <div className="mt-10 flex gap-3 overflow-x-auto no-scrollbar pb-2 justify-center">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              onClick={() => { setActive(i); setAutoplay(false); }}
              className={`shrink-0 flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 border ${
                i === active
                  ? "bg-white/15 border-white/25 shadow-lg"
                  : "bg-white/5 border-white/8 hover:bg-white/10"
              }`}
            >
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${colorMap[t.color]} flex items-center justify-center text-white font-bold text-xs`}>
                {t.avatar}
              </div>
              <div className="text-left">
                <div className="text-white text-xs font-semibold whitespace-nowrap">{t.name}</div>
                <div className="text-blue-400/60 text-[10px] whitespace-nowrap">{t.hospital.split(",")[0]}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
