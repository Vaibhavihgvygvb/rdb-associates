import { Navigate, useParams } from "react-router-dom";
import Nav from "@/components/site/Nav";
import NewsroomItem from "@/components/site/NewsroomItem";
import Footer from "@/components/site/Footer";
import { getItem } from "@/data/newsroom";

export default function NewsroomItemPage() {
  const { slug } = useParams();
  const item = getItem(slug);

  if (!item) return <Navigate to="/newsroom" replace />;

  return (
    <main data-testid="newsroom-item-page" className="bg-white text-ink page-transition">
      <Nav />
      <div className="pt-[72px]" />
      <NewsroomItem key={item.slug} item={item} />
      <Footer />
    </main>
  );
}
