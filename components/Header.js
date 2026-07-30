"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { name: "HOME", path: "/" },
    { name: "STORE", path: "/store" },
    { name: "CREATORS", path: "/creators" },
    { name: "ABOUT", path: "/about" },
    { name: "PORTAL", path: "/portal" },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.logoContainer}>
          <Link href="/" className={`${styles.logo} glitch-text`}>
            &gt;MEMETIC<span className={styles.curly}>.&#123;</span><span className={styles.exe}>exe</span><span className={styles.curly}>&#125;</span>
          </Link>
          <span className="cursor-blink"></span>
        </div>

        <div className={styles.sysInfo}>
          <span className={styles.infoTag}><span className={styles.label}>SYS:</span> ONLINE</span>
          <span className={styles.infoTag}><span className={styles.label}>NET:</span> SECURE</span>
          <span className={styles.infoTag + " " + styles.desktopOnly}><span className={styles.label}>LOC:</span> ST-PROGRAM</span>
        </div>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => {
          const isActive = pathname === item.path || (item.path !== "/" && pathname?.startsWith(item.path));
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`${styles.navLink} ${isActive ? styles.activeLink : ""}`}
            >
              <span className={styles.brackets}>[</span>
              <span className={styles.linkText}>{item.name}</span>
              <span className={styles.brackets}>]</span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
