import { getGovernance, pageNumber } from "@/services/publicWebsite";
import PublicPagination from "@/components/PublicPagination";
import Image from "@/components/CmsImage";
import Link from "next/link";
import {
  FiArrowLeft,
  FiCalendar,
  FiDownload,
  FiFileText,
  FiTrendingUp,
} from "react-icons/fi";
import styles from "../financial/page.module.css";

export const metadata = {
  title: "التقارير السنوية | وقف عبد الله بن قاسم",
  description: "مكتبة التقارير السنوية وتقارير مشروعات وقف عبد الله بن قاسم آل ثاني.",
};


export default async function AnnualReportsPage({ searchParams }) {
  const query = await searchParams;
  const { items: reports, meta } = await getGovernance("annual-reports", pageNumber(query?.page));
  return (
    <main className={styles.page}>
      <section className={styles.hero} data-site-hero>
        <div className={styles.heroOverlay} />
        <div className={styles.heroPattern} aria-hidden />
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div className={styles.heroContent}>
            <span className={styles.eyebrow}><FiTrendingUp aria-hidden />إصدارات الوقف</span>
            <h1>التقارير <span>السنوية</span></h1>
            <p>مكتبة منظمة تجمع تقارير الوقف السنوية وتوثق منجزاته ومشروعاته وأثره خلال الأعوام المختلفة.</p>
            <div className={styles.heroFeatures}>
              <span><FiFileText aria-hidden />تقارير موثقة</span>
              <span><FiDownload aria-hidden />عرض وتنزيل</span>
            </div>
          </div>

          <div className={styles.heroVisual} aria-hidden>
            <div className={styles.visualGlow} />
            <div className={styles.visualCardBack} />
            <div className={styles.visualCard}>
              <div className={styles.visualTop}>
                <span><FiTrendingUp /></span>
                <small>مكتبة الوقف</small>
              </div>
              <div className={styles.visualCount}>{String(meta.total).padStart(2, "0")}</div>
              <strong>تقرير متاح</strong>
              <div className={styles.visualBars}>
                <i />
                <i />
                <i />
                <i />
              </div>
              <div className={styles.visualFooter}>
                <span>تقارير سنوية</span>
                <FiFileText />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.reportsSection}>
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <div>
              <span>التقارير المتاحة</span>
              <h2>مكتبة التقارير السنوية</h2>
              <p>يمكنك فتح التقرير وتصفّح صفحاته داخل الموقع أو تنزيل نسخة للاحتفاظ بها.</p>
            </div>
            <span className={styles.count}>{String(meta.total).padStart(2, "0")} تقرير</span>
          </header>

          <PublicPagination meta={meta} path="/reports/annual" />
          {reports.length === 0 && <p>?? ???? ??????? ?????? ??????.</p>}
          <div className={styles.reportsGrid}>
            {reports.map((report, index) => (
              <article className={styles.reportCard} key={report.href}>
                <Link href={report.href} className={styles.imageWrap} aria-label={`فتح ${report.title}`}>
                  <Image
                    src={report.image}
                    alt={report.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1020px) 50vw, 33vw"
                    className={styles.cardImage}
                  />
                  <span className={styles.typeBadge}><FiFileText aria-hidden />{report.type}</span>
                  <span className={styles.reportNumber}>{String((meta.current_page - 1) * meta.per_page + index + 1).padStart(2, "0")}</span>
                </Link>

                <div className={styles.cardBody}>
                  <div className={styles.date}><FiCalendar aria-hidden />{report.date}</div>
                  <h3><Link href={report.href}>{report.title}</Link></h3>
                  <div className={styles.cardActions}>
                    <Link href={report.href} className={styles.viewButton}>
                      عرض التقرير
                      <FiArrowLeft aria-hidden />
                    </Link>
                    {report.download_allowed && report.file && <a href={report.file} download className={styles.downloadButton} aria-label={`تنزيل ${report.title}`}>
                      <FiDownload aria-hidden />
                    </a>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
