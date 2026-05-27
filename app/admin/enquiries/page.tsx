import { Metadata } from "next";
import EnquiriesClient from "./EnquiriesClient";

export const metadata: Metadata = { title: "Enquiries" };
export default function EnquiriesPage() { return <EnquiriesClient />; }
