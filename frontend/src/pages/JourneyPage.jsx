import Nav from "@/components/site/Nav";
import Timeline from "@/components/site/Timeline";
import Footer from "@/components/site/Footer";

export default function JourneyPage() {
  return (
    <main data-testid="journey-page" className="bg-white text-ink page-transition">
      <Nav />
      <div className="pt-20" />
      <Timeline />
      <Footer />
    </main>
  );
}
