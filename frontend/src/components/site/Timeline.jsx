import useReveal from "@/lib/useReveal";

const events = [
  { year: "2011", title: "Called to the Bar", body: "Began practice under the mentorship of Senior Advocate Ajay Burman — developing foundational rigour in courtroom advocacy, drafting and litigation strategy." },
  { year: "2012", title: "Diploma in Cyber Laws", body: "Government Law College, Mumbai — an early specialisation in the emerging jurisprudence of information technology." },
  { year: "2013", title: "Independent Practice", body: "Established an independent practice representing clients across District Courts, High Courts and tribunals throughout India." },
  { year: "2022", title: "PG Diploma · Medical Law & Ethics", body: "National Law School of India University — deepening capability in medico-legal disputes, consent and professional negligence." },
  { year: "2022", title: "Diploma in ADR", body: "Indian Law Institute — formalising expertise in negotiated and structured dispute resolution." },
  { year: "Today", title: "Founder · RDB Associates", body: "A boutique chambers based in New Delhi, focused on courtroom advocacy, commercial disputes and specialised advisory work." },
];

export default function Timeline() {
  const ref = useReveal();
  return (
    <section id="timeline" data-testid="timeline-section" ref={ref} className="reveal relative py-24 md:py-32 bg-sage text-cream">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brown/60 to-transparent" />
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-10 bg-brown" />
            <span className="text-brown text-xs uppercase tracking-widest-plus">The Journey</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
            A career built <span className="italic text-brown">brief by brief</span>.
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-brown/30 md:-translate-x-1/2" />
          <div className="space-y-14">
            {events.map((e, i) => (
              <div key={e.year + e.title} data-testid={`timeline-item-${i}`}
                className={`relative md:grid md:grid-cols-2 md:gap-16 ${i % 2 === 0 ? "" : "md:[&>*:first-child]:col-start-2"}`}>
                <div className={`pl-14 md:pl-0 ${i % 2 === 0 ? "md:text-right md:pr-16" : "md:pl-16"}`}>
                  <div className="text-brown font-serif text-3xl md:text-4xl">{e.year}</div>
                  <h3 className="font-serif text-xl md:text-2xl text-cream mt-2">{e.title}</h3>
                  <p className="text-cream/70 text-sm md:text-base mt-3 leading-relaxed max-w-md md:inline-block">{e.body}</p>
                </div>
                <span className="absolute left-4 md:left-1/2 top-2 -translate-x-1/2 w-3 h-3 rotate-45 bg-brown border border-brown" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}