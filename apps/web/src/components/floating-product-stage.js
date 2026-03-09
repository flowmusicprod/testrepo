"use client";

import { useState } from "react";
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

export function FloatingProductStage() {
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  function onMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setMouse({ x, y });
  }

  const dx = mouse.x - 50;
  const dy = mouse.y - 50;

  return (
    <div className="experience-stage" onMouseMove={onMove}>
      <div className="experience-shell-bar">
        <div className="stage-links">
          <span>All Pieces</span>
          <span>Tops</span>
          <span>Frames</span>
        </div>
        <p className="stage-brand">DE&apos;JERI Atelier</p>
        <div className="stage-icons">
          <span>◎</span>
          <span>◌</span>
        </div>
      </div>

      <motion.div
        className="particle-cloud"
        animate={{ x: dx * 1.2, y: dy * 0.9 }}
        transition={{ type: "spring", stiffness: 70, damping: 18 }}
      />

      <motion.article
        className="hero-product"
        animate={{ x: dx * 0.8, y: dy * 0.7, rotate: dx * 0.02 }}
        transition={{ type: "spring", stiffness: 95, damping: 24 }}
      >
        <Image
          src="/assets/catalog/products/morredshirt_front.jpeg"
          alt="DE'JERI hero product"
          width={720}
          height={980}
          className="hero-product-image"
          priority
        />
      </motion.article>

      {orbitProducts.map((product, index) => (
        <motion.article
          key={product.sku}
          className={product.className}
          animate={{ x: dx * (0.28 + index * 0.05), y: dy * (0.22 + index * 0.04) }}
          transition={{ type: "spring", stiffness: 90, damping: 22 }}
        >
          <Image src={product.image} alt={product.name} width={220} height={220} />
          <Link className="btn" href={`/checkout?sku=${product.sku}`}>
            View
          </Link>
        </motion.article>
      ))}

      <aside className="selector-card">
        <p className="eyebrow">Product selector</p>
        <h3>MOR Red Shirt</h3>
        <p>Premium cotton silhouette with statement front logo treatment.</p>
      </aside>

      <Link className="shop-pill" href="/catalog">
        Shop Now
      </Link>

      <p className="stage-caption">
        DE&apos;JERI pieces are displayed in motion to mirror physical presence and runway energy.
      </p>
    </div>
  );
}

