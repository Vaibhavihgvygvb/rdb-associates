import { Scale, Briefcase, Gavel, Handshake, Stethoscope, ShieldCheck, Building2, FileText } from "lucide-react";
import { useRef, useState } from "react";
import Reveal from "@/components/motion/Reveal";
import Modal from "@/components/site/Modal";

const areas = [
  {
    icon: Scale, title: "Civil Litigation", body: "Property, contract, tort and declaratory disputes at trial and appellate stages.",
    detail: "Civil litigation forms the bedrock of the chambers' practice. Ramandeep Bawa appears before the High Court of Delhi and District Courts in matters involving property disputes, contract enforcement, tort claims, recovery suits, and declaratory actions. Every civil brief is approached with meticulous case strategy — from drafting precise pleadings and managing discovery to crafting compelling oral arguments at trial and appellate stages. The chambers handle both original-side suits and appeals, ensuring clients receive end-to-end representation marked by rigorous preparation and strategic adaptability.",
    acts: ["Code of Civil Procedure, 1908", "Transfer of Property Act, 1882", "Specific Relief Act, 1963", "Indian Contract Act, 1872", "Limitation Act, 1963"],
  },
  {
    icon: Briefcase, title: "Commercial Litigation", body: "Contractual disputes, recovery, injunctions and commercial suits before High Court and Commercial Courts.",
    detail: "The commercial litigation practice covers the full spectrum of business disputes under the Commercial Courts Act, 2015. RDB Associates represents corporations, partnerships and individuals in contractual disputes, recovery proceedings, interim injunctions, specific performance claims, and shareholder disputes. With experience appearing before the High Court of Delhi and dedicated Commercial Courts, the chambers provide strategic counsel on risk assessment, forum selection, and alternative routes to resolution — always with an eye on commercial pragmatism alongside legal rigour.",
    acts: ["Commercial Courts Act, 2015", "Indian Contract Act, 1872", "Sale of Goods Act, 1930", "Companies Act, 2013", "Negotiable Instruments Act, 1881"],
  },
  {
    icon: Gavel, title: "Trial Advocacy", body: "Original-side and trial court representation with a focus on cross-examination and evidence strategy.",
    detail: "Trial advocacy is where legal preparation meets courtroom performance. Ramandeep Bawa brings over a decade of experience in original-side litigation, with a particular focus on cross-examination, evidence management, and witness sequencing. The chambers approach each trial as a narrative to be built — from case theory formulation and examination-in-chief to devastating cross-examination and closing submissions. Whether before the District Courts, High Court original side, or specialised tribunals, every trial receives the same exacting standard of preparation.",
    acts: ["Code of Civil Procedure, 1908", "Code of Criminal Procedure, 1973 / Bharatiya Nagarik Suraksha Sanhita, 2023", "Indian Evidence Act, 1872 / Bharatiya Sakshya Adhiniyam, 2023"],
  },
  {
    icon: Handshake, title: "Alternative Dispute Resolution", body: "Mediation, arbitration and conciliation — negotiated outcomes when the courtroom is not the answer.",
    detail: "Not every dispute belongs in a courtroom. RDB Associates advises clients on the full range of alternative dispute resolution mechanisms including arbitration (institutional and ad-hoc), mediation, conciliation, and negotiable settlement frameworks. Ramandeep Bawa holds a Diploma in Alternative Dispute Resolution from the Indian Law Institute and brings both trained neutrality and zealous representation to the ADR process — whether acting as counsel in arbitrations or guiding clients through mediated settlements that preserve commercial relationships.",
    acts: ["Arbitration and Conciliation Act, 1996", "Mediation Act, 2023", "Legal Services Authorities Act, 1987"],
  },
  {
    icon: Stethoscope, title: "Medical Law & Ethics", body: "Medico-legal advisory, consumer forum matters, informed consent and professional negligence claims.",
    detail: "The intersection of medicine and law demands specialised knowledge. With a Postgraduate Diploma in Medical Law & Ethics from NLSIU, Ramandeep Bawa advises healthcare providers, institutions and patients on medico-legal matters including professional negligence claims, informed consent disputes, consumer forum litigation against medical practitioners, and regulatory compliance under the Clinical Establishments Act. The chambers bring a nuanced understanding of both medical ethics and legal procedure to every healthcare-related mandate.",
    acts: ["Consumer Protection Act, 2019", "Clinical Establishments (Registration and Regulation) Act, 2010", "Indian Medical Council Act, 1956", "Indian Penal Code / Bharatiya Nyaya Sanhita, 2023 — provisions on medical negligence"],
  },
  {
    icon: ShieldCheck, title: "Cyber Law", body: "IT Act matters, online defamation, data misuse, digital privacy and cyber-crime response.",
    detail: "As digital interaction expands, so does the frontier of legal risk. RDB Associates handles matters under the Information Technology Act, 2000 including online defamation, data theft and misuse, digital privacy violations, phishing and cyber-fraud complaints, and intermediary liability issues. With a Diploma in Cyber Laws from Government Law College, Mumbai, Ramandeep Bawa provides practical and strategic advice to individuals and enterprises navigating the complex intersection of technology, regulation, and criminal law.",
    acts: ["Information Technology Act, 2000", "Digital Personal Data Protection Act, 2023", "Indian Penal Code / Bharatiya Nyaya Sanhita, 2023 — cyber offence provisions"],
  },
  {
    icon: Building2, title: "Tribunals & Regulatory", body: "Representation before specialised tribunals and regulatory bodies across India.",
    detail: "India's tribunals and regulatory bodies handle an increasingly significant volume of disputes requiring specialised procedural knowledge. RDB Associates appears before the Debt Recovery Tribunals, Consumer Disputes Redressal Commissions, Revenue Tribunals, and other quasi-judicial bodies across India. The chambers provide strategic representation in tribunal proceedings — from filing and pleading to final arguments — understanding the unique procedural frameworks, evidentiary rules, and timelines that govern each forum.",
    acts: ["Recovery of Debts and Bankruptcy Act, 1993", "Consumer Protection Act, 2019", "Securitisation and Reconstruction of Financial Assets and Enforcement of Security Interest Act, 2002"],
  },
  {
    icon: FileText, title: "Advisory & Drafting", body: "Precise legal opinions, pleadings, agreements and pre-litigation strategy for individuals and enterprises.",
    detail: "Preventive legal care is often more valuable than litigation. RDB Associates offers comprehensive advisory and drafting services including detailed legal opinions, commercial agreements and contracts, pleadings and petitions, written submissions, and pre-litigation strategy assessments. Every document produced by the chambers is crafted with precision, clarity, and an eye toward its potential use in adversarial proceedings. Ramandeep Bawa personally reviews every opinion and pleading before it leaves the chambers.",
    acts: ["Indian Contract Act, 1872", "Indian Stamp Act, 1899", "Registration Act, 1908"],
  },
];

export default function PracticeAreas() {
  const [selected, setSelected] = useState(null);

  // Kept for the length of the overlay's exit animation, after `selected`
  // has already been cleared.
  const lastShown = useRef(null);
  if (selected) lastShown.current = selected;
  const shown = selected ?? lastShown.current;

  return (
    <Reveal asChild>
      <section id="practice" data-testid="practice-section" className="relative py-24 md:py-32 bg-cream-dark text-ink overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="shell">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-5">
              <div className="eyebrow">
              <span className="eyebrow-label">Practice Areas</span>
            </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                Counsel across the <span className="italic text-brown">full arc</span> of dispute and advisory work.
              </h1>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 flex items-end">
              <p className="text-ink-soft text-base md:text-lg leading-relaxed">
                From high-stakes trial advocacy to considered advisory work, the chambers combine deep specialisation with the versatility that modern disputes demand. Every mandate is led personally by Ramandeep Bawa.
              </p>
            </div>
          </div>

          <div data-testid="practice-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {areas.map((a) => {
              const Icon = a.icon;
              return (
                <button key={a.title} type="button" onClick={() => setSelected(a)}
                  data-testid={`practice-card-${a.title.replace(/\s+/g, "-").toLowerCase()}`}
                  aria-haspopup="dialog"
                  className="group relative border border-border bg-white p-8 hover:border-brown hover:-translate-y-1 transition-[transform,border-color,box-shadow] duration-300 hover:elevate-card text-left cursor-pointer">
                  <Icon size={28} strokeWidth={1.3} className="text-brown mb-6 group-hover:scale-110 transition-transform duration-500" />
                  <h2 className="font-serif text-2xl text-ink mb-3">{a.title}</h2>
                  <p className="text-ink-soft text-sm leading-relaxed">{a.body}</p>
                  <div className="absolute bottom-0 left-8 right-8 h-px bg-brown/0 group-hover:bg-brown/60 transition-colors duration-500" />
                </button>
              );
            })}
          </div>
        </div>

        <Modal open={Boolean(selected)} onClose={() => setSelected(null)}>
          {({ titleId }) =>
            shown && (
              <>
                <shown.icon size={32} strokeWidth={1.3} className="text-brown mb-6" aria-hidden />
                <h2 id={titleId} className="font-serif text-3xl md:text-4xl text-ink mb-6">{shown.title}</h2>
                <p className="text-ink-soft text-base md:text-lg leading-relaxed">{shown.detail}</p>
                {shown.acts?.length > 0 && (
                  <div className="mt-8 border-t border-border pt-6">
                    <h3 className="text-brown text-xs uppercase tracking-widest-plus mb-4">Acts &amp; Statutes</h3>
                    <ul className="space-y-2">
                      {shown.acts.map((act) => (
                        <li key={act} className="flex items-start gap-3 text-ink-soft text-sm leading-relaxed">
                          <span className="mt-2 h-1 w-1 rounded-full bg-brown flex-shrink-0" aria-hidden />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )
          }
        </Modal>

      </section>
    </Reveal>
  );
}