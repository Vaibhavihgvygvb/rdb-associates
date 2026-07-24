import Nav from "@/components/site/Nav";
import About from "@/components/site/About";
import Footer from "@/components/site/Footer";

export default function AboutPage() {
  return (
    <main data-testid="about-page" className="bg-cream text-brown page-transition">
      <Nav />
      <div className="pt-20" />
      <About />
      <Footer />
    </main>
  );
}
