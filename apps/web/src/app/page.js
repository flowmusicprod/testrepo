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
            <p className="eyebrow">Experience DE&apos;JERI</p>
            <h1 className="hero-title">Street Luxury Made to Feel Cinematic.</h1>
            <p>
              An immersive fashion space inspired by motion-first digital storytelling, designed to
              make every drop feel like an event.
            </p>
            <div className="cta-row">
              <Link className="btn primary" href="/catalog">
                Enter Catalog
              </Link>
              <Link className="btn" href="/showcase">
                Watch Showcase
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
            Experience All
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
            Open Full Catalog
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
