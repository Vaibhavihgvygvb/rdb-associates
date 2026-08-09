import PageShell from "@/components/site/PageShell";
import OurWork from "@/components/site/OurWork";

export default function WorkPage() {
  return (
    <PageShell testId="work-page"
      title="Our Work"
      description="Representative matters, major cases and client categories, described generally in accordance with the Bar Council of India Rules."
    >
      <OurWork />
    </PageShell>
  );
}
