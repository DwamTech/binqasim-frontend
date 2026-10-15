import { FiArrowUpLeft, FiMapPin, FiNavigation, FiPhone, FiMail } from "react-icons/fi";
import styles from "./HomeLocation.module.css";

export default function HomeLocation({ contact }) {
  const address = contact?.business_details?.address?.trim();
  const phone = contact?.phones?.support_phone || contact?.phones?.management_phone;
  const email = contact?.business_details?.email;
  const query = encodeURIComponent(address || "وقف عبدالله بن قاسم آل ثاني");
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

  return (
    <section id="location" className={styles.section} aria-labelledby="location-title">
      <div className={styles.inner}>
        <div className={styles.heading} data-reveal>
          <div><span className={styles.eyebrow}>قريبون منك</span><h2 id="location-title">موقع الوقف<span>.</span></h2></div>
          {/* <p>تعرّف على موقعنا، وتواصل معنا.<br />يسعدنا أن نكون أقرب إليك.</p> */}
        </div>
        <div className={styles.panel}>
          <div className={styles.details} data-reveal data-reveal-delay="80">
            <span className={styles.pin}><FiMapPin aria-hidden /></span>
            <span className={styles.kicker}>العنوان</span>
            <h3>{address || "وقف عبد الله بن قاسم آل ثاني"}</h3>
            <p className={styles.description}>افتح الموقع على خرائط Google للاطلاع على المنطقة وخيارات الوصول.</p>
            <a className={styles.directions} href={mapsUrl} target="_blank" rel="noopener noreferrer"><FiNavigation aria-hidden />الموقع والاتجاهات<FiArrowUpLeft aria-hidden /></a>
            {(phone || email) && <address className={styles.contacts}>
              {phone && <a href={`tel:${phone}`}><FiPhone aria-hidden /><span><small>اتصل بنا</small><span dir="ltr">{phone}</span></span><FiArrowUpLeft aria-hidden /></a>}
              {email && <a href={`mailto:${email}`}><FiMail aria-hidden /><span><small>راسلنا</small><span dir="ltr">{email}</span></span><FiArrowUpLeft aria-hidden /></a>}
            </address>}
          </div>
          <div className={styles.map} data-reveal data-reveal-delay="200">
            <div className={styles.mapHeading}><span><FiMapPin aria-hidden />{address || "موقع الوقف"}</span><a href={mapsUrl} target="_blank" rel="noopener noreferrer" aria-label="فتح الموقع في خرائط Google">فتح الخريطة <FiArrowUpLeft aria-hidden /></a></div>
            <iframe src={`https://www.google.com/maps?q=${query}&output=embed&hl=ar`}
              title={`خريطة موقع الوقف${address ? ` — ${address}` : ""}`}
              className={styles.frame} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </div>
    </section>
  );
}
