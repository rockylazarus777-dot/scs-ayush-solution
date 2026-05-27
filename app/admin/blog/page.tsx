import { Metadata } from "next";
export const metadata: Metadata = { title: "Blog Posts" };

export default function AdminBlogPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Blog Posts</h2>
          <p className="text-slate-500 text-sm mt-0.5">Manage your healthcare insights content</p>
        </div>
        <a href="/admin/blog/new" className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl text-sm shadow-md hover:shadow-lg transition-shadow">
          + New Post
        </a>
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center text-slate-400">
        <div className="text-4xl mb-3">📝</div>
        <p className="font-semibold text-slate-600">Blog CMS Ready</p>
        <p className="text-sm mt-1">Connect to Supabase to manage blog posts. Schema is set up.</p>
      </div>
    </div>
  );
}
