import "./globals.css";
import { getSiteContact } from "@/services/publicWebsite";
import { Cairo } from "next/font/google";
import styles from "./layout.module.css";
import Image from "next/image";
import Link from "next/link";
import HeaderNav from "../../components/HeaderNav";
import SiteHeader from "../../components/SiteHeader";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import {
  FaYoutube,
  FaTwitter,
  FaFacebookF,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

export const metadata = {
  icons: { icon: "/ben-icon.png", apple: "/ben-icon.png" },
  title: "وقف عبد الله بن قاسم",
  description: "موقع وقف عبد الله بن قاسم",
};

const cairo = Cairo({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

export const revalidate = 0;

export default async function RootLayout({ children }) {
  const contact = await getSiteContact();
  const phone = contact.phones.support_phone || contact.phones.management_phone || "";
  const email = contact.business_details.email || "";
  const address = contact.business_details.address || "";
  const socialLink = (key) => {
    const value = contact.social[key];
    try { const url = new URL(value); return ["http:", "https:"].includes(url.protocol) ? url.href : null; } catch { return null; }
  };
  const now = new Date();
  const dateStr = new Intl.DateTimeFormat("ar-SA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now);
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.className} ${cairo.variable}`}>
        <SiteHeader>
          <div className={styles.topbar}>
            <div className={styles.topbarInner}>
              <div className={styles.rightGroup}>
                <span className={styles.topbarTagline}>عطاء مستدام · أثر متجدد</span>
                <a href={`tel:${phone}`} className={styles.contactLink} dir="ltr">
                  <FaPhone size={13} aria-hidden />
                  <span>{phone}</span>
                </a>
                <span className={styles.divider} />
                <a href={`mailto:${email}`} className={styles.contactLink} dir="ltr">
                  <FaEnvelope size={13} aria-hidden />
                  <span>{email}</span>
                </a>
              </div>
              <div className={styles.leftGroup}>
                <span className={styles.date}>{dateStr}</span>
                <span className={styles.divider} />
                <div className={styles.social}>
                  {socialLink("youtube") && <a href={socialLink("youtube")} aria-label="YouTube" target="_blank" rel="noopener noreferrer"><FaYoutube size={18} /></a>}
                  {socialLink("twitter") && <a href={socialLink("twitter")} aria-label="Twitter" target="_blank" rel="noopener noreferrer"><FaTwitter size={18} /></a>}
                  {socialLink("facebook") && <a href={socialLink("facebook")} aria-label="Facebook" target="_blank" rel="noopener noreferrer"><FaFacebookF size={18} /></a>}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.header}>
            <div className={styles.headerInner}>
              <div className={styles.brandLogo}>
                <Link href="/" aria-label="العودة إلى الصفحة الرئيسية">
                  <Image
                    src="/ben-logo.png"
                    alt="وقف عبد الله بن قاسم آل ثاني"
                    width={260}
                    height={99}
                    className={styles.headerLogoImage}
                    priority
                  />
                </Link>
              </div>
              <HeaderNav email={email} />
            </div>
          </div>
        </SiteHeader>
        {children}
        <footer className={styles.footer}>
          <div className={styles.footerInner}>
            <div className={`${styles.footerCol} ${styles.footerAbout}`}>
              {/* <h4>وقف عبد الله بن قاسم</h4> */}
              <Link href="/" className={styles.footerLogo} aria-label="الصفحة الرئيسية لوقف عبد الله بن قاسم">
                <Image
                  src="/ben-logo.png"
                  alt="وقف عبد الله بن قاسم آل ثاني"
                  width={220}
                  height={84}
                />
              </Link>
              <p className={styles.description}>هو وقف خيري يتم الصرف منه على الأعمال الخيرية حسب شروط الواقف.</p>
            </div>
            <nav className={styles.footerCol} aria-label="أقسام الموقع">
              <h4>أقسام الموقع</h4>
              <ul>
                <li><Link href="/news">الأخبار</Link></li>
                <li><Link href="/funds">المصارف الشرعية</Link></li>
                <li><Link href="/books-policies">اللوائح والسياسات</Link></li>
              </ul>
            </nav>
            <nav className={styles.footerCol} aria-label="روابط سريعة">
              <h4>روابط سريعة</h4>
              <ul>
                <li><Link href="/about">من نحن</Link></li>
                <li><a href={`mailto:${email}`}>تواصل معنا</a></li>
                <li><Link href="/complaints">صندوق الشكاوى</Link></li>
              </ul>
            </nav>
            <div id="site-contact" className={`${styles.footerCol} ${styles.footerContact}`}>
              <h4>تواصل معنا</h4>
              <address>
                <p><FaMapMarkerAlt aria-hidden /><span><strong>العنوان:</strong> {address}</span></p>
                <p><FaPhone aria-hidden /><a href={`tel:${phone}`}><strong>رقم هاتف:</strong> <span dir="ltr">{phone}</span></a></p>
                <p><FaEnvelope aria-hidden /><a href={`mailto:${email}`}><strong>البريد:</strong> <span dir="ltr">{email}</span></a></p>
              </address>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <div className={styles.footerBottomInner}>
              <nav className={styles.legalLinks} aria-label="الروابط القانونية">
                <Link href="/privacy-policy">سياسة الخصوصية</Link>
                <span aria-hidden />
                <Link href="/terms-and-conditions">الشروط والأحكام</Link>
              </nav>
              <div className={styles.developerCredit}>
                <span>تصميم وتطوير شركة</span>
                <a href="https://dwam-tech.com/" target="_blank" rel="noopener noreferrer" aria-label="شركة دوام للتقنية">
                  <Image src="/dwam.png" alt="شركة دوام" width={30} height={30} />
                  
                </a>
              </div>
            </div>
          </div>
        </footer>
        <ScrollToTopButton className={styles.scrollTop} />
      </body>
    </html>
  );
}
