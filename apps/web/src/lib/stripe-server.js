import Stripe from "stripe";

let stripe = null;

export function getStripeServer() {
  if (stripe) {
    return stripe;
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return null;
  }

  stripe = new Stripe(secretKey, {
    apiVersion: "2025-02-24.acacia",
  });

  return stripe;
}

