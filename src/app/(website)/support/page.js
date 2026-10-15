import Link from "next/link";
import { FiFileText, FiUser, FiBriefcase, FiSearch, FiArrowUpLeft } from "react-icons/fi";
import SupportTabs from "@/components/SupportTabs";
import styles from "./page.module.css";

export default async function SupportPage() {
  const settings = await getSupportSettings();
  return (
    <main className={styles.main}>
      <section className={styles.hero} data-site-hero>
        <div className={styles.heroInner}>
          <h1>طلبات <span>الدعم</span></h1>
          <div className={styles.visual} aria-hidden="true">
            <div className={styles.document}><FiFileText /><i /><i /><i /></div>
            <span className={styles.person}><FiUser /></span>
            <span className={styles.organization}><FiBriefcase /></span>
          </div>
        </div>
      </section>
      <section className={styles.actions}>
        <div className={styles.actionCard}>
          <span className={styles.actionIcon}><FiSearch aria-hidden /></span>
          <div className={styles.actionCopy}>
          <h2 className={styles.actionTitle}>تحقق من طلبك</h2>
          <p className={styles.actionText}>يمكنك متابعة حالة الطلب الخاص بك باستخدام رقم الطلب ورقم الجوال.</p>
          </div>
          <Link href="/support/check" className={styles.checkBtn}>تحقق من طلبك الآن <FiArrowUpLeft aria-hidden /></Link>
        </div>
      </section>
      <SupportTabs initialSettings={settings} />
    </main>
  );
}
import { getSupportSettings } from "@/services/publicWebsite";
