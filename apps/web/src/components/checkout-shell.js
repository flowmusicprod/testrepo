"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "@/components/checkout-form";

export function CheckoutShell({ publishableKey, sku, productName, unitPrice }) {
  const stripePromise = loadStripe(publishableKey);

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm sku={sku} productName={productName} unitPrice={unitPrice} />
    </Elements>
  );
}

