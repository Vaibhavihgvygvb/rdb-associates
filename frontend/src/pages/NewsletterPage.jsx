import PageShell from "@/components/site/PageShell";
import Newsletter from "@/components/site/Newsletter";

export default function NewsletterPage() {
  return (
    <PageShell testId="newsletter-page"
      title="Newsletter"
      description="Subscribe for firm news, notable matters and short-form legal insights across civil, commercial, medical and cyber law."
    >
      <Newsletter variant="page" />
    </PageShell>
  );
}
