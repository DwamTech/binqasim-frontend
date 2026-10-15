import Image from "next/image";
import { FiCheck, FiEye, FiHeart, FiMessageCircle } from "react-icons/fi";
import styles from "./WaqfIntroSection.module.css";

const identityItems = [
  {
    title: "رؤية الوقف",
    description: "نموذج يُرسّخ قيمَ وأثر الوقف في عمارة الأرض.",
    Icon: FiEye,
  },
  {
    title: "رسالة الوقف",
    description: "تعظيم النفع وتنمية المجتمع وتحقيق الاستدامة والنماء.",
    Icon: FiMessageCircle,
  },
  {
    title: "قيم الوقف",
    description: "الإخلاص والإحسان، الحوكمة، المشاركة، المهنية والاحترافية.",
    Icon: FiHeart,
  },
];

const objectives = [
  "العمل على تبني مشاريع نوعية ومتميزة ينعكس أثرها على المجتمع بشكل عام.",
  "تمتين وتنمية وتطوير المؤسسات والجهات الخيرية القائمة.",
  "عقد الشراكات والتحالفات مع الجهات الأخرى من مؤسسات مانحة وجهات حكومية ذات علاقة وجمعيات خيرية وقطاع خاص لتطوير القطاع الخيري.",
  "خدمة المستفيد وتجويد الخدمة تأتي في قائمة أولويات العمل لدينا لتحقيق الرضى لديه.",
  "الإسهام في تحقيق التوازن في التنمية المجتمعية في مختلف المجالات الاجتماعية والصحية والإغاثية والإعلامية والتعليمية والدعوية.",
  "دفع العمل الخيري لتحقيق مكانته المرموقة في المجتمع ليكون قطاعاً ثالثاً فاعلاً ومؤثراً.",
];

export default function WaqfIntroSection() {
  return (
    <section id="about-waqf" className={styles.about} aria-labelledby="home-about-title">
      <div className={styles.inner}>
        <div className={styles.story}>
          <div className={styles.content}>
            <span className={styles.kicker} data-reveal>عن الوقف</span>
            <h2 id="home-about-title" data-reveal data-reveal-delay="100">ما هو وقف عبد الله بن قاسم ثاني؟</h2>
            <div className={styles.values}>
              {identityItems.map(({ title, description, Icon }, index) => (
                <article className={styles.valueCard} key={title} data-reveal data-reveal-delay={160 + index * 100}>
                  <div className={styles.valueHeading}><span className={styles.icon}><Icon aria-hidden /></span><h3>{title}</h3></div>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
          <div className={styles.visual} data-reveal data-reveal-delay="200">
            <div className={styles.photo}>
              <Image src="/about/4484.png" alt="" fill sizes="(max-width: 760px) 90vw, 45vw" className={styles.photoImage} />
            </div>
            <div className={styles.identity}>
              <Image src="/ben-logo.png" alt="" width={154} height={59} />
            </div>
          </div>
        </div>
          <div className={styles.objectives}>
            <div className={styles.objectivesHeading}><span className={styles.objectivesCount}>06</span><h3>أهداف الوقف</h3></div>
            <ul className={styles.objectivesList}>
              {objectives.map((objective, index) => (
                <li className={styles.objective} key={objective} data-reveal data-reveal-delay={index * 70}>
                  <FiCheck aria-hidden /><span>{objective}</span>
                </li>
              ))}
            </ul>
          </div>
      </div>
    </section>
  );
}
