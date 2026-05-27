"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Clock, Briefcase, ArrowRight, Upload, CheckCircle, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

const jobs = [
  {
    id: "nabh-consultant",
    title: "NABH Consultant",
    department: "Consultancy",
    type: "Full-time",
    location: "Mumbai / Remote",
    experience: "3–8 years",
    description: "Lead NABH accreditation projects end-to-end for hospital clients. Conduct gap assessments, develop QMS, train staff, and manage audit preparation.",
    requirements: [
      "3+ years NABH/JCI accreditation experience",
      "Excellent understanding of NABH standards",
      "Strong communication and training skills",
      "Willingness to travel to client locations",
    ],
    urgent: true,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "hospital-licensing",
    title: "Hospital Licensing Specialist",
    department: "Compliance",
    type: "Full-time",
    location: "Delhi NCR",
    experience: "2–5 years",
    description: "Manage complete hospital licensing processes including documentation, liaison with government bodies, and compliance reporting.",
    requirements: [
      "Knowledge of state/central healthcare licensing",
      "Experience in regulatory documentation",
      "Strong follow-up and coordination skills",
    ],
    urgent: false,
    color: "from-cyan-500 to-cyan-600",
  },
  {
    id: "revenue-analyst",
    title: "Healthcare Revenue Analyst",
    department: "Revenue & Finance",
    type: "Full-time",
    location: "Pune / Hybrid",
    experience: "2–4 years",
    description: "Audit hospital IP/OP billing systems, identify revenue leakages, and implement corrective processes to optimize financial performance.",
    requirements: [
      "Experience in hospital billing/coding",
      "Knowledge of ICD-10 and insurance claims",
      "Analytical mindset with Excel proficiency",
    ],
    urgent: false,
    color: "from-emerald-500 to-emerald-600",
  },
  {
    id: "tpa-executive",
    title: "TPA & Insurance Executive",
    department: "Insurance",
    type: "Full-time",
    location: "Mumbai / Bangalore",
    experience: "1–3 years",
    description: "Handle TPA empanelment processes, manage insurance pre-authorizations, and resolve claim denials for hospital clients.",
    requirements: [
      "Experience with TPA/insurance processes",
      "Understanding of cashless claim procedures",
      "Strong documentation skills",
    ],
    urgent: false,
    color: "from-violet-500 to-violet-600",
  },
  {
    id: "healthcare-recruiter",
    title: "Healthcare Talent Recruiter",
    department: "Recruitment",
    type: "Full-time",
    location: "Pan-India / Remote",
    experience: "2–5 years",
    description: "Source and place qualified medical professionals — doctors, nurses, technicians, and administrators — for our hospital clients.",
    requirements: [
      "2+ years recruitment experience (healthcare preferred)",
      "Strong sourcing and screening skills",
      "Existing network in healthcare sector a plus",
    ],
    urgent: false,
    color: "from-pink-500 to-pink-600",
  },
];

const applicationSchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Invalid email"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid mobile number"),
  position: z.string().min(1, "Please select a position"),
  experience: z.string().min(1, "Experience required"),
  coverLetter: z.string().optional(),
});

type AppForm = z.infer<typeof applicationSchema>;

export default function CareersPageClient() {
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<AppForm>({
    resolver: zodResolver(applicationSchema),
  });

  const onSubmit = async (data: AppForm) => {
    setLoading(true);
    try {
      await fetch("/api/career", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSubmitted(true);
      reset();
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    { icon: "💰", title: "Competitive Salary", desc: "Industry-leading compensation + performance bonuses" },
    { icon: "🌍", title: "Remote-Friendly", desc: "Flexible work arrangements for most roles" },
    { icon: "📚", title: "Learning Budget", desc: "Annual training & certification support" },
    { icon: "🏥", title: "Health Coverage", desc: "Comprehensive medical insurance for you and family" },
    { icon: "🚀", title: "Growth Path", desc: "Clear career progression with mentorship" },
    { icon: "🤝", title: "Impact-Driven", desc: "Your work directly improves healthcare in India" },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-center bg-gradient-to-br from-[#0a1628] via-[#0f2562] to-[#7c3aed] pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="container-xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-blue-200 border border-white/15 text-sm font-semibold mb-6">
              💼 Careers at SCS Ayush Solution
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-5 leading-tight">
              Build the Future<br />
              <span className="gradient-text-hero">of Indian Healthcare</span>
            </h1>
            <p className="text-xl text-blue-100/70 max-w-2xl leading-relaxed">
              Join a team of 80+ healthcare professionals on a mission to transform
              hospital operations across India. Purposeful work with real impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-py bg-white">
        <div className="container-xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="section-badge mb-4 inline-flex">Why Join Us?</span>
            <h2 className="text-4xl font-black text-slate-900">Perks & <span className="gradient-text">Benefits</span></h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <motion.div key={b.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="glass-card rounded-3xl p-6 text-center hover-lift">
                <div className="text-3xl mb-3">{b.icon}</div>
                <h3 className="font-black text-slate-900 mb-1">{b.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="section-py bg-slate-50">
        <div className="container-xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="section-badge mb-4 inline-flex">🔥 Open Positions</span>
            <h2 className="text-4xl font-black text-slate-900">Current <span className="gradient-text">Openings</span></h2>
          </motion.div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {jobs.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card rounded-3xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                  className="w-full text-left p-6 flex items-start justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${job.color} flex items-center justify-center shrink-0`}>
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-black text-slate-900 text-lg">{job.title}</h3>
                        {job.urgent && (
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-red-50 text-red-600 border border-red-100 rounded-full">Urgent</span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <MapPin className="w-3 h-3" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <Clock className="w-3 h-3" /> {job.type}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <Briefcase className="w-3 h-3" /> {job.experience}
                        </span>
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                          {job.department}
                        </span>
                      </div>
                    </div>
                  </div>
                  {expandedJob === job.id ? (
                    <ChevronUp className="w-5 h-5 text-slate-400 shrink-0 mt-1" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 mt-1" />
                  )}
                </button>

                <AnimatePresence>
                  {expandedJob === job.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0 border-t border-slate-100">
                        <p className="text-slate-600 text-sm leading-relaxed mt-4 mb-4">{job.description}</p>
                        <div className="mb-5">
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Requirements</p>
                          <ul className="space-y-1.5">
                            {job.requirements.map((req) => (
                              <li key={req} className="flex items-start gap-2 text-sm text-slate-600">
                                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <a href="#apply" className="btn-primary inline-flex items-center gap-2 text-sm px-6 py-3 rounded-xl text-white">
                          Apply for This Role <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="section-py bg-white">
        <div className="container-xl">
          <div className="max-w-2xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
              <span className="section-badge mb-4 inline-flex">📝 Apply Now</span>
              <h2 className="text-4xl font-black text-slate-900 mb-3">Send Your Application</h2>
              <p className="text-slate-500">Our HR team will review your application and contact you within 3–5 business days.</p>
            </motion.div>

            {submitted ? (
              <div className="glass-card rounded-3xl p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">Application Received! 🎉</h3>
                <p className="text-slate-500 mb-6">Our HR team will review your application and get back to you within 3–5 business days.</p>
                <button onClick={() => setSubmitted(false)} className="btn-secondary text-sm">Submit Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="glass-card rounded-3xl p-8 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Full Name *</label>
                    <input {...register("name")} placeholder="Your name" className="input-premium" />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Phone *</label>
                    <input {...register("phone")} placeholder="10-digit mobile" className="input-premium" />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Email *</label>
                  <input {...register("email")} type="email" placeholder="you@email.com" className="input-premium" />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Position *</label>
                  <select {...register("position")} className="input-premium">
                    <option value="">Select a position</option>
                    {jobs.map((j) => <option key={j.id} value={j.title}>{j.title}</option>)}
                    <option value="Other">Other / Open Application</option>
                  </select>
                  {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position.message}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Years of Experience *</label>
                  <select {...register("experience")} className="input-premium">
                    <option value="">Select</option>
                    <option value="0-1 years">0–1 years (Fresher)</option>
                    <option value="1-3 years">1–3 years</option>
                    <option value="3-5 years">3–5 years</option>
                    <option value="5-10 years">5–10 years</option>
                    <option value="10+ years">10+ years</option>
                  </select>
                  {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience.message}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Cover Letter / Message</label>
                  <textarea {...register("coverLetter")} rows={4} placeholder="Tell us why you want to join SCS Ayush Solution..." className="input-premium resize-none" />
                </div>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-5 text-center hover:border-blue-300 transition-colors cursor-pointer">
                  <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-600">Upload Resume (PDF)</p>
                  <p className="text-xs text-slate-400 mt-1">Or email directly to hr@scsayushsolution.com</p>
                </div>
                <button type="submit" disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-2 text-sm py-4 rounded-2xl text-white disabled:opacity-60">
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</> : <><Upload className="w-4 h-4" /> Submit Application</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
