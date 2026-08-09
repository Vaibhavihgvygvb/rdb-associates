import { GraduationCap, Award, Languages, BookOpen } from "lucide-react";
import Reveal from "@/components/motion/Reveal";

const education = [
  { label: "B.A. LL.B", inst: "National Law School of India University (NLSIU)" },
  { label: "PG Diploma · Medical Law & Ethics", inst: "NLSIU · 2022" },
  { label: "Diploma · Alternative Dispute Resolution", inst: "Indian Law Institute · 2022" },
  { label: "Diploma · Cyber Laws", inst: "Government Law College, Mumbai · 2012" },
];

const memberships = [
  "Bar Council of India",
  "Bar Council of Delhi",
  "Delhi High Court Bar Association",
  "Indian Lawyers Association",
];

const languages = ["English", "Hindi", "Punjabi", "Japanese (Working)"];

export default function Credentials() {
  return (
    <Reveal asChild>
      <section id="credentials" data-testid="credentials-section" className="relative section-y bg-cream">
        <div className="shell">
          <div className="max-w-3xl mb-16">
            <div className="eyebrow">
              <span className="eyebrow-label">Credentials</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.05]">
              Education, memberships &amp; <span className="italic text-brown">the record</span>.
            </h1>
          </div>

          {/* `items-stretch` is the grid default and stays — three bordered
              panels with ragged bottom edges read as unfinished. What changes
              is where the slack goes: each card is a flex column, so the
              trailing note can be pushed to the bottom edge with `mt-auto`
              instead of the surplus dangling below the last line. */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="flex flex-col bg-white border border-border p-8">
              <GraduationCap size={26} strokeWidth={1.3} className="text-brown mb-6" />
              <h2 className="font-serif text-2xl text-ink mb-6">Education</h2>
              <ul className="space-y-5">
                {education.map((e) => (
                  <li key={e.label} className="border-l border-border pl-4">
                    <div className="font-serif text-ink">{e.label}</div>
                    <div className="text-xs uppercase tracking-widest text-ink-soft mt-1">{e.inst}</div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Was `bg-sage text-cream` — the only dark panel on the page, and
                a third of the row. Everywhere else on this site a near-black
                surface means "this is an action": the mega-menu consultation
                card, the team join card, the article rail's contact block. This
                one is a list of bar memberships, so the treatment was signalling
                something it could not honour, and doing it loudly enough to
                unbalance the row. Same card as its two neighbours now; the
                emerald icons and the hairline still carry the interest. */}
            <div className="flex flex-col bg-white border border-border p-8">
              <Award size={26} strokeWidth={1.3} className="text-brown mb-6" />
              <h2 className="font-serif text-2xl text-ink mb-6">Memberships</h2>
              <ul className="space-y-4">
                {memberships.map((m) => (
                  <li key={m} className="flex items-start gap-3 text-ink/80">
                    <span className="mt-2 h-px w-4 bg-brown flex-shrink-0" />
                    <span className="text-sm md:text-base">{m}</span>
                  </li>
                ))}
              </ul>
              <div className="brown-hairline my-8" />
              <BookOpen size={22} strokeWidth={1.3} className="text-brown mb-4" />
              <h3 className="font-serif text-lg text-ink mb-2">Forums Regularly Appeared Before</h3>
              <p className="text-ink-soft text-sm leading-relaxed">
                High Court of Delhi, District Courts (Delhi), Consumer Fora, Specialised Tribunals across India.
              </p>
            </div>

            <div className="flex flex-col bg-white border border-border p-8">
              <Languages size={26} strokeWidth={1.3} className="text-brown mb-6" />
              <h2 className="font-serif text-2xl text-ink mb-6">Languages</h2>
              <ul className="space-y-4">
                {languages.map((l) => (
                  <li key={l} className="border-b border-border pb-3">
                    <span className="font-serif text-ink text-lg">{l}</span>
                  </li>
                ))}
              </ul>
              {/* mt-auto: this card holds the least content of the three, so
                  the row's equal-height stretch left ~200px hanging below the
                  last language. Anchoring the note to the bottom edge turns
                  that surplus into the gap between two things instead of a
                  void after everything. */}
              <p className="text-ink-soft text-xs uppercase tracking-widest-plus mt-auto pt-8">
                Confidential consultations available across languages
              </p>
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
