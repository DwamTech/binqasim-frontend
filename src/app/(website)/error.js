"use client";

export default function WebsiteError({ reset }) {
  return <main style={{ textAlign: "center", padding: "80px 24px" }}>
    <h1>تعذر تحميل بيانات الموقع</h1>
    <p>يرجى المحاولة مرة أخرى بعد قليل.</p>
    <button onClick={reset}>إعادة المحاولة</button>
  </main>;
}
