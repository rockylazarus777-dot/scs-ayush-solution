"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, BookOpen } from "lucide-react";

const blogPosts = [
  {
    id: "1",
    slug: "nabh-accreditation-guide-2024",
    title: "Complete Guide to NABH Accreditation in 2024",
    excerpt: "A step-by-step walkthrough of the NABH accreditation process — from gap assessment to final certification. What hospitals need to know.",
    category: "Accreditation",
    readTime: 8,
    date: "Dec 10, 2024",
    color: "blue",
  },
  {
    id: "2",
    slug: "hospital-revenue-leakage-top-10",
    title: "Top 10 Sources of Hospital Revenue Leakage",
    excerpt: "Most hospitals lose 15–25% of potential revenue through billing gaps. Here's where it goes and how to plug the drain.",
    category: "Revenue",
    readTime: 6,
    date: "Dec 2, 2024",
    color: "emerald",
  },
  {
    id: "3",
    slug: "tpa-empanelment-checklist",
    title: "TPA Empanelment Checklist Every Hospital Needs",
    excerpt: "Getting empanelled with insurance companies is complex. Use our comprehensive checklist to ensure you don't miss a single requirement.",
    category: "Insurance",
    readTime: 5,
    date: "Nov 22, 2024",
    color: "violet",
  },
];

const colorMap: Record<string, { badge: string; text: string }> = {
  blue:    { badge: "bg-blue-50 text-blue-700 border-blue-100",    text: "text-blue-600" },
  emerald: { badge: "bg-emerald-50 text-emerald-700 border-emerald-100", text: "text-emerald-600" },
  violet:  { badge: "bg-violet-50 text-violet-700 border-violet-100",   text: "text-violet-600" },
};

export default function BlogPreviewSection() {
  return (
    <section className="section-py bg-slate-50 relative overflow-hidden">
      <div className="container-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-badge mb-4 inline-flex">📚 Latest Insights</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900">
              Healthcare{" "}
              <span className="gradient-text">Intelligence</span>
            </h2>
          </motion.div>
          <Link
            href="/blog"
            className="btn-secondary inline-flex items-center gap-2 text-sm shrink-0"
          >
            View All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => {
            const colors = colorMap[post.color];
            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="glass-card rounded-3xl p-6 block hover-lift group h-full"
                >
                  <div className="mb-4">
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${colors.badge}`}>
                      {post.category}
                    </span>
                  </div>
                  <h3 className={`text-lg font-black text-slate-900 mb-3 group-hover:${colors.text} transition-colors leading-tight`}>
                    {post.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock className="w-3.5 h-3.5" /> {post.readTime} min read
                      </span>
                      <span className="text-xs text-slate-300">·</span>
                      <span className="text-xs text-slate-400">{post.date}</span>
                    </div>
                    <BookOpen className={`w-4 h-4 ${colors.text} opacity-60 group-hover:opacity-100 transition-opacity`} />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
