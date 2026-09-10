import { Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Newsletter from "@/components/site/Newsletter";
import { useDisclaimer } from "@/components/site/Disclaimer";
import { CHAMBERS_ADDRESS, EMAIL, PHONE_DISPLAY, PHONE_E164 } from "@/data/chambers";

export default function Footer() {
  const { reopen } = useDisclaimer();

  return (
    <footer data-testid="site-footer" className="relative bg-sage-deep text-cream border-t border-brown/30">
      <div className="shell pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            {/* The full lockup carries the firm name itself, so it stands in
                for the wordmark here rather than sitting beside a repeat of it. */}
            <div>
              <img
                src="/rdb-logo.png"
                alt="RDB Associates"
                width={167}
                height={147}
                className="h-20 w-auto"
              />
              <div className="text-[10px] uppercase tracking-widest-plus text-brown-on-dark mt-4">Chambers of Ramandeep Bawa</div>
            </div>
            <p className="mt-8 text-cream/70 text-sm leading-relaxed max-w-md">
              A boutique legal practice in New Delhi focused on courtroom advocacy, commercial disputes and specialised advisory work before the High Court of Delhi and tribunals across India.
            </p>
            {/* The pull-quote that used to sit here is gone. It was the same
                sentence, verbatim, that /about already sets as a display quote
                — so on that page the footer repeated it a second time within
                one scroll. Of the ten blocks this footer stacks it was the only
                one carrying no information a visitor needs at the foot of a
                page, which makes it the one to drop. */}
          </div>

          <div className="md:col-span-3">
            <div className="text-[10px] uppercase tracking-widest-plus text-brown-on-dark mb-6">Navigate</div>
            {/* Twelve links stacked at `space-y-3` gave each a ~20px hit area —
                the tightest targets on the site, and under the 24px minimum of
                WCAG 2.5.8. `block py-1.5` takes each to 32px without changing
                the column's overall height, since the padding replaces the
                margin it used to sit in. */}
            <ul className="text-sm -my-1.5">
              {[
                ["About", "/about"], ["Practice Areas", "/practice-areas"], ["Expertise", "/expertise"],
                ["Journey", "/journey"], ["Credentials", "/credentials"], ["Our Work", "/work"],
                ["Stages of a Matter", "/stages"], ["Careers", "/careers"], ["Newsroom", "/newsroom"],
                ["Insights", "/insights"], ["Newsletter", "/newsletter"], ["Contact", "/contact"],
              ].map(([l, h]) => (
                <li key={l}>
                  <Link to={h} className="block py-1.5 text-cream/75 hover:text-brown-on-dark transition-colors duration-300">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-5">
            <div className="text-[10px] uppercase tracking-widest-plus text-brown-on-dark mb-6">The Chambers</div>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-cream/80">
                <MapPin size={16} strokeWidth={1.4} className="text-brown-on-dark mt-0.5 flex-shrink-0" />
                <span>{CHAMBERS_ADDRESS}</span>
              </li>
              <li className="flex items-start gap-3 text-cream/80">
                <Phone size={16} strokeWidth={1.4} className="text-brown-on-dark mt-0.5" />
                <a href={`tel:${PHONE_E164}`} className="hover:text-brown-on-dark transition-colors">{PHONE_DISPLAY}</a>
              </li>
              <li className="flex items-start gap-3 text-cream/80">
                <Mail size={16} strokeWidth={1.4} className="text-brown-on-dark mt-0.5" />
                <a href={`mailto:${EMAIL}`} className="hover:text-brown-on-dark transition-colors">{EMAIL}</a>
              </li>
              <li className="flex items-start gap-3 text-cream/80">
                <Linkedin size={16} strokeWidth={1.4} className="text-brown-on-dark mt-0.5" />
                <a href="https://www.linkedin.com/in/ramandeep-bawa-6081b6155/" target="_blank" rel="noreferrer" className="hover:text-brown-on-dark transition-colors">
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
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 uppercase tracking-widest-plus text-[10px]">
            <Link to="/privacy" className="text-cream/75 hover:text-brown-on-dark transition-colors duration-300">
              Privacy Notice
            </Link>
            <span aria-hidden className="text-cream/30">·</span>
            {/* A button, not a Link: the notice is a dialog rather than a
                route, and it has to be reachable again after it has been
                acknowledged — the paragraph below states the terms, this
                re-opens the acknowledgement itself. */}
            <button
              type="button"
              onClick={reopen}
              data-testid="footer-disclaimer"
              className="uppercase tracking-widest-plus text-cream/75 hover:text-brown-on-dark transition-colors duration-300"
            >
              Disclaimer
            </button>
            <span aria-hidden className="text-cream/30">·</span>
            <span>Bar Council of India · Rule 36 · No solicitation of work</span>
          </div>
        </div>

        <p className="mt-8 text-[11px] text-cream/60 leading-relaxed max-w-4xl">
          <span className="text-brown-on-dark uppercase tracking-widest-plus">Disclaimer · </span>
          This website is for informational purposes only. The content provided does not constitute legal advice and viewing it does not create an attorney–client relationship. In accordance with the Bar Council of India Rules, we do not solicit work through this website.
        </p>
      </div>
    </footer>
  );
}
