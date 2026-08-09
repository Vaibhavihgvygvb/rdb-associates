import PageShell from "@/components/site/PageShell";
import Stages from "@/components/site/Stages";

export default function StagesPage() {
  return (
    <PageShell testId="stages-page" className="bg-white"
      title="Stages of a Matter"
      description="How a matter progresses from first consultation through to judgment, execution or appeal."
    >
      <Stages />
    </PageShell>
  );
}
