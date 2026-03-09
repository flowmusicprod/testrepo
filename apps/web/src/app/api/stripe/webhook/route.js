import { NextResponse } from "next/server";
import { getStripeServer } from "@/lib/stripe-server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function POST(request) {
  const stripe = getStripeServer();
  if (!stripe) {
    return NextResponse.json({ error: "Stripe is not configured." }, { status: 500 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: "Missing STRIPE_WEBHOOK_SECRET." }, { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing stripe signature." }, { status: 400 });
  }

  const body = await request.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    return NextResponse.json({ error: `Webhook error: ${error.message}` }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();
  if (supabase && event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    await supabase
      .from("orders")
      .update({ status: paymentIntent.status, paid_at: new Date().toISOString() })
      .eq("stripe_payment_intent_id", paymentIntent.id);
  }

  if (supabase && event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object;
    await supabase.from("orders").update({ status: paymentIntent.status }).eq(
      "stripe_payment_intent_id",
      paymentIntent.id
    );
  }

  return NextResponse.json({ received: true });
}

