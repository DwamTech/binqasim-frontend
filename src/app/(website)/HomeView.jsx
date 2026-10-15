"use client";
import styles from "./page.module.css";
import Image from "@/components/CmsImage";
import Link from "next/link";
import WaqfIntroSection from "../../components/WaqfIntroSection";
import HomeNews from "../../components/HomeNews";
import HomeGovernance from "../../components/HomeGovernance";
import HomeStats from "../../components/HomeStats";
import HomeLocation from "../../components/HomeLocation";
import HomeSupportBanner from "../../components/HomeSupportBanner";
import useSectionReveal from "../../components/useSectionReveal";
import {
  FiLink,
  FiChevronLeft,
  FiArrowUpLeft,
  FiPlay,
  FiPause,
} from "react-icons/fi";
import { useRef, useEffect, useState } from "react";

export default function HomeView({ newsItems, intro, featuredPolicy, contact, supportSettings }) {
  const mainRef = useRef(null);
  useSectionReveal(mainRef);
  const videoRef = useRef(null);
  const videoStartedByUser = useRef(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pauseIfNeeded = () => { if (preference.matches) videoRef.current?.pause(); };
    pauseIfNeeded();
    preference.addEventListener("change", pauseIfNeeded);
    return () => preference.removeEventListener("change", pauseIfNeeded);
  }, []);

  return (
    <main className={styles.main} ref={mainRef}>
      <section className={styles.hero} aria-labelledby="home-hero-title">
        <video
          ref={videoRef}
          className={styles.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          onPlay={() => {
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches && !videoStartedByUser.current) {
              videoRef.current?.pause();
              return;
            }
            setVideoPlaying(true);
          }}
          onPause={() => setVideoPlaying(false)}
        >
          <source src="/hero.m4v" type="video/mp4" />
        </video>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <span className={styles.heroEyebrow}><span aria-hidden />وقف عبد الله بن قاسم</span>
            <h1 id="home-hero-title">وقفٌ يبقى،<br /><span>وأثرٌ ينمو.</span></h1>
            <p>نعظّم النفع، وننمي المجتمع، ونصنع أثرًا مستدامًا من خلال أعمال الخير والعطاء.</p>
            <div className={styles.heroActions}>
              <Link href="/about" className={styles.heroPrimary}>تعرّف على الوقف <FiArrowUpLeft aria-hidden /></Link>
              <Link href="/support" className={styles.heroSecondary}>تقديم طلب دعم <FiChevronLeft aria-hidden /></Link>
            </div>
          </div>
          <div className={styles.heroBottom}>
            <a href="#news" className={styles.heroExplore}>اكتشف أخبار الوقف <FiChevronLeft aria-hidden /></a>
            <button type="button" className={styles.videoControl}
              aria-label={videoPlaying ? "إيقاف الفيديو مؤقتًا" : "تشغيل الفيديو"}
              onClick={() => {
                const video = videoRef.current;
                if (!video) return;
                if (video.paused) {
                  videoStartedByUser.current = true;
                  video.play().catch(() => {});
                }
                else video.pause();
              }}>
              {videoPlaying ? <FiPause aria-hidden /> : <FiPlay aria-hidden />}
              <span>{videoPlaying ? "إيقاف الفيديو" : "تشغيل الفيديو"}</span>
            </button>
          </div>
        </div>
      </section>

      {intro ? <div data-reveal>{intro}</div> : <WaqfIntroSection />}
      {/* <section className={styles.applySection}>
        <Image
          src="/75884be2-3e9d-4126-ace3-770ef0c2f071_16x9_1200x676.webp"
          alt="خلفية للتقديم على طلبات الدعم"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div className={styles.applyInner}>
          <h2 className={styles.applyTitle}>للتقديم على طلبات الدعم</h2>
          <a className={styles.applyButton} href="#">
            اضغط هنا <FiLink size={18} />
          </a>
        </div>
      </section> */}
      {/* <section className={styles.fullImageSection}>
        <Image
          src="/صورة-واتساب-بتاريخ-2024-04-27-في-20.19.12_12ce8470-1024x576.jpg"
          alt="صورة كاملة"
          width={1024}
          height={576}
          className={styles.fullImage}
        />
      </section> */}
      <HomeSupportBanner initialSettings={supportSettings} />
      <HomeNews items={newsItems} />
        {/* <section className={styles.heroAlt}>
        <Image
          src="/باب_وكسوة_الكعبة.jpg"
          alt="خلفية زخارف الكعبة"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div className={styles.heroAltInner}>
          <div className={styles.heroCardWrap}>
            <div className={styles.heroCardInner}>
              <Image
                src="/WhatsApp-Image-2023-02-22-at-8.10.55-PM.jpeg"
                alt="المصارف الشرعية"
                fill
                sizes="100vw"
                className={styles.heroCardImage}
                priority
              />
            </div>
          </div>
        </div>
      </section> */}
      
      <HomeGovernance policy={featuredPolicy} />
      <HomeStats />
      <HomeLocation contact={contact} />
    </main>
  );
}
