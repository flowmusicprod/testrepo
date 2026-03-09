import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { FloatingProductStage } from "@/components/floating-product-stage";
import { brandContact, products, releases } from "@/lib/data";

const studioLineup = [
  "/assets/catalog/products/morblackshirt_front.jpeg",
  "/assets/catalog/products/morwhiteshirt_front.jpeg",
  "/assets/catalog/products/morredshirt_front.jpeg",
  "/assets/catalog/products/black_morframes_front.jpeg",
];

export default function HomePage() {
  return (
    <div className="shell immersive-home">
      <section className="immersive-hero">
        <div className="immersive-intro">
          <p className="eyebrow">Immersive Collection View</p>
          <h1 className="hero-title">Product-Centered, Motion-Led Fashion Experience.</h1>
        </div>
        <FloatingProductStage />
      </section>

      <section className="section">
        <div className="section-title">
          <h2>Studio Product Lineup</h2>
          <Link className="btn" href="/catalog">
            Open Catalog
          </Link>
        </div>
        <article className="studio-lineup panel">
          {studioLineup.map((src, index) => (
            <div key={src} className="studio-cell">
              <Image src={src} alt={`DE'JERI studio product ${index + 1}`} width={460} height={460} />
            </div>
          ))}
        </article>
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
                    {product.stock === "Out of Stock" ? (
                      <a className="btn" href={`mailto:${brandContact.email}?subject=Restock%20Request%20${product.sku}`}>
                        Notify Me
                      </a>
                    ) : (
                      <Link className="btn" href={`/checkout?sku=${product.sku}`}>
                        Buy Now
                      </Link>
                    )}
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
