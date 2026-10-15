import GovernanceDocument from "@/components/GovernanceDocument";
import { getGovernanceItem } from "@/services/publicWebsite";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const document = await getGovernanceItem(slug);
  return { title: document ? `${document.title} | وقف عبد الله بن قاسم` : "إصدار غير موجود" };
}

export default async function DocumentPage({ params }) {
  const { slug } = await params;
  return <GovernanceDocument slug={slug} />;
}
