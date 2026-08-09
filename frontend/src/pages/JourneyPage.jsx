import PageShell from "@/components/site/PageShell";
import Timeline from "@/components/site/Timeline";

export default function JourneyPage() {
  return (
    <PageShell testId="journey-page" className="bg-white"
      title="Journey"
      description="A career at the Bar from 2011 — mentorship, specialisation and the founding of RDB Associates."
    >
      <Timeline />
    </PageShell>
  );
}
