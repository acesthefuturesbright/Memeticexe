"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Link from "next/link";
import styles from "./apply.module.css";

export default function ApplyPage() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [twitter, setTwitter] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [bio, setBio] = useState("");
  const [designSamples, setDesignSamples] = useState("");
  const [agreed, setAgreed] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!displayName || !email || !bio || !agreed) {
      setError("Please fill in all required fields and accept the agreement.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName,
          email,
          twitter,
          portfolio,
          bio,
          designSamples
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(data.error || "An error occurred while submitting your application.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setError("Failed to submit. Please check your network connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <section className={styles.applyHeader}>
          <div className={styles.glitchHeader}>
            <span className={styles.subtitle}>{"// CREATOR PARTNERSHIP"}</span>
            <h1 className={`${styles.title} glitch-text`}>JOIN THE PROGRAM</h1>
          </div>
          <p className={styles.description}>
            Submit your details below to apply as an artist. Approved creators get featured on the creators directory, gain dashboard access, and earn royalties of $1 to $3 per shirt sold.
          </p>
        </section>

        <div className={styles.formCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>&gt;_ APPLICATION FORM</span>
          </div>

          <div className={styles.formContent}>
            {success ? (
              <div className={styles.successScreen}>
                <div className={styles.successIcon}>✓</div>
                <h3 className={styles.successTitle}>Application Received</h3>
                <p className={styles.successText}>
                  Your application has been logged and queued for review. We will evaluate your portfolio and contact handle shortly. 
                  Once approved, you will be able to log in to the Creator Portal using your registered email address.
                </p>
                <Link href="/" className={styles.backBtn}>
                  Return Home
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                {error && <div className={styles.errorBox}>{error}</div>}

                <div className={styles.formGroup}>
                  <label className={styles.fieldLabel}>
                    Display Name / Handle <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. MrsMe"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className={styles.textInput}
                    disabled={loading}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.fieldLabel}>
                    Email Address <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.textInput}
                    disabled={loading}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.fieldLabel}>X (Twitter) Handle</label>
                  <input
                    type="text"
                    placeholder="e.g. @mrsmedoteth"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    className={styles.textInput}
                    disabled={loading}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.fieldLabel}>Portfolio or Existing Work Links</label>
                  <input
                    type="text"
                    placeholder="e.g. Links to Behance, personal site, or social thread"
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                    className={styles.textInput}
                    disabled={loading}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.fieldLabel}>
                    Short Bio / Why you want to join <span className={styles.required}>*</span>
                  </label>
                  <textarea
                    placeholder="Describe your design style and background..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className={styles.textArea}
                    disabled={loading}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.fieldLabel}>Design Samples</label>
                  <textarea
                    placeholder="Provide links to 1-3 design files (Google Drive, Imgur, Dropbox, etc.)"
                    value={designSamples}
                    onChange={(e) => setDesignSamples(e.target.value)}
                    className={styles.textArea}
                    disabled={loading}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      disabled={loading}
                      required
                    />
                    <span>
                      I understand that submissions are subject to copyright and quality review, and royalties are distributed based on product sales.
                    </span>
                  </label>
                </div>

                <button type="submit" className={styles.submitBtn} disabled={loading}>
                  {loading ? "SUBMITTING..." : "SUBMIT APPLICATION >"}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <span>SYSTEM VERSION: v1.0.4</span>
        <span>APPLICATION STATUS: ACTIVE</span>
      </footer>
    </div>
  );
}
