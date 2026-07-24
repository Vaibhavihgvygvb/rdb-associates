import Nav from "@/components/site/Nav";
import Careers from "@/components/site/Careers";
import Footer from "@/components/site/Footer";

export default function CareersPage() {
  return (
    <main data-testid="careers-page" className="bg-cream text-brown page-transition">
      <Nav />
      <div className="pt-20" />
      <Careers />
      <Footer />
    </main>
  );
}
