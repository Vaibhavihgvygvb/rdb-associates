import PageShell from "@/components/site/PageShell";
import Expertise from "@/components/site/Expertise";

export default function ExpertisePage() {
  return (
    <PageShell testId="expertise-page"
      title="Expertise"
      description="Courtroom advocacy, trial strategy, legal drafting, litigation management, research and dispute resolution."
    >
      <Expertise />
    </PageShell>
  );
}
