import CheckForm from "@/components/SupportCheckForm";
import { FiSearch, FiFileText } from "react-icons/fi";
import styles from "./page.module.css";

export default function SupportCheckPage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero} data-site-hero>
        <div className={styles.heroInner}>
          <h1>تحقق من <span>طلبك</span></h1>
          <div className={styles.visual} aria-hidden="true">
            <div className={styles.document}><FiFileText /><i /><i /><i /></div>
            <span className={styles.search}><FiSearch /></span>
          </div>
        </div>
      </section>
      <CheckForm />
    </main>
  );
}
