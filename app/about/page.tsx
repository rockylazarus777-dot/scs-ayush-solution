import { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about SCS Ayush Solution — India's premier healthcare consultancy. Our story, mission, vision, values, and the team that transforms hospitals.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
