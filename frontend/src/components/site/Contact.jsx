import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { AnimatePresence, motion } from "motion/react";
import { Mail, Phone, MapPin, Clock, ArrowRight, Check, Loader2 } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import Field from "@/components/site/Field";
import { Link } from "react-router-dom";
import { validateForm, validateField } from "@/lib/validate";
import { CHAMBERS_ADDRESS, EMAIL, PHONE_DISPLAY, PHONE_E164 } from "@/data/chambers";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const initial = { name: "", email: "", phone: "", practice_area: "", subject: "", message: "" };

// field -> rule name in lib/validate.js
const SCHEMA = {
  name: "name",
  email: "email",
  phone: "phone",
  subject: "subject",
  practice_area: "practice_area",
  message: "message",
};

const areas = [
  "Civil Litigation", "Commercial Litigation", "Trial Advocacy",
  "Alternative Dispute Resolution", "Medical Law & Ethics",
  "Cyber Law", "Advisory & Drafting", "Other",
];

/**
 * `headingLevel` exists because this section renders in two places: as one
 * band among several on the home page, where the hero already owns the h1, and
 * as the whole of /contact, where it is the page's only top-level heading.
 * Hardcoding h2 left /contact with no h1 at all.
 */
export default function Contact({ headingLevel = 2 }) {
  const Heading = `h${headingLevel}`;
  const SubHeading = `h${Math.min(headingLevel + 1, 6)}`;

  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  // A field is only allowed to show an error once the user has left it, so
  // nobody is told they're wrong while still typing their name.
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const shown = (field) => (touched[field] ? errors[field] : undefined);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    // Clear an existing error as soon as the value becomes valid — waiting for
    // blur to forgive a corrected field feels punitive.
    if (errors[name]) {
      const message = validateField(SCHEMA[name], value);
      setErrors((prev) => ({ ...prev, [name]: message ?? undefined }));
    }
  };

  const onBlur = (e) => {
    const { name, value } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(SCHEMA[name], value) ?? undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validateForm(SCHEMA, form);

    if (Object.keys(found).length) {
      setErrors(found);
      setTouched(Object.fromEntries(Object.keys(SCHEMA).map((k) => [k, true])));
      // Send them straight to the first problem rather than making them hunt.
      const first = Object.keys(SCHEMA).find((k) => found[k]);
      document.querySelector(`[name="${first}"]`)?.focus();
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API}/consultations`, form);
      setSent(true);
      setForm(initial);
      setErrors({});
      setTouched({});
    } catch (err) {
      const msg = err?.response?.data?.detail || "Unable to submit. Please try again.";
      toast.error(typeof msg === "string" ? msg : "Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Reveal asChild>
      <section id="contact" data-testid="contact-section" className="relative section-y bg-cream">
        <div className="shell">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
            <div className="lg:col-span-5">
              <div className="eyebrow">
              <span className="eyebrow-label">Contact</span>
            </div>
              <Heading className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.05]">
                Speak with <span className="italic text-brown">the chambers</span>.
              </Heading>
              <p className="mt-8 text-ink/70 text-base md:text-lg leading-relaxed">
                Share a brief on your matter and preferred means of contact. Every enquiry is reviewed personally and responded to within one working day. All communication is treated in the strictest confidence.
              </p>

              <div className="mt-12 space-y-6">
                {/* The telephone and email are now real values rather than
                    "on request" placeholders, so they are actionable — a phone
                    number a visitor has to retype is a number they don't call. */}
                {[
                  { Icon: MapPin, label: "Chambers", val: CHAMBERS_ADDRESS },
                  { Icon: Phone, label: "Telephone", val: PHONE_DISPLAY, href: `tel:${PHONE_E164}` },
                  { Icon: Mail, label: "Email", val: EMAIL, href: `mailto:${EMAIL}` },
                  { Icon: Clock, label: "Hours", val: "Mon – Sat · 10:00 – 19:00 IST" },
                ].map(({ Icon, label, val, href }) => (
                  <div key={label} className="flex items-start gap-4 border-b border-border pb-5">
                    <Icon size={20} strokeWidth={1.4} className="text-brown mt-1" />
                    <div>
                      <div className="text-[10px] uppercase tracking-widest-plus text-ink-soft">{label}</div>
                      {/* The two actionable rows are drawn as actionable. All
                          four rows were identical `font-serif text-lg` — the
                          telephone and email were links with no underline, no
                          colour and no cursor difference until the pointer was
                          already on them, so nothing distinguished them from
                          the address and opening hours, which are not links. */}
                      <div className="font-serif text-lg text-ink mt-1">
                        {href ? (
                          <a
                            href={href}
                            className="underline decoration-brown/35 underline-offset-4 hover:decoration-brown transition-[text-decoration-color] duration-200"
                          >
                            {val}
                          </a>
                        ) : (
                          val
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <AnimatePresence mode="wait" initial={false}>
              {sent ? (
                <motion.div
                  key="sent"
                  data-testid="contact-success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 160, damping: 22 }}
                  /* Border only. This panel carried `border` *and* a resting
                     card shadow — the same doubled elevation already corrected
                     on the credentials cards, where a 1px border sits under a
                     wide soft shadow and neither reads as the real edge. The
                     border is what every other surface on the site uses to
                     delineate itself, so it is the one that stays; the shadow
                     scale is now reserved for hover, which is the only place
                     the rest of the site raises anything. */
                  className="bg-white border border-border p-8 md:p-12"
                >
                  <motion.span
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.12, type: "spring", stiffness: 300, damping: 18 }}
                    className="confirm-badge"
                  >
                    <Check size={22} strokeWidth={1.8} />
                  </motion.span>
                  <SubHeading className="font-serif text-2xl md:text-3xl text-ink mt-6">Your enquiry has been received.</SubHeading>
                  <p className="mt-4 text-ink/70 leading-relaxed max-w-lg">
                    Every enquiry is reviewed personally. You can expect a response within one
                    working day, to the email address you provided.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-8 inline-flex items-center gap-3 text-brown text-xs uppercase tracking-widest-plus border-b border-brown/40 pb-1 hover:border-brown transition-colors duration-300"
                  >
                    Send another enquiry
                    <ArrowRight size={14} />
                  </button>
                </motion.div>
              ) : (
              <motion.form
                key="form"
                data-testid="contact-form"
                onSubmit={onSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="bg-white border border-border p-8 md:p-12">
                <p className="text-xs text-ink-soft mb-8">Fields marked * are required.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Field label="Full Name *" error={shown("name")} htmlId="contact-name">
                    <input data-testid="contact-name" name="name" required aria-required="true" value={form.name} onChange={onChange} onBlur={onBlur}
                      aria-invalid={!!shown("name")} className="input-line" />
                  </Field>
                  <Field label="Email *" error={shown("email")} htmlId="contact-email">
                    <input data-testid="contact-email" name="email" required aria-required="true" type="email" value={form.email} onChange={onChange} onBlur={onBlur}
                      aria-invalid={!!shown("email")} className="input-line" />
                  </Field>
                  <Field label="Phone *" error={shown("phone")} htmlId="contact-phone">
                    <input data-testid="contact-phone" name="phone" required aria-required="true" value={form.phone} onChange={onChange} onBlur={onBlur}
                      aria-invalid={!!shown("phone")} className="input-line" />
                  </Field>
                  <Field label="Practice Area">
                    <select data-testid="contact-area" name="practice_area" value={form.practice_area} onChange={onChange} className="input-line bg-transparent">
                      <option value="">Select a practice area</option>
                      {areas.map((a) => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </Field>
                  <div className="md:col-span-2">
                    <Field label="Subject" error={shown("subject")} htmlId="contact-subject">
                      <input data-testid="contact-subject" name="subject" value={form.subject} onChange={onChange} onBlur={onBlur}
                        aria-invalid={!!shown("subject")} className="input-line" />
                    </Field>
                  </div>
                  <div className="md:col-span-2">
                    <Field
                      label="Brief Description of Matter *"
                      error={shown("message")}
                      htmlId="contact-message"
                      hint={`${form.message.trim().length}/3000 · a short summary is enough at this stage`}
                    >
                      <textarea data-testid="contact-message" name="message" rows={5} required aria-required="true" value={form.message} onChange={onChange} onBlur={onBlur}
                        aria-invalid={!!shown("message")} className="input-line resize-none" />
                    </Field>
                  </div>
                </div>

                <p className="mt-6 text-xs text-ink-soft leading-relaxed">
                  Submitting this form does not create an attorney–client relationship. Please do not share privileged information until a formal engagement is in place.
                  Your details are used to respond to this enquiry and to run a conflict check — see the{" "}
                  <Link to="/privacy" className="text-brown">Privacy Notice</Link>.
                </p>

                <button type="submit" data-testid="contact-submit" disabled={loading} aria-busy={loading}
                  className="mt-8 inline-flex items-center gap-3 bg-brown text-white px-10 py-4 text-xs uppercase tracking-widest-plus font-semibold hover:bg-brown-light transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed group">
                  {loading ? "Submitting" : "Send Enquiry"}
                  {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                  )}
                </button>
              </motion.form>
              )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}