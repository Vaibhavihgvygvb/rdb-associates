import Nav from "@/components/site/Nav";
import Newsroom from "@/components/site/Newsroom";
import Footer from "@/components/site/Footer";

export default function NewsroomPage() {
  return (
    <main data-testid="newsroom-page" className="bg-white text-ink page-transition">
      <Nav />
      <div className="pt-[72px]" />
      <Newsroom />
      <Footer />
    </main>
  );
}
