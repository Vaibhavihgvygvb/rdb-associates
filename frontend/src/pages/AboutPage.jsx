import Nav from "@/components/site/Nav";
import About from "@/components/site/About";
import Team from "@/components/site/Team";
import Footer from "@/components/site/Footer";

export default function AboutPage() {
  return (
    <main data-testid="about-page" className="bg-cream text-ink page-transition">
      <Nav />
      <div className="pt-20" />
      <About />
      <Team />
      <Footer />
    </main>
  );
}
