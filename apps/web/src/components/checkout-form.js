"use client";

import { useMemo, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const cardStyle = {
  style: {
    base: {
      color: "#1b1b1b",
      fontFamily: "Manrope, sans-serif",
      fontSize: "16px",
      "::placeholder": {
        color: "#6b6b6b",
      },
    },
    invalid: {
      color: "#f5aeb8",
    },
  },
};

export function CheckoutForm({ sku, productName, unitPrice }) {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const total = useMemo(() => unitPrice * quantity, [unitPrice, quantity]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setStatus("");

    try {
      const intentRes = await fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sku, quantity, email }),
      });

      const intentJson = await intentRes.json();
      if (!intentRes.ok) {
        setStatus(intentJson.error || "Unable to initialize payment.");
        setIsLoading(false);
        return;
      }

      const card = elements.getElement(CardElement);
      if (!card) {
        setStatus("Card element unavailable.");
        setIsLoading(false);
        return;
      }

      const result = await stripe.confirmCardPayment(intentJson.clientSecret, {
        payment_method: {
          card,
          billing_details: { email },
        },
      });

      if (result.error) {
        setStatus(result.error.message || "Payment failed.");
      } else if (result.paymentIntent?.status === "succeeded") {
        setStatus("Payment successful. Your order has been recorded.");
      } else {
        setStatus(`Payment status: ${result.paymentIntent?.status || "unknown"}`);
      }
    } catch (error) {
      setStatus("Unexpected payment error. Try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email for receipt"
        required
      />
      <select
        name="quantity"
        value={quantity}
        onChange={(event) => setQuantity(Number(event.target.value))}
      >
        <option value={1}>Quantity: 1</option>
        <option value={2}>Quantity: 2</option>
        <option value={3}>Quantity: 3</option>
      </select>
      <div className="panel">
        <CardElement options={cardStyle} />
      </div>
      <button type="submit" className="btn primary" disabled={!stripe || isLoading}>
        {isLoading ? "Processing..." : `Pay $${total}`}
      </button>
      <p style={{ minHeight: "1rem" }}>{status}</p>
      <p className="eyebrow">
        Product: {productName} ({sku})
      </p>
    </form>
  );
}
