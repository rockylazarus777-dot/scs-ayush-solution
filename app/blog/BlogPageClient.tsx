"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowRight, Tag } from "lucide-react";

const posts = [
  {
    slug: "nabh-accreditation-guide-2024",
    title: "Complete Guide to NABH Accreditation in 2024",
    excerpt: "A step-by-step walkthrough of the NABH accreditation process — from gap assessment to final certification. What hospitals need to know to succeed.",
    category: "Accreditation",
    readTime: 8,
    date: "December 10, 2024",
    author: "Dr. Anjali Sharma",
    featured: true,
    color: "blue",
  },
  {
    slug: "hospital-revenue-leakage-top-10",
    title: "Top 10 Sources of Hospital Revenue Leakage & How to Fix Them",
    excerpt: "Most hospitals unknowingly lose 15–25% of potential revenue. We break down the top leakage points and give you actionable fixes.",
    category: "Revenue",
    readTime: 6,
    date: "December 2, 2024",
    author: "Rajiv Mehta",
    featured: false,
    color: "emerald",
  },
  {
    slug: "tpa-empanelment-checklist",
    title: "TPA Empanelment Checklist Every Hospital Administrator Needs",
    excerpt: "A comprehensive checklist covering all documentation, process, and system requirements for smooth TPA empanelment.",
    category: "Insurance",
    readTime: 5,
    date: "November 22, 2024",
    author: "Priya Nair",
    featured: false,
    color: "violet",
  },
  {
    slug: "hospital-licensing-states-guide",
    title: "State-by-State Hospital Licensing Requirements in India",
    excerpt: "Licensing requirements vary significantly across Indian states. Here's a comprehensive breakdown for the top 10 healthcare states.",
    category: "Licensing",
    readTime: 10,
    date: "November 15, 2024",
    author: "Priya Nair",
    featured: false,
    color: "cyan",
  },
  {
    slug: "mrd-best-practices-india",
    title: "MRD Best Practices for Indian Hospitals in 2024",
    excerpt: "Modern Medical Records Departments are the backbone of hospital compliance. Here's how to set yours up for NABH readiness.",
    category: "MRD",
    readTime: 7,
    date: "November 8, 2024",
    author: "Dr. Suresh Chandra",
    featured: false,
    color: "amber",
  },
  {
    slug: "healthcare-recruitment-india-guide",
    title: "Hiring Clinical Staff in India: A Complete Strategy Guide",
    excerpt: "Finding qualified doctors, nurses, and technicians is increasingly competitive. Learn the best strategies for healthcare talent acquisition.",
    category: "Recruitment",
    readTime: 6,
    date: "October 30, 2024",
    author: "HR Team",
    featured: false,
    color: "pink",
  },
];

const categories = ["All", "Accreditation", "Revenue", "Insurance", "Licensing", "MRD", "Recruitment"];

const colorMap: Record<string, string> = {
  blue: "bg-blue-50 text-blue-700 border-blue-100",
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
  violet: "bg-violet-50 text-violet-700 border-violet-100",
  cyan: "bg-cyan-50 text-cyan-700 border-cyan-100",
  amber: "bg-amber-50 text-amber-700 border-amber-100",
  pink: "bg-pink-50 text-pink-700 border-pink-100",
};

export default function BlogPageClient() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#0a1628] to-[#1d4ed8] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="container-xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-blue-200 border border-white/15 text-sm font-semibold mb-6">
              📚 Healthcare Insights
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-5">
              SCS{" "}
              <span className="gradient-text-hero">Intelligence</span>
            </h1>
            <p className="text-xl text-blue-100/70 max-w-xl mx-auto">
              Expert articles on NABH, licensing, revenue optimization, and everything
              that powers better hospitals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-py bg-white">
        <div className="container-xl">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                className="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Post */}
          {posts.filter((p) => p.featured).map((post) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <Link href={`/blog/${post.slug}`} className="glass-card rounded-3xl p-8 md:p-10 block hover-lift group">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${colorMap[post.color]}`}>{post.category}</span>
                      <span className="text-xs text-blue-600 font-bold bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">Featured</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 group-hover:text-blue-700 transition-colors mb-4 leading-tight">{post.title}</h2>
                    <p className="text-slate-500 leading-relaxed mb-5 text-lg">{post.excerpt}</p>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 text-sm text-slate-400"><Clock className="w-4 h-4" /> {post.readTime} min read</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-sm text-slate-400">{post.date}</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-sm text-slate-400">{post.author}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-blue-600 font-bold shrink-0">
                    Read Article <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Regular Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.filter((p) => !p.featured).map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link href={`/blog/${post.slug}`} className="glass-card rounded-3xl p-6 block hover-lift group h-full">
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${colorMap[post.color]} inline-flex items-center gap-1 mb-4`}>
                    <Tag className="w-3 h-3" /> {post.category}
                  </span>
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-700 transition-colors mb-3 leading-tight">{post.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Clock className="w-3 h-3" /> {post.readTime} min · {post.date}
                    </div>
                    <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-py bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container-xl max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="text-4xl mb-4">📬</div>
            <h2 className="text-3xl font-black text-slate-900 mb-3">Get Insights in Your Inbox</h2>
            <p className="text-slate-500 mb-6">Weekly healthcare intelligence — NABH updates, regulatory changes, and operational best practices.</p>
            <form className="flex gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="your@email.com" className="input-premium flex-1" />
              <button type="submit" className="btn-primary px-6 py-3 rounded-xl text-sm text-white whitespace-nowrap">Subscribe</button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
