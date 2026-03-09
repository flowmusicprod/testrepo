import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function POST(request) {
  const form = await request.formData();

  const payload = {
    name: String(form.get("name") || ""),
    email: String(form.get("email") || ""),
    subject: String(form.get("subject") || ""),
    message: String(form.get("message") || ""),
    submittedAt: new Date().toISOString(),
  };

  const supabase = createSupabaseServerClient();
  if (supabase) {
    await supabase.from("contact_submissions").insert({
      name: payload.name,
      email: payload.email,
      subject: payload.subject,
      message: payload.message,
      submitted_at: payload.submittedAt,
    });
  }

  const delivery = await sendContactEmail(payload);
  console.log("Contact submission:", {
    ...payload,
    emailDelivery: delivery,
  });

  return NextResponse.redirect(new URL("/contact?sent=1", request.url), 303);
}
