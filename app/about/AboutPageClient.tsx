"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Target, Eye, Heart, Award, Users, TrendingUp, Globe } from "lucide-react";

const team = [
  {
    name: "Dr. Suresh Chandra",
    role: "Founder & CEO",
    bio: "20+ years in healthcare administration. Former CMO at Apollo Hospitals. Pioneer of systematic NABH implementation in tier-2 cities.",
    avatar: "SC",
    color: "from-blue-500 to-blue-600",
  },
  {
    name: "Anjali Sharma",
    role: "Director, NABH Consultancy",
    bio: "Former NABH surveyor with 15 years of accreditation expertise. Led 100+ successful NABH certifications.",
    avatar: "AS",
    color: "from-cyan-500 to-cyan-600",
  },
  {
    name: "Rajiv Mehta",
    role: "Head, Revenue & Finance",
    bio: "Chartered accountant specializing in healthcare revenue cycle. Recovered ₹50Cr+ in hospital revenue across 200+ facilities.",
    avatar: "RM",
    color: "from-violet-500 to-violet-600",
  },
  {
    name: "Priya Nair",
    role: "Director, Compliance & Licensing",
    bio: "Former state health authority officer with deep regulatory knowledge. Specialist in multi-state hospital licensing.",
    avatar: "PN",
    color: "from-emerald-500 to-emerald-600",
  },
];

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    desc: "Every action we take is directed at one goal: making Indian healthcare more compliant, efficient, and patient-centric.",
    color: "blue",
  },
  {
    icon: Eye,
    title: "Transparent",
    desc: "No hidden fees, no surprises. We operate with complete transparency in our processes, timelines, and billing.",
    color: "cyan",
  },
  {
    icon: Heart,
    title: "Healthcare-First",
    desc: "We're not just consultants — we're healthcare advocates who believe better hospital operations save lives.",
    color: "pink",
  },
  {
    icon: Award,
    title: "Excellence",
    desc: "We hold ourselves to the same standards we help our clients achieve — the highest in the industry.",
    color: "amber",
  },
];

const milestones = [
  { year: "2012", event: "Founded in Mumbai with a vision to transform Indian healthcare operations" },
  { year: "2015", event: "Expanded to Delhi & Bangalore; crossed 50 successful NABH accreditations" },
  { year: "2017", event: "Launched specialized Revenue Scanning division; recovered ₹10Cr in Year 1" },
  { year: "2019", event: "Crossed 200 hospital clients; opened offices in Pune, Hyderabad, and Ahmedabad" },
  { year: "2021", event: "Launched digital MRD management platform; partnered with 15+ insurance companies" },
  { year: "2024", event: "20+ hospitals served; 150+ NABH accreditations; Pan-India presence in 40+ cities" },
];

export default function AboutPageClient() {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-[#0a1628] via-[#0f2562] to-[#0891b2] overflow-hidden pt-24">
        <div className="absolute inset-0 pointer-events-none opacity-10"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="container-xl relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-blue-200 border border-white/15 text-sm font-semibold mb-6">
              🏥 About SCS Ayush Solution
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Building a Better<br />
              <span className="gradient-text-hero">Healthcare India</span>
            </h1>
            <p className="text-xl text-blue-100/70 max-w-2xl leading-relaxed">
              Since 2012, SCS Ayush Solution has been the trusted partner for hospitals
              across India — delivering compliance, growth, and operational excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="section-py bg-white">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="section-badge mb-5 inline-flex">Our Story</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                From a Vision to<br />
                <span className="gradient-text">20+ Hospitals</span>
              </h2>
              <p className="text-slate-500 leading-relaxed mb-5 text-lg">
                SCS Ayush Solution was born out of frustration — watching talented healthcare
                professionals struggle with regulatory complexity, licensing bureaucracy, and
                revenue inefficiencies that had nothing to do with patient care.
              </p>
              <p className="text-slate-500 leading-relaxed mb-5">
                Our founder, Dr. Suresh Chandra, spent 20 years inside India&apos;s largest hospital
                systems before realizing that the biggest barrier to quality healthcare wasn&apos;t
                medical expertise — it was operational chaos. He built SCS Ayush Solution to
                solve exactly that.
              </p>
              <p className="text-slate-500 leading-relaxed mb-8">
                Today, we&apos;re India&apos;s most trusted healthcare consultancy — a team of 80+
                specialists, 15 state offices, and a decade-plus track record of transforming
                hospitals from compliance struggles to growth machines.
              </p>
              <Link href="/contact" className="btn-primary inline-flex items-center gap-2 text-sm px-8 py-4 rounded-2xl text-white">
                Partner With Us <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Stats visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-5"
            >
              {[
                { icon: Users, value: "20+", label: "Hospitals Served", color: "blue" },
                { icon: Award, value: "150+", label: "NABH Accreditations", color: "cyan" },
                { icon: TrendingUp, value: "₹25Cr+", label: "Revenue Recovered", color: "emerald" },
                { icon: Globe, value: "40+", label: "Cities Covered", color: "violet" },
              ].map((stat) => {
                const Icon = stat.icon;
                const colMap: Record<string, string> = {
                  blue: "from-blue-500 to-blue-600 shadow-blue-500/20",
                  cyan: "from-cyan-500 to-cyan-600 shadow-cyan-500/20",
                  emerald: "from-emerald-500 to-emerald-600 shadow-emerald-500/20",
                  violet: "from-violet-500 to-violet-600 shadow-violet-500/20",
                };
                return (
                  <div
                    key={stat.label}
                    className={`glass-card rounded-3xl p-6 text-center relative overflow-hidden`}
                  >
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${colMap[stat.color]} flex items-center justify-center mx-auto mb-4 shadow-xl`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-black text-slate-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="section-py bg-gradient-to-b from-slate-50 to-white">
        <div className="container-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="section-badge mb-5 inline-flex">🎯 Our Foundation</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900">
              Mission, Vision & <span className="gradient-text">Values</span>
            </h2>
          </motion.div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {[
              {
                icon: "🎯",
                label: "Our Mission",
                text: "To empower every hospital in India — regardless of size or location — with the compliance framework, revenue optimization, and operational systems needed to deliver world-class patient care.",
                color: "blue",
              },
              {
                icon: "🔭",
                label: "Our Vision",
                text: "A future where every Indian hospital operates at peak compliance, peak efficiency, and peak patient satisfaction — where administrative barriers never compromise the quality of care.",
                color: "cyan",
              },
            ].map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card rounded-3xl p-8"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">{item.label}</div>
                <p className="text-lg text-slate-700 leading-relaxed font-medium">{item.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-3xl p-6 hover-lift text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{value.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-py bg-white">
        <div className="container-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="section-badge mb-5 inline-flex">📅 Our Journey</span>
            <h2 className="text-4xl font-black text-slate-900">
              Milestones That <span className="gradient-text">Shaped Us</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-6 items-start group"
              >
                <div className="shrink-0 w-20 text-right">
                  <span className="text-2xl font-black gradient-text">{m.year}</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 mt-2 group-hover:scale-150 transition-transform" />
                  {i < milestones.length - 1 && <div className="w-0.5 h-12 bg-gradient-to-b from-blue-200 to-transparent mt-1" />}
                </div>
                <div className="glass-card rounded-2xl p-4 flex-1 mb-2">
                  <p className="text-slate-700 font-medium text-sm leading-relaxed">{m.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-py bg-slate-50">
        <div className="container-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="section-badge mb-5 inline-flex">👥 Leadership Team</span>
            <h2 className="text-4xl font-black text-slate-900">
              The Experts Behind <span className="gradient-text">Your Success</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-3xl p-6 text-center hover-lift"
              >
                <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-black text-2xl mx-auto mb-5 shadow-xl`}>
                  {member.avatar}
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-1">{member.name}</h3>
                <p className="text-xs font-bold text-blue-600 mb-3">{member.role}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
