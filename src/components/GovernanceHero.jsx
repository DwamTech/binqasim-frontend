import Image from "next/image";
import { FiBookOpen, FiFileText, FiPieChart, FiHeart, FiEye, FiUsers } from "react-icons/fi";
import styles from "./GovernanceHero.module.css";

export default function GovernanceHero({ kind, title, eyebrow, description, count, children }) {
  const isPolicies = kind === "policies";
  const isAbout = kind === "about";
  const Icon = isAbout ? FiHeart : isPolicies ? FiBookOpen : FiPieChart;
  return (
    <section className={`${styles.hero} ${isAbout ? styles.about : isPolicies ? styles.policies : styles.funds}`} data-site-hero>
      <div className={styles.overlay} />
      <div className={styles.pattern} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.content}>
          <span className={styles.eyebrow}><Icon aria-hidden />{eyebrow}</span>
          <h1>{title}</h1>
          {description && <p>{description}</p>}
          {children}
          <div className={styles.rule} aria-hidden="true"><i /><i /><i /></div>
        </div>
        <div className={styles.visual} aria-hidden="true">
          <div className={styles.glow} />
          {isAbout ? <div className={styles.identityCard}>
            <div className={styles.identityArch}>
              <div className={styles.identityLogo}><Image src="/ben-logo.png" alt="" width={220} height={84} sizes="220px" /></div>
            </div>
            <div className={styles.identityIcons}><span><FiEye /></span><span><FiHeart /></span><span><FiUsers /></span></div>
          </div> : isPolicies ? <div className={styles.folder}>
            <div className={styles.sheetBack} />
            <div className={styles.sheet}>
              <div className={styles.sheetTop}><FiFileText /><span>مكتبة الوقف</span></div>
              <div className={styles.count}>{String(count ?? 0).padStart(2, "0")}</div>
              <strong>إصدار</strong>
              <div className={styles.lines}><i /><i /><i /></div>
              <div className={styles.sheetBottom}><FiBookOpen /><span>اللوائح والسياسات</span></div>
            </div>
          </div> : <div className={styles.allocation}>
            <div className={styles.ring}><div><FiPieChart /><strong>٧٥٪</strong></div></div>
            <div className={styles.legend}>
              <span><i />٧٥٪ أوجه البر والخير</span>
              <span><i />٢٥٪ تنمية ريع الوقف</span>
            </div>
          </div>}
        </div>
      </div>
    </section>
  );
}
