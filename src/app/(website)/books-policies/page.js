import { getGovernance, pageNumber } from "@/services/publicWebsite";
import PublicPagination from "@/components/PublicPagination";
import GovernanceHero from "@/components/GovernanceHero";
import Image from "@/components/CmsImage";
import Link from "next/link";
import { FiArrowLeft, FiBookOpen, FiDownload, FiFileText } from "react-icons/fi";
import styles from "./page.module.css";

export const metadata = {
  title: "اللوائح والسياسات | وقف عبد الله بن قاسم",
  description: "مكتبة اللوائح والسياسات والكتب الخاصة بوقف عبد الله بن قاسم آل ثاني.",
};




export default async function BooksPoliciesPage({ searchParams }) {
  const query = await searchParams;
  const { items: policies, meta } = await getGovernance("regulations", pageNumber(query?.page));
  return (
    <main className={styles.page}>
      <GovernanceHero kind="policies" title={<>اللوائح <span>والسياسات</span></>}
        eyebrow="مكتبة الوقف" description="مرجع منظم للوائح والأنظمة التي تدعم الحوكمة وترتقي بأداء الوقف."
        count={meta.total} />

      <section className={styles.librarySection}>
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <div>
              <span>الإصدارات المتاحة</span>
              <h2>مكتبة اللوائح</h2>
              <p>تصفّح اللوائح مباشرة داخل الموقع أو نزّل نسخة للرجوع إليها لاحقًا.</p>
            </div>
            <span className={styles.itemsCount}>
              {String(meta.total).padStart(2, "0")} إصدار
            </span>
          </header>

          <PublicPagination meta={meta} path="/books-policies" />
          {policies.length === 0 && <p>?? ???? ??????? ?????? ??????.</p>}
          <div className={styles.policiesGrid}>
            {policies.map((policy, index) => (
              <article className={styles.policyCard} key={policy.href}>
                <Link href={policy.href} className={styles.imageWrap} aria-label={`فتح ${policy.title}`}>
                  <Image
                    src={policy.image}
                    alt={policy.title}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 992px) 50vw, 33vw"
                    className={styles.cardImage}
                  />
                  <span className={styles.imageBadge}><FiFileText aria-hidden />{policy.type}</span>
                  <span className={styles.imageNumber}>{String((meta.current_page - 1) * meta.per_page + index + 1).padStart(2, "0")}</span>
                </Link>

                <div className={styles.cardContent}>
                  <span className={styles.cardKicker}>{policy.category}</span>
                  <h3><Link href={policy.href}>{policy.title}</Link></h3>
                  <div className={styles.cardMeta}>
                    <span><FiBookOpen aria-hidden />قراءة مباشرة</span>
                    <span><FiFileText aria-hidden />PDF</span>
                  </div>
                  <div className={styles.cardActions}>
                    <Link href={policy.href} className={styles.openButton}>
                      فتح اللائحة
                      <FiArrowLeft aria-hidden />
                    </Link>
                    {policy.download_allowed && policy.file && <a href={policy.file} download className={styles.downloadButton}>
                      تحميل الكتاب
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
