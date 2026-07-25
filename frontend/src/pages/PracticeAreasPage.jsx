import Nav from "@/components/site/Nav";
import PracticeAreas from "@/components/site/PracticeAreas";
import Footer from "@/components/site/Footer";

export default function PracticeAreasPage() {
  return (
    <main data-testid="practice-areas-page" className="bg-white text-ink page-transition">
      <Nav />
      <div className="pt-20" />
      <PracticeAreas />
      <Footer />
    </main>
  );
}
