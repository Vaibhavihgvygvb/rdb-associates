import PageShell from "@/components/site/PageShell";
import Credentials from "@/components/site/Credentials";

export default function CredentialsPage() {
  return (
    <PageShell testId="credentials-page"
      title="Credentials"
      description="Education, Bar memberships, languages and the forums the chambers regularly appears before."
    >
      <Credentials />
    </PageShell>
  );
}
