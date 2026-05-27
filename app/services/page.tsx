import { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";

export const metadata: Metadata = {
  title: "Healthcare Services",
  description:
    "Comprehensive healthcare consultancy services: NABH accreditation, hospital licensing, MRD setup, revenue scanning, TPA support, recruitment, marketing, and medical camps.",
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
