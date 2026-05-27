import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

// Static blog posts data (replace with Supabase in production)
const posts: Record<string, {
  title: string; excerpt: string; content: string;
  category: string; readTime: number; date: string; author: string;
}> = {
  "nabh-accreditation-guide-2024": {
    title: "Complete Guide to NABH Accreditation in 2024",
    excerpt: "A step-by-step walkthrough of the NABH accreditation process.",
    category: "Accreditation",
    readTime: 8,
    date: "December 10, 2024",
    author: "Dr. Anjali Sharma",
    content: `
# Complete Guide to NABH Accreditation in 2024

NABH (National Accreditation Board for Hospitals & Healthcare Providers) accreditation is the gold standard for hospital quality in India. Achieving NABH certification demonstrates your commitment to patient safety, quality care, and operational excellence.

## What is NABH Accreditation?

NABH is a constituent board of Quality Council of India (QCI) set up to establish and operate accreditation program for healthcare organizations. The NABH standards cover 10 chapters with 102 standards and 636 objective elements.

## Step 1: Gap Assessment

The first step is conducting a comprehensive gap assessment to identify where your hospital currently stands versus NABH requirements. This involves:

- Reviewing all 10 NABH chapter requirements
- Assessing current documentation status
- Identifying process gaps
- Evaluating infrastructure requirements
- Staff competency assessment

## Step 2: QMS Development

Building a Quality Management System (QMS) is the foundation of NABH compliance...

## Step 3: Documentation

NABH requires extensive documentation including policies, procedures, SOPs, and records...

## Step 4: Staff Training

All staff must be trained on NABH standards, quality policies, and their individual roles...

## Step 5: Internal Audits & Mock Assessment

Before applying for NABH assessment, conduct multiple internal audits...

## The Assessment Process

Once ready, submit your application to NABH. They will schedule:
1. **Desktop Review**: Document review
2. **Validation Visit**: On-site pre-assessment
3. **Assessment Visit**: Final certification audit

## Timeline

A well-prepared hospital can achieve NABH accreditation in **3–6 months** with expert support.

---

*Need NABH consultancy? [Contact SCS Ayush Solution](/contact) for a free gap assessment.*
    `,
  },
};

interface Props { params: Promise<{ slug: string }>; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) {
    return (
      <main className="min-h-screen bg-white pt-32 pb-20">
        <div className="container-xl text-center">
          <h1 className="text-4xl font-black text-slate-900 mb-4">Article Not Found</h1>
          <p className="text-slate-500 mb-8">This article doesn&apos;t exist or has been moved.</p>
          <Link href="/blog" className="btn-primary inline-flex items-center gap-2 text-sm px-6 py-3 rounded-xl text-white">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0a1628] to-[#1d4ed8] pt-32 pb-16">
        <div className="container-xl max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-blue-300/70 hover:text-blue-200 text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <span className="inline-block text-xs font-bold px-3 py-1.5 bg-blue-500/20 text-blue-200 border border-blue-400/20 rounded-full mb-4">
            {post.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-blue-200/60 text-sm">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.readTime} min read</span>
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</span>
            <span>By {post.author}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container-xl max-w-3xl">
          <div className="prose prose-lg max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-blue-600 prose-li:text-slate-600">
            <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br/>").replace(/## /g, "<h2>").replace(/# /g, "<h1>") }} />
          </div>

          {/* CTA */}
          <div className="mt-12 p-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl border border-blue-100">
            <h3 className="text-2xl font-black text-slate-900 mb-2">Need Expert Help?</h3>
            <p className="text-slate-500 mb-5">Our healthcare consultants are ready to guide your hospital through this process.</p>
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2 text-sm px-7 py-3.5 rounded-xl text-white">
              Book Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
