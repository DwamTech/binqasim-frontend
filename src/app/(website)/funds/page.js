import { getSystemContent } from "@/services/publicWebsite";
import PublicContent from "@/components/PublicContent";
import GovernanceHero from "@/components/GovernanceHero";
import { FiCheck } from "react-icons/fi";
import styles from "./page.module.css";

export const metadata = {
  title: "المصارف الشرعية | وقف عبدالله بن قاسم",
};

const spendingItems = [
  "يضحى في كل عام عن جدي ووالديه ويكون عدد الأضاحي ثالثة أضاحي ويجوز نقلها من مكان إلى آخر حسب ما يراه الناظر",
  "يحجج في كل عام عدد من المسلمين في ثواب جدي و والدية.",
  "الأعمال الخيرية",
  "تحفيظ القرآن",
  "إنشاء المساجد",
  "المستشفيات أو المساهمة في إنشائها",
  "طبع الكتب الإسلامية أو شراء شيء مما طبع منها وتوزيعه و يستشار أهل العلم الموثوق فيهم ولا أذنه ان يطبع أو يشترى إلا ما كان نافعا للمسلمين في دنياهم وأخراهم",
  "الفقراء من الأقارب ويقدم في ذلك أهل الديانة والصالح حسب رأي الناظر",
  "المصارف الثمانية المعروفة باستثناء مصرف العاملين عليها ويقدم في ذلك حسب الحاجة",
  "الأيتام والأرامل والمرضى والسجناء ويقدم أهل الديانة والصالح على غيرهم حسب رأي الناظر.",
  "توزيع المياه والتمور والأطعمة",
  "وإفطار الصائمين خاصة في شهر رمضان في هذه البالد وغيرها من بالد المسلمين حسب ما يراه الناظر",
  "الأعمال الخيرية الأخرى فللناظر الصلاحية في تقدير ما يراه مناسبا للصرف فيها وتكون هذه المصارف في داخل المملكة أو خارجها ويقدم منها ما كان أنفع للواقف وأعظم مصلحة للمسلمين مع مراعاة اختلاف الأوقات والحاجات فقد يكون بعض هذه المصارف في زمن أنفع منهفي زمن آخر ويقدر ذلك الناظر",
];

export default async function FundsPage() {
  const html = await getSystemContent("masaref_alre3");
  const hero = <GovernanceHero kind="funds"
    title={html ? <>المصارف <span>الشرعية</span></> : <>مصاريف وقف <span>عبدالله بن قاسم</span></>}
    eyebrow="وقف عبدالله بن قاسم"
    description="منهج متوازن يجمع بين صيانة أصل الوقف، وتنمية ريعه، وتعظيم أثره في أوجه البر والخير." />;
  if (html) return <main className={styles.page}>{hero}<PublicContent title="المصارف الشرعية" html={html} hideTitle /></main>;
  return (
    <main className={styles.page}>
      {hero}

      <section className={styles.contentSection}>
        <div className={styles.container}>
          <article className={styles.introCard}>
            <h2>❀&nbsp;ويكون مصرف الوقف كالتالي :&nbsp;</h2>
            <p>
              تحسم مصاريف إصلاح الوقف وتجديده وصيانته إن احتاج لذلك بالإضافة إلى مصاريف التشغيل الإدارية والعمومية بما لا يتجاوز ١٠٪&nbsp; من غلة الوقف و بعد حسم المصاريف المشار إليه و صدور ميزانية معتمدة من المحاسب القانوني و تقديم كشف حساب معتمد منه إلى الواقف تحسم نسبة %5 خمسة في بالمائة من صافي ريع الوقف كأتعاب للناظر على الوقف.
            </p>
          </article>

          <article className={styles.investmentCard}>
            <div>
              <h2>❀&nbsp;مصاريف ما يستثمر من غلة الوقف الــ ٢٥٪</h2>
              <p>
                ويتم تنمية ربع ما تبقى ٢٥ ٪ من صافي غلة الوقف تستثمر حسب ما يراها الناظر بما لا يخالف أحكام الشريعة وفيما يعود لمصلحة الوقف بعد عرضها على الواقف.
              </p>
            </div>
          </article>

          <article className={styles.spendingCard}>
            <header className={styles.spendingHeader}>
              <div className={styles.spendingCopy}>
                <h2>❀&nbsp;مصاريف النسب المتبقية من صافي غلة الوقف وهي ٧٥٪</h2>
                <p>وتصرف النسبة المتبقية من صافي غلة الوقف وهي ٧٥٪ على ما يلي:</p>
              </div>
              <div className={styles.shareVisual} aria-hidden>
                <div className={styles.shareRing}>
                  <span>٧٥٪</span>
                </div>
              </div>
            </header>

            <div className={styles.itemsGrid}>
              {spendingItems.map((item, index) => (
                <div
                  className={`${styles.item} ${index === spendingItems.length - 1 ? styles.featuredItem : ""}`}
                  key={item}
                >
                  <div className={styles.itemTop}>
                    <span className={styles.itemCheck}><FiCheck aria-hidden /></span>
                    <span className={styles.itemNumber}>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <strong>{item}</strong>
                </div>
              ))}
            </div>
          </article>

          <article className={styles.finalCard}>
            <h2>❀&nbsp;من مصارف الوقف:</h2>
            <p>
              وبعد خصم النفقات على الوقف وتشغيله وصيانته له ٥٪ من صافي الريع ويصرف الباقي حسب ما ذكر المنهي لما في ذلك من صالحية للوقف عامة فيكون خمسة وعشرون بالمائة %25 لتنمية الوقف ويصبح حالها حال الأصل %75 تصرف في أعمال البر حسب ما ذكرالمنهي ويقدم تعمير الوقف وإصلاحه وتنميته.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
