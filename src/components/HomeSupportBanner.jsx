"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiArrowUpLeft, FiHeart } from "react-icons/fi";
import { SupportService } from "@/services/supportService";
import { getSupportAvailability } from "@/utils/supportAvailability";
import styles from "./HomeSupportBanner.module.css";

export default function HomeSupportBanner({ initialSettings }) {
  const [settings, setSettings] = useState(initialSettings);
  const { visible } = getSupportAvailability(settings);

  useEffect(() => {
    const controller = new AbortController();
    let refreshing = false;
    const refresh = async () => {
      if (document.hidden || refreshing) return;
      refreshing = true;
      try {
        const next = await SupportService.getSettings(controller.signal);
        if (!controller.signal.aborted) setSettings(next);
      } catch {
        // Keep the last confirmed settings until a later refresh succeeds.
      } finally {
        refreshing = false;
      }
    };
    refresh();
    const timer = window.setInterval(refresh, 15000);
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      controller.abort();
      window.clearInterval(timer);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  if (!visible) return null;
  return (
    <section className={styles.section} aria-labelledby="support-banner-title">
      <div className={styles.banner}>
        <div className={styles.copy}>
          <span className={styles.status}><FiHeart aria-hidden />استقبال طلبات الدعم متاح</span>
          <h2 id="support-banner-title">خطوة نحو الدعم، <span>وأثر يستمر.</span></h2>
          <p>قدّم طلبك عبر نماذج الدعم المتاحة لدى الوقف.</p>
          <Link href="/support" className={styles.action}>تقديم طلب دعم <FiArrowUpLeft aria-hidden /></Link>
        </div>
      </div>
    </section>
  );
}
