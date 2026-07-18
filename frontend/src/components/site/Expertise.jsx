import useReveal from "@/lib/useReveal";
import { X } from "lucide-react";
import { useState } from "react";

const items = [
  { n: "01", t: "Courtroom Advocacy", d: "Oral argument, cross-examination and appellate presentation crafted from first principles.",
    detail: "Courtroom advocacy is the cornerstone of legal practice at RDB Associates. Ramandeep Bawa brings over fifteen years of experience in oral argument, cross-examination, and appellate presentation before the High Court of Delhi, District Courts, and tribunals across India. Every submission is crafted from first principles — built on a deep understanding of the facts, the law, and the judicial temperament. The chambers approach each appearance with meticulous preparation, from structuring oral submissions to anticipating judicial queries and adapting argument in real time." },
  { n: "02", t: "Trial Strategy", d: "Case theory, witness sequencing and evidentiary architecture from filing through decree.",
    detail: "A well-conceived trial strategy can determine the outcome before a single witness takes the stand. RDB Associates develops comprehensive case theories that integrate factual narratives with legal frameworks, then builds an evidentiary architecture designed to persuade. Services include witness identification and sequencing, exhibit management, opening statement strategy, cross-examination planning, and closing argument construction. Ramandeep Bawa personally oversees every strategic decision, ensuring coherence between pleading, proof, and persuasion at every stage of trial." },
  { n: "03", t: "Legal Drafting", d: "Pleadings, petitions, applications and written submissions with surgical precision.",
    detail: "In litigation, the written word is the first and most enduring impression. RDB Associates produces pleadings, petitions, interlocutory applications, written submissions, and legal opinions marked by clarity, precision, and persuasive force. Every document is drafted with an eye toward the arguments it must support and the opponent it must counter. The chambers follow a rigorous internal review process — each draft is checked for legal accuracy, factual completeness, and strategic alignment before it leaves the office." },
  { n: "04", t: "Litigation Management", d: "Coordinated handling of multi-forum matters with disciplined timelines and reporting.",
    detail: "Modern disputes rarely confine themselves to a single forum. RDB Associates provides coordinated litigation management for clients facing proceedings across multiple courts, tribunals, and quasi-judicial bodies simultaneously. The chambers maintain disciplined timelines, systematic case tracking, and regular client reporting to ensure that no deadline is missed and no strategic opportunity overlooked. This structured approach allows clients to focus on their business while the chambers manage the procedural complexity." },
  { n: "05", t: "Legal Research", d: "Deep doctrinal and case-law analysis translated into actionable advocacy.",
    detail: "Sound legal research is the foundation upon which every successful case is built. RDB Associates conducts deep doctrinal and case-law analysis across a wide range of legal fields — from commercial law and civil procedure to medical jurisprudence and information technology law. Research outputs are translated directly into actionable advocacy: persuasive citations for written submissions, distinguishing arguments for oral hearings, and strategic assessments that inform case theory and settlement decisions alike." },
  { n: "06", t: "Dispute Resolution", d: "Mediation, arbitration and settlement — resolving disputes efficiently and confidentially.",
    detail: "Not every dispute requires a judicial determination. RDB Associates offers comprehensive dispute resolution services including institutional and ad-hoc arbitration, mediation, conciliation, and structured settlement negotiations. Ramandeep Bawa holds advanced qualifications in alternative dispute resolution and brings a pragmatic, solution-oriented approach to every negotiation. The chambers advise clients on the optimal dispute resolution mechanism for their circumstances — balancing cost, time, confidentiality, and the preservation of commercial relationships." },
];

export default function Expertise() {
  const ref = useReveal();
  const [selected, setSelected] = useState(null);

  return (
    <section id="expertise" data-testid="expertise-section" ref={ref} className="reveal relative py-24 md:py-32 bg-cream paper-grain">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-10 bg-gold" />
            <span className="text-gold text-xs uppercase tracking-widest-plus">Areas of Expertise</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-navy leading-[1.05]">
            A method for <span className="italic text-gold">every stage</span> of a matter.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it, idx) => (
            <button key={it.n} onClick={() => setSelected(it)}
              data-testid={`expertise-item-${it.n}`}
              className={`p-10 border-gold/25 hover:bg-white transition-colors duration-500 border-t text-left cursor-pointer ${
                idx % 3 !== 2 ? "md:border-r" : ""
              } ${idx >= items.length - 3 ? "md:border-b-0" : "border-b"}`}>
              <div className="text-gold font-serif text-3xl mb-4">{it.n}</div>
              <h3 className="font-serif text-2xl text-navy mb-3">{it.t}</h3>
              <p className="text-navy/70 text-sm leading-relaxed">{it.d}</p>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={() => setSelected(null)}>
          <div className="absolute inset-0 bg-navy/80 backdrop-blur-sm" />
          <div className="relative max-w-2xl w-full bg-white border border-gold/40 p-10 md:p-14 max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-navy/40 hover:text-gold transition-colors p-1">
              <X size={22} strokeWidth={1.5} />
            </button>
            <div className="text-gold font-serif text-3xl mb-4">{selected.n}</div>
            <h3 className="font-serif text-3xl md:text-4xl text-navy mb-6">{selected.t}</h3>
            <p className="text-navy/80 text-base md:text-lg leading-relaxed">{selected.detail}</p>
            <div className="mt-8 flex justify-end">
              <button onClick={() => setSelected(null)}
                className="border border-gold text-gold px-6 py-3 text-xs tracking-widest-plus uppercase hover:bg-gold hover:text-navy transition-colors duration-300">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}