import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { products, releases } from "@/lib/data";

export default function HomePage() {
  return (
    <div className="shell">
      <section className="hero">
        <Reveal>
          <div className="hero-copy">
            <p className="eyebrow">DE&apos;JERI Official Store</p>
            <h1>Street Luxury Made to Wear Loudly.</h1>
            <p>
              Discover limited drops, signature eyewear, and campaign-led collections from
              DE&apos;JERI.
            </p>
            <div className="cta-row">
              <Link className="btn primary" href="/catalog">
                Shop Now
              </Link>
              <Link className="btn" href="/showcase">
                New Releases
              </Link>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <article className="hero-card">
            <Image
              src="/assets/catalog/products/morredshirt_front.jpeg"
              alt="DE'JERI campaign model"
              width={820}
              height={980}
              className="hero-image"
              priority
            />
          </article>
        </Reveal>
      </section>

      <section className="section">
        <div className="section-title">
          <h2>Featured Drops</h2>
          <Link className="btn" href="/showcase">
            View All Drops
          </Link>
        </div>
        <div className="grid cols-3">
          {releases.map((release, index) => (
            <Reveal key={release.title} delay={index * 0.08}>
              <article className="tile">
                <Image src={release.image} alt={release.title} width={500} height={600} />
                <div className="tile-copy">
                  <p className="eyebrow">{release.season}</p>
                  <h3>{release.title}</h3>
                  <p>{release.notes}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <h2>Shop by Piece</h2>
          <Link className="btn" href="/catalog">
            Open Catalog
          </Link>
        </div>
        <div className="grid cols-3">
          {products.slice(0, 3).map((product, index) => (
            <Reveal key={product.sku} delay={index * 0.06}>
              <article className="tile">
                <Image src={product.image} alt={product.name} width={500} height={600} />
                <div className="tile-copy">
                  <h3>{product.name}</h3>
                  <p>${product.price}</p>
                  <span className={`status ${product.stock === "Out of Stock" ? "out" : ""}`}>
                    {product.stock}
                  </span>
                  <div style={{ marginTop: "0.7rem" }}>
                    <Link className="btn" href={`/checkout?sku=${product.sku}`}>
                      {product.stock === "Out of Stock" ? "Notify Me" : "Buy Now"}
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
