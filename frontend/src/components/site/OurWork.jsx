import Reveal from "@/components/motion/Reveal";

const previousWorks = [
  "Recovery and enforcement suits before District Courts and the High Court of Delhi",
  "Commercial contract disputes and interim injunction proceedings",
  "Medico-legal advisory and consumer forum representation for healthcare providers",
  "Cyber-fraud complaints and IT Act proceedings for individuals and enterprises",
  "Arbitration references and mediated settlements in commercial disputes",
  "Drafting of commercial agreements, opinions and pre-litigation notices",
];

const majorCases = [
  // "multi-crore" removed. The intro to this section, the newsroom header and
  // the disclaimer in the footer of every page all state that matters are
  // described generally and that no claim value is disclosed — and this line
  // disclosed one. Whether it crosses the Bar Council line is for the chambers'
  // own judgement; that the page asserted a standard and then broke it two
  // paragraphs later is the part no reader misses. The description of the work
  // is unchanged.
  { forum: "High Court of Delhi", type: "Commercial Suit", note: "Represented a mid-sized enterprise in a recovery and specific performance dispute; secured an interim injunction restraining alienation of the disputed assets pending trial." },
  { forum: "District Court, Delhi", type: "Civil Appeal", note: "Successfully defended a decree in a property partition matter through appellate proceedings, upholding the trial court's findings on title and possession." },
  { forum: "Consumer Disputes Redressal Commission", type: "Medical Negligence", note: "Advised a private hospital through a professional negligence complaint, achieving a negotiated resolution prior to final adjudication." },
  { forum: "Debt Recovery Tribunal", type: "Recovery Proceeding", note: "Acted for a financial institution in a secured-debt recovery matter, coordinating enforcement under the SARFAESI framework." },
];

const clientCategories = [
  "Individuals seeking litigation and advisory representation",
  "Small and medium enterprises (SMEs)",
  "Healthcare institutions and practitioners",
  "Corporates in commercial and contractual disputes",
  "Financial institutions in recovery matters",
];

export default function OurWork() {
  return (
    <Reveal asChild>
      <section id="work" data-testid="work-section" className="relative section-y bg-cream">
        <div className="shell">
          {/* Heading and its standfirst sit side by side, which is the section
              header this site already uses on /practice-areas. Stacked in one
              `max-w-3xl` column the h1 filled 768px of a 1440px viewport and
              left 551px of unshaped emptiness beside it — the page opened with
              more void than content.

              Top-aligned rather than bottom-aligned: /practice-areas pins its
              paragraph to `items-end`, which buys a tidy shared baseline at the
              cost of a ~170px hole above the paragraph. Aligning both columns
              to the top of the grid row avoids trading one gap for another. */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
            <div className="lg:col-span-6">
              <div className="eyebrow">
                <span className="eyebrow-label">Our Work</span>
              </div>
              {/* Non-breaking space inside the accent. `text-wrap: balance`
                  equalises line lengths, which is what we want — but left to
                  itself it chose to split "major cases" across the break,
                  putting half the italic phrase on each line. Binding the two
                  words lets balance pick any break except the one inside the
                  phrase. */}
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.05]">
                Previous work, <span className="italic text-brown">major&nbsp;cases</span> &amp; clients.
              </h1>
            </div>
            <div className="lg:col-span-6 lg:pt-2">
              <p className="text-ink/70 text-base md:text-lg leading-relaxed max-w-xl">
                In accordance with the Bar Council of India Rules, matter details below are described
                generally and do not identify clients. They are illustrative of the nature and scale of
                work regularly undertaken by the chambers.
              </p>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="font-serif text-2xl md:text-3xl text-ink mb-8">Previous Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {previousWorks.map((w) => (
                <div key={w} className="flex items-start gap-3 border-t border-border pt-4">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brown flex-shrink-0" />
                  <span className="text-ink/80 text-sm md:text-base leading-relaxed">{w}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-20">
            <h2 className="font-serif text-2xl md:text-3xl text-ink mb-8">Major Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {majorCases.map((c) => (
                <div key={c.forum + c.type} className="bg-white border border-border p-8">
                  {/* Stacked below `sm`. Two wide-tracked uppercase labels
                      pushed apart by `justify-between` inside a narrow card
                      both wrapped and closed to within 18px of each other on a
                      phone, which read as a collision. They only compete for
                      the same line once there is a line to share. */}
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4 text-[10px] uppercase tracking-widest-plus text-ink/70 mb-4">
                    <span>{c.forum}</span>
                    <span>{c.type}</span>
                  </div>
                  <p className="text-ink/80 text-sm leading-relaxed">{c.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-ink mb-8">Clients</h2>
            <div className="flex flex-wrap gap-3">
              {clientCategories.map((c) => (
                <span key={c} className="border border-border text-ink/80 text-sm px-5 py-2.5">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
