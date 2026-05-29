import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminSupabaseClient } from "@/lib/supabase-server";
import {
  sendAdminEnquiryNotification,
  sendCustomerConfirmation,
} from "@/lib/email";

const enquirySchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Invalid phone number"),
  service: z.string().min(1).max(100),
  hospitalSize: z.string().optional(),
  urgency: z.string().optional(),
  message: z.string().max(1000).optional(),
});

// Simple in-memory rate limiting (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 1000 });
    return true;
  }

  if (limit.count >= 3) return false;

  limit.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment." },
        { status: 429 }
      );
    }

    // Parse & validate
    const body = await req.json();
    const result = enquirySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const data = result.data;

    // Save to Supabase
    const supabase = createAdminSupabaseClient();
    const { error: dbError } = await supabase.from("enquiries").insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      service: data.service,
      hospital_size: data.hospitalSize || null,
      urgency: data.urgency || null,
      message: data.message || null,
      status: "new",
      source: "website",
    });

    if (dbError) {
      console.error("DB error:", dbError);
      // Don't fail the request — still send emails
    }

    // Send emails (don't await to keep response fast)
    const submittedAt = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    Promise.all([
      sendAdminEnquiryNotification({
        name: data.name,
        email: data.email,
        phone: data.phone,
        service: data.service,
        hospitalSize: data.hospitalSize,
        urgency: data.urgency,
        message: data.message,
        submittedAt,
      }).catch(console.error),
      sendCustomerConfirmation({
        name: data.name,
        email: data.email,
        service: data.service,
      }).catch(console.error),
    ]);

    return NextResponse.json(
      { success: true, message: "Enquiry submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Enquiry API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
