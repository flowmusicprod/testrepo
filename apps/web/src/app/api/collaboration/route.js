import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { sendContactEmail } from "@/lib/email";

export async function POST(request) {
  const form = await request.formData();
  const payload = {
    fullName: String(form.get("fullName") || ""),
    email: String(form.get("email") || ""),
    interestType: String(form.get("interestType") || ""),
    portfolioLink: String(form.get("portfolioLink") || ""),
    notes: String(form.get("notes") || ""),
    submittedAt: new Date().toISOString(),
  };

  const supabase = createSupabaseServerClient();
  if (supabase) {
    await supabase.from("collaboration_applications").insert({
      full_name: payload.fullName,
      email: payload.email,
      interest_type: payload.interestType,
      portfolio_link: payload.portfolioLink || null,
      notes: payload.notes,
      submitted_at: payload.submittedAt,
    });
  }

  await sendContactEmail({
    name: payload.fullName,
    email: payload.email,
    subject: `Collaboration Application - ${payload.interestType}`,
    message: `${payload.notes}\n\nPortfolio: ${payload.portfolioLink || "N/A"}`,
  });

  return NextResponse.redirect(new URL("/collaboration?sent=1", request.url), 303);
}

