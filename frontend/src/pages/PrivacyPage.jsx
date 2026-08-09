import PageShell from "@/components/site/PageShell";
import Privacy from "@/components/site/Privacy";

export default function PrivacyPage() {
  return (
    <PageShell
      testId="privacy-page"
      className="bg-white"
      title="Privacy Notice"
      description="What personal data this website collects through its enquiry, newsletter and career forms, where it is held, how long it is kept, and how to have it corrected or removed."
    >
      <Privacy />
    </PageShell>
  );
}
