'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { searchSite } from "../services/siteSearch";
import styles from "../app/(website)/layout.module.css";
import {
  FaHome,
  FaLandmark,
  FaThumbtack,
  FaPhone,
  FaChevronDown,
  FaInfoCircle,
  FaBook,
  FaCoins,
  FaChartBar,
  FaCalendarAlt,
  FaSmile,
  FaLightbulb,
  FaExclamationTriangle,
  FaClipboard,
  FaBars,
  FaTimes,
  FaEnvelope,
  FaYoutube,
  FaTwitter,
  FaFacebookF,
  FaSearch,
} from "react-icons/fa";

const searchablePages = [
  { title: "الرئيسية", href: "/" },
  { title: "عن الوقف", href: "/about" },
  { title: "اللوائح والسياسات", href: "/books-policies" },
  { title: "مسودة لائحة العمل الداخلية", href: "/books-policies/internal-work-regulations" },
  { title: "المصارف الشرعية", href: "/funds" },
  { title: "التقارير المالية", href: "/reports/financial" },
  { title: "التقارير السنوية", href: "/reports/annual" },
  { title: "تقرير أضاحي", href: "/reports/adahi" },
  { title: "أخبار الوقف", href: "/news" },
  { title: "تقييم رضا المستفيدين", href: "/satisfaction" },
  { title: "صندوق الاقتراحات", href: "/suggestions" },
  { title: "صندوق الشكاوى", href: "/complaints" },
  { title: "طلبات الدعم", href: "/support" },
  { title: "متابعة طلب دعم", href: "/support/check" },
];

export default function HeaderNav({ email = "" }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [govOpen, setGovOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchPage, setSearchPage] = useState(1);
  const [searchData, setSearchData] = useState({ data: [], meta: {} });
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const isHome = pathname === "/";
  const isNews = pathname.startsWith("/news");
  const isGovernmentActive =
    pathname.startsWith("/about") ||
    pathname.startsWith("/books-policies") ||
    pathname.startsWith("/funds") ||
    pathname.startsWith("/reports");
  const isContactActive =
    pathname.startsWith("/satisfaction") ||
    pathname.startsWith("/suggestions") ||
    pathname.startsWith("/complaints");
  const isSupportActive = pathname.startsWith("/support");
  const normalizedQuery = searchQuery.trim();
  const searchResults = normalizedQuery ? searchData.data : searchablePages;

  useEffect(() => {
    if (!searchOpen || normalizedQuery.length < 2) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const result = await searchSite(normalizedQuery, searchPage, controller.signal);
        if (controller.signal.aborted) return;
        setSearchData((previous) => ({
          data: searchPage === 1 ? result.data : [...previous.data, ...result.data],
          meta: result.meta,
        }));
        setSearchError("");
      } catch (error) {
        if (!controller.signal.aborted) setSearchError(error.message);
      } finally {
        if (!controller.signal.aborted) setSearchLoading(false);
      }
    }, 300);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [normalizedQuery, searchPage, searchOpen]);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <nav className={styles.navBar} aria-label="التنقل الرئيسي">
      <ul className={styles.nav}>
        <li className={`${styles.navItem} ${isHome ? styles.navItemActive : ""}`}>
          <Link href="/"><FaHome className={styles.navIcon} aria-hidden />الرئيسية</Link>
        </li>
        <li className={`${styles.navItem} ${styles.hasDropdown} ${isGovernmentActive ? styles.navItemActive : ""}`}>
          <button type="button" className={styles.navDropdownButton} aria-expanded={govOpen} onClick={() => setGovOpen((open) => !open)}><FaLandmark className={styles.navIcon} aria-hidden />الحوكمة<FaChevronDown className={styles.chevron} aria-hidden /></button>
          <div className={`${styles.dropdownMenu} ${govOpen ? styles.dropdownOpen : ""}`}>
            <Link href="/about" className={pathname.startsWith("/about") ? styles.dropdownActive : ""}><FaInfoCircle className={styles.iconPrimary} />عن الوقف</Link>
            <Link href="/books-policies" className={pathname.startsWith("/books-policies") ? styles.dropdownActive : ""}><FaBook className={styles.iconSecondary} />اللوائح والسياسات</Link>
            <Link href="/funds" className={pathname.startsWith("/funds") ? styles.dropdownActive : ""}><FaCoins className={styles.iconPrimary} />المصارف الشرعية</Link>
            <Link href="/reports/financial" className={pathname.startsWith("/reports/financial") ? styles.dropdownActive : ""}><FaChartBar className={styles.iconSecondary} />التقارير المالية</Link>
            <Link href="/reports/annual" className={pathname.startsWith("/reports/annual") ? styles.dropdownActive : ""}><FaCalendarAlt className={styles.iconPrimary} />التقارير السنوية</Link>
          </div>
        </li>
        <li className={`${styles.navItem} ${isNews ? styles.navItemActive : ""}`}>
          <Link href="/news"><FaThumbtack className={styles.navIcon} aria-hidden />أخبار الوقف</Link>
        </li>
        <li className={`${styles.navItem} ${styles.hasDropdown} ${isContactActive ? styles.navItemActive : ""}`}>
          <button type="button" className={styles.navDropdownButton} aria-expanded={contactOpen} onClick={() => setContactOpen((open) => !open)}><FaPhone className={styles.navIcon} aria-hidden />تواصل معنا<FaChevronDown className={styles.chevron} aria-hidden /></button>
          <div className={`${styles.dropdownMenu} ${styles.dropdownWide} ${contactOpen ? styles.dropdownOpen : ""}`}>
            <a href="/satisfaction" className={pathname.startsWith("/satisfaction") ? styles.dropdownActive : ""}><FaSmile className={styles.iconSuccess} />تقييم رضا المستفيدين</a>
            <a href="/suggestions" className={pathname.startsWith("/suggestions") ? styles.dropdownActive : ""}><FaLightbulb className={styles.iconIdea} />صندوق الاقتراحات</a>
            <a href="/complaints" className={pathname.startsWith("/complaints") ? styles.dropdownActive : ""}><FaExclamationTriangle className={styles.iconSuccess} />صندوق الشكاوي</a>
          </div>
        </li>
        <li className={`${styles.navItem} ${styles.supportNav} ${isSupportActive ? styles.navItemActive : ""}`}>
          <Link href="/support"><FaClipboard className={styles.navIcon} aria-hidden />طلبات الدعم</Link>
        </li>
      </ul>
      <button
        type="button"
        className={styles.searchButton}
        aria-label="فتح البحث"
        aria-expanded={searchOpen}
        onClick={() => { setSearchLoading(normalizedQuery.length >= 2); setSearchPage(1); setSearchOpen(true); }}
      >
        <FaSearch aria-hidden />
      </button>
      <button
        type="button"
        className={styles.hamburgerBtn}
        aria-label="فتح القائمة الجانبية"
        onClick={() => setSidebarOpen(true)}
      >
        <FaBars />
      </button>
      {searchOpen && (
        <div
          className={styles.searchOverlay}
          role="presentation"
          onMouseDown={() => setSearchOpen(false)}
        >
          <section
            className={styles.searchDialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="search-dialog-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className={styles.searchDialogHeader}>
              <div>
                <span className={styles.searchEyebrow}>بحث الموقع</span>
                <h2 id="search-dialog-title">ابحث في محتوى الموقع</h2>
              </div>
              <button
                type="button"
                className={styles.searchCloseButton}
                aria-label="إغلاق البحث"
                onClick={() => setSearchOpen(false)}
              >
                <FaTimes aria-hidden />
              </button>
            </div>
            <label className={styles.searchField}>
              <FaSearch aria-hidden />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setSearchPage(1);
                  setSearchData({ data: [], meta: {} });
                  setSearchError("");
                  setSearchLoading(event.target.value.trim().length >= 2);
                }}
                placeholder="ابحث عن خبر، كتاب، تقرير أو خدمة..."
                aria-label="البحث في محتوى الموقع"
                maxLength={150}
                autoFocus
              />
            </label>
            <div className={styles.searchResults} aria-live="polite">
              {searchResults.length > 0 ? (
                searchResults.map((page) => (
                  <Link
                    href={page.href}
                    className={styles.searchResult}
                    key={page.href}
                    onClick={() => setSearchOpen(false)}
                  >
                    <FaSearch aria-hidden />
                    <span className={styles.searchResultText}>
                      {page.type && <small>{page.type}</small>}
                      <strong>{page.title}</strong>
                      {page.excerpt && <span>{page.excerpt}</span>}
                    </span>
                  </Link>
                ))
              ) : (
                !searchLoading && !searchError && <p className={styles.noSearchResults}>{normalizedQuery.length < 2 ? "اكتب حرفين على الأقل للبحث." : "لا توجد نتائج مطابقة للبحث."}</p>
              )}
              {searchLoading && <p className={styles.noSearchResults} role="status">جارٍ البحث...</p>}
              {searchError && <p className={styles.noSearchResults} role="alert">{searchError}</p>}
              {!searchLoading && !searchError && searchData.meta.current_page < searchData.meta.last_page && (
                <button type="button" className={styles.searchMore} onClick={() => { setSearchLoading(true); setSearchPage((page) => page + 1); }}>عرض المزيد من النتائج ({searchData.meta.total})</button>
              )}
            </div>
          </section>
        </div>
      )}
      <div
        className={`${styles.sidebarOverlay} ${sidebarOpen ? styles.open : ""}`}
        onClick={() => setSidebarOpen(false)}
      />
      <aside
        className={`${styles.sidebar} ${sidebarOpen ? styles.open : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="القائمة الجانبية"
      >
        <div className={styles.sidebarHeader}>
          <button
            type="button"
            className={styles.closeBtn}
            aria-label="إغلاق القائمة الجانبية"
            onClick={() => setSidebarOpen(false)}
          >
            <FaTimes />
          </button>
          <div className={styles.sidebarLogo}>
            <Image src="/ben-logo.png" alt="وقف عبد الله بن قاسم آل ثاني" width={180} height={69} />
          </div>
        </div>
        <div className={styles.sidebarBody}>
          <Link href="/" className={styles.sidebarLink} onClick={() => setSidebarOpen(false)}>
            <FaHome className={styles.iconPrimary} />الرئيسية
          </Link>
          <button
            type="button"
            className={styles.sidebarGroupBtn}
            aria-expanded={govOpen}
            onClick={() => setGovOpen((v) => !v)}
          >
            <FaLandmark className={styles.iconSecondary} />الحوكمة
            <FaChevronDown className={`${styles.chevron} ${govOpen ? styles.rotate : ""}`} aria-hidden />
          </button>
          <div className={`${styles.sidebarSubmenu} ${govOpen ? styles.show : ""}`}>
            <Link href="/about" className={styles.sidebarSubLink} onClick={() => setSidebarOpen(false)}>
              <FaInfoCircle className={styles.iconPrimary} />عن الوقف
            </Link>
            <Link href="/books-policies" className={styles.sidebarSubLink} onClick={() => setSidebarOpen(false)}>
              <FaBook className={styles.iconSecondary} />اللوائح والسياسات
            </Link>
            <Link href="/funds" className={styles.sidebarSubLink} onClick={() => setSidebarOpen(false)}>
              <FaCoins className={styles.iconPrimary} />المصارف الشرعية
            </Link>
            <Link href="/reports/financial" className={styles.sidebarSubLink} onClick={() => setSidebarOpen(false)}>
              <FaChartBar className={styles.iconSecondary} />التقارير المالية
            </Link>
            <Link href="/reports/annual" className={styles.sidebarSubLink} onClick={() => setSidebarOpen(false)}>
              <FaCalendarAlt className={styles.iconPrimary} />التقارير السنوية
            </Link>
          </div>
          <Link href="/news" className={styles.sidebarLink} onClick={() => setSidebarOpen(false)}>
            <FaThumbtack className={styles.iconSecondary} />أخبار الوقف
          </Link>
          <button
            type="button"
            className={styles.sidebarGroupBtn}
            aria-expanded={contactOpen}
            onClick={() => setContactOpen((v) => !v)}
          >
            <FaPhone className={styles.iconPrimary} />تواصل معنا
            <FaChevronDown className={`${styles.chevron} ${contactOpen ? styles.rotate : ""}`} aria-hidden />
          </button>
          <div className={`${styles.sidebarSubmenu} ${contactOpen ? styles.show : ""}`}>
            <a href="/satisfaction" className={styles.sidebarSubLink} onClick={() => setSidebarOpen(false)}>
              <FaSmile className={styles.iconSuccess} />تقييم رضا المستفيدين
            </a>
            <a href="/suggestions" className={styles.sidebarSubLink} onClick={() => setSidebarOpen(false)}>
              <FaLightbulb className={styles.iconIdea} />صندوق الاقتراحات
            </a>
            <a href="/complaints" className={styles.sidebarSubLink} onClick={() => setSidebarOpen(false)}>
              <FaExclamationTriangle className={styles.iconSuccess} />صندوق الشكاوي
            </a>
          </div>
          <Link href="/support" className={styles.sidebarLink} onClick={() => setSidebarOpen(false)}>
            <FaClipboard className={styles.iconPrimary} />طلبات الدعم
          </Link>
        </div>
        <div className={styles.sidebarFooter}>
          <a href={`mailto:${email}`} className={styles.sidebarEmail}>
            <FaEnvelope />{email}
          </a>
          <div className={styles.sidebarSocial}>
            <a href="#" aria-label="YouTube"><FaYoutube /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
          </div>
        </div>
      </aside>
    </nav>
  );
}
