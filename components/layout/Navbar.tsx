"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { SERVICES, COMPANY_INFO } from "@/lib/utils";
import {
  Menu, X, Phone, ChevronDown, ArrowRight,
  Building2, Award, FileText, TrendingUp, Shield,
  UserCheck, Megaphone, Users, Tent
} from "lucide-react";

const serviceIcons: Record<string, React.ElementType> = {
  "hospital-licensing": Building2,
  "nabh-consultancy": Award,
  "mrd-services": FileText,
  "ip-op-revenue-scanning": TrendingUp,
  "insurance-tpa-support": Shield,
  "doctor-referral-services": UserCheck,
  "hospital-marketing": Megaphone,
  "recruitment": Users,
  "medical-camps": Tent,
};

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const servicesRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleServicesEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setServicesOpen(true);
  };

  const handleServicesLeave = () => {
    timeoutRef.current = setTimeout(() => setServicesOpen(false), 150);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-[300] transition-all duration-500",
          scrolled
            ? "py-3 bg-white/90 backdrop-blur-2xl shadow-[0_2px_40px_rgba(29,78,216,0.08)] border-b border-blue-50"
            : "py-5 bg-transparent"
        )}
      >
        <div className="container-xl flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg group-hover:shadow-blue-500/30 transition-shadow duration-300">
                <span className="text-white font-black text-sm tracking-tight">SCS</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-cyan-400 border-2 border-white animate-pulse" />
            </div>
            <div className="hidden sm:block">
              <div className={cn(
                "font-black text-[17px] leading-none transition-colors duration-300",
                scrolled ? "text-slate-900" : "text-white"
              )}>
                SCS Ayush Solution
              </div>
              <div className={cn(
                "text-[10px] font-medium tracking-widest uppercase transition-colors duration-300 mt-0.5",
                scrolled ? "text-blue-600" : "text-blue-200"
              )}>
                Healthcare Partner
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.href}
                  ref={servicesRef}
                  className="relative"
                  onMouseEnter={handleServicesEnter}
                  onMouseLeave={handleServicesLeave}
                >
                  <button
                    className={cn(
                      "nav-link flex items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300",
                      scrolled ? "text-slate-600 hover:text-blue-600 hover:bg-blue-50" : "text-white/80 hover:text-white hover:bg-white/10",
                      isActive(link.href) && (scrolled ? "text-blue-600 bg-blue-50" : "text-white")
                    )}
                  >
                    {link.label}
                    <ChevronDown
                      className={cn(
                        "w-3.5 h-3.5 transition-transform duration-300",
                        servicesOpen && "rotate-180"
                      )}
                    />
                  </button>

                  {/* Mega Dropdown */}
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[640px] glass-card rounded-3xl p-6 shadow-2xl border border-blue-50 z-50"
                        onMouseEnter={handleServicesEnter}
                        onMouseLeave={handleServicesLeave}
                      >
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">Our Services</p>
                          <p className="text-sm text-slate-500">Comprehensive healthcare consultancy solutions</p>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {SERVICES.map((service) => {
                            const Icon = serviceIcons[service.slug] || Building2;
                            return (
                              <Link
                                key={service.id}
                                href={`/services/${service.slug}`}
                                className="flex items-start gap-3 p-3 rounded-2xl hover:bg-blue-50 transition-all duration-200 group/item"
                              >
                                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center shrink-0 group-hover/item:from-blue-500/20 group-hover/item:to-cyan-500/20 transition-all duration-200">
                                  <Icon className="w-4 h-4 text-blue-600" />
                                </div>
                                <div>
                                  <div className="text-[13px] font-semibold text-slate-800 group-hover/item:text-blue-700 transition-colors duration-200 leading-tight">
                                    {service.title}
                                  </div>
                                  <div className="text-[11px] text-slate-400 mt-0.5 leading-tight line-clamp-2">
                                    {service.shortDesc.substring(0, 50)}...
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                        <div className="mt-4 pt-4 border-t border-blue-50 flex items-center justify-between">
                          <p className="text-xs text-slate-400">Need help choosing? Talk to an expert.</p>
                          <Link
                            href="/services"
                            className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            View all services <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
                    scrolled
                      ? "text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                      : "text-white/80 hover:text-white hover:bg-white/10",
                    isActive(link.href) && (scrolled ? "text-blue-600 bg-blue-50" : "text-white bg-white/10")
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-all duration-300",
                scrolled ? "text-slate-600 hover:text-blue-600" : "text-white/80 hover:text-white"
              )}
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden xl:block">{COMPANY_INFO.phone}</span>
            </a>
            <Link
              href="/contact"
              className="btn-primary text-sm px-6 py-2.5 text-white rounded-xl"
            >
              Get Free Consultation
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(
              "lg:hidden p-2 rounded-xl transition-all duration-300",
              scrolled ? "text-slate-700 hover:bg-blue-50" : "text-white hover:bg-white/10"
            )}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[250] lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[320px] bg-white z-[280] lg:hidden shadow-2xl overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                    <span className="text-white font-black text-xs">SCS</span>
                  </div>
                  <span className="font-bold text-slate-900 text-sm">SCS Ayush Solution</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="p-6 space-y-1">
                {navLinks.map((link) => (
                  <div key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                        isActive(link.href)
                          ? "bg-blue-50 text-blue-700"
                          : "text-slate-700 hover:bg-slate-50"
                      )}
                    >
                      {link.label}
                    </Link>
                  </div>
                ))}
              </nav>

              <div className="px-6 pb-6 space-y-3">
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 text-sm font-medium text-slate-700"
                >
                  <Phone className="w-4 h-4 text-blue-600" />
                  {COMPANY_INFO.phone}
                </a>
                <Link
                  href="/contact"
                  className="btn-primary w-full text-center text-sm py-3 rounded-xl text-white"
                >
                  Get Free Consultation
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
