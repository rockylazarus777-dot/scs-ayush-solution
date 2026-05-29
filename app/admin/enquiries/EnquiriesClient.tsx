"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Filter, Download, Phone, Mail, MessageSquare,
  Clock, ChevronDown, X, Eye, Edit2, Trash2
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { formatDate, formatRelativeDate } from "@/lib/utils";
import type { Enquiry } from "@/types/database";

const STATUS_OPTIONS = ["all", "new", "contacted", "in_progress", "converted", "closed"];

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700 border-blue-200",
  contacted: "bg-amber-100 text-amber-700 border-amber-200",
  in_progress: "bg-violet-100 text-violet-700 border-violet-200",
  converted: "bg-emerald-100 text-emerald-700 border-emerald-200",
  closed: "bg-slate-100 text-slate-600 border-slate-200",
};

export default function EnquiriesClient() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchEnquiries = useCallback(async () => {
    try {
      let query = supabase
        .from("enquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (statusFilter !== "all") query = query.eq("status", statusFilter);
      if (search) query = query.ilike("name", `%${search}%`);

      const { data } = await query;
      setEnquiries(data || []);
    } catch {
      // Demo data fallback
      setEnquiries([
        {
          id: "1", created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
          name: "Dr. Rajesh Kumar", email: "rajesh@hospital.com", phone: "9876543210",
          service: "NABH Consultancy", hospital_size: "medium", urgency: "soon",
          message: "We need NABH accreditation within 4 months.", status: "new",
          notes: null, source: "website", assigned_to: null,
        },
        {
          id: "2", created_at: new Date(Date.now() - 86400000).toISOString(), updated_at: new Date().toISOString(),
          name: "Priya Sharma", email: "priya@clinic.in", phone: "9765432100",
          service: "Hospital Licensing", hospital_size: "small", urgency: "immediate",
          message: null, status: "contacted",
          notes: "Called on Dec 10. Needs state license urgently.", source: "website", assigned_to: null,
        },
      ] as Enquiry[]);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, search]);

  useEffect(() => {
    const timer = setTimeout(fetchEnquiries, 300);
    return () => clearTimeout(timer);
  }, [fetchEnquiries]);

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      await (supabase as any).from("enquiries").update({ status }).eq("id", id);
      setEnquiries((prev) => prev.map((e) => e.id === id ? { ...e, status: status as Enquiry["status"] } : e));
      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry((prev) => prev ? { ...prev, status: status as Enquiry["status"] } : null);
      }
    } finally {
      setUpdatingId(null);
    }
  };

  const exportCSV = () => {
    const header = "Name,Email,Phone,Service,Hospital Size,Urgency,Status,Date\n";
    const rows = enquiries.map((e) =>
      `"${e.name}","${e.email}","${e.phone}","${e.service}","${e.hospital_size || ""}","${e.urgency || ""}","${e.status}","${formatDate(e.created_at)}"`
    ).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `enquiries-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Enquiries</h2>
          <p className="text-slate-500 text-sm mt-0.5">{enquiries.length} total enquiries</p>
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors text-sm font-semibold"
        >
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {STATUS_OPTIONS.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize transition-all duration-200 border ${
                statusFilter === status
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {status.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-400 animate-pulse">Loading enquiries...</div>
        ) : enquiries.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-semibold">No enquiries found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  {["Name", "Service", "Contact", "Urgency", "Status", "Date", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {enquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-slate-50/70 transition-colors group">
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-slate-800 text-sm">{enq.name}</div>
                      <div className="text-xs text-slate-400">{enq.hospital_size || "—"} hospital</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-1 rounded-lg">
                        {enq.service}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <a href={`tel:${enq.phone}`} className="flex items-center gap-1 text-xs text-slate-600 hover:text-blue-600">
                        <Phone className="w-3 h-3" /> {enq.phone}
                      </a>
                      <a href={`mailto:${enq.email}`} className="flex items-center gap-1 text-xs text-slate-400 hover:text-blue-600 mt-1">
                        <Mail className="w-3 h-3" /> {enq.email}
                      </a>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs text-slate-500 capitalize">{enq.urgency?.replace("_", " ") || "—"}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <select
                        value={enq.status}
                        onChange={(e) => updateStatus(enq.id, e.target.value)}
                        disabled={updatingId === enq.id}
                        className={`text-xs font-semibold px-2 py-1 rounded-lg border cursor-pointer appearance-none ${statusColors[enq.status] || statusColors.new}`}
                      >
                        {STATUS_OPTIONS.filter((s) => s !== "all").map((s) => (
                          <option key={s} value={s}>{s.replace("_", " ")}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="text-xs text-slate-600">{formatDate(enq.created_at)}</div>
                      <div className="text-[10px] text-slate-400">{formatRelativeDate(enq.created_at)}</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setSelectedEnquiry(enq)}
                          className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href={`tel:${enq.phone}`}
                          className="p-1.5 rounded-lg hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedEnquiry && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50"
              onClick={() => setSelectedEnquiry(null)}
            />
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[420px] bg-white z-[51] shadow-2xl overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                <h3 className="font-black text-slate-900">Enquiry Details</h3>
                <button onClick={() => setSelectedEnquiry(null)} className="p-2 rounded-xl hover:bg-slate-100">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              <div className="p-6 space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-black text-lg">
                    {selectedEnquiry.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-black text-slate-900">{selectedEnquiry.name}</div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${statusColors[selectedEnquiry.status]}`}>
                      {selectedEnquiry.status.replace("_", " ")}
                    </span>
                  </div>
                </div>

                {[
                  { label: "Service", value: selectedEnquiry.service },
                  { label: "Email", value: selectedEnquiry.email },
                  { label: "Phone", value: selectedEnquiry.phone },
                  { label: "Hospital Size", value: selectedEnquiry.hospital_size || "—" },
                  { label: "Urgency", value: selectedEnquiry.urgency || "—" },
                  { label: "Source", value: selectedEnquiry.source || "website" },
                  { label: "Submitted", value: formatDate(selectedEnquiry.created_at) },
                ].map((field) => (
                  <div key={field.label}>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{field.label}</div>
                    <div className="text-sm font-semibold text-slate-800">{field.value}</div>
                  </div>
                ))}

                {selectedEnquiry.message && (
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Message</div>
                    <div className="text-sm text-slate-700 bg-slate-50 rounded-xl p-3 leading-relaxed">{selectedEnquiry.message}</div>
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <a href={`tel:${selectedEnquiry.phone}`}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-50 text-blue-700 font-semibold text-sm hover:bg-blue-100 transition-colors">
                    <Phone className="w-4 h-4" /> Call
                  </a>
                  <a href={`mailto:${selectedEnquiry.email}`}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-50 text-slate-700 font-semibold text-sm hover:bg-slate-100 transition-colors">
                    <Mail className="w-4 h-4" /> Email
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
