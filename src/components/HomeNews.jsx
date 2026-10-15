"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiArrowUpLeft, FiCalendar, FiChevronLeft, FiChevronRight, FiPause, FiPlay } from "react-icons/fi";
import Image from "./CmsImage";
import styles from "./HomeNews.module.css";

export default function HomeNews({ items }) {
  const viewportRef = useRef(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const touchingRef = useRef(false);

  const goTo = useCallback((index) => {
    const viewport = viewportRef.current;
    const card = viewport?.children[index];
    if (!card) return;
    const delta = card.getBoundingClientRect().right - viewport.getBoundingClientRect().right;
    viewport.scrollBy({ left: delta, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }, []);

  useEffect(() => {
    if (items.length < 2 || paused || hovered || focused) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timer = window.setInterval(() => {
      if (document.hidden || preference.matches || touchingRef.current) return;
      goTo((active + 1) % items.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [active, items.length, paused, hovered, focused, goTo]);

  const updateActive = () => {
    const viewport = viewportRef.current;
    const edge = viewport.getBoundingClientRect().right;
    let closest = 0;
    let distance = Infinity;
    Array.from(viewport.children).forEach((card, index) => {
      const current = Math.abs(card.getBoundingClientRect().right - edge);
      if (current < distance) { distance = current; closest = index; }
    });
    setActive(closest);
  };

  return (
    <section id="news" className={styles.section} aria-labelledby="home-news-title">
      <div className={styles.inner}>
        <div className={styles.heading} data-reveal>
          <div>
            <span className={styles.eyebrow}>موجز الوقف</span>
            <h2 id="home-news-title">أخبار الوقف<span>.</span></h2>
            <p>أهم الأخبار والمبادرات… في لمحة.</p>
          </div>
          <Link href="/news" className={styles.allNews}>جميع الأخبار <FiArrowUpLeft aria-hidden /></Link>
        </div>
        {items.length > 0 ? (
          <div className={styles.bulletin} data-reveal data-reveal-delay="140"
            onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
            onFocus={() => setFocused(true)}
            onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
            onTouchStart={() => { touchingRef.current = true; }}
            onTouchEnd={() => { touchingRef.current = false; }}
            onTouchCancel={() => { touchingRef.current = false; }}>
            <div className={styles.bulletinBar}><span>أخبار الوقف</span><span>مبادرات تصنع الأثر</span></div>
            <div className={styles.viewport} ref={viewportRef} onScroll={updateActive}
              role="region" aria-roledescription="عارض أخبار" aria-label="موجز أخبار الوقف"
              tabIndex={0} onKeyDown={(event) => {
                if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                  event.preventDefault();
                  goTo(Math.max(0, Math.min(items.length - 1, active + (event.key === "ArrowLeft" ? 1 : -1))));
                }
              }}>
            {items.map((item, index) => (
              <Link href={item.href} key={item.id || item.href}
                className={styles.card} aria-label={`${index + 1} من ${items.length}: ${item.title}`}>
                <div className={styles.imageWrap}>
                  <Image src={item.src} alt={item.title} fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className={styles.image} />
                </div>
                <div className={styles.content}>
                  <div className={styles.meta}><span className={styles.category}>{item.category}</span><span className={styles.number}>{String(index + 1).padStart(2, "0")}</span></div>
                  <h3>{item.title}</h3>
                  <div className={styles.cardFooter}>
                    {item.date && <span className={styles.date}><FiCalendar aria-hidden />{item.date}</span>}
                    <span className={styles.readMore}>تفاصيل الخبر <FiArrowUpLeft aria-hidden /></span>
                  </div>
                </div>
              </Link>
            ))}
            </div>
            <div className={styles.controls}>
              <span className={styles.counter}><strong>{String(active + 1).padStart(2, "0")}</strong> / {String(items.length).padStart(2, "0")}</span>
              <div className={styles.dots}>{items.map((item, index) => <button key={item.id || item.href} type="button" aria-label={`الانتقال إلى الخبر ${index + 1}`} aria-current={active === index ? "true" : undefined} className={active === index ? styles.activeDot : ""} onClick={() => goTo(index)} />)}</div>
              <div className={styles.arrows}>
                {items.length > 1 && <button type="button" aria-label={paused ? "تشغيل التنقل التلقائي" : "إيقاف التنقل التلقائي"} aria-pressed={paused} onClick={() => setPaused((previous) => !previous)}>{paused ? <FiPlay aria-hidden /> : <FiPause aria-hidden />}</button>}
                <button type="button" aria-label="الخبر السابق" disabled={active === 0} onClick={() => goTo(active - 1)}><FiChevronRight aria-hidden /></button>
                <button type="button" aria-label="الخبر التالي" disabled={active === items.length - 1} onClick={() => goTo(active + 1)}><FiChevronLeft aria-hidden /></button>
              </div>
            </div>
          </div>
        ) : <p className={styles.empty}>ترقّبوا آخر أخبار الوقف ومبادراته قريبًا.</p>}
      </div>
    </section>
  );
}
