import { GraduationCap, Award, Languages, BookOpen } from "lucide-react";
import useReveal from "@/lib/useReveal";

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
  const ref = useReveal();
  return (
    <section id="credentials" data-testid="credentials-section" ref={ref} className="reveal relative py-24 md:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-10 bg-brown" />
            <span className="text-brown text-xs uppercase tracking-widest-plus">Credentials</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.05]">
            Education, memberships &amp; <span className="italic text-brown">the record</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-brown/25 p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <GraduationCap size={26} strokeWidth={1.3} className="text-brown mb-6" />
            <h3 className="font-serif text-2xl text-ink mb-6">Education</h3>
            <ul className="space-y-5">
              {education.map((e) => (
                <li key={e.label} className="border-l border-brown/50 pl-4">
                  <div className="font-serif text-ink">{e.label}</div>
                  <div className="text-xs uppercase tracking-widest text-ink/60 mt-1">{e.inst}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-sage text-cream p-10 border border-brown/40">
            <Award size={26} strokeWidth={1.3} className="text-brown mb-6" />
            <h3 className="font-serif text-2xl mb-6">Memberships</h3>
            <ul className="space-y-4">
              {memberships.map((m) => (
                <li key={m} className="flex items-start gap-3 text-cream/85">
                  <span className="mt-2 h-px w-4 bg-brown flex-shrink-0" />
                  <span className="text-sm md:text-base">{m}</span>
                </li>
              ))}
            </ul>
            <div className="brown-hairline my-8" />
            <BookOpen size={22} strokeWidth={1.3} className="text-brown mb-4" />
            <h4 className="font-serif text-lg mb-2">Forums Regularly Appeared Before</h4>
            <p className="text-cream/70 text-sm leading-relaxed">
              High Court of Delhi, District Courts (Delhi), Consumer Fora, Specialised Tribunals across India.
            </p>
          </div>

          <div className="bg-white border border-brown/25 p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <Languages size={26} strokeWidth={1.3} className="text-brown mb-6" />
            <h3 className="font-serif text-2xl text-ink mb-6">Languages</h3>
            <ul className="space-y-4">
              {languages.map((l) => (
                <li key={l} className="flex items-baseline justify-between border-b border-brown/20 pb-3">
                  <span className="font-serif text-ink text-lg">{l}</span>
                </li>
              ))}
            </ul>
            <p className="text-ink/60 text-xs uppercase tracking-widest-plus mt-8">
              Confidential consultations available across languages
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
