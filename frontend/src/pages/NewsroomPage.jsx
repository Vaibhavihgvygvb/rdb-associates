import PageShell from "@/components/site/PageShell";
import Newsroom from "@/components/site/Newsroom";

export default function NewsroomPage() {
  return (
    <PageShell testId="newsroom-page" className="bg-white"
      title="Newsroom"
      description="Matter notes, chambers announcements, publications and speaking engagements."
    >
      <Newsroom />
    </PageShell>
  );
}
