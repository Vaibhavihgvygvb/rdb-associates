import PageShell from "@/components/site/PageShell";
import PracticeAreas from "@/components/site/PracticeAreas";

export default function PracticeAreasPage() {
  return (
    <PageShell testId="practice-areas-page" className="bg-white"
      title="Practice Areas"
      description="Civil and commercial litigation, trial advocacy, ADR, medical law, cyber law, tribunals and advisory work — with the Acts each is conducted under."
    >
      <PracticeAreas />
    </PageShell>
  );
}
