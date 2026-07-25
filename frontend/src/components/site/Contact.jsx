import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";
import useReveal from "@/lib/useReveal";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const initial = { name: "", email: "", phone: "", practice_area: "", subject: "", message: "" };

const areas = [
  "Civil Litigation", "Commercial Litigation", "Trial Advocacy",
  "Alternative Dispute Resolution", "Medical Law & Ethics",
  "Cyber Law", "Advisory & Drafting", "Other",
];

export default function Contact() {
  const ref = useReveal();
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.name.length < 2 || !form.email || form.phone.length < 6 || form.message.length < 10) {
      toast.error("Please fill all required fields correctly.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/consultations`, form);
      toast.success("Your consultation request has been received. We will respond shortly.");
      setForm(initial);
    } catch (err) {
      const msg = err?.response?.data?.detail || "Unable to submit. Please try again.";
      toast.error(typeof msg === "string" ? msg : "Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" data-testid="contact-section" ref={ref} className="reveal relative py-24 md:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-10 bg-brown" />
              <span className="text-brown text-xs uppercase tracking-widest-plus">Contact</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.05]">
              Speak with <span className="italic text-brown">the chambers</span>.
            </h2>
            <p className="mt-8 text-ink/70 text-base md:text-lg leading-relaxed">
              Share a brief on your matter and preferred means of contact. Every enquiry is reviewed personally and responded to within one working day. All communication is treated in the strictest confidence.
            </p>

            <div className="mt-12 space-y-6">
              {[
                { Icon: MapPin, label: "Chambers", val: "RDB Associates, 4th Floor, Chamber No. 412, Lawyers Chamber Block, Delhi High Court, Sher Shah Road, New Delhi – 110003, India" },
                { Icon: Phone, label: "Telephone", val: "+91 — On request" },
                { Icon: Mail, label: "Email", val: "contact@rdbassociates.in" },
                { Icon: Clock, label: "Hours", val: "Mon – Sat · 10:00 – 19:00 IST" },
              ].map(({ Icon, label, val }) => (
                <div key={label} className="flex items-start gap-4 border-b border-brown/25 pb-5">
                  <Icon size={20} strokeWidth={1.4} className="text-brown mt-1" />
                  <div>
                    <div className="text-[10px] uppercase tracking-widest-plus text-ink/60">{label}</div>
                    <div className="font-serif text-lg text-ink mt-1">{val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <form data-testid="contact-form" onSubmit={onSubmit}
              className="bg-white border border-brown/30 p-8 md:p-12 shadow-[0_16px_50px_rgb(21,36,57,0.08)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Field label="Full Name *">
                  <input data-testid="contact-name" name="name" required value={form.name} onChange={onChange} className="input-line" />
                </Field>
                <Field label="Email *">
                  <input data-testid="contact-email" name="email" type="email" required value={form.email} onChange={onChange} className="input-line" />
                </Field>
                <Field label="Phone *">
                  <input data-testid="contact-phone" name="phone" required value={form.phone} onChange={onChange} className="input-line" />
                </Field>
                <Field label="Practice Area">
                  <select data-testid="contact-area" name="practice_area" value={form.practice_area} onChange={onChange} className="input-line bg-transparent">
                    <option value="">Select a practice area</option>
                    {areas.map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                </Field>
                <div className="md:col-span-2">
                  <Field label="Subject">
                    <input data-testid="contact-subject" name="subject" value={form.subject} onChange={onChange} className="input-line" />
                  </Field>
                </div>
                <div className="md:col-span-2">
                  <Field label="Brief Description of Matter *">
                    <textarea data-testid="contact-message" name="message" required rows={5} value={form.message} onChange={onChange} className="input-line resize-none" />
                  </Field>
                </div>
              </div>

              <p className="mt-6 text-xs text-ink/50 leading-relaxed">
                Submitting this form does not create an attorney–client relationship. Please do not share privileged information until a formal engagement is in place.
              </p>

              <button type="submit" data-testid="contact-submit" disabled={loading}
                className="mt-8 inline-flex items-center gap-3 bg-brown text-white px-10 py-4 text-xs uppercase tracking-widest-plus font-semibold hover:bg-brown-light transition-colors duration-300 disabled:opacity-60 group">
                {loading ? "Submitting..." : "Send Enquiry"}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .input-line {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(21, 24, 28, 0.18);
          padding: 12px 0 10px;
          font-family: "Inter", system-ui, sans-serif;
          font-size: 15px;
          color: #15181C;
          outline: none;
          transition: border-color 300ms ease;
        }
        .input-line:focus { border-bottom-color: #0B57D0; }
      `}</style>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-widest-plus text-ink/60">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}