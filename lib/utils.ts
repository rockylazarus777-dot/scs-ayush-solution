import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatRelativeDate(date: string | Date): string {
  const now = new Date();
  const d = new Date(date);
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 30) return `${diffDays}d ago`;
  return formatDate(date);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(str: string, length: number): string {
  return str.length > length ? str.slice(0, length) + "..." : str;
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("91") && cleaned.length === 12) {
    return `+91 ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
  }
  return phone;
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function (...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone: string): boolean {
  return /^[6-9]\d{9}$/.test(phone.replace(/[\s+\-()]/g, ""));
}

export function scrollToSection(id: string, offset = 80): void {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

export const SERVICES = [
  {
    id: "hospital-licensing",
    title: "Hospital Licensing",
    slug: "hospital-licensing",
    icon: "🏥",
    color: "blue",
    shortDesc: "End-to-end hospital licensing, registration, and regulatory compliance support.",
    description:
      "We guide healthcare facilities through the entire licensing journey — from documentation to final approval — ensuring full regulatory compliance with state and central healthcare authorities.",
    features: [
      "State & Central license acquisition",
      "Documentation preparation & review",
      "Regulatory body liaison",
      "License renewal management",
      "Compliance gap analysis",
    ],
  },
  {
    id: "nabh-consultancy",
    title: "NABH Consultancy",
    slug: "nabh-consultancy",
    icon: "🎯",
    color: "cyan",
    shortDesc: "Achieve NABH accreditation with our expert-led systematic approach.",
    description:
      "Our NABH consultancy service provides a structured, systematic pathway to accreditation. We conduct gap assessments, build QMS frameworks, train staff, and ensure your hospital meets every NABH standard.",
    features: [
      "Gap analysis & readiness assessment",
      "QMS framework development",
      "Staff training & awareness",
      "Mock audits & pre-assessment",
      "Post-accreditation support",
    ],
  },
  {
    id: "mrd-services",
    title: "MRD Services",
    slug: "mrd-services",
    icon: "📋",
    color: "purple",
    shortDesc: "Streamlined Medical Records Department setup, management, and digitization.",
    description:
      "We help hospitals establish, upgrade, and manage their Medical Records Department with best practices in documentation, coding, and health information management.",
    features: [
      "MRD department setup & structuring",
      "ICD-10 coding & HMIS integration",
      "Patient record digitization",
      "Medical record audits",
      "Staff training on documentation",
    ],
  },
  {
    id: "ip-op-revenue-scanning",
    title: "IP & OP Revenue Scanning",
    slug: "ip-op-revenue-scanning",
    icon: "📊",
    color: "emerald",
    shortDesc: "Identify revenue leakage points and optimize billing across inpatient & outpatient.",
    description:
      "Our revenue cycle experts perform deep-dive audits of your IP and OP billing processes, identifying leakage, undercoding, and lost revenue opportunities to optimize your hospital's financial performance.",
    features: [
      "Revenue leakage detection",
      "Billing audit & reconciliation",
      "Charge capture optimization",
      "Denial management",
      "Financial performance reporting",
    ],
  },
  {
    id: "insurance-tpa-support",
    title: "Insurance & TPA Support",
    slug: "insurance-tpa-support",
    icon: "🛡️",
    color: "orange",
    shortDesc: "Seamless TPA empanelment, claim processing, and insurance coordination.",
    description:
      "We bridge the gap between hospitals and insurance companies, facilitating smooth TPA empanelment, claim processing, and pre-authorization to maximize cashless admission success rates.",
    features: [
      "TPA empanelment assistance",
      "Cashless claim processing",
      "Pre-authorization support",
      "Denial dispute resolution",
      "Insurance policy advisory",
    ],
  },
  {
    id: "doctor-referral-services",
    title: "Doctor Referral Services",
    slug: "doctor-referral-services",
    icon: "👨‍⚕️",
    color: "teal",
    shortDesc: "Build a robust specialist referral network to expand your hospital's patient base.",
    description:
      "We develop and manage structured doctor referral programs that expand your facility's reach, increase specialist utilization, and build long-term clinical partnerships.",
    features: [
      "Referral network development",
      "Specialist liaison programs",
      "Referral tracking systems",
      "Physician relationship management",
      "Performance analytics",
    ],
  },
  {
    id: "hospital-marketing",
    title: "Hospital Marketing",
    slug: "hospital-marketing",
    icon: "📣",
    color: "pink",
    shortDesc: "Data-driven digital marketing strategies tailored for healthcare brands.",
    description:
      "We create and execute comprehensive healthcare marketing campaigns — from brand identity to digital presence — that attract patients, build trust, and position your hospital as a market leader.",
    features: [
      "Brand strategy & identity",
      "Digital marketing (SEO/PPC/Social)",
      "Patient acquisition campaigns",
      "Content marketing & PR",
      "Reputation management",
    ],
  },
  {
    id: "recruitment",
    title: "Recruitment",
    slug: "recruitment",
    icon: "🤝",
    color: "violet",
    shortDesc: "Specialized healthcare talent acquisition for clinical and administrative roles.",
    description:
      "Our dedicated healthcare recruitment team sources, screens, and places qualified medical professionals — doctors, nurses, technicians, and administrators — to build your ideal healthcare team.",
    features: [
      "Medical professional sourcing",
      "Clinical staff recruitment",
      "Administrative talent placement",
      "Background verification",
      "Onboarding support",
    ],
  },
  {
    id: "medical-camps",
    title: "Medical Camps",
    slug: "medical-camps",
    icon: "⛺",
    color: "amber",
    shortDesc: "End-to-end planning and execution of community health camps and outreach programs.",
    description:
      "We plan, coordinate, and execute medical camps — from corporate health check drives to community outreach programs — increasing hospital visibility and community health impact.",
    features: [
      "Camp planning & logistics",
      "Specialist doctor coordination",
      "Equipment & consumable management",
      "Corporate health drives",
      "Post-camp data analytics",
    ],
  },
];

export const STATS = [
  { value: 500, suffix: "+", label: "Hospitals Served" },
  { value: 150, suffix: "+", label: "NABH Accreditations" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 12, suffix: "+", label: "Years Experience" },
];

export const COMPANY_INFO = {
  name: "SCS Ayush Solution",
  tagline: "Your Trusted Healthcare Service Partner",
  email: "info@scsayushsolution.com",
  phone: "+91 98765 43210",
  whatsapp: "919876543210",
  address: "Mumbai, Maharashtra, India",
  social: {
    linkedin: "https://linkedin.com/company/scs-ayush-solution",
    twitter: "https://twitter.com/scsayushsolution",
    facebook: "https://facebook.com/scsayushsolution",
    instagram: "https://instagram.com/scsayushsolution",
  },
};
