"use client";

export const dynamic = "force-dynamic";
export const runtime = "edge";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Link from "next/link";
import styles from "./admin.module.css";

function generateRandomNodeId() {
  const hex = Math.floor(Math.random() * 256).toString(16).toUpperCase().padStart(2, "0");
  return `0x${hex}`;
}

export default function AdminPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  // Form states for approval
  const [nodeId, setNodeId] = useState("");
  const [status, setStatus] = useState("Creator");
  const [cardStatus, setCardStatus] = useState("ACTIVE");
  const [submitting, setSubmitting] = useState(false);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/applications");
      if (response.status === 401) {
        window.location.href = "/portal";
        return;
      }
      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      } else {
        const errData = await response.json();
        setError(errData.error || "Failed to load applications.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error fetching applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Promise.resolve().then(() => {
      fetchApplications();
    });
  }, []);

  const handleExpand = (app) => {
    if (expandedId === app.id) {
      setExpandedId(null);
    } else {
      setExpandedId(app.id);
      setNodeId(generateRandomNodeId());
      setStatus("Creator");
      setCardStatus("ACTIVE");
    }
  };

  const handleApprove = async (e, app) => {
    e.preventDefault();
    if (!nodeId) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/admin/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationId: app.id,
          name: app.displayName,
          email: app.email,
          twitter: app.twitter,
          nodeId,
          bio: app.bio,
          status,
          cardStatus
        })
      });

      if (response.ok) {
        setExpandedId(null);
        fetchApplications();
      } else {
        const data = await response.json();
        alert(data.error || "Approval failed");
      }
    } catch (err) {
      console.error(err);
      alert("Network error approving application.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReject = async (appId) => {
    if (!confirm("Are you sure you want to reject this application?")) return;

    try {
      const response = await fetch("/api/admin/reject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId: appId })
      });

      if (response.ok) {
        if (expandedId === appId) setExpandedId(null);
        fetchApplications();
      } else {
        const data = await response.json();
        alert(data.error || "Rejection failed");
      }
    } catch (err) {
      console.error(err);
      alert("Network error rejecting application.");
    }
  };

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <section className={styles.adminHeader}>
          <div className={styles.headerLeft}>
            <span className={styles.subtitle}>{"// KERNEL CONSOLE"}</span>
            <h1 className={styles.title}>ADMIN: REVIEW QUEUE</h1>
            <Link href="/portal" className={styles.dashboardLink}>
              &lt; Back to Portal
            </Link>
          </div>
          <span className={styles.sessionTag}>ADMIN SESSION SECURED</span>
        </section>

        {loading ? (
          <div className={styles.loadingOverlay}>&gt;_ RETRIEVING QUEUE DATA...</div>
        ) : error ? (
          <div className={styles.emptyState}>{error}</div>
        ) : (
          <div className={styles.listSection}>
            <div className={styles.sectionTitle}>
              Pending Applications ({applications.length})
            </div>

            <div className={styles.tableCard}>
              <div className={styles.cardHeader}>
                <span>&gt;_ PENDING LEDGER</span>
              </div>

              <div className={styles.tableWrapper}>
                {applications.length === 0 ? (
                  <div className={styles.emptyState}>
                    &gt;_ NO PENDING APPLICATIONS IN QUEUE. SYSTEM STANDBY.
                  </div>
                ) : (
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>SUBMIT DATE</th>
                        <th>HANDLE</th>
                        <th>EMAIL</th>
                        <th>TWITTER</th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((app) => (
                        <tr key={app.id} className={expandedId === app.id ? styles.expandedRow : ""}>
                          <td className={styles.dateCol}>
                            {new Date(app.createdAt).toLocaleDateString()}
                          </td>
                          <td className={styles.handleCol}>@{app.displayName}</td>
                          <td>{app.email}</td>
                          <td>{app.twitter || "[NONE]"}</td>
                          <td className={styles.actions}>
                            <button
                              onClick={() => handleExpand(app)}
                              className={styles.btnApprove}
                            >
                              {expandedId === app.id ? "CLOSE" : "REVIEW & APPROVE"}
                            </button>
                            <button
                              onClick={() => handleReject(app.id)}
                              className={styles.btnReject}
                            >
                              REJECT
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {expandedId && (
              <div className={styles.expandedRow}>
                {applications
                  .filter((app) => app.id === expandedId)
                  .map((app) => (
                    <div key={app.id} className={styles.expandedContent}>
                      <div className={styles.detailsGrid}>
                        <div className={styles.detailItem}>
                          <span className={styles.label}>PORTFOLIO / WORK LINKS:</span>
                          <span className={styles.value}>
                            {app.portfolio ? (
                              <a href={app.portfolio} target="_blank" rel="noopener noreferrer">
                                {app.portfolio}
                              </a>
                            ) : (
                              "[No links provided]"
                            )}
                          </span>
                        </div>
                        <div className={styles.detailItem}>
                          <span className={styles.label}>DESIGN SAMPLES / WORK:</span>
                          <span className={styles.value}>{app.designSamples || "[No samples]"}</span>
                        </div>
                        <div className={styles.detailItem}>
                          <span className={styles.label}>BIOGRAPHY / JOIN RATIONALE:</span>
                          <span className={styles.value}>{app.bio}</span>
                        </div>
                      </div>

                      <form
                        onSubmit={(e) => handleApprove(e, app)}
                        className={styles.approvalForm}
                      >
                        <span className={styles.formTitle}>&gt;_ GENERATE CREATOR NODE</span>
                        
                        <div className={styles.formGrid}>
                          <div className={styles.formGroup}>
                            <label className={styles.inputLabel}>ASSIGN NODE ID (0xXX):</label>
                            <input
                              type="text"
                              value={nodeId}
                              onChange={(e) => setNodeId(e.target.value)}
                              className={styles.inputField}
                              required
                              disabled={submitting}
                            />
                          </div>

                          <div className={styles.formGroup}>
                            <label className={styles.inputLabel}>CREATOR STATUS:</label>
                            <select
                              value={status}
                              onChange={(e) => setStatus(e.target.value)}
                              className={styles.inputField}
                              disabled={submitting}
                            >
                              <option value="Creator">Creator</option>
                              <option value="Lead Designer">Lead Designer</option>
                              <option value="Design Node">Design Node</option>
                            </select>
                          </div>

                          <div className={styles.formGroup}>
                            <label className={styles.inputLabel}>CARD DISPLAY STATUS:</label>
                            <select
                              value={cardStatus}
                              onChange={(e) => setCardStatus(e.target.value)}
                              className={styles.inputField}
                              disabled={submitting}
                            >
                              <option value="ACTIVE">ACTIVE</option>
                              <option value="PRIMARY">PRIMARY</option>
                              <option value="STANDBY">STANDBY</option>
                            </select>
                          </div>
                        </div>

                        <div className={styles.formActions}>
                          <button
                            type="submit"
                            className={styles.btnSubmitApprove}
                            disabled={submitting}
                          >
                            {submitting ? "PROVISIONING..." : "APPROVE & PROVISION NODE"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setExpandedId(null)}
                            className={styles.btnCancel}
                            disabled={submitting}
                          >
                            CANCEL
                          </button>
                        </div>
                      </form>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <span>ADMIN: ONLINE</span>
        <span>SECURITY LEVEL: ROOT</span>
      </footer>
    </div>
  );
}
