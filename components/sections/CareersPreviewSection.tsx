"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Briefcase, Clock } from "lucide-react";

const jobs = [
  {
    id: "1",
    title: "NABH Consultant",
    type: "Full-time",
    location: "Mumbai / Remote",
    department: "Consultancy",
    urgent: true,
  },
  {
    id: "2",
    title: "Hospital Licensing Specialist",
    type: "Full-time",
    location: "Delhi NCR",
    department: "Compliance",
    urgent: false,
  },
  {
    id: "3",
    title: "Healthcare Revenue Analyst",
    type: "Full-time",
    location: "Pune / Hybrid",
    department: "Revenue",
    urgent: false,
  },
];

export default function CareersPreviewSection() {
  return (
    <section className="section-py bg-white relative overflow-hidden">
      <div className="absolute inset-0 section-mesh opacity-40 pointer-events-none" />
      <div className="container-xl relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-badge mb-4 inline-flex">💼 Careers</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900">
              Join Our{" "}
              <span className="gradient-text">Team</span>
            </h2>
            <p className="text-slate-500 mt-3 max-w-xl">
              Build a meaningful career transforming India&apos;s healthcare landscape.
              We hire passionate healthcare professionals.
            </p>
          </motion.div>
          <Link
            href="/careers"
            className="btn-secondary inline-flex items-center gap-2 text-sm shrink-0"
          >
            View All Openings <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {jobs.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href="/careers"
                className="glass-card rounded-3xl p-6 block hover-lift group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                  </div>
                  {job.urgent && (
                    <span className="text-[10px] font-bold px-2.5 py-1 bg-red-50 text-red-600 border border-red-100 rounded-full">
                      Urgent Hiring
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-700 transition-colors mb-2">
                  {job.title}
                </h3>
                <p className="text-xs font-semibold text-blue-600 mb-4">{job.department}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="flex items-center gap-1 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full">
                    <MapPin className="w-3 h-3" /> {job.location}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full">
                    <Clock className="w-3 h-3" /> {job.type}
                  </span>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-blue-600 font-semibold group-hover:underline">
                    Apply Now
                  </span>
                  <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Upload resume CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-xl font-black text-slate-900 mb-1">Don&apos;t see your role?</h3>
            <p className="text-slate-500 text-sm">
              We&apos;re always looking for talented healthcare professionals. Send us your resume.
            </p>
          </div>
          <Link
            href="/careers#apply"
            className="btn-primary inline-flex items-center gap-2 text-sm px-7 py-3.5 rounded-2xl text-white shrink-0"
          >
            Send Your Resume <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
