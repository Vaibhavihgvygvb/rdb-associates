import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import PracticeAreas from "@/components/site/PracticeAreas";
import Expertise from "@/components/site/Expertise";
import Timeline from "@/components/site/Timeline";
import Credentials from "@/components/site/Credentials";
import Insights from "@/components/site/Insights";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";

export default function Home() {
  return (
    <main data-testid="home-page" className="bg-cream text-navy">
      <Nav />
      <Hero />
      <About />
      <PracticeAreas />
      <Expertise />
      <Timeline />
      <Credentials />
      <Insights />
      <Contact />
      <Footer />
    </main>
  );
}