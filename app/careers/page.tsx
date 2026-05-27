import { Metadata } from "next";
import CareersPageClient from "./CareersPageClient";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the SCS Ayush Solution team. We're hiring healthcare consultants, NABH specialists, revenue analysts, and more. Build your career in healthcare excellence.",
};

export default function CareersPage() {
  return <CareersPageClient />;
}
