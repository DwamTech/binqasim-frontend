"use client";

import styles from "./SupportTabs.module.css";

export default function SupportPhoneInput({ value, onChange, name, ...props }) {
  const national = (value || "").replace(/^\+?966/, "").replace(/^0/, "");
  return <div className={styles.phoneControl} dir="ltr">
    <span className={styles.phonePrefix} aria-hidden="true">+966</span>
    <input {...props} name={name} value={national} type="tel" inputMode="numeric" placeholder="5xxxxxxxx" aria-label="رقم الهاتف برمز الدولة السعودي +966"
      onChange={(event) => {
        let digits = event.target.value.replace(/[^0-9]/g, "");
        digits = digits.replace(/^00966|^966/, "").replace(/^0/, "").slice(0, 9);
        onChange({ target: { value: digits ? `966${digits}` : "", name } });
      }} />
  </div>;
}
