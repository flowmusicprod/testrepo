import Link from "next/link";
import { CheckoutShell } from "@/components/checkout-shell";
import { findProductBySku, products } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function CheckoutPage({ searchParams }) {
  const params = await searchParams;
  const sku = params?.sku || products[0].sku;
  const product = findProductBySku(sku);
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  if (!product) {
    return (
      <div className="shell section">
        <p className="eyebrow">Checkout</p>
        <h1>Product not found.</h1>
        <Link href="/catalog" className="btn">
          Back to Catalog
        </Link>
      </div>
    );
  }

  if (!publishableKey) {
    return (
      <div className="shell section">
        <p className="eyebrow">Checkout</p>
        <h1>Stripe publishable key is missing.</h1>
        <p>Set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in .env.local to enable checkout.</p>
        <Link href="/catalog" className="btn">
          Return to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="shell section">
      <p className="eyebrow">Secure Checkout</p>
      <h1>{product.name}</h1>
      <p>${product.price} USD</p>
      <article className="panel" style={{ maxWidth: "620px", marginTop: "1rem" }}>
        <CheckoutShell
          publishableKey={publishableKey}
          sku={product.sku}
          productName={product.name}
          unitPrice={product.price}
        />
      </article>
    </div>
  );
}
