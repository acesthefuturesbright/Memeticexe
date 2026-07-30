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
            <span className={styles.subtitle}>// memes detected... executing anyway.</span>
            <h1 className={`${styles.title} glitch-text`}>MEMETIC.EXE</h1>
          </div>

          <div className={styles.heroBody}>
            <p className={`${styles.tagline} ${fadeState ? styles.fadeIn : styles.fadeOut}`}>
              {TAGLINES[taglineIdx]}
            </p>
            <p className={styles.heroCopy}>
              memetic.exe compiles internet culture into wearable executables. No creepy tracking, no data hoarding—just memes, artists, and gear that propagates the signal.
            </p>
            
            <div className={styles.runWrapper}>
              <button 
                className={styles.runButton}
                onClick={() => router.push("/store")}
              >
                run store.exe
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
