import { Metadata } from "next";
export const metadata: Metadata = { title: "Testimonials" };

export default function AdminTestimonialsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Testimonials</h2>
          <p className="text-slate-500 text-sm mt-0.5">Manage client success stories</p>
        </div>
        <a href="/admin/testimonials/new" className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl text-sm shadow-md hover:shadow-lg transition-shadow">
          + Add Testimonial
        </a>
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center text-slate-400">
        <div className="text-4xl mb-3">⭐</div>
        <p className="font-semibold text-slate-600">Testimonials Manager Ready</p>
        <p className="text-sm mt-1">Connect to Supabase to manage and publish testimonials.</p>
      </div>
    </div>
  );
}
