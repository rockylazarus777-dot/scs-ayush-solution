import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminSupabaseClient } from "@/lib/supabase-server";
import {
  sendCareerApplicationHRNotification,
  sendCareerApplicantConfirmation,
} from "@/lib/email";

const careerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid phone number"),
  position: z.string().min(1).max(100),
  experience: z.string().min(1),
  coverLetter: z.string().max(2000).optional(),
  resumeUrl: z.string().url().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = careerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid data", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const data = result.data;

    // Save to DB
    const supabase = createAdminSupabaseClient();
    const { error: dbError } = await supabase.from("job_applications").insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      position: data.position,
      experience: data.experience,
      cover_letter: data.coverLetter || null,
      resume_url: data.resumeUrl || null,
      status: "new",
    });

    if (dbError) console.error("DB error:", dbError);

    // Send emails
    Promise.all([
      sendCareerApplicationHRNotification({
        name: data.name,
        email: data.email,
        phone: data.phone,
        position: data.position,
        experience: data.experience,
        resumeUrl: data.resumeUrl,
      }).catch(console.error),
      sendCareerApplicantConfirmation({
        name: data.name,
        email: data.email,
        position: data.position,
      }).catch(console.error),
    ]);

    return NextResponse.json(
      { success: true, message: "Application submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Career API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
