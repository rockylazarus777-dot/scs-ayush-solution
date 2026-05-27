import { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with SCS Ayush Solution. Book a free consultation for NABH, hospital licensing, revenue optimization, or any healthcare consultancy service.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
