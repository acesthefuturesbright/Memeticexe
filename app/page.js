"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Terminal from "@/components/Terminal";
import styles from "./page.module.css";

const TAGLINES = [
  "Your shirt is shitposting.",
  "Wear your meme.",
  "Execute the meme.",
  "Ideas you can wear.",
  "Run the meme magic."
];

export default function Home() {
  const router = useRouter();
  const [taglineIdx, setTaglineIdx] = useState(0);
  const [fadeState, setFadeState] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState(false);
      setTimeout(() => {
        setTaglineIdx((prev) => (prev + 1) % TAGLINES.length);
        setFadeState(true);
      }, 250);
    }, 2600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        {/* HERO SECTION */}
        <section className={styles.heroSection}>
          <div className={styles.glitchHeader}>
            <span className={styles.subtitle}>{"// creator-powered t-shirt store"}</span>
            <h1 className={`${styles.title} glitch-text`}>MEMETIC.EXE</h1>
          </div>

          <div className={styles.heroBody}>
            <p className={`${styles.tagline} ${fadeState ? styles.fadeIn : styles.fadeOut}`}>
              {TAGLINES[taglineIdx]}
            </p>
            <p className={styles.heroCopy}>
              memetic.exe is a creator-powered t-shirt platform. We help independent artists design and sell high-quality custom t-shirts with fair royalty shares. No tracking, no data hoarding—just great shirts and creator-first culture.
            </p>
            
            <div className={styles.runWrapper}>
              <button 
                className={styles.runButton}
                onClick={() => router.push("/store")}
              >
                run store.exe (browse store) &gt;
              </button>
            </div>
          </div>
        </section>

        {/* CREATOR SPOTLIGHT SECTION */}
        <section className={styles.spotlightSection}>
          <div className={styles.spotlightCard}>
            <div className={styles.spotlightHeader}>
              <span className={styles.spotlightBadge}>CREATOR SPOTLIGHT</span>
              <span className={styles.spotlightNode}>CREATOR ID: 0x8C</span>
            </div>
            <div className={styles.spotlightBody}>
              <h2 className={styles.spotlightTitle}>@MrsMe — Lead Designer</h2>
              <p className={styles.spotlightText}>
                Creator of the iconic <strong>Pork Tee</strong>, <strong>Everything You Do Matters Tee</strong>, and <strong>OX Pond Tee</strong>. MrsMe designs clean, premium graphic t-shirts that stand out in any crowd.
              </p>
              <button 
                className={styles.spotlightBtn}
                onClick={() => router.push("/creators/mrsme")}
              >
                view creator profile &gt;
              </button>
            </div>
          </div>
        </section>

        {/* INTERACTIVE TERMINAL */}
        <section className={styles.terminalSection}>
          <Terminal />
        </section>
      </main>

      <footer className={styles.footer}>
        <span className={styles.nodeTag}>NODE STATUS: ONLINE</span>
        <span className={styles.versionTag}>v1.0.4 - OFFICIAL STORE</span>
      </footer>
    </div>
  );
}
