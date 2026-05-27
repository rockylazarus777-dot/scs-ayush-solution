"use client";
import { useState } from "react";
export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-2xl font-black text-slate-900">Settings</h2>
        <p className="text-slate-500 text-sm mt-0.5">Configure your admin preferences</p>
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
        <h3 className="font-black text-slate-900 text-lg border-b border-slate-100 pb-3">Notification Preferences</h3>
        {[
          { label: "Email on new enquiry", id: "email-enquiry" },
          { label: "Email on new job application", id: "email-application" },
          { label: "Daily digest report", id: "daily-digest" },
        ].map((pref) => (
          <div key={pref.id} className="flex items-center justify-between">
            <label htmlFor={pref.id} className="text-sm font-medium text-slate-700">{pref.label}</label>
            <input type="checkbox" id={pref.id} defaultChecked className="w-4 h-4 accent-blue-600 rounded" />
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4">
        <h3 className="font-black text-slate-900 text-lg border-b border-slate-100 pb-3">Company Info</h3>
        {[
          { label: "Company Name", placeholder: "SCS Ayush Solution" },
          { label: "Admin Email", placeholder: "admin@scsayushsolution.com" },
          { label: "Phone", placeholder: "+91 98765 43210" },
        ].map((f) => (
          <div key={f.label}>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">{f.label}</label>
            <input placeholder={f.placeholder} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-400" />
          </div>
        ))}
      </div>
      <button
        onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl text-sm"
      >
        {saved ? "✓ Saved!" : "Save Settings"}
      </button>
    </div>
  );
}
