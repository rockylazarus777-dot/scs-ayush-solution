import { Metadata } from "next";
export const metadata: Metadata = { title: "Job Applications" };

export default function AdminApplicationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Job Applications</h2>
          <p className="text-slate-500 text-sm mt-0.5">Manage candidate applications</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center text-slate-400">
        <div className="text-4xl mb-3">👥</div>
        <p className="font-semibold text-slate-600">Applications Manager Ready</p>
        <p className="text-sm mt-1">All applications submitted via the Careers page will appear here.</p>
      </div>
    </div>
  );
}
