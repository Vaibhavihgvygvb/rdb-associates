import PageShell from "@/components/site/PageShell";
import Contact from "@/components/site/Contact";

export default function ContactPage() {
  return (
    <PageShell
      testId="contact-page"
      title="Contact"
      description="Request a consultation with the Chambers of Ramandeep Bawa at the Delhi High Court. Every enquiry is reviewed personally."
    >
      {/* Contact is the whole page here, so its heading is the page's h1. On
          the home page the same section sits under the hero's h1 and stays an
          h2 — see the `headingLevel` prop. */}
      <Contact headingLevel={1} />
    </PageShell>
  );
}
