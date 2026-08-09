import { Quote } from "lucide-react";
import { Reveal, Reveals, Parallax, CountingNumber, FadeImage } from "@/components/motion";
import { PORTRAIT } from "@/data/chambers";

export default function About() {
  return (
    <Reveal asChild>
      <section id="about" data-testid="about-section" className="relative py-24 md:py-32 bg-cream">
        <div className="shell">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
            <div className="lg:col-span-5 relative">
              {/* Drifts the whole portrait block — frame, image and caption move
                  together, so the offset border stays registered to the photo. */}
              <Parallax speed={34} asChild>
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-full h-full border border-brown/60" aria-hidden />
                  {/* Sits at the top of /about, so it loads eagerly. */}
                  <FadeImage src={PORTRAIT} alt="Ramandeep Bawa, Advocate" data-testid="about-portrait" priority
                    className="relative w-full h-[520px] md:h-[620px] object-cover grayscale-[15%]" />
                  <div className="absolute bottom-6 left-6 right-6 bg-sage/95 border border-brown/50 px-6 py-5 backdrop-blur-sm">
                    <p className="text-brown-on-dark text-[10px] uppercase tracking-widest-plus">Founding Advocate</p>
                    <p className="text-cream font-serif text-xl mt-1">Ramandeep Bawa</p>
                    <p className="text-cream/70 text-xs mt-1 tracking-wider">B.A. LL.B · NLSIU</p>
                  </div>
                </div>
              </Parallax>
            </div>

            <div className="lg:col-span-7">
              <div className="eyebrow">
              <span className="eyebrow-label">About the Advocate</span>
            </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.05]">
                A practice grounded in
                <span className="italic text-brown"> discipline</span>, shaped by the{" "}
                <span className="italic">craft of advocacy</span>.
              </h1>

              <div className="mt-10 space-y-6 text-ink/80 leading-relaxed text-base md:text-lg">
                <p>
                  Ramandeep Bawa is a litigating advocate based in New Delhi and the founder of{" "}
                  <span className="text-ink font-semibold">RDB Associates</span>. He practises principally before the High Court of Delhi, and represents clients before District Courts and specialised tribunals across India in matters spanning civil, commercial, medical and cyber law.
                </p>
                <p>
                  Trained under Senior Advocate Ajay Burman from 2011, he developed a rigorous foundation in courtroom advocacy, drafting and litigation strategy — moving to independent practice in 2013. His approach is measured, meticulous and deeply client-centric: less noise, more counsel.
                </p>
                <p>
                  Alongside a B.A. LL.B from the National Law School of India University, he holds a Postgraduate Diploma in Medical Law &amp; Ethics (NLSIU), a Diploma in Alternative Dispute Resolution (ILI) and a Diploma in Cyber Laws (GLC Mumbai).
                </p>
              </div>

              <div className="mt-12 relative border-l-2 border-brown pl-8 py-4">
                <Quote className="absolute -top-3 -left-4 bg-cream text-brown p-1" size={26} strokeWidth={1.2} />
                <p className="font-serif italic text-ink text-xl md:text-2xl leading-snug">
                  &ldquo;I never lose. I either win or learn.&rdquo;
                </p>
                <p className="mt-3 text-xs uppercase tracking-widest-plus text-ink-soft">
                  — Nelson Mandela · Guiding Principle
                </p>
              </div>

              <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-8">
                <Reveals holdDelay={110} distance={18} asChild>
                  {[
                    { n: 15, suffix: "+", v: "Years at the Bar" },
                    { n: 4, suffix: "", v: "Languages" },
                    { n: 3, suffix: "", v: "Postgraduate Diplomas" },
                    { n: 1, suffix: "", v: "Guiding Philosophy" },
                  ].map((f) => (
                    <div key={f.v} className="border-t border-brown/40 pt-4">
                      <div className="font-serif text-3xl md:text-4xl text-brown">
                        <CountingNumber number={f.n} />
                        {f.suffix}
                      </div>
                      <div className="text-[11px] uppercase tracking-widest-plus text-ink-soft mt-2">{f.v}</div>
                    </div>
                  ))}
                </Reveals>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}