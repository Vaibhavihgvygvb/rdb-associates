import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ArrowRight, Upload, Briefcase, GraduationCap } from "lucide-react";
import useReveal from "@/lib/useReveal";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const CAREERS_BG = "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?crop=entropy&cs=srgb&fm=jpg&q=85";

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
    <section id="careers" data-testid="careers-section" ref={ref} className="reveal relative py-24 md:py-32 bg-cream paper-grain overflow-hidden">
      <div className="absolute inset-0 opacity-[0.08] bg-cover bg-center" style={{ backgroundImage: `url('${CAREERS_BG}')` }} aria-hidden />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-10 bg-brown" />
            <span className="text-brown text-xs uppercase tracking-widest-plus">Careers</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.05]">
            Join the <span className="italic text-brown">chambers</span>.
          </h1>
          <p className="mt-8 text-ink/70 text-base md:text-lg leading-relaxed">
            RDB Associates welcomes applications from qualified advocates seeking recruitment opportunities
            as well as law students seeking internships. Every application is reviewed personally.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {tracks.map(({ key, Icon, title, body }) => (
            <div key={key} className="bg-white border border-brown/25 p-8">
              <Icon size={26} strokeWidth={1.3} className="text-brown mb-5" />
              <h3 className="font-serif text-2xl text-ink mb-3">{title}</h3>
              <p className="text-ink/70 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        <form data-testid="careers-form" onSubmit={onSubmit}
          className="bg-white border border-brown/30 p-8 md:p-12 shadow-[0_16px_50px_rgb(21,36,57,0.08)] max-w-3xl">
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
                <span className="text-[10px] uppercase tracking-widest-plus text-ink/60">Resume / CV (PDF or Word, max 5MB)</span>
                <div className="mt-2 flex items-center gap-3 border border-dashed border-brown/40 px-5 py-4 cursor-pointer hover:border-brown transition-colors duration-300">
                  <Upload size={18} strokeWidth={1.4} className="text-brown flex-shrink-0" />
                  <span className="text-sm text-ink/70 truncate">{resume ? resume.name : "Choose a file to upload"}</span>
                  <input
                    data-testid="careers-resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) => setResume(e.target.files?.[0] || null)}
                  />
                </div>
              </label>
            </div>
          </div>

          <button type="submit" data-testid="careers-submit" disabled={loading}
            className="mt-8 inline-flex items-center gap-3 bg-brown text-sage px-10 py-4 text-xs uppercase tracking-widest-plus font-semibold hover:bg-sage hover:text-cream transition-colors duration-300 disabled:opacity-60 group">
            {loading ? "Submitting..." : "Submit Application"}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </form>
      </div>

      <style>{`
        .input-line-careers {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(26, 36, 56, 0.2);
          padding: 12px 0 10px;
          font-family: "IBM Plex Sans", sans-serif;
          font-size: 15px;
          color: #1A2438;
          outline: none;
          transition: border-color 300ms ease;
        }
        .input-line-careers:focus { border-bottom-color: #B08D57; }
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
