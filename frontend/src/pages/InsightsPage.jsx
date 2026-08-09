import PageShell from "@/components/site/PageShell";
import Insights from "@/components/site/Insights";

export default function InsightsPage() {
  return (
    <PageShell testId="insights-page" className="bg-white"
      title="Insights"
      description="Commentary and analysis from the chambers on ADR, cyber law, medical law and commercial litigation."
    >
      <Insights />
    </PageShell>
  );
}
