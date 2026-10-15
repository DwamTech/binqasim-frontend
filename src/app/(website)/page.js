import HomeView from "./HomeView";
import { getNews, getSystemContent, getGovernance, getSiteContact, getSupportSettings } from "@/services/publicWebsite";
import PublicContent from "@/components/PublicContent";

export default async function Home() {
  const [news, about, policies, contact, supportSettings] = await Promise.all([
    getNews(1, 6), getSystemContent("about_waqf"), getGovernance("regulations"), getSiteContact(),
    getSupportSettings().catch(() => null),
  ]);
  return <HomeView newsItems={news.items.map((item) => ({ ...item, src: item.coverSrc }))}
    intro={about ? <PublicContent title="?? ?????" html={about} /> : null}
    featuredPolicy={policies.items[0]} contact={contact} supportSettings={supportSettings} />;
}
