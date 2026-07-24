import Nav from "@/components/site/Nav";
import Stages from "@/components/site/Stages";
import Footer from "@/components/site/Footer";

export default function StagesPage() {
  return (
    <main data-testid="stages-page" className="bg-sage text-cream page-transition">
      <Nav />
      <div className="pt-20" />
      <Stages />
      <Footer />
    </main>
  );
}
