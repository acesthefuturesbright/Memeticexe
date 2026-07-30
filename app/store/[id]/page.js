import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import styles from "./product.module.css";

const PRODUCTS = [
  {
    id: "everything-tee",
    name: "Everything You Do Matters Tee",
    price: "$35.00",
    creator: "MrsMe",
    creatorId: "mrsme",
    status: "IN STOCK",
    transmissions: "142 sold",
    description: "Comfortable, premium heavyweight tee with a double-sided graphic print featuring MrsMe's custom concept layout.",
    url: "https://memeticexe.com/products/everything-you-do-matters-tee",
    imageUrl: "https://merchlabs.com/cdn/shop/files/everything-tee-natural.png?v=1755890849&width=540",
    fabric: "100% Combed Cotton Heavyweight",
    blankColor: "Natural / Off-White"
  },
  {
    id: "pork-tee",
    name: "Pork Tee",
    price: "$30.00",
    creator: "MrsMe",
    creatorId: "mrsme",
    status: "IN STOCK",
    transmissions: "89 sold",
    description: "Funny graphic tee featuring Pork, our community mascot icon. Printed on ultra-soft combed cotton.",
    url: "https://memeticexe.com/products/pork-tee",
    imageUrl: "https://merchlabs.com/cdn/shop/files/memeticexe---Pork-Tee.png?v=1757107482&width=540",
    fabric: "100% Cotton Premium Jersey",
    blankColor: "Matte Black"
  },
  {
    id: "pond-tee",
    name: "OX Pond Tee",
    price: "$32.00",
    creator: "MrsMe",
    creatorId: "mrsme",
    status: "IN STOCK",
    transmissions: "204 sold",
    description: "Official OX Pond collaboration tee. Heavyweight fabric with comfortable crew neck and high-fidelity graphics.",
    url: "https://memeticexe.com/products/ox-pond-tee",
    imageUrl: "https://merchlabs.com/cdn/shop/files/oxpond-tee-white.png?v=1755890690&width=540",
    fabric: "100% Combed Cotton Heavyweight",
    blankColor: "Classic White"
  },
  {
    id: "redacted-trump-tee",
    name: "Redacted Trump Tee",
    price: "$32.00",
    creator: "Redacted",
    creatorId: "redacted",
    status: "IN STOCK",
    transmissions: "115 sold",
    description: "Limited edition white graphic tee featuring redacted presidential print. High-quality print resolution.",
    url: "https://memeticexe.com/products/redacted-trump-tee",
    imageUrl: "https://merchlabs.com/cdn/shop/files/redacted_white_1.jpg?v=1766446970&width=540",
    fabric: "100% Ring-Spun Cotton Premium",
    blankColor: "Off-White"
  },
  {
    id: "redacted-tee",
    name: "Redacted Tee",
    price: "$30.00",
    creator: "Redacted",
    creatorId: "redacted",
    status: "IN STOCK",
    transmissions: "96 sold",
    description: "Simple black tee with bold Redacted text block printing on front chest. A minimalist memetic classic.",
    url: "https://memeticexe.com/products/redacted-tee",
    imageUrl: "https://merchlabs.com/cdn/shop/files/redacted_black_2.jpg?v=1766447170&width=540",
    fabric: "100% Ring-Spun Cotton Premium",
    blankColor: "Matte Black"
  }
];

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({
    id: p.id
  }));
}

export default async function ProductDetail({ params }) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <div className={styles.notFound}>
        <Header />
        <div className={styles.notFoundBox}>
          <h2>404: PRODUCT PAYLOAD NOT FOUND</h2>
          <p>The product identifier you requested does not exist in the active directory.</p>
          <Link href="/store" className={styles.backBtn}>RETURN TO SHOP</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <div className={styles.backWrapper}>
          <Link href="/store" className={styles.backLink}>
            &lt; BACK TO SHOP
          </Link>
        </div>

        <div className={styles.productLayout}>
          {/* Left: Product Image Area */}
          <div className={styles.imageColumn}>
            <div className={styles.imageCard}>
              <div className={styles.imageWrapper}>
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={420}
                  height={420}
                  className={styles.productImg}
                  priority
                />
              </div>
              <div className={styles.statusBadge} data-status={product.status}>
                {product.status}
              </div>
            </div>
          </div>

          {/* Right: Product Detail Column */}
          <div className={styles.detailColumn}>
            <div className={styles.infoBox}>
              <div className={styles.metaRow}>
                <span className={styles.creatorTag}>
                  CREATOR:{" "}
                  <Link href={`/creators/${product.creatorId}`} className={styles.creatorLink}>
                    @{product.creator}
                  </Link>
                </span>
                <span className={styles.priceTag}>{product.price}</span>
              </div>

              <h1 className={styles.title}>{product.name}</h1>
              <p className={styles.desc}>{product.description}</p>
            </div>

            {/* Sizing Blank parameters */}
            <div className={styles.optionsBox}>
              <div className={styles.blankInfo}>
                <div className={styles.blankItem}>
                  <span className={styles.blankLabel}>FABRIC:</span>
                  <span className={styles.blankVal}>{product.fabric}</span>
                </div>
                <div className={styles.blankItem}>
                  <span className={styles.blankLabel}>COLORWAY:</span>
                  <span className={styles.blankVal}>{product.blankColor}</span>
                </div>
              </div>

              {/* Sizes mock list */}
              <div className={styles.sizesArea}>
                <span className={styles.sizesLabel}>SELECT SIZE:</span>
                <div className={styles.sizesGrid}>
                  {["S", "M", "L", "XL"].map((sz) => (
                    <button key={sz} className={styles.sizeBtn}>
                      {sz}
                    </button>
                  ))}
                  <button className={styles.sizeBtnDisabled} disabled>
                    XXL [OUT OF STOCK]
                  </button>
                </div>
              </div>
            </div>

            {/* Telemetry analytics */}
            <div className={styles.telemetryBox}>
              <div className={styles.telItem}>
                <span className={styles.telLabel}>TOTAL COPIES SOLD:</span>
                <span className={styles.telVal}>{product.transmissions}</span>
              </div>
              <div className={styles.telItem}>
                <span className={styles.telLabel}>SHIRT BASE STYLE:</span>
                <span className={styles.telVal}>PRE-SHRUNK COTTON</span>
              </div>
            </div>

            {/* Buy CTA redirect link */}
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.buyBtn}
            >
              BUY NOW ON MERCHLABS &gt;
            </a>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <span>PRODUCT VIEWER: ACTIVE</span>
        <span>PRODUCT ID: {product.id.toUpperCase()}</span>
      </footer>
    </div>
  );
}
