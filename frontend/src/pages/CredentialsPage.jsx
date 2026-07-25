import Nav from "@/components/site/Nav";
import Credentials from "@/components/site/Credentials";
import Footer from "@/components/site/Footer";

export default function CredentialsPage() {
  return (
    <main data-testid="credentials-page" className="bg-cream text-ink page-transition">
      <Nav />
      <div className="pt-20" />
      <Credentials />
      <Footer />
    </main>
  );
}
