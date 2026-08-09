import PageShell from "@/components/site/PageShell";
import About from "@/components/site/About";
import Team from "@/components/site/Team";

export default function AboutPage() {
  return (
    <PageShell testId="about-page"
      title="About the Advocate"
      description="Ramandeep Bawa, founder of RDB Associates — training, approach and qualifications, and the team behind the chambers."
    >
      <About />
      <Team />
    </PageShell>
  );
}
