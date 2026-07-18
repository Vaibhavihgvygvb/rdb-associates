import { Quote } from "lucide-react";
import useReveal from "@/lib/useReveal";

const PORTRAIT = "https://thumbs4.imagebam.com/0b/f9/36/ME1EKUAW_t.png";

export default function About() {
  const ref = useReveal();
  return (
    <section id="about" data-testid="about-section" ref={ref} className="reveal relative py-24 md:py-32 bg-cream paper-grain">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
          <div className="lg:col-span-5 relative">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border border-gold/60" aria-hidden />
              <img src={PORTRAIT} alt="Ramandeep Bawa, Advocate" data-testid="about-portrait"
                className="relative w-full h-[520px] md:h-[620px] object-cover grayscale-[15%]" />
              <div className="absolute bottom-6 left-6 right-6 bg-navy/95 border border-gold/50 px-6 py-5 backdrop-blur-sm">
                <p className="text-gold text-[10px] uppercase tracking-widest-plus">Founding Advocate</p>
                <p className="text-cream font-serif text-xl mt-1">Ramandeep Bawa</p>
                <p className="text-cream/70 text-xs mt-1 tracking-wider">B.A. LL.B · NLSIU</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-10 bg-gold" />
              <span className="text-gold text-xs uppercase tracking-widest-plus">About the Advocate</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-navy leading-[1.05]">
              A practice grounded in
              <span className="italic text-gold"> discipline</span>, shaped by the{" "}
              <span className="italic">craft of advocacy</span>.
            </h2>

            <div className="mt-10 space-y-6 text-navy/80 leading-relaxed text-base md:text-lg">
              <p>
                Ramandeep Bawa is a litigating advocate based in New Delhi and the founder of{" "}
                <span className="text-navy font-medium">RDB Associates</span>. He practises principally before the High Court of Delhi, and represents clients before District Courts and specialised tribunals across India in matters spanning civil, commercial, medical and cyber law.
              </p>
              <p>
                Trained under Senior Advocate Ajay Burman from 2011, he developed a rigorous foundation in courtroom advocacy, drafting and litigation strategy — moving to independent practice in 2013. His approach is measured, meticulous and deeply client-centric: less noise, more counsel.
              </p>
              <p>
                Alongside a B.A. LL.B from the National Law School of India University, he holds a Postgraduate Diploma in Medical Law &amp; Ethics (NLSIU), a Diploma in Alternative Dispute Resolution (ILI) and a Diploma in Cyber Laws (GLC Mumbai).
              </p>
            </div>

            <div className="mt-12 relative border-l-2 border-gold pl-8 py-4">
              <Quote className="absolute -top-3 -left-4 bg-cream text-gold p-1" size={26} strokeWidth={1.2} />
              <p className="font-serif italic text-navy text-xl md:text-2xl leading-snug">
                &ldquo;I never lose. I either win or learn.&rdquo;
              </p>
              <p className="mt-3 text-xs uppercase tracking-widest-plus text-navy/60">
                — Nelson Mandela · Guiding Principle
              </p>
            </div>

            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { k: "15+", v: "Years at the Bar" },
                { k: "4", v: "Languages" },
                { k: "3", v: "Postgraduate Diplomas" },
                { k: "1", v: "Guiding Philosophy" },
              ].map((f) => (
                <div key={f.v} className="border-t border-gold/40 pt-4">
                  <div className="font-serif text-3xl md:text-4xl text-navy">{f.k}</div>
                  <div className="text-[11px] uppercase tracking-widest-plus text-navy/60 mt-2">{f.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}