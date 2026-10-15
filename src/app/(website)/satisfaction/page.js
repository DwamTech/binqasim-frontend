"use client";
import { useState, useEffect } from "react";
import { FiMessageCircle, FiArrowDown, FiHeart } from "react-icons/fi";
import { FaStar, FaRegStar, FaStarHalfAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import styles from "./page.module.css";
import { PublicFeedbackService } from "@/services/publicFeedbackService";

export default function SatisfactionPage() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [average, setAverage] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [hasRated, setHasRated] = useState(false);

  const stars = [1, 2, 3, 4, 5];

  // Fetch current rating stats on mount
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const stats = await PublicFeedbackService.getRatingStats();
        setAverage(stats.average_rating || 0);
        setCount(stats.rating_count || 0);
      } catch (error) {
        console.error("Failed to fetch rating stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Auto-hide toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Handle star click
  const handleRating = async (value) => {
    if (submitting || hasRated) return;

    setRating(value);
    setSubmitting(true);

    try {
      const response = await PublicFeedbackService.submitRating(value);

      // Update stats with new values
      setAverage(response.average_rating);
      setCount(response.rating_count);
      setHasRated(true);

      setToast({
        type: "success",
        message: "شكراً لك! تم تسجيل تقييمك بنجاح",
      });
    } catch (error) {
      setRating(0); // Reset rating on error

      if (error.rateLimited) {
        setToast({
          type: "error",
          message: error.message || "يرجى الانتظار قليلاً قبل التقييم مرة أخرى",
        });
      } else if (error.validationErrors) {
        setToast({
          type: "error",
          message: "يرجى اختيار تقييم صحيح (1-5)",
        });
      } else {
        setToast({
          type: "error",
          message: error.message || "حدث خطأ أثناء إرسال التقييم",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Render average stars
  const renderAverageStars = () => {
    const fullStars = Math.floor(average);
    const hasHalf = average % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className={styles.avgStar} />
        ))}
        {hasHalf && <FaStarHalfAlt key="half" className={styles.avgStarHalf} />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} className={styles.avgStarEmpty} />
        ))}
      </>
    );
  };

  return (
    <main className={styles.main}>
      {toast && (
        <div className={`${styles.toast} ${styles[`toast${toast.type}`]}`} role={toast.type === "error" ? "alert" : "status"}>
          {toast.type === "success" ? <FaCheckCircle aria-hidden /> : <FaTimesCircle aria-hidden />}
          <span>{toast.message}</span>
          <button type="button" aria-label="إغلاق الرسالة" onClick={() => setToast(null)} className={styles.toastClose}>×</button>
        </div>
      )}
      <section className={styles.hero} data-site-hero>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <span className={styles.eyebrow}><FiMessageCircle aria-hidden />تقييم رضا المستفيدين</span>
            <h1>تقيـيم رضا<br /><span>المستـفيديـن</span></h1>
            <a href="#rating" className={styles.heroLink}>اضف تقييمك.. <FiArrowDown aria-hidden /></a>
          </div>
          <div className={styles.heroVisual} aria-hidden="true">
            <div className={styles.visualBack} />
            <div className={styles.visualCard}><FiMessageCircle className={styles.visualIcon} /><div className={styles.visualStars}>{stars.map((star) => <FaStar key={star} />)}</div><div className={styles.visualLines}><i /><i /></div></div>
          </div>
        </div>
      </section>
      <section id="rating" className={styles.feedbackSection} aria-labelledby="rating-title">
        <div className={styles.feedbackGrid}>
          <div className={styles.introCard}>
            <span className={styles.introIcon}><FiHeart aria-hidden /></span>
            <h2 className={styles.introTitle}>تقييم رضا المستفيدين</h2>
            <p className={styles.introText}>من أهم أسباب نمو قدراتنا ومواجهة تحدياتنا أن نتلقى مدى رضا المستفيدين منّا بكل سرور
              حتى نضع في خططنا المستقبلية ما يميّزنا ويزيد من رضاكم</p>
            <div className={styles.introAccent} aria-hidden><i /><i /><i /></div>
          </div>
          <div className={styles.ratingInner} aria-busy={submitting}>
            <span className={`${styles.ratingIcon} ${hasRated ? styles.successIcon : ""}`} aria-hidden>{hasRated ? <FaCheckCircle /> : <FaRegStar />}</span>
            <h2 id="rating-title" className={styles.label}>{hasRated ? "شكراً لتقييمك! ⭐" : "اضف تقييمك.."}</h2>
            {!hasRated && <p className={styles.hint}>اختيار النجمة يرسل تقييمك مباشرة.</p>}
            <div className={`${styles.stars} ${hasRated ? styles.starsDisabled : ""} ${submitting ? styles.starsSubmitting : ""}`}
              role="group" aria-label="اختيار التقييم" onMouseLeave={() => setHover(0)}>
              {stars.map((i) => {
                const active = (hover || rating) >= i;
                return <button key={i} type="button" className={`${styles.starBtn} ${active ? styles.starBtnActive : ""}`}
                  onMouseEnter={() => !hasRated && !submitting && setHover(i)}
                  onFocus={() => !hasRated && !submitting && setHover(i)} onBlur={() => setHover(0)}
                  onClick={() => handleRating(i)} disabled={hasRated || submitting}
                  aria-label={`تقييم ${i} من 5`} aria-pressed={rating === i}>
                  {active ? <FaStar className={styles.starActive} aria-hidden /> : <FaRegStar className={styles.star} aria-hidden />}
                  <span aria-hidden>{i}</span>
                </button>;
              })}
            </div>
            <div className={styles.feedbackStatus} role="status">
              {submitting && <span className={styles.submittingOverlay}><span className={styles.spinner} aria-hidden /><span>جاري الإرسال...</span></span>}
              {hasRated && <span className={styles.savedMessage}>شكراً لك! تم تسجيل تقييمك بنجاح</span>}
            </div>
            <div className={styles.ratingSummary}>
              <div className={styles.averageValue} aria-hidden>{loading ? "…" : average.toFixed(1)}<small>/ 5</small></div>
              <div className={styles.summaryDetails}>
                <div className={styles.placeholderStars} aria-hidden="true">{loading ? <span className={styles.loadingText}>جاري التحميل...</span> : renderAverageStars()}</div>
                <div className={styles.ratingMeta}>
                  <span className={styles.avg}>متوسط التقييم {loading ? "..." : average.toFixed(1)} / 5</span>
                  <span className={styles.count}>عدد التقييمات: {loading ? "..." : count}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}