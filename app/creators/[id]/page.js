import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import { db } from "@/db/index.js";
import { creators } from "@/db/schema.js";
import { eq } from "drizzle-orm";
import styles from "./profile.module.css";

export const dynamic = "force-dynamic";

const STATIC_CREATORS = [
  {
    id: "mrsme",
    name: "MrsMe",
    nodeId: "0x8C",
    status: "Lead Designer",
    cardStatus: "PRIMARY",
    royaltyTier: "Level 3 — Certified Meme Classic (culture locked)",
    payoutInfo: "$3.00 / shirt payout",
    bio: "Concept work across Pork pointing, Pond logo, and More Swaps More Drops. Leads layout and composition print processes.",
    twitter: "@mrsmedoteth",
    isOnline: 1
  },
  {
    id: "redacted",
    name: "Redacted",
    nodeId: "0x7F",
    status: "Design Node",
    cardStatus: "ACTIVE",
    royaltyTier: "Level 2 — Fan Favorite (community approved)",
    payoutInfo: "$2.00 / shirt payout",
    bio: "A collaborative community project focused on funny, redacted text designs.",
    twitter: "@memeticexe",
    isOnline: 1
  },
  {
    id: "kingsam",
    name: "KingSam",
    nodeId: "0xA3",
    status: "Creator",
    cardStatus: "ACTIVE",
    royaltyTier: "Level 1 — New Drop (fresh payload)",
    payoutInfo: "$1.00 / shirt payout",
    bio: "Graphic artist and community coordinator. Cap and sticker designer.",
    twitter: "@kingsam",
    isOnline: 0
  },
  {
    id: "lilpork",
    name: "LILPORK",
    nodeId: "0xF2",
    status: "Creator",
    cardStatus: "ACTIVE",
    royaltyTier: "Level 1 — New Drop (fresh payload)",
    payoutInfo: "$1.00 / shirt payout",
    bio: "Digital artist making cool character illustrations and funny meme designs.",
    twitter: "@lilpork",
    isOnline: 1
  },
  {
    id: "dolo",
    name: "Dolo",
    nodeId: "0xE7",
    status: "Creator",
    cardStatus: "STANDBY",
    royaltyTier: "Level 1 — New Drop (fresh payload)",
    payoutInfo: "$1.00 / shirt payout",
    bio: "Meme creator and community helper. Building cool merch concepts.",
    twitter: "@dolodoteth",
    isOnline: 0
  }
];

const PRODUCTS = [
  {
    id: "everything-tee",
    name: "Everything You Do Matters Tee",
    price: "$35.00",
    creatorId: "mrsme",
    status: "IN STOCK",
    imageUrl: "https://merchlabs.com/cdn/shop/files/everything-tee-natural.png?v=1755890849&width=540"
  },
  {
    id: "pork-tee",
    name: "Pork Tee",
    price: "$30.00",
    creatorId: "mrsme",
    status: "IN STOCK",
    imageUrl: "https://merchlabs.com/cdn/shop/files/memeticexe---Pork-Tee.png?v=1757107482&width=540"
  },
  {
    id: "pond-tee",
    name: "OX Pond Tee",
    price: "$32.00",
    creatorId: "mrsme",
    status: "IN STOCK",
    imageUrl: "https://merchlabs.com/cdn/shop/files/oxpond-tee-white.png?v=1755890690&width=540"
  },
  {
    id: "redacted-trump-tee",
    name: "Redacted Trump Tee",
    price: "$32.00",
    creatorId: "redacted",
    status: "IN STOCK",
    imageUrl: "https://merchlabs.com/cdn/shop/files/redacted_white_1.jpg?v=1766446970&width=540"
  },
  {
    id: "redacted-tee",
    name: "Redacted Tee",
    price: "$30.00",
    creatorId: "redacted",
    status: "IN STOCK",
    imageUrl: "https://merchlabs.com/cdn/shop/files/redacted_black_2.jpg?v=1766447170&width=540"
  }
];

export default async function CreatorProfile({ params }) {
  const { id } = await params;

  let creator = null;

  try {
    const dbCreators = await db.select().from(creators).where(eq(creators.id, id)).limit(1);
    if (dbCreators.length > 0) {
      creator = dbCreators[0];
    }
  } catch (error) {
    console.error("DB Creator query error:", error);
  }

  // Fallback to static data if not found in database
  if (!creator) {
    creator = STATIC_CREATORS.find((c) => c.id === id);
  }

  const creatorProducts = PRODUCTS.filter((p) => p.creatorId === id);

  if (!creator) {
    return (
      <div className={styles.notFound}>
        <Header />
        <div className={styles.notFoundBox}>
          <h2>404: CREATOR NODE NOT FOUND</h2>
          <p>The creator node you requested does not exist in the active directory.</p>
          <Link href="/creators" className={styles.backBtn}>RETURN TO CREATORS</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <div className={styles.backWrapper}>
          <Link href="/creators" className={styles.backLink}>
            &lt; BACK TO DIRECTORY
          </Link>
        </div>

        {/* Creator Identity Header Card */}
        <section className={styles.profileHeader} data-status={creator.cardStatus}>
          <div className={styles.profileRow}>
            <div className={styles.avatarLarge}>
              {`[${creator.name.substring(0, 2).toUpperCase()}]`}
            </div>
            
            <div className={styles.profileInfo}>
              <div className={styles.titleRow}>
                <h1 className={styles.name}>@{creator.name}</h1>
                <div className={styles.statusIndicator}>
                  <span className={`${styles.dot} ${creator.isOnline ? styles.online : styles.offline}`}></span>
                  <span className={styles.statusText}>{creator.status}</span>
                </div>
              </div>

              <div className={styles.metaInfo}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>CREATOR ID:</span>
                  <span className={styles.metaVal}>{creator.nodeId}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>TWITTER / X:</span>
                  <a href={`https://x.com/${creator.twitter ? creator.twitter.replace("@", "") : ""}`} target="_blank" rel="noopener noreferrer" className={styles.twitter}>
                    {creator.twitter || "[NONE]"}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.bioBlock}>
            <p>{creator.bio || "[NO BIOGRAPHY]"}</p>
          </div>

          {/* Royalty Tier Metric box */}
          <div className={styles.royaltyBox}>
            <div className={styles.royaltyItem}>
              <span className={styles.royaltyLabel}>ROYALTY TIER:</span>
              <span className={styles.royaltyVal}>{creator.royaltyTier}</span>
            </div>
            <div className={styles.royaltyItem}>
              <span className={styles.royaltyLabel}>CREATOR SHARE PER SHIRT:</span>
              <span className={styles.royaltyValSuccess}>{creator.payoutInfo}</span>
            </div>
          </div>
        </section>

        {/* Creator Product Catalog */}
        <section className={styles.catalogSection}>
          <h2 className={styles.sectionTitle}>ACTIVE DESIGNS ({creatorProducts.length})</h2>
          
          {creatorProducts.length > 0 ? (
            <div className={styles.grid}>
              {creatorProducts.map((product) => (
                <div key={product.id} className={styles.card}>
                  <Link href={`/store/${product.id}`} className={styles.cardImageLink}>
                    <div className={styles.imageArea}>
                      <div className={styles.imageWrapper}>
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          className={styles.productImg}
                          width={200}
                          height={200}
                        />
                      </div>
                      <div className={styles.statusBadge} data-status={product.status}>
                        {product.status}
                      </div>
                    </div>
                  </Link>

                  <div className={styles.infoArea}>
                    <Link href={`/store/${product.id}`} className={styles.nameLink}>
                      <h3 className={styles.productName}>{product.name}</h3>
                    </Link>
                    <div className={styles.priceRow}>
                      <span className={styles.price}>{product.price}</span>
                      <Link href={`/store/${product.id}`} className={styles.inspectBtn}>
                        INSPECT &gt;
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyGrid}>
              <span className={styles.emptyPrompt}>&gt; NO ACTIVE SHIRT DESIGNS YET [STANDBY MODE]</span>
            </div>
          )}
        </section>
      </main>

      <footer className={styles.footer}>
        <span>CREATOR PROFILE: VERIFIED</span>
        <span>INDEX: {creator.id.toUpperCase()}</span>
      </footer>
    </div>
  );
}
