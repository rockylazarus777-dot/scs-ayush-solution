"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, MessageSquare, FileText, Briefcase, Users,
  Star, Settings, LogOut, Menu, X, Bell, ChevronRight,
  TrendingUp, Building2
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard", exact: true },
  { href: "/admin/enquiries", icon: MessageSquare, label: "Enquiries" },
  { href: "/admin/blog", icon: FileText, label: "Blog Posts" },
  { href: "/admin/careers", icon: Briefcase, label: "Job Listings" },
  { href: "/admin/applications", icon: Users, label: "Applications" },
  { href: "/admin/testimonials", icon: Star, label: "Testimonials" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
];

function AdminAuthGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("scs_admin_token");
    setAuthed(token === process.env.NEXT_PUBLIC_ADMIN_TOKEN || token === "scs_admin_2024");
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check — replace with Supabase auth in production
    const validPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "SCSAdmin@2024";
    if (password === validPassword) {
      sessionStorage.setItem("scs_admin_token", "scs_admin_2024");
      setAuthed(true);
    } else {
      setError("Invalid password");
    }
  };

  if (authed === null) return null;

  if (!authed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a1628] to-[#1d4ed8] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="glass-dark rounded-3xl p-8 w-full max-w-sm border border-white/10"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-black text-white">Admin Login</h1>
            <p className="text-blue-200/60 text-sm mt-1">SCS Ayush Solution</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs text-blue-200/60 font-medium mb-1 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-blue-400 text-sm"
              />
              {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
            </div>
            <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl text-sm hover:opacity-90 transition-opacity">
              Login to Dashboard
            </button>
          </form>
          <p className="text-center text-xs text-white/20 mt-4">
            Protected by SCS Ayush Solution
          </p>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const handleLogout = () => {
    sessionStorage.removeItem("scs_admin_token");
    window.location.href = "/admin";
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0">
            <span className="text-white font-black text-xs">SCS</span>
          </div>
          <div className={cn("transition-all duration-300 overflow-hidden", !sidebarOpen && "lg:w-0 lg:opacity-0")}>
            <div className="text-white font-black text-sm whitespace-nowrap">SCS Admin</div>
            <div className="text-blue-300/60 text-xs whitespace-nowrap">Dashboard v1.0</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                active
                  ? "bg-gradient-to-r from-blue-600/30 to-cyan-600/20 text-white border border-blue-500/30"
                  : "text-blue-200/60 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon className={cn("w-5 h-5 shrink-0", active ? "text-blue-300" : "")} />
              <span className={cn(
                "text-sm font-medium whitespace-nowrap transition-all duration-300",
                !sidebarOpen && "lg:w-0 lg:opacity-0 lg:overflow-hidden"
              )}>
                {item.label}
              </span>
              {active && sidebarOpen && (
                <ChevronRight className="w-3.5 h-3.5 ml-auto text-blue-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-white/10">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-blue-200/60 hover:text-white hover:bg-white/5 transition-all duration-200 mb-1 text-sm"
        >
          <TrendingUp className="w-5 h-5 shrink-0" />
          <span className={cn(!sidebarOpen && "lg:hidden")}>View Website</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 text-sm"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          <span className={cn(!sidebarOpen && "lg:hidden")}>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <AdminAuthGate>
      <div className="min-h-screen bg-slate-50 flex">
        {/* Desktop Sidebar */}
        <aside
          className={cn(
            "hidden lg:flex flex-col fixed top-0 left-0 bottom-0 z-50 bg-gradient-to-b from-[#0a1628] to-[#0f2562] transition-all duration-300 shadow-xl",
            sidebarOpen ? "w-64" : "w-[72px]"
          )}
        >
          <SidebarContent />
          {/* Toggle button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute top-6 -right-3.5 w-7 h-7 rounded-full bg-[#1d4ed8] border-2 border-slate-50 flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors"
          >
            <ChevronRight className={cn("w-3.5 h-3.5 text-white transition-transform", sidebarOpen && "rotate-180")} />
          </button>
        </aside>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {mobileSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                onClick={() => setMobileSidebarOpen(false)}
              />
              <motion.aside
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed top-0 left-0 bottom-0 w-64 z-50 bg-gradient-to-b from-[#0a1628] to-[#0f2562] shadow-2xl lg:hidden"
              >
                <SidebarContent />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className={cn("flex-1 flex flex-col min-h-screen transition-all duration-300", sidebarOpen ? "lg:ml-64" : "lg:ml-[72px]")}>
          {/* Top bar */}
          <header className="sticky top-0 z-30 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl hover:bg-slate-100 text-slate-600"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-base font-black text-slate-900 capitalize">
                  {pathname === "/admin" ? "Dashboard" : pathname.split("/admin/")[1]?.replace("-", " ") || "Admin"}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-xl hover:bg-slate-100 text-slate-500">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
              </button>
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                SA
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </AdminAuthGate>
  );
}
