"use client";

import Header from "@/components/Header";
import styles from "./about.module.css";

const MANIFESTO_SECTIONS = [
  {
    id: "001",
    title: "Memes Are Ideas Worth Wearing",
    text: "A meme is more than a joke—it's a shared idea. When you wear memetic.exe, you are taking a digital meme and running it in the real world. We print internet culture on high-quality shirts so your ideas get seen offline."
  },
  {
    id: "002",
    title: "Creators Get Paid First",
    text: "Big platforms treat creators like cheap content generators. We do the opposite. We share the revenue on every single shirt sold, with clear royalty levels from $1 to $3 per sale. Creators own their art, we just print and ship it."
  },
  {
    id: "003",
    title: "No Tracking. No Bullsh*t.",
    text: "We don't track your behavior, hoard your data, or sell your cookies to advertisers. We collect only the basic info needed to ship your order. Our website is clean, privacy-focused, and straightforward."
  },
  {
    id: "004",
    title: "T-Shirts Are Social Networks",
    text: "Before there was Twitter or Reddit, people wore their statements. A graphic tee is a physical post. Every shirt credits the designer's handle, helping creators build real-world connections."
  },
  {
    id: "005",
    title: "Stay Weird",
    text: "Boring, sanitized corporate clothing is everywhere. We choose glitchy terminal aesthetics, raw pixel art, and designs that stand out. If a shirt isn't interesting, we don't compile it."
  },
  {
    id: "006",
    title: "Built for the Community",
    text: "We are building this together. Artists submit designs, the community helps decide what gets spotlighted, and buyers support their favorite creators. More designs mean more independent artists getting paid."
  },
  {
    id: "007",
    title: "The Core Mission",
    text: "To reward creativity, support independent artists, and keep internet culture open, fun, and weird. The system remains online."
  }
];

export default function About() {
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <section className={styles.header}>
          <div className={styles.glitchHeader}>
            <span className={styles.subtitle}>// SYSTEM MANIFESTO</span>
            <h1 className={`${styles.title} glitch-text`}>THE MANIFESTO</h1>
          </div>
          <p className={styles.description}>
            Open-source culture. Executable ideas. Creator-powered propagation. Scroll down to inspect the core directives of memetic.exe.
          </p>
        </section>

        {/* Manifesto Cards Grid */}
        <div className={styles.manifestoGrid}>
          {MANIFESTO_SECTIONS.map((sec) => (
            <div key={sec.id} className={styles.manifestoCard}>
              <div className={styles.cardHeader}>
                <span className={styles.sectionId}>{sec.id}</span>
                <h3 className={styles.sectionTitle}>{sec.title}</h3>
              </div>
              <p className={styles.sectionText}>{sec.text}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <span>MANIFESTO STATUS: PROPAGATED</span>
        <span>STAY WEIRD. STAY MEMETIC.</span>
      </footer>
    </div>
  );
}
