import FeedbackForm from "@/components/FeedbackForm";
import { FiEdit3, FiMessageCircle } from "react-icons/fi";
import styles from "./page.module.css";

export default function SuggestionsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} data-site-hero>
        <div className={styles.heroInner}>
          <h1>صندوق <span>الإقتراحات</span></h1>
          <div className={styles.visual} aria-hidden="true">
            <div className={styles.paper}><FiEdit3 /><i /><i /><i /></div>
            <div className={styles.envelope}><FiMessageCircle /></div>
          </div>
        </div>
      </section>
      <FeedbackForm
        title="صندوق الإقتراحات"
        description="نسعد باستقبال آرائكم واقتراحاتكم للمشاريع الخيرية والدعوية والتي تصب في أهداف الوقف ، وزيادة قدرته على دعم الخير ونشر العلم في ربوع الأرض"
        submitLabel="إرسال الإقتراح"
        type="suggestion"
        appearance="modern"
      />
    </main>
  );
}
