"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const orbitProducts = [
  {
    name: "MOR Black Shirt",
    sku: "DJ-MOR-BLK",
    image: "/assets/catalog/products/morblackshirt_front.jpeg",
    className: "orbit orbit-a",
  },
  {
    name: "Black MOR Frames",
    sku: "DJ-FRM-BLK",
    image: "/assets/catalog/products/black_morframes_front.jpeg",
    className: "orbit orbit-b",
  },
  {
    name: "Red Sunglasses",
    sku: "DJ-SNG-RED",
    image: "/assets/catalog/products/red_sunglasses_front.jpeg",
    className: "orbit orbit-c",
  },
];

function HoverCutout({ product, delta }) {
  const [local, setLocal] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const shadow = useMemo(() => {
    const sx = (local.x - 50) * 0.22;
    const sy = (local.y - 50) * 0.25;
    const blur = hovered ? 18 : 10;
    return `drop-shadow(${sx}px ${sy}px ${blur}px rgba(43,32,52,0.35))`;
  }, [hovered, local.x, local.y]);

  function onMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setLocal({ x, y });
  }

  return (
    <motion.article
      className={product.className}
      animate={{ x: delta.x * 0.35, y: delta.y * 0.3 }}
      transition={{ type: "spring", stiffness: 85, damping: 22 }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="cutout-wrap">
        <Image
          src={product.image}
          alt={product.name}
          width={230}
          height={180}
          style={{ filter: shadow }}
          className="orbit-cutout"
        />
      </div>
      <Link className="btn" href={`/checkout?sku=${product.sku}`}>
        view
      </Link>
    </motion.article>
  );
}

export function FloatingProductStage() {
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  const delta = useMemo(
    () => ({ x: mouse.x - 50, y: mouse.y - 50 }),
    [mouse.x, mouse.y]
  );

  function onMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setMouse({ x, y });
  }

  return (
    <section className="experience-stage" onMouseMove={onMove}>
      <div className="experience-shell-bar">
        <div className="stage-links">
          <span>All Products</span>
          <span>Tops</span>
          <span>Frames</span>
        </div>
        <p className="stage-brand">DE&apos;JERI</p>
        <div className="stage-icons">
          <span>◎</span>
          <span>◌</span>
        </div>
      </div>

      <motion.div
        className="hover-light"
        animate={{
          background: `radial-gradient(260px circle at ${mouse.x}% ${mouse.y}%, rgba(255,255,255,0.35), rgba(255,255,255,0) 55%)`,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 22 }}
      />

      <motion.div
        className="particle-cloud"
        animate={{ x: delta.x * 1.1, y: delta.y * 0.9 }}
        transition={{ type: "spring", stiffness: 70, damping: 19 }}
      />

      <motion.article
        className="hero-product"
        animate={{
          x: delta.x * 0.9,
          y: delta.y * 0.65,
          rotate: delta.x * 0.03,
        }}
        transition={{ type: "spring", stiffness: 88, damping: 21 }}
      >
        <Image
          src="/assets/catalog/products/morredshirt_front.jpeg"
          alt="DE'JERI floating hero shirt"
          width={760}
          height={980}
          className="hero-product-image"
          priority
        />
      </motion.article>

      {orbitProducts.map((product) => (
        <HoverCutout key={product.sku} product={product} delta={delta} />
      ))}

      <aside className="selector-card">
        <p className="eyebrow">Product selector</p>
        <h3>MOR Red Shirt</h3>
        <p>Mouse brush interaction: dynamic light and shadow over product surfaces.</p>
      </aside>

      <Link className="btn shop-pill" href="/catalog">
        shop now
      </Link>

      <p className="stage-caption">
        Hyper-real motion pass: floating products react to pointer direction, with position-driven
        lighting and shadows.
      </p>
    </section>
  );
}

