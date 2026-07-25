import Nav from "@/components/site/Nav";
import Newsletter from "@/components/site/Newsletter";
import Footer from "@/components/site/Footer";

export default function NewsletterPage() {
  return (
    <main data-testid="newsletter-page" className="bg-cream text-ink page-transition">
      <Nav />
      <div className="pt-20" />
      <Newsletter variant="page" />
      <Footer />
    </main>
  );
}
