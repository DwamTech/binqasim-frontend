import styles from "./PublicContent.module.css";
import HeroSection from "./HeroSection";

export default function PublicContent({ title, html, withHero = false, hideTitle = false }) {
  const content = (
    <section className={styles.section}>
      {!withHero && !hideTitle && <h1>{title}</h1>}
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: html }} />
    </section>
  );
  if (!withHero) return content;
  return <main>
    <HeroSection title={title} imageSrc="/governance-background.webp" imageAlt="عمارة الوقف" />
    {content}
  </main>;
}
