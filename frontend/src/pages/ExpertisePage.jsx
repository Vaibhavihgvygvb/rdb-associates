import Nav from "@/components/site/Nav";
import Expertise from "@/components/site/Expertise";
import Footer from "@/components/site/Footer";

export default function ExpertisePage() {
  return (
    <main data-testid="expertise-page" className="bg-cream text-brown page-transition">
      <Nav />
      <div className="pt-20" />
      <Expertise />
      <Footer />
    </main>
  );
}
