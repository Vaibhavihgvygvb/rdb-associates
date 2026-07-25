import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ArrowRight, Upload, Briefcase, GraduationCap } from "lucide-react";
import useReveal from "@/lib/useReveal";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const CAREERS_BG =
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80";

const tracks = [
  { key: "recruitment", Icon: Briefcase, title: "Recruitment", body: "Openings for qualified advocates and associates to join the chambers across litigation and advisory practice." },
  { key: "internship", Icon: GraduationCap, title: "Internship", body: "Structured internships for law students seeking hands-on exposure to courtroom advocacy, drafting and research." },
];

const initial = { name: "", email: "", phone: "", applicant_type: "recruitment", position: "", message: "" };

export default function Careers() {
  const ref = useReveal();
  const [form, setForm] = useState(initial);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.name.length < 2 || !form.email || form.message.length < 10) {
      toast.error("Please fill all required fields correctly.");
      return;
    }
    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => data.append(k, v));
      if (resume) data.append("resume", resume);
      await axios.post(`${API}/careers`, data);
      toast.success("Your application has been received. We will be in touch if there's a fit.");
      setForm(initial);
      setResume(null);
    } catch (err) {
      const msg = err?.response?.data?.detail || "Unable to submit application. Please try again.";
      toast.error(typeof msg === "string" ? msg : "Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="careers" data-testid="careers-section" ref={ref} className="reveal relative bg-white">
      {/* Editorial image banner */}
      <div className="relative h-[56vh] min-h-[440px] w-full overflow-hidden">
        <img src={CAREERS_BG} alt="Inside the chambers" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
        <div className="relative h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-end pb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-brown-soft" />
            <span className="text-brown-soft text-[12px] font-semibold uppercase tracking-[0.16em]">Careers</span>
          </div>
          <h1 className="font-serif text-white text-4xl md:text-6xl lg:text-[68px] leading-[1.02] tracking-tight max-w-4xl">
            No ordinary career.
          </h1>
          <p className="mt-5 text-white/85 text-lg max-w-2xl leading-relaxed">
            Build a practice at the intersection of rigorous advocacy and considered counsel.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-3xl mb-16">
          <p className="text-ink text-xl md:text-2xl leading-snug font-medium">
            RDB Associates welcomes applications from qualified advocates seeking recruitment opportunities,
            as well as law students seeking internships.
          </p>
          <p className="mt-6 text-ink-soft text-base md:text-lg leading-relaxed">
            The chambers are built on mentorship and craft. Every application is reviewed personally by
            Ramandeep Bawa, and every associate and intern works directly on live matters — from drafting
            and research to observing courtroom advocacy at the High Court of Delhi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {tracks.map(({ key, Icon, title, body }) => (
            <div key={key} className="group border border-border bg-white p-9 hover:border-brown hover:shadow-[0_24px_48px_-28px_rgba(0,0,0,0.3)] transition-[border-color,box-shadow] duration-300">
              <Icon size={28} strokeWidth={1.3} className="text-brown mb-6" />
              <h3 className="font-serif text-2xl text-ink mb-3">{title}</h3>
              <p className="text-ink-soft text-sm md:text-base leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-10 bg-brown" />
              <span className="text-brown text-xs font-semibold uppercase tracking-widest-plus">Apply</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-ink leading-tight">Submit your application</h2>
            <p className="mt-5 text-ink-soft leading-relaxed">
              Share your details and a short note on why you would like to join the chambers. Attach your
              résumé or CV, and we will be in touch if there is a fit.
            </p>
          </div>

          <form data-testid="careers-form" onSubmit={onSubmit} className="lg:col-span-8 bg-white border border-border p-8 md:p-12 shadow-[0_16px_50px_-20px_rgba(0,0,0,0.12)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Field label="Full Name *">
                <input data-testid="careers-name" name="name" required value={form.name} onChange={onChange} className="input-line-careers" />
              </Field>
              <Field label="Email *">
                <input data-testid="careers-email" name="email" type="email" required value={form.email} onChange={onChange} className="input-line-careers" />
              </Field>
              <Field label="Phone">
                <input data-testid="careers-phone" name="phone" value={form.phone} onChange={onChange} className="input-line-careers" />
              </Field>
              <Field label="Applying For *">
                <select data-testid="careers-type" name="applicant_type" value={form.applicant_type} onChange={onChange} className="input-line-careers bg-transparent">
                  <option value="recruitment">Recruitment</option>
                  <option value="internship">Internship</option>
                </select>
              </Field>
              <div className="md:col-span-2">
                <Field label="Position / Area of Interest">
                  <input data-testid="careers-position" name="position" value={form.position} onChange={onChange} className="input-line-careers" placeholder="e.g. Associate — Civil Litigation" />
                </Field>
              </div>
              <div className="md:col-span-2">
                <Field label="Message *">
                  <textarea data-testid="careers-message" name="message" required rows={5} value={form.message} onChange={onChange} className="input-line-careers resize-none" />
                </Field>
              </div>
              <div className="md:col-span-2">
                <label className="block">
                  <span className="text-[10px] uppercase tracking-widest-plus text-ink-soft">Resume / CV (PDF or Word, max 5MB)</span>
                  <div className="mt-2 flex items-center gap-3 border border-dashed border-border px-5 py-4 cursor-pointer hover:border-brown transition-colors duration-300">
                    <Upload size={18} strokeWidth={1.4} className="text-brown flex-shrink-0" />
                    <span className="text-sm text-ink-soft truncate">{resume ? resume.name : "Choose a file to upload"}</span>
                    <input data-testid="careers-resume" type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => setResume(e.target.files?.[0] || null)} />
                  </div>
                </label>
              </div>
            </div>

            <button type="submit" data-testid="careers-submit" disabled={loading}
              className="mt-8 inline-flex items-center gap-3 bg-brown text-white px-10 py-4 text-xs uppercase tracking-widest-plus font-semibold hover:bg-brown-light transition-colors duration-300 disabled:opacity-60 group">
              {loading ? "Submitting..." : "Submit Application"}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .input-line-careers {
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
        .input-line-careers:focus { border-bottom-color: #0B57D0; }
      `}</style>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-widest-plus text-ink-soft">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
