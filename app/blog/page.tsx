import { Metadata } from "next";
import BlogPageClient from "./BlogPageClient";

export const metadata: Metadata = {
  title: "Blog & Insights",
  description:
    "Expert insights on NABH accreditation, hospital licensing, healthcare management, revenue optimization, and healthcare regulations in India.",
};

export default function BlogPage() {
  return <BlogPageClient />;
}
