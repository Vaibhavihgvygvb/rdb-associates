import PageShell from "@/components/site/PageShell";
import Careers from "@/components/site/Careers";

export default function CareersPage() {
  return (
    <PageShell testId="careers-page"
      title="Careers"
      description="Recruitment for qualified advocates and structured internships for law students at the Chambers of Ramandeep Bawa."
    >
      <Careers />
    </PageShell>
  );
}
