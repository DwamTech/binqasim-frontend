import Link from "next/link";
import { FiArrowUpLeft, FiFileText, FiUsers } from "react-icons/fi";
import { FaHandshake, FaBuilding } from "react-icons/fa";
import styles from "./HomeStats.module.css";

const statistics = [
  { value: "16", label: "شراكات", caption: "تعاون يوسّع الأثر", icon: FaHandshake },
  { value: "65", label: "إصدارات", caption: "معرفة متاحة للجميع", icon: FiFileText },
  { value: "13", label: "مؤسسات", caption: "عمل مؤسسي لخدمة المجتمع", icon: FaBuilding },
  { value: "221", label: "أفراد", caption: "الإنسان في قلب العطاء", icon: FiUsers },
];

export default function HomeStats() {
  return (
    <section id="statistics" className={styles.section} aria-labelledby="statistics-title">
      <div className={styles.inner}>
        <div className={styles.heading} data-reveal>
          <div>
            <span className={styles.eyebrow}>أثر يمتدّ</span>
            <h2 id="statistics-title">إحصائيات الوقف<span>.</span></h2>
          </div>
          <div className={styles.summary}>
            {/* <p>وراء كل رقم، خطوة في رحلة العطاء.<br />شراكات ومعرفة وعمل يصنع أثرًا في المجتمع.</p> */}
            <Link href="/reports/annual">اكتشف تقارير الوقف <FiArrowUpLeft aria-hidden /></Link>
          </div>
        </div>
        <dl className={styles.grid}>
          {statistics.map(({ value, label, caption, icon: Icon }, index) => (
            <div key={label} className={`${styles.card} ${index === 0 ? styles.featured : ""}`} data-reveal data-reveal-delay={index * 120}>
              <div className={styles.cardTop} aria-hidden="true"><span className={styles.icon}><Icon /></span><span className={styles.index}>0{index + 1}</span></div>
              <dt className={styles.label}>{label}</dt>
              <dd className={styles.value}>{value}</dd>
              <dd className={styles.caption}>{caption}</dd>
              <span className={styles.accent} aria-hidden="true" />
            </div>
          ))}
        </dl>
        {/* <div className={styles.footer}><span aria-hidden="true" /><p>عطاء مستمرّ… وأثر يبقى.</p><span aria-hidden="true" /></div> */}
      </div>
    </section>
  );
}
