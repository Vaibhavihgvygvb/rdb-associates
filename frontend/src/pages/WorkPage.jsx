import Nav from "@/components/site/Nav";
import OurWork from "@/components/site/OurWork";
import Footer from "@/components/site/Footer";

export default function WorkPage() {
  return (
    <main data-testid="work-page" className="bg-cream text-brown page-transition">
      <Nav />
      <div className="pt-20" />
      <OurWork />
      <Footer />
    </main>
  );
}
