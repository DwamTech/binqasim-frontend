import FeedbackForm from "@/components/FeedbackForm";
import { FiClipboard, FiMessageSquare } from "react-icons/fi";
import styles from "./page.module.css";

export default function ComplaintsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} data-site-hero>
        <div className={styles.heroInner}>
          <h1>صندوق <span>الشكاوي</span></h1>
          <div className={styles.visual} aria-hidden="true">
            <div className={styles.cardBack} />
            <div className={styles.card}>
              <span className={styles.clip} />
              <FiClipboard className={styles.documentIcon} />
              <div className={styles.lines}><i /><i /><i /></div>
              <div className={styles.cardFooter}><i /><i /><i /></div>
            </div>
            <div className={styles.message}><FiMessageSquare /></div>
          </div>
        </div>
      </section>
      <FeedbackForm
        title="صندوق الشكاوي"
        description="نتلقى بصدر رحب شكاوى المستفيدين ونعمل بشكل سريع على حلها ، ونعتذر مبدأياً إن واجهتكم أي من المشكلات والصعوبات ، على وعد بإذن الله على تذليل كافة الصعوبات لكم"
        submitLabel="إرسال الشكوى"
        type="complaint"
        appearance="modern"
      />
    </main>
  );
}
