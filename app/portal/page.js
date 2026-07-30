"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Link from "next/link";
import styles from "./portal.module.css";

export default function CreatorPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [authStep, setAuthStep] = useState("EMAIL"); // EMAIL, CODE, LOGGED_IN
  const [code, setCode] = useState("");
  const [authLog, setAuthLog] = useState([]);
  
  const [activeTab, setActiveTab] = useState("METRICS"); // METRICS, DESIGNS, SUBMIT
  const [creatorName, setCreatorName] = useState("MrsMe");

  // Detailed Application Form States from submit.html
  const [fullName, setFullName] = useState("");
  const [contactMethod, setContactMethod] = useState("");
  const [portfolioLinks, setPortfolioLinks] = useState("");
  const [memeStyle, setMemeStyle] = useState("");
  const [artworkType, setArtworkType] = useState("");
  const [workExamples, setWorkExamples] = useState("");
  const [merchTees, setMerchTees] = useState(false);
  const [merchHoodies, setMerchHoodies] = useState(false);
  const [merchStickers, setMerchStickers] = useState(false);
  const [merchHats, setMerchHats] = useState(false);
  const [soldBefore, setSoldBefore] = useState("");
  const [agreedProfit, setAgreedProfit] = useState(false);
  const [agreedRights, setAgreedRights] = useState(false);
  
  const [title, setTitle] = useState("");
  const [substrate, setSubstrate] = useState("tee");
  const [file, setFile] = useState(null);
  
  const [submitStatus, setSubmitStatus] = useState("IDLE"); // IDLE, UPLOADING, SUCCESS
  const [submitLog, setSubmitLog] = useState([]);
  const [submissions, setSubmissions] = useState([
    {
      id: "tx-est2023",
      title: "EST 2023 T-Shirt Package",
      handle: "MrsMe",
      substrate: "tee",
      fileName: "EST 2023 T.zip",
      date: "07-28-2026",
      txHash: "0x8F2D...3B92"
    },
    {
      id: "tx-porkpointing",
      title: "Pork Pointing Vector Design",
      handle: "MrsMe",
      substrate: "print",
      fileName: "Pork Pointing T.svg",
      date: "07-27-2026",
      txHash: "0x9A3E...4E2A"
    },
    {
      id: "tx-pond",
      title: "OX Pond Collaboration package",
      handle: "MrsMe",
      substrate: "tee",
      fileName: "Pond🤝x.zip",
      date: "07-25-2026",
      txHash: "0xC5A1...1D8E"
    }
  ]);

  const addAuthLog = (msg) => {
    setAuthLog((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleSendLink = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setAuthStep("CODE");
    addAuthLog(`Sending login link to: ${email}`);
    
    setTimeout(() => {
      addAuthLog("Login code dispatched!");
      addAuthLog("Enter temporary verification code '1337' to log in.");
    }, 800);
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    if (code === "1337" || code === "1234" || code === "") {
      addAuthLog("Checking login code...");
      
      setTimeout(() => {
        addAuthLog("Success! Logging in...");
        setTimeout(() => {
          setIsLoggedIn(true);
          setAuthStep("LOGGED_IN");
        }, 800);
      }, 600);
    } else {
      addAuthLog("Error: Invalid code. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuthStep("EMAIL");
    setEmail("");
    setCode("");
    setAuthLog([]);
  };

  // Design Submission Methods inside Portal
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      addSubmitLog(`File loaded: ${selectedFile.name} (${Math.round(selectedFile.size / 1024)} KB)`);
    }
  };

  const addSubmitLog = (msg) => {
    setSubmitLog((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleInject = (e) => {
    e.preventDefault();
    if (!fullName || !contactMethod || !title || !file || !agreedProfit || !agreedRights) {
      addSubmitLog("UPLOAD ERROR: Required fields are missing or rights agreements unchecked.");
      return;
    }

    setSubmitStatus("UPLOADING");
    addSubmitLog(`> Scanning input fields for submission...`);
    
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    
    (async () => {
      await delay(600);
      addSubmitLog("> System integrity check: OK.");
      await delay(500);
      addSubmitLog("> Connecting to submission queue...");
      await delay(700);
      addSubmitLog("> Uploading design payload [35%]...");
      await delay(600);
      addSubmitLog("> Uploading design payload [85%]...");
      await delay(500);
      addSubmitLog(`> Payload uploaded successfully by node: @${creatorName}`);
      await delay(600);
      addSubmitLog("> Validating payload hash and credentials...");
      await delay(500);
      addSubmitLog("> Writing application data to kernel memory...");
      await delay(400);
      
      const transactionHash = "0x" + Math.random().toString(16).substring(2, 10).toUpperCase() + "..." + Math.random().toString(16).substring(2, 6).toUpperCase();
      addSubmitLog(`> Upload complete! Registry updated. Ref: ${transactionHash}`);
      addSubmitLog("> Status: SUCCESS - Pending admin review.");
      
      const newSubmission = {
        id: Math.random().toString(36).substring(7),
        title,
        handle: creatorName,
        substrate: substrate,
        fileName: file.name,
        date: new Date().toLocaleDateString(),
        txHash: transactionHash
      };
      
      setSubmissions((prev) => [newSubmission, ...prev]);
      setSubmitStatus("SUCCESS");
    })();
  };

  const resetSubmitForm = () => {
    setTitle("");
    setSubstrate("tee");
    setDesc("");
    setFile(null);
    setSubmitStatus("IDLE");
    setSubmitLog([]);
    // Do not clear application fields to save typing time
  };

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        {!isLoggedIn ? (
          /* LOGIN SCREEN */
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
                        required
                      />
                    </div>
                    <button type="submit" className={styles.loginBtn}>
                      SEND LOGIN CODE &gt;
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyCode} className={styles.form}>
                    <div className={styles.formGroup}>
                      <label className={styles.fieldLabel}>ENTER VERIFICATION CODE:</label>
                      <input
                        type="text"
                        placeholder="Enter key (e.g. 1337)"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className={styles.textInput}
                        required
                        autoFocus
                      />
                      <span className={styles.helper}>Check the logs below for your code.</span>
                    </div>
                    <button type="submit" className={styles.loginBtn}>
                      LOG IN &gt;
                    </button>
                  </form>
                )}
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
        ) : (
          /* DASHBOARD SCREEN (Gated matching creator-dashboard.html) */
          <div className={styles.dashboard}>
            {/* Sidebar */}
            <div className={styles.sidebar}>
              <div className={styles.profileBlock}>
                <div className={styles.profileAvatar}>[ {creatorName.substring(0,2).toUpperCase()} ]</div>
                <h3 className={styles.profileName}>@{creatorName}</h3>
                <span className={styles.roleTag}>Verified Creator</span>
              </div>

              <div className={styles.navMenu}>
                <button
                  onClick={() => setActiveTab("METRICS")}
                  className={`${styles.menuItem} ${activeTab === "METRICS" ? styles.activeMenu : ""}`}
                >
                  &gt; SALES &amp; VIEWS
                </button>
                <button
                  onClick={() => setActiveTab("DESIGNS")}
                  className={`${styles.menuItem} ${activeTab === "DESIGNS" ? styles.activeMenu : ""}`}
                >
                  &gt; MY DESIGNS
                </button>
                <button
                  onClick={() => setActiveTab("SUBMIT")}
                  className={`${styles.menuItem} ${activeTab === "SUBMIT" ? styles.activeMenu : ""}`}
                >
                  &gt; SUBMIT DESIGN
                </button>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                  &gt; LOG OUT
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className={styles.content}>
              {activeTab === "METRICS" && (
                /* METRICS DISPLAY (Matching creator-dashboard.html stats cards) */
                <div className={styles.tabContent}>
                  <div className={styles.contentHeader}>
                    <h2>CREATOR DASHBOARD</h2>
                    <span className={styles.timeTag}>verified session active</span>
                  </div>

                  {/* Terminal Greeting */}
                  <div className={styles.dashboardTerminal}>
                    <p>&gt; verified creator detected.</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&gt; dashboard access granted.</p>
                  </div>

                  {/* Stats Grid */}
                  <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                      <span className={styles.statLabel}>CREATOR IDENTITY</span>
                      <div className={styles.identityDetails}>
                        <div className={styles.detailRow}><span>status:</span> <span className={styles.tag}>verified creator</span></div>
                        <div className={styles.detailRow}><span>wallet:</span> <span className={styles.mono}>0x8C2D...F29B</span></div>
                        <div className={styles.detailRow}><span>session:</span> <span className={styles.mono}>email login</span></div>
                      </div>
                    </div>
                    
                    <div className={styles.statCard}>
                      <span className={styles.statLabel}>CREATOR STATS</span>
                      <div className={styles.identityDetails}>
                        <div className={styles.detailRow}><span>total submissions:</span> <span className={styles.mono}>3</span></div>
                        <div className={styles.detailRow}><span>approved designs:</span> <span className={styles.mono}>3</span></div>
                        <div className={styles.detailRow}><span>lifetime earnings:</span> <span className={styles.mono}>$0.00</span></div>
                      </div>
                      <p className={styles.statNote}>earnings are handled by MerchLabs automatically — no wallet payouts required.</p>
                    </div>

                    <div className={styles.statCard}>
                      <span className={styles.statLabel}>CREATOR ACTIONS</span>
                      <div className={styles.actionsPanel}>
                        <button onClick={() => setActiveTab("SUBMIT")} className={styles.actionBtn}>
                          SUBMIT NEW DESIGN
                        </button>
                        <Link href="/creators" className={styles.actionBtn}>
                          VIEW CREATORS PAGE
                        </Link>
                        <Link href="/store" className={styles.actionBtn}>
                          VIEW STORE LISTINGS
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Bar Chart */}
                  <div className={styles.chartSection}>
                    <h3 className={styles.chartTitle}>UNITS SOLD (LAST 30 DAYS)</h3>
                    <div className={styles.chartContainer}>
                      <div className={styles.chartGridLines}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <div className={styles.bars}>
                        <div className={styles.barWrapper} style={{ "--height": "40%" }}><div className={styles.bar}></div><span className={styles.barLabel}>07-05</span></div>
                        <div className={styles.barWrapper} style={{ "--height": "65%" }}><div className={styles.bar}></div><span className={styles.barLabel}>07-10</span></div>
                        <div className={styles.barWrapper} style={{ "--height": "50%" }}><div className={styles.bar}></div><span className={styles.barLabel}>07-15</span></div>
                        <div className={styles.barWrapper} style={{ "--height": "85%" }}><div className={styles.bar}></div><span className={styles.barLabel}>07-20</span></div>
                        <div className={styles.barWrapper} style={{ "--height": "95%" }}><div className={styles.bar}></div><span className={styles.barLabel}>07-25</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "DESIGNS" && (
                /* DESIGNS DISPLAY */
                <div className={styles.tabContent}>
                  <div className={styles.contentHeader}>
                    <h2>MY DESIGNS</h2>
                    <button onClick={() => setActiveTab("SUBMIT")} className={styles.addNewBtn}>
                      + SUBMIT A DESIGN
                    </button>
                  </div>

                  <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>DESIGN ID</th>
                          <th>TITLE</th>
                          <th>TYPE</th>
                          <th>TOTAL SOLD</th>
                          <th>STATUS</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className={styles.hashCol}>PAY-09F2</td>
                          <td>Everything You Do Matters Tee</td>
                          <td>TEE</td>
                          <td>142 sold</td>
                          <td><span className={styles.statusActive}>IN SHOP</span></td>
                        </tr>
                        <tr>
                          <td className={styles.hashCol}>PAY-082E</td>
                          <td>Pork Tee</td>
                          <td>TEE</td>
                          <td>89 sold</td>
                          <td><span className={styles.statusActive}>IN SHOP</span></td>
                        </tr>
                        <tr>
                          <td className={styles.hashCol}>PAY-06A1</td>
                          <td>OX Pond Tee</td>
                          <td>TEE</td>
                          <td>204 sold</td>
                          <td><span className={styles.statusActive}>IN SHOP</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "SUBMIT" && (
                /* DETAILED CREATOR APPLICATION VIEW (submit.html copy) */
                <div className={styles.tabContent}>
                  <div className={styles.contentHeader}>
                    <h2>SUBMIT DESIGN PAYLOAD</h2>
                    <span className={styles.timeTag}>submit.exe v2.0</span>
                  </div>

                  <div className={styles.grid}>
                    {/* Submission Form Card */}
                    <div className={styles.formCard}>
                      <div className={styles.cardHeader}>
                        <span className={styles.cardTitle}>&gt;_ CREATOR APPLICATION &amp; SUBMISSION</span>
                      </div>

                      {submitStatus === "SUCCESS" ? (
                        <div className={styles.successScreen}>
                          <div className={styles.successIcon}>✓</div>
                          <h3 className={styles.successTitle}>✓ PAYLOAD RECEIVED</h3>
                          <p className={styles.successText}>
                            The kernel is reviewing your submission. We will examine formatting constraints, attribution handles, and copyright integrity check.
                          </p>
                          <button onClick={resetSubmitForm} className={styles.resetBtn}>
                            SUBMIT ANOTHER DESIGN
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={handleInject} className={styles.form}>
                          
                          {/* Section 1: About You */}
                          <div className={styles.sectionHeader}>Section 1: About You</div>
                          
                          <div className={styles.formGroup}>
                            <label className={styles.fieldLabel}>FULL NAME / ALIAS:</label>
                            <input
                              type="text"
                              placeholder="e.g. John Doe"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              className={styles.textInput}
                              disabled={submitStatus === "UPLOADING"}
                              required
                            />
                          </div>

                          <div className={styles.formGroup}>
                            <label className={styles.fieldLabel}>EMAIL OR CONTACT METHOD:</label>
                            <input
                              type="text"
                              placeholder="e.g. contact@domain.com or Discord tag"
                              value={contactMethod}
                              onChange={(e) => setContactMethod(e.target.value)}
                              className={styles.textInput}
                              disabled={submitStatus === "UPLOADING"}
                              required
                            />
                          </div>

                          <div className={styles.formGroup}>
                            <label className={styles.fieldLabel}>SOCIAL MEDIA / PORTFOLIO LINKS:</label>
                            <textarea
                              placeholder="Provide links to your artwork portfolios..."
                              value={portfolioLinks}
                              onChange={(e) => setPortfolioLinks(e.target.value)}
                              className={styles.textArea}
                              disabled={submitStatus === "UPLOADING"}
                              required
                            />
                          </div>

                          <div className={styles.formGroup}>
                            <label className={styles.fieldLabel}>ATTRIBUTION USERNAME:</label>
                            <input
                              type="text"
                              value={`@${creatorName}`}
                              className={styles.textInput}
                              disabled
                            />
                            <span className={styles.helper}>Auto-populates from verified account</span>
                          </div>

                          {/* Section 2: Meme / Design Style */}
                          <div className={styles.sectionHeader}>Section 2: Meme / Design Style</div>

                          <div className={styles.formGroup}>
                            <label className={styles.fieldLabel}>DESCRIBE YOUR MEME STYLE (1-3 SENTENCES):</label>
                            <textarea
                              placeholder="What style of humor or visual graphics do you lean into?"
                              value={memeStyle}
                              onChange={(e) => setMemeStyle(e.target.value)}
                              className={styles.textArea}
                              disabled={submitStatus === "UPLOADING"}
                              required
                            />
                          </div>

                          <div className={styles.formGroup}>
                            <label className={styles.fieldLabel}>DO YOU CREATE ORIGINAL ART, REMIXES, OR BOTH?</label>
                            <select
                              value={artworkType}
                              onChange={(e) => setArtworkType(e.target.value)}
                              className={styles.selectInput}
                              disabled={submitStatus === "UPLOADING"}
                              required
                            >
                              <option value="">select one</option>
                              <option value="Original Artwork">Original Artwork</option>
                              <option value="Meme Remixes">Meme Remixes</option>
                              <option value="Both">Both</option>
                            </select>
                          </div>

                          <div className={styles.formGroup}>
                            <label className={styles.fieldLabel}>PROVIDE EXTERNAL LINKS TO 1-3 WORK EXAMPLES:</label>
                            <textarea
                              placeholder="Google Drive, social threads, or website URLs showing past designs..."
                              value={workExamples}
                              onChange={(e) => setWorkExamples(e.target.value)}
                              className={styles.textArea}
                              disabled={submitStatus === "UPLOADING"}
                              required
                            />
                          </div>

                          {/* Section 3: Merch Fit */}
                          <div className={styles.sectionHeader}>Section 3: Merch Fit &amp; Payload</div>

                          <div className={styles.formGroup}>
                            <label className={styles.fieldLabel}>DESIGN TITLE:</label>
                            <input
                              type="text"
                              placeholder="e.g. Pork Pointing Vector"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              className={styles.textInput}
                              disabled={submitStatus === "UPLOADING"}
                              required
                            />
                          </div>

                          <div className={styles.formGroup}>
                            <label className={styles.fieldLabel}>PREFERRED APPAREL CANVAS:</label>
                            <select
                              value={substrate}
                              onChange={(e) => setSubstrate(e.target.value)}
                              className={styles.selectInput}
                              disabled={submitStatus === "UPLOADING"}
                            >
                              <option value="tee">Standard T-Shirt</option>
                              <option value="hoodie">Cozy Hoodie</option>
                              <option value="cap">Adjustable Cap</option>
                              <option value="print">Custom Print / Poster</option>
                            </select>
                          </div>

                          <div className={styles.formGroup}>
                            <label className={styles.fieldLabel}>WHAT TYPES OF MERCH DO YOU SEE THIS ON?</label>
                            <div className={styles.checkboxGroup}>
                              <label><input type="checkbox" checked={merchTees} onChange={(e) => setMerchTees(e.target.checked)} disabled={submitStatus === "UPLOADING"} /> T-Shirts</label>
                              <label><input type="checkbox" checked={merchHoodies} onChange={(e) => setMerchHoodies(e.target.checked)} disabled={submitStatus === "UPLOADING"} /> Hoodies</label>
                              <label><input type="checkbox" checked={merchStickers} onChange={(e) => setMerchStickers(e.target.checked)} disabled={submitStatus === "UPLOADING"} /> Stickers</label>
                              <label><input type="checkbox" checked={merchHats} onChange={(e) => setMerchHats(e.target.checked)} disabled={submitStatus === "UPLOADING"} /> Hats</label>
                            </div>
                          </div>

                          <div className={styles.formGroup}>
                            <label className={styles.fieldLabel}>HAVE YOU SOLD DESIGNS BEFORE?</label>
                            <select
                              value={soldBefore}
                              onChange={(e) => setSoldBefore(e.target.value)}
                              className={styles.selectInput}
                              disabled={submitStatus === "UPLOADING"}
                              required
                            >
                              <option value="">select one</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>

                          <div className={styles.formGroup}>
                            <label className={styles.fieldLabel}>UPLOAD ARTIFACT FILE:</label>
                            <div className={styles.fileDropZone}>
                              <input
                                type="file"
                                id="payloadFile"
                                onChange={handleFileChange}
                                className={styles.hiddenFile}
                                accept="image/*,.pdf,.zip,.svg"
                                disabled={submitStatus === "UPLOADING"}
                                required
                              />
                              <label htmlFor="payloadFile" className={styles.fileLabel}>
                                {file ? (
                                  <span className={styles.fileName}>{file.name}</span>
                                ) : (
                                  <span>[ CLICK TO CHOOSE: SVG / PNG / ZIP ]</span>
                                )}
                              </label>
                            </div>
                          </div>

                          <div className={styles.formGroup}>
                            <label className={styles.agreementLabel}>
                              <input
                                type="checkbox"
                                checked={agreedProfit}
                                onChange={(e) => setAgreedProfit(e.target.checked)}
                                disabled={submitStatus === "UPLOADING"}
                                required
                              />
                              I understand the profit-sharing model.
                            </label>
                            <label className={styles.agreementLabel}>
                              <input
                                type="checkbox"
                                checked={agreedRights}
                                onChange={(e) => setAgreedRights(e.target.checked)}
                                disabled={submitStatus === "UPLOADING"}
                                required
                              />
                              I confirm I own the rights to my submissions.
                            </label>
                          </div>

                          <button
                            type="submit"
                            className={styles.injectBtn}
                            disabled={submitStatus === "UPLOADING"}
                          >
                            {submitStatus === "UPLOADING" ? "UPLOADING..." : "UPLOAD MEME PAYLOAD"}
                          </button>
                        </form>
                      )}
                    </div>

                    {/* Console Logs */}
                    <div className={styles.consoleCard}>
                      <div className={styles.cardHeader}>
                        <span className={styles.cardTitle}>&gt;_ SYSTEM OUTPUT</span>
                        <span className={styles.blinkingNode}>LIVE_LOGS</span>
                      </div>
                      <div className={styles.consoleContent}>
                        {submitLog.length === 0 ? (
                          <div className={styles.emptyLog}>Console ready. Choose a file and click submit to upload.</div>
                        ) : (
                          submitLog.map((line, idx) => (
                            <div key={idx} className={styles.consoleLine}>
                              {line}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Submitted ledger */}
                  {submissions.length > 0 && (
                    <div className={styles.historySection}>
                      <h3 className={styles.historyTitle}>SUBMITTED DESIGNS LEDGER:</h3>
                      <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                          <thead>
                            <tr>
                              <th>REF_ID</th>
                              <th>CREATOR</th>
                              <th>TITLE</th>
                              <th>TYPE</th>
                              <th>FILE NAME</th>
                              <th>DATE</th>
                              <th>STATUS</th>
                            </tr>
                          </thead>
                          <tbody>
                            {submissions.map((sub) => (
                              <tr key={sub.id}>
                                <td className={styles.hashCol}>{sub.txHash}</td>
                                <td>@{sub.handle}</td>
                                <td>{sub.title}</td>
                                <td>{sub.substrate.toUpperCase()}</td>
                                <td>{sub.fileName}</td>
                                <td>{sub.date}</td>
                                <td>
                                  <span className={styles.statusQueued}>PENDING REVIEW</span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <span>PORTAL: SECURE</span>
        <span>STATUS: LOGGED IN</span>
      </footer>
    </div>
  );
}
