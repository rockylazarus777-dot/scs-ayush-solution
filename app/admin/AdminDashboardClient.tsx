"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MessageSquare, Users, FileText, Star, ArrowRight,
  TrendingUp, Clock, CheckCircle, AlertCircle
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { formatRelativeDate } from "@/lib/utils";

interface DashboardStats {
  enquiries: number;
  newEnquiries: number;
  applications: number;
  blogPosts: number;
  testimonials: number;
}

interface RecentEnquiry {
  id: string;
  name: string;
  service: string;
  status: string;
  created_at: string;
}

const statCards = [
  {
    key: "enquiries",
    label: "Total Enquiries",
    icon: MessageSquare,
    href: "/admin/enquiries",
    color: "from-blue-500 to-blue-600",
    lightColor: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    key: "newEnquiries",
    label: "New (Unread)",
    icon: AlertCircle,
    href: "/admin/enquiries?status=new",
    color: "from-red-500 to-red-600",
    lightColor: "bg-red-50",
    textColor: "text-red-600",
  },
  {
    key: "applications",
    label: "Job Applications",
    icon: Users,
    href: "/admin/applications",
    color: "from-violet-500 to-violet-600",
    lightColor: "bg-violet-50",
    textColor: "text-violet-600",
  },
  {
    key: "blogPosts",
    label: "Blog Posts",
    icon: FileText,
    href: "/admin/blog",
    color: "from-emerald-500 to-emerald-600",
    lightColor: "bg-emerald-50",
    textColor: "text-emerald-600",
  },
];

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-amber-100 text-amber-700",
  in_progress: "bg-violet-100 text-violet-700",
  converted: "bg-emerald-100 text-emerald-700",
  closed: "bg-slate-100 text-slate-600",
};

export default function AdminDashboardClient() {
  const [stats, setStats] = useState<DashboardStats>({
    enquiries: 0, newEnquiries: 0, applications: 0, blogPosts: 0, testimonials: 0,
  });
  const [recentEnquiries, setRecentEnquiries] = useState<RecentEnquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
const [
          { count: enquiriesCount },
          { count: newCount },
          { count: appsCount },
          { count: blogCount },
          { data: recent },
        ] = await Promise.all([
          supabase.from("enquiries").select("*", { count: "exact", head: true }),
          supabase.from("enquiries").select("*", { count: "exact", head: true }).eq("status", "new"),
          supabase.from("job_applications").select("*", { count: "exact", head: true }),
          supabase.from("blog_posts").select("*", { count: "exact", head: true }),
          supabase.from("enquiries").select("id, name, service, status, created_at").order("created_at", { ascending: false }).limit(8),
        ]);

        setStats({
          enquiries: enquiriesCount || 0,
          newEnquiries: newCount || 0,
          applications: appsCount || 0,
          blogPosts: blogCount || 0,
          testimonials: 0,
        });
        setRecentEnquiries(recent || []);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
        // Use demo data
        setStats({ enquiries: 24, newEnquiries: 7, applications: 12, blogPosts: 6, testimonials: 5 });
        setRecentEnquiries([
          { id: "1", name: "Dr. Rajesh Kumar", service: "NABH Consultancy", status: "new", created_at: new Date().toISOString() },
          { id: "2", name: "Priya Sharma", service: "Hospital Licensing", status: "contacted", created_at: new Date(Date.now() - 3600000).toISOString() },
          { id: "3", name: "Anil Mehta", service: "Revenue Scanning", status: "in_progress", created_at: new Date(Date.now() - 86400000).toISOString() },
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-black text-slate-900">Good morning, Admin 👋</h2>
        <p className="text-slate-500 text-sm mt-1">Here&apos;s what&apos;s happening with SCS Ayush Solution today.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          const value = stats[card.key as keyof DashboardStats];
          return (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link href={card.href} className="block bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                <div className={`w-10 h-10 rounded-xl ${card.lightColor} flex items-center justify-center mb-4`}>
                  <Icon className={`w-5 h-5 ${card.textColor}`} />
                </div>
                <div className="text-3xl font-black text-slate-900 mb-1">
                  {loading ? <div className="h-8 w-12 bg-slate-100 rounded animate-pulse" /> : value}
                </div>
                <div className="text-sm text-slate-500 flex items-center justify-between">
                  {card.label}
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Enquiries */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h3 className="font-black text-slate-900">Recent Enquiries</h3>
            <Link href="/admin/enquiries" className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="px-6 py-4 flex items-center gap-4 animate-pulse">
                  <div className="w-9 h-9 rounded-xl bg-slate-100" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 bg-slate-100 rounded w-1/3" />
                    <div className="h-2.5 bg-slate-50 rounded w-1/2" />
                  </div>
                  <div className="h-5 w-16 bg-slate-100 rounded-full" />
                </div>
              ))
            ) : recentEnquiries.length === 0 ? (
              <div className="px-6 py-12 text-center text-slate-400 text-sm">No enquiries yet</div>
            ) : (
              recentEnquiries.map((enq) => (
                <Link
                  key={enq.id}
                  href={`/admin/enquiries`}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 flex items-center justify-center shrink-0">
                    <span className="text-xs font-black text-blue-600">
                      {enq.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-slate-800 truncate">{enq.name}</div>
                    <div className="text-xs text-slate-400 truncate">{enq.service}</div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColors[enq.status] || statusColors.new}`}>
                      {enq.status.replace("_", " ")}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" /> {formatRelativeDate(enq.created_at)}
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h3 className="font-black text-slate-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { label: "Add Blog Post", href: "/admin/blog/new", icon: FileText, color: "text-emerald-600 bg-emerald-50" },
                { label: "Add Job Listing", href: "/admin/careers/new", icon: Users, color: "text-violet-600 bg-violet-50" },
                { label: "Review Enquiries", href: "/admin/enquiries?status=new", icon: MessageSquare, color: "text-blue-600 bg-blue-50" },
                { label: "Add Testimonial", href: "/admin/testimonials/new", icon: Star, color: "text-amber-600 bg-amber-50" },
              ].map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                  >
                    <div className={`w-8 h-8 rounded-lg ${action.color} flex items-center justify-center shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900">{action.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 ml-auto group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Status overview */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h3 className="font-black text-slate-900 mb-4">Enquiry Status</h3>
            <div className="space-y-3">
              {[
                { label: "New", percent: 30, color: "from-blue-400 to-blue-500" },
                { label: "In Progress", percent: 45, color: "from-violet-400 to-violet-500" },
                { label: "Converted", percent: 20, color: "from-emerald-400 to-emerald-500" },
                { label: "Closed", percent: 5, color: "from-slate-300 to-slate-400" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600 font-medium">{item.label}</span>
                    <span className="text-slate-400">{item.percent}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percent}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
