import { Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Newsletter from "@/components/site/Newsletter";

export default function Footer() {
  return (
    <footer data-testid="site-footer" className="relative bg-sage-deep text-cream border-t border-brown/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 border border-brown flex items-center justify-center text-brown font-serif text-xl">R</div>
              <div>
                <div className="font-serif text-2xl">RDB Associates</div>
                <div className="text-[10px] uppercase tracking-widest-plus text-brown mt-1">Chambers of Ramandeep Bawa</div>
              </div>
            </div>
            <p className="mt-8 text-cream/70 text-sm leading-relaxed max-w-md">
              A boutique legal practice in New Delhi focused on courtroom advocacy, commercial disputes and specialised advisory work before the High Court of Delhi and tribunals across India.
            </p>
            <p className="mt-8 font-serif italic text-brown/90 text-lg leading-snug max-w-md">
              &ldquo;I never lose. I either win or learn.&rdquo;
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="text-[10px] uppercase tracking-widest-plus text-brown mb-6">Navigate</div>
            <ul className="space-y-3 text-sm">
              {[
                ["About", "/about"], ["Practice Areas", "/practice-areas"], ["Expertise", "/expertise"],
                ["Journey", "/journey"], ["Credentials", "/credentials"], ["Our Work", "/work"],
                ["Stages of a Matter", "/stages"], ["Careers", "/careers"], ["Newsroom", "/newsroom"],
                ["Insights", "/insights"], ["Newsletter", "/newsletter"], ["Contact", "/contact"],
              ].map(([l, h]) => (
                <li key={l}>
                  <Link to={h} className="text-cream/75 hover:text-brown transition-colors duration-300">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-5">
            <div className="text-[10px] uppercase tracking-widest-plus text-brown mb-6">The Chambers</div>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-cream/80">
                <MapPin size={16} strokeWidth={1.4} className="text-brown mt-0.5 flex-shrink-0" />
                <span>RDB Associates, 4th Floor, Chamber No. 412, Lawyers Chamber Block, Delhi High Court, Sher Shah Road, New Delhi – 110003, India</span>
              </li>
              <li className="flex items-start gap-3 text-cream/80">
                <Phone size={16} strokeWidth={1.4} className="text-brown mt-0.5" />
                <span>+91 — Available on enquiry</span>
              </li>
              <li className="flex items-start gap-3 text-cream/80">
                <Mail size={16} strokeWidth={1.4} className="text-brown mt-0.5" />
                <a href="mailto:contact@rdbassociates.in" className="hover:text-brown transition-colors">contact@rdbassociates.in</a>
              </li>
              <li className="flex items-start gap-3 text-cream/80">
                <Linkedin size={16} strokeWidth={1.4} className="text-brown mt-0.5" />
                <a href="https://www.linkedin.com/in/ramandeep-bawa-6081b6155/" target="_blank" rel="noreferrer" className="hover:text-brown transition-colors">
                  linkedin.com/in/ramandeep-bawa
                </a>
              </li>
            </ul>

            <div className="mt-8">
              <Newsletter variant="footer" />
            </div>
          </div>
        </div>

        <div className="brown-hairline mt-16 mb-8" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-cream/60">
          <div>© {new Date().getFullYear()} RDB Associates. All rights reserved.</div>
          <div className="uppercase tracking-widest-plus text-[10px]">
            Bar Council of India · Rule 36 · No solicitation of work
          </div>
        </div>

        <p className="mt-8 text-[11px] text-cream/45 leading-relaxed max-w-4xl">
          <span className="text-brown/80 uppercase tracking-widest-plus">Disclaimer · </span>
          This website is for informational purposes only. The content provided does not constitute legal advice and viewing it does not create an attorney–client relationship. In accordance with the Bar Council of India Rules, we do not solicit work through this website.
        </p>
      </div>
    </footer>
  );
}
