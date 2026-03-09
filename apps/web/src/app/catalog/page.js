import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { products, brandContact } from "@/lib/data";

export default function CatalogPage() {
  return (
    <div className="shell scene-shell">
      <div className="scene-content">
        <Reveal>
          <p className="eyebrow">Catalog</p>
          <h1>Current + Archived Product Inventory</h1>
        </Reveal>
        <div className="grid cols-3" style={{ marginTop: "1.5rem" }}>
          {products.map((product, index) => (
            <Reveal key={product.sku} delay={index * 0.05}>
              <article className="tile">
                <Image src={product.image} alt={product.name} width={500} height={600} />
                <div className="tile-copy">
                  <h3>{product.name}</h3>
                  <p className="eyebrow">{product.sku}</p>
                  <p>${product.price}</p>
                  <span className={`status ${product.stock === "Out of Stock" ? "out" : ""}`}>
                    {product.stock}
                  </span>
                  <div style={{ marginTop: "0.7rem" }}>
                    {product.stock === "Out of Stock" ? (
                      <a className="btn" href={`mailto:${brandContact.email}?subject=Restock%20Request%20${product.sku}`}>
                        notify me
                      </a>
                    ) : (
                      <Link className="btn" href={`/checkout?sku=${product.sku}`}>
                        buy now
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
