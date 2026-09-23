import axios from "axios";
import { toast } from "sonner";
import { AnimatePresence, motion } from "motion/react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import Field from "@/components/site/Field";
import { FieldGroup, ErrorSummary, FormSuccess, SubmitButton } from "@/components/site/FormParts";
import { Link } from "react-router-dom";
import useFormState from "@/lib/useFormState";
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

// Field -> the name the error summary calls it by.
const LABELS = {
  name: "Full Name",
  email: "Email",
  phone: "Phone",
  subject: "Subject",
  message: "Brief Description of Matter",
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
 *
 * The form's state, confirmation panel, grouping and submit control are shared
 * with the careers form — see lib/useFormState.js and site/FormParts.jsx.
 */
export default function Contact({ headingLevel = 2 }) {
  const Heading = `h${headingLevel}`;

  const {
    values: form, loading, sent, setSent,
    shown, onChange, onBlur, submit, problems, focusField,
  } = useFormState(initial, SCHEMA);

  const onSubmit = submit(async (payload) => {
    try {
      await axios.post(`${API}/consultations`, payload);
    } catch (err) {
      const msg = err?.response?.data?.detail || "Unable to submit. Please try again.";
      toast.error(typeof msg === "string" ? msg : "Submission failed.");
      throw err;
    }
  });

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
                <FormSuccess
                  testId="contact-success"
                  title="Your enquiry has been received."
                  body="Every enquiry is reviewed personally. You can expect a response within one working day, to the email address you provided."
                  actionLabel="Send another enquiry"
                  onReset={() => setSent(false)}
                />
              ) : (
              <motion.form
                key="form"
                data-testid="contact-form"
                onSubmit={onSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="bg-white border border-border p-8 md:p-12">
                <ErrorSummary problems={problems} labels={LABELS} onFocus={focusField} />

                <div className="space-y-10">
                  <FieldGroup title="Your details" note="* required">
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
                  </FieldGroup>

                  <FieldGroup title="Your matter">
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
                  </FieldGroup>
                </div>

                <p className="mt-6 text-xs text-ink-soft leading-relaxed">
                  Submitting this form does not create an attorney–client relationship. Please do not share privileged information until a formal engagement is in place.
                  Your details are used to respond to this enquiry and to run a conflict check — see the{" "}
                  <Link to="/privacy" className="text-brown">Privacy Notice</Link>.
                </p>

                <div className="mt-8">
                  <SubmitButton testId="contact-submit" loading={loading} idle="Send Enquiry" pending="Submitting" />
                </div>
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