import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminSupabaseClient } from "@/lib/supabase-server";
import { sendNewsletterWelcome } from "@/lib/email";

const schema = z.object({
  email: z.string().email(),
  name: z.string().max(100).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = schema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const { email, name } = result.data;
    const supabase = createAdminSupabaseClient();

    // Check if already subscribed
    const { data: existing } = await supabase
      .from("newsletter_subscribers")
      .select("id, active")
      .eq("email", email)
      .single();

    if (existing) {
      if (existing.active) {
        return NextResponse.json(
          { message: "Already subscribed!" },
          { status: 200 }
        );
      }
      // Reactivate
      await supabase
        .from("newsletter_subscribers")
        .update({ active: true })
        .eq("email", email);
    } else {
      await supabase.from("newsletter_subscribers").insert({
        email,
        name: name || null,
        active: true,
        source: "website",
      });
    }

    // Send welcome email
    sendNewsletterWelcome(email).catch(console.error);

    return NextResponse.json(
      { success: true, message: "Successfully subscribed!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
