import Header from "@/components/Header";
import Link from "next/link";
import { db } from "@/db/index.js";
import { creators } from "@/db/schema.js";
import styles from "./creators.module.css";

export const dynamic = "force-dynamic";
export const runtime = "edge";

const FALLBACK_CREATORS = [
  {
    id: "mrsme",
    name: "MrsMe",
    nodeId: "0x8C",
    status: "Lead Designer",
    cardStatus: "PRIMARY",
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
    bio: "Meme creator and community helper. Building cool merch concepts.",
    twitter: "@dolodoteth",
    isOnline: 0
  }
];

const STATIC_PRODUCTS = [
  { name: "Everything You Do Matters Tee", creatorId: "mrsme" },
  { name: "Pork Tee", creatorId: "mrsme" },
  { name: "OX Pond Tee", creatorId: "mrsme" },
  { name: "Redacted Trump Tee", creatorId: "redacted" },
  { name: "Redacted Tee", creatorId: "redacted" }
];

function getCreatorDesigns(creatorId) {
  return STATIC_PRODUCTS.filter((p) => p.creatorId === creatorId).map((p) => p.name);
}

export default async function Creators() {
  let activeCreators = [];

  try {
    const dbCreators = await db.select().from(creators);
    // Filter out admin users from the creators list
    activeCreators = dbCreators.filter(c => c.role !== "admin");
  } catch (error) {
    console.error("DB Creators query failed, falling back to static creators:", error);
  }

  if (activeCreators.length === 0) {
    activeCreators = FALLBACK_CREATORS;
  }

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        {/* Header Section */}
        <section className={styles.creatorsHeader}>
          <div className={styles.glitchHeader}>
            <span className={styles.subtitle}>{"// KERNEL: CURRENT ARTISTS"}</span>
            <h1 className={`${styles.title} glitch-text`}>CREATORS</h1>
          </div>
          <p className={styles.description}>
            These are the humans behind the payloads — our current artists and meme engineers. Click &quot;View Merch&quot; to inspect their store listings.
          </p>
        </section>

        {/* Creators Grid */}
        <div className={styles.grid}>
          {activeCreators.map((c) => {
            const creatorDesigns = getCreatorDesigns(c.id);
            return (
              <div key={c.id} className={styles.card} data-status={c.cardStatus}>
                <div className={styles.cardHeader}>
                  <div className={styles.nodeId}>
                    <span className={styles.label}>ID:</span> {c.nodeId}
                  </div>
                  <div className={styles.statusIndicator}>
                    <span className={`${styles.dot} ${c.isOnline ? styles.online : styles.offline}`}></span>
                    <span className={styles.statusText}>{c.status}</span>
                  </div>
                </div>

                <div className={styles.avatarRow}>
                  <div className={styles.terminalAvatar}>
                    {`[${c.name.substring(0, 2).toUpperCase()}]`}
                  </div>
                  <div className={styles.avatarInfo}>
                    <h3 className={styles.name}>@{c.name}</h3>
                    <a
                      href={`https://x.com/${c.twitter ? c.twitter.replace("@", "") : ""}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.twitter}
                    >
                      {c.twitter || "[NO TWITTER]"}
                    </a>
                  </div>
                </div>

                <div className={styles.bio}>
                  <p>{c.bio || "[NO BIOGRAPHY]"}</p>
                </div>

                <div className={styles.payloads}>
                  <h4 className={styles.payloadTitle}>DESIGNS:</h4>
                  {creatorDesigns.length > 0 ? (
                    <ul className={styles.payloadList}>
                      {creatorDesigns.map((d, idx) => (
                        <li key={idx} className={styles.payloadItem}>
                          &gt; {d}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className={styles.noPayload}>NO ACTIVE DESIGNS [COMING SOON]</span>
                  )}
                </div>

                <Link href={`/creators/${c.id}`} className={styles.inspectBtn}>
                  VIEW PROFILE &gt;
                </Link>
              </div>
            );
          })}
        </div>
      </main>

      <footer className={styles.footer}>
        <span>CREATORS LIST: ONLINE</span>
        <span>TOTAL MEMBERS: {activeCreators.length}</span>
      </footer>
    </div>
  );
}
