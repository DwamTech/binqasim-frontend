import Image from "@/components/CmsImage";
import Link from "next/link";
import { FiArrowLeft, FiCalendar, FiCamera } from "react-icons/fi";
import styles from "./page.module.css";
import { getNews, pageNumber } from "@/services/publicWebsite";
import PublicPagination from "@/components/PublicPagination";

export const metadata = {
  title: "أخبار الوقف | وقف عبد الله بن قاسم",
};

export default async function NewsPage({ searchParams }) {
  const query = await searchParams;
  const { items: newsItems, meta } = await getNews(pageNumber(query?.page));
  return (
    <div className={styles.page}>
      <section className={styles.hero} data-site-hero>
        <div className={styles.heroPattern} aria-hidden />
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div className={styles.heroContent}>
            <span className={styles.heroEyebrow}><FiCamera aria-hidden />المركز الإعلامي</span>
            <h1>أخبار <span>الوقف</span></h1>
            <p>نافذة توثق مبادرات الوقف واجتماعاته وبرامجه، وتروي أثر العمل الذي نصنعه مع شركائنا في المجتمع.</p>
            {/* <div className={styles.heroStats}>
              <strong>{String(meta.total).padStart(2, "0")}</strong>
              <span>أخبار موثقة بالصور</span>
            </div> */}
          </div>

          <div className={styles.heroMosaic}>
            {newsItems.slice(0, 3).map((item, index) => (
              <Link
                href={`/news/${item.slug}`}
                className={`${styles.heroPhoto} ${styles[`heroPhoto${index + 1}`]}`}
                key={item.slug}
                aria-label={item.title}
              >
                <Image
                  src={item.coverSrc}
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 700px) 45vw, 240px"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <div>
              <span>جديد الوقف</span>
              <h2>آخر الأخبار</h2>
              <p>تابع أخبار الوقف ومبادراته وشراكاته المجتمعية.</p>
            </div>
            <span className={styles.count}>{String(meta.total).padStart(2, "0")} أخبار</span>
          </header>

          <div className={styles.grid}>
            {newsItems.length === 0 && <p>لا توجد أخبار منشورة حاليًا.</p>}
            {newsItems.map((item, idx) => (
              <Link
                key={item.slug}
                href={`/news/${item.slug}`}
                className={styles.card}
                aria-label={item.title}
              >
                <Image
                  src={item.coverSrc}
                  alt={item.title}
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 992px) 50vw, 25vw"
                  className={styles.cardImage}
                  priority={idx < 2}
                />
                <div className={styles.overlay} />
                <span className={styles.chip}>{item.category}</span>
                <div className={styles.cardMeta}>
                  <span className={styles.date}><FiCalendar aria-hidden />{item.date}</span>
                  <h3 className={styles.title}>{item.title}</h3>
                  <span className={styles.readMore}>قراءة الخبر <FiArrowLeft aria-hidden /></span>
                </div>
              </Link>
            ))}
          </div>
          <PublicPagination meta={meta} path="/news" />
        </div>
      </section>
    </div>
  );
}
