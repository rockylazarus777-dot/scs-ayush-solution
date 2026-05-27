"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, ChevronDown, Sparkles } from "lucide-react";
import { COMPANY_INFO } from "@/lib/utils";

const heroWords = ["Compliance", "Growth", "Excellence", "Innovation", "Success"];

const floatingCards = [
  {
    icon: "🏆",
    title: "NABH Accredited",
    subtitle: "150+ hospitals",
    color: "from-blue-500/20 to-cyan-500/10",
    delay: 0,
    position: "top-[20%] right-[8%]",
  },
  {
    icon: "📊",
    title: "Revenue Optimized",
    subtitle: "₹2.5Cr+ recovered",
    color: "from-violet-500/20 to-purple-500/10",
    delay: 0.3,
    position: "bottom-[30%] left-[6%]",
  },
  {
    icon: "⚡",
    title: "Fast Licensing",
    subtitle: "30-day process",
    color: "from-amber-500/20 to-orange-500/10",
    delay: 0.6,
    position: "top-[55%] right-[5%]",
  },
];

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % heroWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a1628]"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-100" : "opacity-0"
          }`}
          poster="/images/hero-poster.jpg"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-hospital-hallway-with-doctors-and-nurses-13015-large.mp4"
            type="video/mp4"
          />
        </video>
        {/* Gradient overlay */}
        <div className="absolute inset-0 hero-overlay" />
        {/* Color tint mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f2562]/60 via-transparent to-[#0891b2]/20" />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 z-[1] overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              background: `rgba(${Math.random() > 0.5 ? "99, 179, 237" : "103, 232, 249"}, ${0.3 + Math.random() * 0.4})`,
              animationDuration: `${10 + Math.random() * 20}s`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Cards */}
      {floatingCards.map((card) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.2 + card.delay, duration: 0.6, ease: "easeOut" }}
          className={`absolute ${card.position} hidden lg:block z-10`}
          style={{ y: useTransform(scrollY, [0, 500], [0, card.delay * 40]) }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4 + card.delay, repeat: Infinity, ease: "easeInOut" }}
            className={`glass-dark backdrop-blur-2xl rounded-2xl p-4 border border-white/10 bg-gradient-to-br ${card.color} min-w-[160px]`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{card.icon}</span>
              <div>
                <div className="text-white font-bold text-sm leading-none">{card.title}</div>
                <div className="text-blue-200/70 text-xs mt-1">{card.subtitle}</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* Main Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 container-xl text-center pt-28 pb-16"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8 bg-white/10 text-blue-200 border border-white/15 backdrop-blur-sm"
        >
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-black text-white leading-[1.05] tracking-tight mb-6 max-w-5xl mx-auto"
        >
          Powering Hospital{" "}
          <span className="relative inline-block">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                initial={{ opacity: 0, y: 30, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -30, rotateX: 90 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="gradient-text-hero inline-block"
              >
                {heroWords[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
          <br />
          <span className="text-white/60 text-4xl md:text-5xl lg:text-6xl font-light">
            Across India
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-lg md:text-xl text-blue-100/70 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
        >
          {COMPANY_INFO.tagline} — delivering NABH, licensing, revenue optimization,
          insurance support, and healthcare management for 20+ facilities.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-wrap gap-4 justify-center mb-14"
        >
          <Link
            href="/contact"
            className="btn-primary group flex items-center gap-3 px-8 py-4 text-base rounded-2xl text-white"
          >
            Get Free Consultation
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/services"
            className="flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-white/90 border border-white/20 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 text-base hover:border-white/30"
          >
            <Play className="w-4 h-4 fill-current" />
            Explore Services
          </Link>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {[
            { value: "20+", label: "Hospitals Served" },
            { value: "150+", label: "NABH Accreditations" },
            { value: "98%", label: "Client Satisfaction" },
            { value: "12+", label: "Years of Excellence" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-dark rounded-2xl p-4 text-center border border-white/8 hover:border-white/15 transition-all duration-300"
            >
              <div className="text-2xl md:text-3xl font-black gradient-text-hero">{stat.value}</div>
              <div className="text-xs text-blue-200/60 mt-1 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-blue-300/50 font-medium tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-blue-300/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
