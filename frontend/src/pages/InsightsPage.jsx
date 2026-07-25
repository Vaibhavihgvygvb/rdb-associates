import Nav from "@/components/site/Nav";
import Insights from "@/components/site/Insights";
import Footer from "@/components/site/Footer";

export default function InsightsPage() {
  return (
    <main data-testid="insights-page" className="bg-white text-ink page-transition">
      <Nav />
      <div className="pt-20" />
      <Insights />
      <Footer />
    </main>
  );
}
