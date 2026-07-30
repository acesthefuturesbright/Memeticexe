"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./Terminal.module.css";

export default function Terminal() {
  const router = useRouter();
  const [terminalState, setTerminalState] = useState("IDLE"); // IDLE, MINIMIZING, MAXIMIZING, SUCKED
  const [jumpingFrogs, setJumpingFrogs] = useState([]); // Array of frogs jumping across the screen
  const [destructCountdown, setDestructCountdown] = useState(null); // Self destruct countdown
  const [binaryGridSeed, setBinaryGridSeed] = useState(0);
  const [dealWithItActive, setDealWithItActive] = useState(false); // Deal with it sunglasses active state
  const [history, setHistory] = useState([
    { type: "system", text: "memetic.exe [Version 7.4.2]" },
    { type: "system", text: "Initializing shell interface..." },
    { type: "system", text: "" },
    { type: "info", text: "Loading creator registry modules..." },
    { type: "success", text: "Status: STABLE. Ready for input." },
    { type: "system", text: "" },
    { type: "system", text: "Type 'help' to view available commands." },
    { type: "system", text: "" }
  ]);
  const [input, setInput] = useState("");
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  useEffect(() => {
    if (destructCountdown !== null) {
      const interval = setInterval(() => {
        setBinaryGridSeed(Math.random());
      }, 120);
      return () => clearInterval(interval);
    }
  }, [destructCountdown]);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const trimmedInput = input.trim().toLowerCase();
      if (!trimmedInput) return;

      const newHistory = [...history, { type: "command", text: `C:\\memetic> ${input}` }];
      processCommand(trimmedInput, newHistory);
      setInput("");
    }
  };

  const handleMinimize = (e) => {
    e.stopPropagation();
    if (terminalState !== "IDLE" || destructCountdown !== null) return;
    setTerminalState("MINIMIZING");
    setTimeout(() => {
      setTerminalState("IDLE");
    }, 1200);
  };

  const handleMaximize = (e) => {
    e.stopPropagation();
    if (terminalState !== "IDLE" || destructCountdown !== null) return;
    setTerminalState("MAXIMIZING");
    setTimeout(() => {
      setTerminalState("IDLE");
    }, 1200);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    if (terminalState !== "IDLE" || destructCountdown !== null) return;
    setTerminalState("SUCKED");
    setTimeout(() => {
      setTerminalState("IDLE");
      setHistory((prev) => [
        ...prev,
        { type: "error", text: "WARNING: System implosion detected. Recovering boot memory..." },
        { type: "success", text: "System reboot completed. memetic.exe shell restored." }
      ]);
    }, 1800);
  };

  const triggerFrogs = () => {
    const newFrogs = Array.from({ length: 12 }).map((_, i) => ({
      id: Math.random(),
      delay: i * 240 + Math.random() * 100,
      speed: 2.2 + Math.random() * 1.2,
      startY: 20 + Math.random() * 60,
      fontSize: 1.5 + Math.random() * 2
    }));
    setJumpingFrogs(newFrogs);
    setTimeout(() => {
      setJumpingFrogs([]);
    }, 5500);
  };

  const triggerSelfDestruct = () => {
    setHistory((prev) => [
      ...prev,
      { type: "error", text: "[CRITICAL ERROR] PATH MUTATION DETECTED." },
      { type: "error", text: "UNAUTHORIZED ATTEMPT TO ALTER FILE SYSTEM ENVIRONMENT." },
      { type: "glitch", text: "INITIATING SYSTEM CORE SELF-DESTRUCT PROTOCOL..." }
    ]);

    setDestructCountdown(5);

    let tick = 5;
    const interval = setInterval(() => {
      if (tick > 1) {
        tick--;
        setDestructCountdown(tick);
      } else {
        clearInterval(interval);
        setDestructCountdown(null);
        setHistory([
          { type: "system", text: "memetic.exe [Version 7.4.2]" },
          { type: "error", text: "WARNING: Self-destruct recovery successful." },
          { type: "success", text: "Reboot sequence initialized. Environment restored to C:\\memetic." }
        ]);
      }
    }, 1000);
  };

  const processCommand = (cmd, currentHistory) => {
    const args = cmd.split(" ");
    const command = args[0];

    // Check for directory changes or partition swaps (cd, chdir, cd.., c:, d:, etc.)
    const isChangePath = 
      command === "cd" || 
      command === "chdir" || 
      command.startsWith("cd.") || 
      command.startsWith("cd/") || 
      command.startsWith("cd\\") || 
      (command.length === 2 && command.endsWith(":"));

    if (isChangePath) {
      triggerSelfDestruct();
      return;
    }

    // Special match for 'deal with it' (since it contains spaces, command will be 'deal' but we check cmd string directly)
    if (cmd === "deal with it" || cmd === "dealwithit") {
      setHistory([
        ...currentHistory,
        { type: "success", text: "[SYSTEM] Initiating deal-with-it matrix overlay..." }
      ]);
      setDealWithItActive(true);
      setTimeout(() => {
        setDealWithItActive(false);
      }, 4800);
      return;
    }

    switch (command) {
      case "help":
        setHistory([
          ...currentHistory,
          { type: "system", text: "Available commands:" },
          { type: "info", text: "  home       - Go back to homepage" },
          { type: "info", text: "  shop       - Open the merchandise store" },
          { type: "info", text: "  creators   - Inspect creator profiles" },
          { type: "info", text: "  portal     - Access creator telemetry portal" },
          { type: "info", text: "  clear      - Clear console buffer screen" },
          { type: "info", text: "  secret     - Run a diagnostics matrix scan" }
        ]);
        break;
      case "home":
        setHistory([
          ...currentHistory,
          { type: "info", text: "Navigating to homepage..." }
        ]);
        setTimeout(() => {
          router.push("/");
        }, 1000);
        break;
      case "shop":
      case "store":
        setHistory([
          ...currentHistory,
          { type: "info", text: "Redirecting client session to merch store..." }
        ]);
        setTimeout(() => {
          router.push("/store");
        }, 1000);
        break;
      case "creators":
      case "artists":
        setHistory([
          ...currentHistory,
          { type: "info", text: "Accessing community creators directory database..." }
        ]);
        setTimeout(() => {
          router.push("/creators");
        }, 1000);
        break;
      case "submit":
      case "portal":
        setHistory([
          ...currentHistory,
          { type: "error", text: "Security credentials missing. Log in to portal to submit files." }
        ]);
        setTimeout(() => {
          router.push("/portal");
        }, 1200);
        break;
      case "pond0x":
        setHistory([
          ...currentHistory,
          { type: "glitch", text: "FORWARDING TRANSMISSION TO POND0X..." }
        ]);
        setTimeout(() => {
          window.open("https://www.pond0x.com", "_blank");
        }, 1000);
        break;
      case "mrsme":
        setHistory([
          ...currentHistory,
          { type: "info", text: "Opening @mrsme0x X profile..." }
        ]);
        setTimeout(() => {
          window.open("https://x.com/mrsme0x", "_blank");
        }, 1000);
        break;
      case "frog":
      case "frogs":
        setHistory([
          ...currentHistory,
          { type: "success", text: "[SYSTEM] Releasing frogs into viewport execution grid..." }
        ]);
        triggerFrogs();
        break;
      case "clear":
        setHistory([]);
        break;
      case "secret":
        setHistory([
          ...currentHistory,
          { type: "glitch", text: "RUNNING SYSTEM HARDWARE DIAGNOSTICS..." },
          { type: "success", text: "[========================================] 100%" },
          { type: "system", text: "Telemetry checks verified. Memory: STABLE." },
          { type: "error", text: "Alert: Terminal console simulation active!" }
        ]);
        break;
      default:
        setHistory([
          ...currentHistory,
          { type: "error", text: `'${command}' is not recognized as an internal or external command, operable program or batch file.` }
        ]);
    }
  };

  return (
    <>
      {/* DEAL WITH IT MEME OVERLAY */}
      {dealWithItActive && (
        <div className={styles.sunglassesWrapper}>
          <svg width="150" height="35" viewBox="0 0 150 35" className={styles.sunglassesSvg}>
            {/* Left lens frame */}
            <rect x="15" y="10" width="45" height="18" fill="#000000" />
            {/* Right lens frame */}
            <rect x="75" y="10" width="45" height="18" fill="#000000" />
            {/* Bridge */}
            <rect x="60" y="10" width="15" height="6" fill="#000000" />
            {/* Hangers / Temple details */}
            <rect x="0" y="5" width="15" height="10" fill="#000000" />
            <rect x="120" y="5" width="20" height="5" fill="#000000" />
            <rect x="130" y="10" width="20" height="10" fill="#000000" />
            {/* White reflections */}
            <rect x="22" y="16" width="6" height="6" fill="#ffffff" />
            <rect x="82" y="16" width="6" height="6" fill="#ffffff" />
          </svg>
          <div className={styles.dealWithItText}>DEAL WITH IT</div>
        </div>
      )}

      {/* HACK / SELF DESTRUCT OVERLAY */}
      {destructCountdown !== null && (
        <div className={styles.hackOverlay}>
          <div className={styles.hackAlertBox}>
            <div className={styles.hackGlitchText} data-text="CRITICAL SYSTEM FAILURE">
              CRITICAL SYSTEM FAILURE
            </div>
            <div className={styles.hackSubtitle}>ACCESS VIOLATION: CORRUPTING SHELL ROOT</div>
            
            <div className={styles.binaryGrid}>
              {Array.from({ length: 5 }).map((_, r) => (
                <div key={r} className={styles.binaryRow}>
                  {Array.from({ length: 24 }).map((_, c) => {
                    const randomVal = Math.round(Math.sin((r * 24 + c) * binaryGridSeed) * 0.5 + 0.5);
                    return (
                      <span 
                        key={c} 
                        className={randomVal === 1 ? styles.binaryGreen : styles.binaryRed}
                      >
                        {randomVal}
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className={styles.hackCountdown}>
              DESTRUCT SEQUENCE INITIATED: <span className={styles.pulseTick}>{destructCountdown}s</span>
            </div>
          </div>
        </div>
      )}

      {/* Frog Easter Egg Container */}
      {jumpingFrogs.map((frog) => (
        <span
          key={frog.id}
          className={styles.jumpingFrog}
          style={{
            animationDelay: `${frog.delay}ms`,
            animationDuration: `${frog.speed}s`,
            top: `${frog.startY}vh`,
            fontSize: `${frog.fontSize}rem`
          }}
        >
          🐸
        </span>
      ))}

      <div 
        className={`${styles.terminalContainer} ${
          terminalState === "MINIMIZING" ? styles.minimizing : ""
        } ${terminalState === "MAXIMIZING" ? styles.maximizing : ""} ${
          terminalState === "SUCKED" ? styles.sucked : ""
        } ${destructCountdown !== null ? styles.shaking : ""}`} 
        onClick={focusInput}
      >
        <div className={styles.titleBar}>
          <div className={styles.titleLeft}>
            <span className={styles.psIcon}>&gt;_</span>
            <span className={styles.titleText}>Administrator: memetic.exe</span>
          </div>
          <div className={styles.windowControls}>
            <span className={styles.controlBtn} onClick={handleMinimize}>&mdash;</span>
            <span className={styles.controlBtn} onClick={handleMaximize}>&#9633;</span>
            <span className={`${styles.controlBtn} ${styles.closeBtn}`} onClick={handleClose}>&times;</span>
          </div>
        </div>
        <div className={styles.screen}>
          <div className={styles.history}>
            {history.map((line, idx) => (
              <div key={idx} className={`${styles.line} ${styles[line.type]}`}>
                {line.text}
              </div>
            ))}
          </div>
          <div className={styles.inputRow}>
            <span className={styles.prompt}>C:\memetic&gt;</span>
            <input
              ref={inputRef}
              type="text"
              className={styles.inputField}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              autoFocus
              disabled={destructCountdown !== null}
            />
          </div>
          <div ref={terminalEndRef} />
        </div>
      </div>
    </>
  );
}
