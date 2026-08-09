import Reveal from "@/components/motion/Reveal";

const stages = [
  { n: "01", t: "Initial Consultation", d: "A confidential first discussion to understand the facts, the parties involved, and the client's objectives." },
  { n: "02", t: "Case Assessment & Strategy", d: "Legal research, risk assessment and forum selection — building a case theory before any step is taken." },
  { n: "03", t: "Drafting & Filing", d: "Precise drafting of pleadings, petitions or applications, followed by filing before the appropriate court, tribunal or authority." },
  { n: "04", t: "Evidence & Discovery", d: "Document collection, witness identification and evidentiary preparation to support the case theory at trial." },
  { n: "05", t: "Hearings & Arguments", d: "Oral advocacy at interim and final hearings, including cross-examination and written submissions where required." },
  { n: "06", t: "Judgment / Award", d: "Receipt and analysis of the court's or tribunal's decision, with advice on next steps and implications." },
  { n: "07", t: "Execution / Appeal", d: "Enforcement of a favourable decree or award, or — where warranted — pursuing appellate remedies." },
];

export default function Stages() {
  return (
    <Reveal asChild>
      <section id="stages" data-testid="stages-section" className="relative py-24 md:py-32 bg-white text-ink">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-16">
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-10 bg-brown" />
              <span className="text-brown text-xs uppercase tracking-widest-plus">Our Process</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              Stages of <span className="italic text-brown">a matter</span>.
            </h1>
            <p className="mt-8 text-ink-soft text-base md:text-lg leading-relaxed">
              Every matter is different, but the chambers follow a disciplined process at each stage —
              from the first consultation through to resolution.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-10">
              {stages.map((s) => (
                <div key={s.n} data-testid={`stage-item-${s.n}`} className="relative pl-14 md:pl-20">
                  <span className="absolute left-0 md:left-2 top-0 w-8 h-8 rounded-full bg-white border border-brown flex items-center justify-center text-brown font-serif text-sm">
                    {s.n}
                  </span>
                  <h2 className="font-serif text-xl md:text-2xl text-ink">{s.t}</h2>
                  <p className="text-ink-soft text-sm md:text-base mt-2 leading-relaxed max-w-2xl">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
