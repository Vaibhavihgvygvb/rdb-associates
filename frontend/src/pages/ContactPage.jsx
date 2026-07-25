import Nav from "@/components/site/Nav";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";

export default function ContactPage() {
  return (
    <main data-testid="contact-page" className="bg-cream text-ink page-transition">
      <Nav />
      <div className="pt-20" />
      <Contact />
      <Footer />
    </main>
  );
}
