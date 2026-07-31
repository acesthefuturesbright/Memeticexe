"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Header from "@/components/Header";
import styles from "./portal.module.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [authStep, setAuthStep] = useState("EMAIL"); // EMAIL, CODE
  const [authLog, setAuthLog] = useState([]);
  const [loading, setLoading] = useState(false);

  const addAuthLog = (msg) => {
    setAuthLog((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleSendLink = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    addAuthLog(`Requesting login code for: ${email}`);

    try {
      const response = await fetch("/api/auth/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        setAuthStep("CODE");
        addAuthLog("Login code generated!");
        addAuthLog("Check the system terminal console/logs for your code.");
        addAuthLog("Hint: Developer bypass code '1337' is active.");
      } else {
        addAuthLog(`Access Denied: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      addAuthLog("Connection error. Code dispatch failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (!code) return;

    setLoading(true);
    addAuthLog("Authenticating credentials...");

    try {
      const result = await signIn("credentials", {
        email,
        code,
        redirect: false
      });

      if (result?.error) {
        addAuthLog("Error: Invalid verification code or access denied.");
      } else {
        addAuthLog("Success! Opening session...");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (err) {
      console.error(err);
      addAuthLog("Authentication exception encountered.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginCard}>
        <div className={styles.cardHeader}>
          <span className={styles.cardTitle}>&gt;_ CREATOR PORTAL LOGIN</span>
        </div>
        
        <div className={styles.loginContent}>
          <p className={styles.loginIntro}>
            Log in to your creator account to view your merch sales, shop traffic, and submit new designs.
          </p>

          {authStep === "EMAIL" ? (
            <form onSubmit={handleSendLink} className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.fieldLabel}>EMAIL ADDRESS:</label>
                <input
                  type="email"
                  placeholder="yourname@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.textInput}
                  disabled={loading}
                  required
                />
              </div>
              <button type="submit" className={styles.loginBtn} disabled={loading}>
                {loading ? "SENDING..." : "SEND LOGIN CODE >"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyCode} className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.fieldLabel}>ENTER VERIFICATION CODE:</label>
                <input
                  type="text"
                  placeholder="Enter key (e.g. 1337 or check console logs)"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className={styles.textInput}
                  disabled={loading}
                  required
                  autoFocus
                />
                <span className={styles.helper}>Check your server terminal output for the OTP code.</span>
              </div>
              <button type="submit" className={styles.loginBtn} disabled={loading}>
                {loading ? "LOGGING IN..." : "LOG IN >"}
              </button>
            </form>
          )}

          <div className={styles.applyLinkContainer}>
            <p className={styles.applyText}>
              {"Not a creator yet? "}
              <a href="/apply" className={styles.applyLink}>Apply to join the program</a>
            </p>
          </div>
        </div>
      </div>

      {/* Auth Console logs */}
      {authLog.length > 0 && (
        <div className={styles.authConsole}>
          <div className={styles.consoleHeader}>
            <span>&gt;_ LOG OUTPUT</span>
          </div>
          <div className={styles.consoleContent}>
            {authLog.map((line, idx) => (
              <div key={idx} className={styles.consoleLine}>
                {line}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
