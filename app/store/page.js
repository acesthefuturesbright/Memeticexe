"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import styles from "./store.module.css";

const PRODUCTS = [
  {
    id: "everything-tee",
    name: "Everything You Do Matters Tee",
    price: "$35.00",
    creator: "MrsMe",
    status: "IN STOCK",
    transmissions: "142 sold",
    description: "Comfortable, premium heavyweight tee with a double-sided graphic print.",
    url: "https://memeticexe.com/products/everything-you-do-matters-tee",
    imageUrl: "https://merchlabs.com/cdn/shop/files/everything-tee-natural.png?v=1755890849&width=540"
  },
  {
    id: "pork-tee",
    name: "Pork Tee",
    price: "$30.00",
    creator: "MrsMe",
    status: "IN STOCK",
    transmissions: "89 sold",
    description: "Funny graphic tee featuring Pork, our community icon. Printed on soft combed cotton.",
    url: "https://memeticexe.com/products/pork-tee",
    imageUrl: "https://merchlabs.com/cdn/shop/files/memeticexe---Pork-Tee.png?v=1757107482&width=540"
  },
  {
    id: "pond-tee",
    name: "OX Pond Tee",
    price: "$32.00",
    creator: "MrsMe",
    status: "IN STOCK",
    transmissions: "204 sold",
    description: "Official OX Pond collaboration tee. Heavyweight fabric with comfortable crew neck.",
    url: "https://memeticexe.com/products/ox-pond-tee",
    imageUrl: "https://merchlabs.com/cdn/shop/files/oxpond-tee-white.png?v=1755890690&width=540"
  },
  {
    id: "redacted-trump-tee",
    name: "Redacted Trump Tee",
    price: "$32.00",
    creator: "Redacted",
    status: "IN STOCK",
    transmissions: "115 sold",
    description: "Limited edition white graphic tee with redacted Trump print.",
    url: "https://memeticexe.com/products/redacted-trump-tee",
    imageUrl: "https://merchlabs.com/cdn/shop/files/redacted_white_1.jpg?v=1766446970&width=540"
  },
  {
    id: "redacted-tee",
    name: "Redacted Tee",
    price: "$30.00",
    creator: "Redacted",
    status: "IN STOCK",
    transmissions: "96 sold",
    description: "Simple black tee with bold Redacted text printing on front.",
    url: "https://memeticexe.com/products/redacted-tee",
    imageUrl: "https://merchlabs.com/cdn/shop/files/redacted_black_2.jpg?v=1766447170&width=540"
  }
];

export default function Store() {
  const [filter, setFilter] = useState("ALL");
  const creators = ["ALL", ...Array.from(new Set(PRODUCTS.map((p) => p.creator)))];

  const filteredProducts = filter === "ALL" 
    ? PRODUCTS 
    : PRODUCTS.filter((p) => p.creator === filter);

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <section className={styles.storeHeader}>
          <div className={styles.glitchHeader}>
            <span className={styles.subtitle}>{"// ALL PRODUCTS"}</span>
            <h1 className={`${styles.title} glitch-text`}>MERCH SHOP</h1>
          </div>
          <p className={styles.description}>
            Filter designs by creator. Items marked as <strong>IN STOCK</strong> redirect to our checkout partner MerchLabs.
          </p>
        </section>

        {/* Filters */}
        <div className={styles.filters}>
          {creators.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`${styles.filterBtn} ${filter === c ? styles.activeFilter : ""}`}
            >
              {c === "ALL" ? "All Creators" : c}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className={styles.grid}>
          {filteredProducts.map((product) => (
            <div key={product.id} className={styles.card}>
              <Link href={`/store/${product.id}`} className={styles.cardImageLink}>
                <div className={styles.imageArea}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      className={styles.productImg}
                      width={220}
                      height={220}
                      priority={product.id === "everything-tee"}
                    />
                  </div>
                  <div className={styles.statusBadge} data-status={product.status}>
                    {product.status}
                  </div>
                </div>
              </Link>

              <div className={styles.infoArea}>
                <div className={styles.cardHeader}>
                  <span className={styles.creatorTag}>By {product.creator}</span>
                  <span className={styles.price}>{product.price}</span>
                </div>
                
                <Link href={`/store/${product.id}`} className={styles.nameLink}>
                  <h3 className={styles.productName}>{product.name}</h3>
                </Link>
                <p className={styles.productDesc}>{product.description}</p>

                <div className={styles.telemetry}>
                  <div className={styles.telItem}>
                    <span className={styles.telLabel}>TOTAL SOLD:</span>
                    <span className={styles.telVal}>{product.transmissions}</span>
                  </div>
                </div>

                <Link
                  href={`/store/${product.id}`}
                  className={styles.buyBtn}
                >
                  INSPECT GEAR &gt;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <span>GRID: ACTIVE</span>
        <span>SECURE CHECKOUT CONVERSION</span>
      </footer>
    </div>
  );
}
