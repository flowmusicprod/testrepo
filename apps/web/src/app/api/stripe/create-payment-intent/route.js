import { NextResponse } from "next/server";
import { findProductBySku } from "@/lib/data";
import { getStripeServer } from "@/lib/stripe-server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function POST(request) {
  const stripe = getStripeServer();
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe is not configured. Set STRIPE_SECRET_KEY." },
      { status: 500 }
    );
  }

  const body = await request.json();
  const sku = String(body.sku || "");
  const quantity = Math.max(1, Number(body.quantity || 1));
  const email = String(body.email || "");

  const product = findProductBySku(sku);
  if (!product) {
    return NextResponse.json({ error: "Unknown product SKU." }, { status: 400 });
  }

  if (product.stock === "Out of Stock") {
    return NextResponse.json({ error: "This item is currently out of stock." }, { status: 409 });
  }

  const amount = Math.round(product.price * 100 * quantity);
  const intent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    receipt_email: email || undefined,
    automatic_payment_methods: { enabled: true },
    metadata: {
      sku: product.sku,
      product_name: product.name,
      quantity: String(quantity),
    },
  });

  const supabase = createSupabaseServerClient();
  if (supabase) {
    await supabase.from("orders").insert({
      stripe_payment_intent_id: intent.id,
      sku: product.sku,
      product_name: product.name,
      quantity,
      amount_cents: amount,
      customer_email: email || null,
      status: intent.status,
    });
  }

  return NextResponse.json({
    clientSecret: intent.client_secret,
    amount,
    currency: "usd",
    product: {
      name: product.name,
      sku: product.sku,
      quantity,
      unitPrice: product.price,
    },
  });
}

