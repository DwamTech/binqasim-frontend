import Image from "@/components/CmsImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiCalendar, FiHome } from "react-icons/fi";
import styles from "./page.module.css";
import { getNewsItem } from "@/services/publicWebsite";

export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = await getNewsItem(slug);
  if (!item) return { title: "خبر غير موجود | وقف عبد الله بن قاسم" };
  return { title: `${item.title} | وقف عبد الله بن قاسم` };
}

export default async function NewsDetailsPage({ params }) {
  const { slug } = await params;
  const item = await getNewsItem(slug);
  if (!item) notFound();

  return (
    <div className={styles.page}>
      <section className={styles.hero} data-site-hero>
        <Image
          src={item.coverSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroPattern} aria-hidden />
        <div className={`${styles.container} ${styles.heroInner}`}>
          <nav className={styles.breadcrumbs} aria-label="مسار التنقل">
            <Link href="/"><FiHome aria-hidden />الرئيسية</Link>
            <span>/</span>
            <Link href="/news">أخبار الوقف</Link>
            <span>/</span>
            <span aria-current="page">{item.title}</span>
          </nav>

          <div className={styles.heroContent}>
            <div className={styles.heroMeta}>
              <span className={styles.heroChip}>{item.category}</span>
              <span className={styles.heroDate}><FiCalendar aria-hidden />{item.date}</span>
            </div>
            <h1 className={styles.heroTitle}>{item.title}</h1>
            <p>{item.excerpt}</p>
            <a href="#article-content" className={styles.continueLink}>
              متابعة قراءة الخبر
              <FiArrowLeft aria-hidden />
            </a>
          </div>
        </div>
      </section>

      <section className={styles.section} id="article-content">
        <div className={styles.container}>
          <article className={styles.content}>
            <div dangerouslySetInnerHTML={{ __html: item.content }} />
            {item.media.map((media) => media.type === "gallery_image" ? (
              <div key={media.id} className={styles.imageBlock}>
                <Image src={media.url} alt={media.original_name || item.title} fill sizes="(max-width: 600px) 100vw, 980px" style={{ objectFit: "contain" }} />
              </div>
            ) : media.type === "video" ? <video key={media.id} src={media.url} controls style={{ width: "100%" }} />
              : media.type === "audio" ? <audio key={media.id} src={media.url} controls />
                : <p key={media.id}><a href={media.url}>{media.original_name || "تحميل المرفق"}</a></p>)}
          </article>

          <div className={styles.backRow}>
            <Link className={styles.backLink} href="/news">
              رجوع للأخبار
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
