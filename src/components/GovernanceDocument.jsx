import Image from "@/components/CmsImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGovernanceItem } from "@/services/publicWebsite";
import styles from "@/app/(website)/reports/adahi/page.module.css";

export default async function GovernanceDocument({ slug }) {
  const document = await getGovernanceItem(slug);
  if (!document) notFound();
  return (
    <main className={styles.page}>
      <section className={styles.hero} data-site-hero>
        <div className={styles.container}>
          <nav className={styles.breadcrumbs} aria-label="مسار التنقل">
            <Link href="/">الرئيسية</Link><span>/</span>
            <Link href="/books-policies">إصدارات الوقف</Link><span>/</span><span>{document.title}</span>
          </nav>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <span className={styles.eyebrow}>{document.category}</span>
              <h1>{document.title}</h1>
              <div className={styles.meta}><span>{document.date}</span></div>
              {document.file && <div className={styles.actions}>
                <a className={styles.primaryAction} href="#document-viewer">قراءة المستند</a>
                {document.download_allowed && <a className={styles.secondaryAction} href={document.file} download>تحميل المستند</a>}
              </div>}
            </div>
            <div className={styles.coverWrap}>
              <Image src={document.image} alt={document.title} width={724} height={1024} className={styles.cover} priority unoptimized />
            </div>
          </div>
        </div>
      </section>
      <section className={styles.viewerSection} id="document-viewer">
        <div className={styles.container}>
          {document.description?.trim() && <section className={styles.documentIntroduction} aria-label="كلمة الكتاب">
            <p>{document.description}</p>
          </section>}
          {document.file ? <>
            <iframe src={document.file} title={document.title} style={{ width: "100%", height: "80vh", border: 0 }} />
            <p><a href={document.file} target="_blank" rel="noopener noreferrer">فتح المستند في نافذة جديدة</a></p>
          </> : <p>لا يوجد ملف متاح لهذا الإصدار.</p>}
        </div>
      </section>
    </main>
  );
}
