import Link from "next/link";
import { FiArrowUpLeft, FiBookOpen, FiFileText, FiBarChart2, FiCalendar } from "react-icons/fi";
import Image from "./CmsImage";
import styles from "./HomeGovernance.module.css";

const collections = [
  { href: "/books-policies", title: "اللوائح والسياسات", description: "الأطر المنظمة للعمل وإدارة الوقف", icon: FiBookOpen },
  { href: "/reports/annual", title: "التقارير السنوية", description: "رحلة العطاء والمنجزات عامًا بعد عام", icon: FiCalendar },
  { href: "/reports/financial", title: "التقارير المالية", description: "تفاصيل الموارد وأوجه الإنفاق", icon: FiBarChart2 },
];

export default function HomeGovernance({ policy }) {
  return (
    <section id="policies" className={styles.section} aria-labelledby="governance-title">
      <div className={styles.inner}>
        <div className={styles.main}>
          <div className={styles.intro} data-reveal>
            <span className={styles.eyebrow}>مكتبة الحوكمة</span>
            <h2 id="governance-title">اللوائح والسياسات<span>وضوحٌ يبني الثقة.</span></h2>
            <p>مرجعك لفهم كيف يعمل الوقف. تصفّح اللوائح المنظمة والتقارير التي توثّق أعمالنا، في مكان واحد.</p>
            <Link href="/books-policies" className={styles.browse}>تصفّح مكتبة اللوائح <FiArrowUpLeft aria-hidden /></Link>
            
          </div>
          <Link href={policy?.href || "/books-policies"} className={styles.document} data-reveal data-reveal-delay="180">
            <div className={styles.paper}>
              <div className={styles.paperTop}><span>مكتبة الوقف</span><FiBookOpen aria-hidden /></div>
              <div className={styles.cover}>
                <Image src={policy?.image || "/ben-logo.png"} alt={policy?.title || "وقف عبد الله بن قاسم"} fill sizes="(max-width: 640px) 80vw, 350px" className={styles.coverImage} />
              </div>
              <div className={styles.paperBody}>
                <span className={styles.type}>{policy?.type || "اللوائح والسياسات"}</span>
                <h3>{policy?.title || "مكتبة اللوائح والسياسات"}</h3>
                {policy?.date && <span className={styles.date}><FiCalendar aria-hidden />{policy.date}</span>}
                <div className={styles.paperFooter}><span>{policy ? "اطّلع على الوثيقة" : "استكشف الوثائق"}</span><FiArrowUpLeft aria-hidden /></div>
              </div>
            </div>
          </Link>
        </div>
        <div className={styles.collections}>
          {collections.map(({ href, title, description, icon: Icon }, index) => (
            <Link href={href} className={styles.collection} key={href} data-reveal data-reveal-delay={index * 120}>
              <span className={styles.collectionIcon}><Icon aria-hidden /></span>
              <div><span className={styles.index}>0{index + 1}</span><h3>{title}</h3><p>{description}</p></div>
              <FiArrowUpLeft className={styles.collectionArrow} aria-hidden />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
