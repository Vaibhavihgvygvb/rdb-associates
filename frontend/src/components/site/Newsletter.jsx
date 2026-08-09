import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Mail, Check, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { validateField } from "@/lib/validate";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Newsletter({ variant = "footer" }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const onChange = (e) => {
    setEmail(e.target.value);
    if (error) setError(validateField("email", e.target.value));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const problem = validateField("email", email);
    if (problem) {
      setError(problem);
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/newsletter`, { email });
      setSubscribed(true);
      setEmail("");
      setError(null);
    } catch (err) {
      const msg = err?.response?.data?.detail || "Unable to subscribe. Please try again.";
      toast.error(typeof msg === "string" ? msg : "Subscription failed.");
    } finally {
      setLoading(false);
    }
  };

  // Confirmation replaces the field in place. Both variants use it, so the
  // footer doesn't rely on a toast that may scroll out of view.
  const confirmation = (tone) => (
    <motion.div
      key="done"
      data-testid={`newsletter-${variant}-success`}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      className={`flex items-center gap-3 ${tone === "dark" ? "text-cream/80" : "text-ink"}`}
    >
      <span className="confirm-badge confirm-badge-inline" data-tone={tone === "dark" ? "dark" : undefined}>
        <Check size={16} strokeWidth={2} />
      </span>
      <span className="text-sm">You&rsquo;re subscribed. Thank you for joining.</span>
    </motion.div>
  );

  if (variant === "footer") {
    return (
      <div data-testid="newsletter-footer">
        {/* on-dark: this variant renders inside the near-black footer. */}
        <div className="text-[10px] uppercase tracking-widest-plus text-brown-on-dark mb-4">Newsletter</div>
        <p className="text-cream/70 text-sm mb-4 max-w-sm">
          Subscribe for firm news, legal updates and insights from the chambers. Your address is used
          for the newsletter only —{" "}
          <Link to="/privacy" className="text-brown-on-dark">how it is handled</Link>.
        </p>
        <AnimatePresence mode="wait" initial={false}>
          {subscribed ? (
            confirmation("dark")
          ) : (
            <motion.form key="form" onSubmit={onSubmit} exit={{ opacity: 0 }} className="max-w-sm">
              <div className="flex items-stretch gap-0">
                <input
                  data-testid="newsletter-footer-email"
                  type="email"
                  aria-label="Your email address"
                  placeholder="Your email address"
                  value={email}
                  onChange={onChange}
                  onBlur={() => email && setError(validateField("email", email))}
                  aria-invalid={!!error}
                  /* `outline-none` removed: on this near-black surface the only
                     remaining focus signal was a border moving from brown/40 to
                     brown, which is a ~1.2:1 change against the footer and not a
                     focus indicator by any reading of 2.4.7. The global
                     :focus-visible ring uses the on-dark emerald, which clears
                     the 3:1 that 1.4.11 asks for here. */
                  className={`flex-1 bg-transparent border border-r-0 px-4 py-3 text-sm text-cream placeholder:text-cream/60 transition-colors duration-300 ${
                    error ? "border-red-400" : "border-brown/40 focus:border-brown"
                  }`}
                />
                <button
                  data-testid="newsletter-footer-submit"
                  type="submit"
                  disabled={loading} aria-busy={loading}
                  className="bg-brown text-white px-4 flex items-center justify-center hover:bg-brown-light transition-colors duration-300 disabled:opacity-60"
                  aria-label="Subscribe"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
                </button>
              </div>
              <AnimatePresence initial={false}>
                {error && (
                  <motion.p role="alert" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22 }}
                    className="overflow-hidden text-[11px] text-red-300">
                    <span className="mt-1.5 block">{error}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <section data-testid="newsletter-page-section" className="relative section-y bg-cream">
      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
        <div className="eyebrow eyebrow-center">
          <span className="eyebrow-label">Newsletter</span>
        </div>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.05]">
          Stay informed with <span className="italic text-brown">the chambers</span>.
        </h1>
        {/* max-w-2xl, not max-w-xl. Centred text has no fixed left edge for
            the eye to return to, so it stays comfortable for two or three
            lines and stops being so past that; at 576px this ran to five.
            Widening the measure is the change that removes lines — narrowing
            it would add them — and it keeps the centred composition the rest
            of this page is built on. */}
        <p className="mt-8 text-ink/70 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          Subscribe to receive periodic updates on firm news, notable matters, and short-form legal
          insights across our practice areas — civil, commercial, medical and cyber law. No spam,
          unsubscribe anytime. Your address is used for the newsletter and nothing else — see the{" "}
          <Link to="/privacy" className="text-brown">Privacy Notice</Link>.
        </p>

        <AnimatePresence mode="wait" initial={false}>
          {subscribed ? (
            <div className="mt-12 flex justify-center">{confirmation("light")}</div>
          ) : (
            <motion.form key="form" onSubmit={onSubmit} exit={{ opacity: 0 }} className="mt-12 max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* The ring goes on the wrapper, not the input. The input keeps
                    `outline-none` because it is drawn as part of this box
                    rather than as a control in its own right — but it had no
                    focus styling anywhere and the box had none either, so this
                    field previously showed nothing at all on keyboard focus.
                    `focus-within` is the same treatment the careers dropzone
                    already uses for its own visually-hidden input. */}
                <div className={`flex-1 flex items-center gap-3 bg-white border px-5 py-4 transition-colors duration-300 focus-within:border-brown focus-within:ring-2 focus-within:ring-brown/30 ${
                  error ? "border-red-400" : "border-brown/30"
                }`}>
                  <Mail size={18} strokeWidth={1.4} className="text-brown flex-shrink-0" />
                  <input
                    data-testid="newsletter-page-email"
                    type="email"
                    aria-label="Your email address"
                    placeholder="Your email address"
                    value={email}
                    onChange={onChange}
                    onBlur={() => email && setError(validateField("email", email))}
                    aria-invalid={!!error}
                    className="flex-1 bg-transparent outline-none text-sm text-ink placeholder:text-ink-soft"
                  />
                </div>
                <button
                  data-testid="newsletter-page-submit"
                  type="submit"
                  disabled={loading} aria-busy={loading}
                  className="inline-flex items-center justify-center gap-3 bg-brown text-white px-8 py-4 text-xs uppercase tracking-widest-plus font-semibold hover:bg-brown-light transition-colors duration-300 disabled:opacity-60 group"
                >
                  {loading ? "Subscribing" : "Subscribe"}
                  {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                  )}
                </button>
              </div>
              <AnimatePresence initial={false}>
                {error && (
                  <motion.p role="alert" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22 }}
                    className="overflow-hidden text-[11px] text-red-700 text-left">
                    <span className="mt-2 block">{error}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
