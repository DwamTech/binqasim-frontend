import AboutWaqfProfile from "../../../components/AboutWaqfProfile";
import { getSystemContent } from "@/services/publicWebsite";
import PublicContent from "@/components/PublicContent";
import GovernanceHero from "@/components/GovernanceHero";

export const metadata = {
  title: "عن الوقف | وقف عبد الله بن قاسم آل ثاني",
  description: "تعريف بأوقاف عبدالله بن قاسم آل ثاني بمدينة صفوى بمحافظة القطيف.",
};

export default async function AboutPage() {
  const html = await getSystemContent("about_waqf");
  if (html) return <main>
    <GovernanceHero kind="about" eyebrow="عن الوقف" title="عن الوقف" />
    <PublicContent title="عن الوقف" html={html} hideTitle />
  </main>;
  return <AboutWaqfProfile />;
}
