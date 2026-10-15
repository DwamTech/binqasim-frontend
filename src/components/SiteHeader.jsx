"use client";

import styles from "../app/(website)/layout.module.css";

export default function SiteHeader({ children }) {
  return (
    <header className={`${styles.siteHeader} ${styles.homeHeader}`}>
      {children}
    </header>
  );
}
