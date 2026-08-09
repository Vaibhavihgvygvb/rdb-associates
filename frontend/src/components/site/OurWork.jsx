import { Landmark, Users, Briefcase } from "lucide-react";
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
  { forum: "High Court of Delhi", type: "Commercial Suit", note: "Represented a mid-sized enterprise in a multi-crore recovery and specific performance dispute; secured an interim injunction restraining alienation of the disputed assets pending trial." },
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
      <section id="work" data-testid="work-section" className="relative py-24 md:py-32 bg-cream">
        <div className="shell">
          <div className="max-w-3xl mb-16">
            <div className="eyebrow">
              <span className="eyebrow-label">Our Work</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.05]">
              Previous work, <span className="italic text-brown">major cases</span> &amp; clients.
            </h1>
            <p className="mt-8 text-ink/70 text-base md:text-lg leading-relaxed">
              In accordance with the Bar Council of India Rules, matter details below are described
              generally and do not identify clients. They are illustrative of the nature and scale of
              work regularly undertaken by the chambers.
            </p>
          </div>

          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Briefcase size={22} strokeWidth={1.3} className="text-brown" />
              <h2 className="font-serif text-2xl md:text-3xl text-ink">Previous Works</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {previousWorks.map((w) => (
                <div key={w} className="flex items-start gap-3 border-t border-brown/25 pt-4">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brown flex-shrink-0" />
                  <span className="text-ink/80 text-sm md:text-base leading-relaxed">{w}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Landmark size={22} strokeWidth={1.3} className="text-brown" />
              <h2 className="font-serif text-2xl md:text-3xl text-ink">Major Cases</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {majorCases.map((c) => (
                <div key={c.forum + c.type} className="bg-white border border-brown/25 p-8">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-widest-plus text-ink/70 mb-4">
                    <span>{c.forum}</span>
                    <span>{c.type}</span>
                  </div>
                  <p className="text-ink/80 text-sm leading-relaxed">{c.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-8">
              <Users size={22} strokeWidth={1.3} className="text-brown" />
              <h2 className="font-serif text-2xl md:text-3xl text-ink">Clients</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {clientCategories.map((c) => (
                <span key={c} className="border border-brown/25 text-ink/80 text-sm px-5 py-2.5">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
