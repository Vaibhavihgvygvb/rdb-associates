import { Navigate, useParams } from "react-router-dom";
import PageShell from "@/components/site/PageShell";
import NewsroomItem from "@/components/site/NewsroomItem";
import { getItem } from "@/data/newsroom";

export default function NewsroomItemPage() {
  const { slug } = useParams();
  const item = getItem(slug);

  if (!item) return <Navigate to="/newsroom" replace />;

  return (
    <PageShell
      testId="newsroom-item-page"
      className="bg-white"
      title={item.title}
      description={item.summary}
    >
      <NewsroomItem key={item.slug} item={item} />
    </PageShell>
  );
}
