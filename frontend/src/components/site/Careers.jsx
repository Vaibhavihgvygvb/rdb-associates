import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useLenis } from "lenis/react";
import { toast } from "sonner";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Upload, Briefcase, GraduationCap, Check, Loader2, X, FileText } from "lucide-react";
import { Reveal, FadeImage } from "@/components/motion";
import Field from "@/components/site/Field";
import { validateForm, validateField, validateResume, formatBytes } from "@/lib/validate";
import { NAV_HEIGHT } from "@/lib/layout";
import { RESUME_RETENTION_MONTHS } from "@/data/privacy";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Full-bleed banner, so it is requested at the viewport's own width rather
// than always at 1600 — same reasoning as the hero.
const CAREERS_ID = "photo-1521737604893-d14cc237f11d";
const careersUnsplash = (w) =>
  `https://images.unsplash.com/${CAREERS_ID}?auto=format&fit=crop&w=${w}&q=80`;
const CAREERS_BG = careersUnsplash(1600);
const CAREERS_SRCSET = [640, 960, 1440, 1920]
  .map((w) => `${careersUnsplash(w)} ${w}w`)
  .join(", ");

const tracks = [
  { key: "recruitment", Icon: Briefcase, title: "Recruitment", body: "Openings for qualified advocates and associates to join the chambers across litigation and advisory practice." },
  { key: "internship", Icon: GraduationCap, title: "Internship", body: "Structured internships for law students seeking hands-on exposure to courtroom advocacy, drafting and research." },
];

const initial = { name: "", email: "", phone: "", applicant_type: "recruitment", position: "", message: "" };

// field -> rule name in lib/validate.js. Phone is optional here, matching the
// Form(default=None) on the /api/careers handler.
const SCHEMA = {
  name: "name",
  email: "email",
  phone: "phoneOptional",
  position: "position",
  message: "message",
};

export default function Careers() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [resume, setResume] = useState(null);
  const [resumeError, setResumeError] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const fileInputRef = useRef(null);
  const formRef = useRef(null);
  const lenis = useLenis();

  // The two track cards describe exactly the two values of the applicant_type
  // select sitting in the form below, and previously did nothing at all —
  // styled as cards, hover states and everything, with no behaviour attached.
  // Choosing one now sets the select and takes the reader to the form.
  const selectTrack = (key) => {
    setForm((f) => ({ ...f, applicant_type: key }));
    const target = formRef.current;
    if (!target) return;
    // Through Lenis, so the movement matches the rest of the page rather than
    // the two fighting over the scroll position.
    if (lenis) lenis.scrollTo(target, { offset: -NAV_HEIGHT - 24 });
    else target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const shown = (field) => (touched[field] ? errors[field] : undefined);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(SCHEMA[name], value) ?? undefined }));
    }
  };

  const onBlur = (e) => {
    const { name, value } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(SCHEMA[name], value) ?? undefined }));
  };

  // Checked here as well as on the server so a 6MB PDF fails instantly instead
  // of after a long upload on a slow connection.
  const acceptFile = (file) => {
    if (!file) return;
    const problem = validateResume(file);
    setResumeError(problem);
    setResume(problem ? null : file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    acceptFile(e.dataTransfer.files?.[0]);
  };

  const clearResume = () => {
    setResume(null);
    setResumeError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validateForm(SCHEMA, form);

    if (Object.keys(found).length || resumeError) {
      setErrors(found);
      setTouched(Object.fromEntries(Object.keys(SCHEMA).map((k) => [k, true])));
      const first = Object.keys(SCHEMA).find((k) => found[k]);
      if (first) document.querySelector(`[name="${first}"]`)?.focus();
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => data.append(k, v));
      if (resume) data.append("resume", resume);
      await axios.post(`${API}/careers`, data);
      setSent(true);
      setForm(initial);
      setErrors({});
      setTouched({});
      clearResume();
    } catch (err) {
      const msg = err?.response?.data?.detail || "Unable to submit application. Please try again.";
      toast.error(typeof msg === "string" ? msg : "Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Reveal asChild>
      <section id="careers" data-testid="careers-section" className="relative bg-white">
        {/* Editorial image banner */}
        <div className="relative h-[56dvh] min-h-[440px] w-full overflow-hidden">
          {/* The alt text said "Inside the chambers". This is a stock
              photograph of an unrelated office and unrelated people, so that
              caption told a screen-reader user — and any reader inspecting the
              page — that they were looking at these premises and this team.
              The newsroom's own data module sets the rule the rest of the site
              follows: alt text describes the photograph, never implies it
              records the firm. */}
          <FadeImage src={CAREERS_BG} srcSet={CAREERS_SRCSET} sizes="100vw" priority alt="A meeting in progress in a naturally lit office" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
          <div className="relative h-full shell flex flex-col justify-end pb-14">
            <div className="eyebrow" data-tone="dark">
              <span className="eyebrow-label">Careers</span>
            </div>
            {/* Was `md:text-6xl lg:text-[68px]`, which made the careers page
                the loudest headline on the site — four points larger than the
                home hero it sits beneath in the hierarchy — and skipped the
                48px rung every other page steps through at `md`. */}
            <h1 className="font-serif text-white text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-tight max-w-4xl">
              No ordinary career.
            </h1>
            <p className="mt-5 text-white/85 text-lg max-w-2xl leading-relaxed">
              Build a practice at the intersection of rigorous advocacy and considered counsel.
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="shell section-y">
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
            {tracks.map(({ key, Icon, title, body }) => {
              const active = form.applicant_type === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => selectTrack(key)}
                  aria-pressed={active}
                  data-testid={`careers-track-${key}`}
                  /* Same latent defect as the practice and expertise cards.
                     These two happen to hold equal content today, so nothing is
                     visibly misaligned — but the moment one track's copy runs a
                     line longer the icons would drift apart. */
                  className={`group flex flex-col border bg-white p-8 text-left transition-[border-color,box-shadow] duration-300 hover:elevate-card ${
                    active ? "border-brown elevate-card" : "border-border hover:border-brown"
                  }`}
                >
                  <Icon size={28} strokeWidth={1.3} className="text-brown mb-6" />
                  <h2 className="font-serif text-2xl text-ink mb-3">{title}</h2>
                  <p className="text-ink-soft text-sm md:text-base leading-relaxed">{body}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-brown text-xs font-semibold uppercase tracking-widest-plus">
                    {active ? "Selected — apply below" : "Apply for this"}
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </button>
              );
            })}
          </div>

          <div ref={formRef} className="grid lg:grid-cols-12 gap-10 lg:gap-16 scroll-mt-nav">
            <div className="lg:col-span-4">
              <div className="eyebrow">
              <span className="eyebrow-label">Apply</span>
            </div>
              <h2 className="font-serif text-3xl md:text-4xl text-ink leading-tight">Submit your application</h2>
              <p className="mt-5 text-ink-soft leading-relaxed">
                Share your details and a short note on why you would like to join the chambers. Attach your
                résumé or CV, and we will be in touch if there is a fit.
              </p>
            </div>

            <AnimatePresence mode="wait" initial={false}>
            {sent ? (
              <motion.div
                key="sent"
                data-testid="careers-success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 160, damping: 22 }}
                className="lg:col-span-8 bg-white border border-border p-8 md:p-12"
              >
                <motion.span
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.12, type: "spring", stiffness: 300, damping: 18 }}
                  className="confirm-badge"
                >
                  <Check size={22} strokeWidth={1.8} />
                </motion.span>
                <h3 className="font-serif text-2xl md:text-3xl text-ink mt-6">Your application has been received.</h3>
                <p className="mt-4 text-ink-soft leading-relaxed max-w-lg">
                  Applications are reviewed as they arrive. We will be in touch if there is a fit.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-8 inline-flex items-center gap-3 text-brown text-xs uppercase tracking-widest-plus border-b border-brown/40 pb-1 hover:border-brown transition-colors duration-300"
                >
                  Submit another application
                  <ArrowRight size={14} />
                </button>
              </motion.div>
            ) : (
            <motion.form
              key="form"
              data-testid="careers-form"
              onSubmit={onSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="lg:col-span-8 bg-white border border-border p-8 md:p-12">
              <p className="text-xs text-ink-soft mb-8">Fields marked * are required.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Field label="Full Name *" error={shown("name")} htmlId="careers-name">
                  <input data-testid="careers-name" name="name" required aria-required="true" value={form.name} onChange={onChange} onBlur={onBlur}
                    aria-invalid={!!shown("name")} className="input-line" />
                </Field>
                <Field label="Email *" error={shown("email")} htmlId="careers-email">
                  <input data-testid="careers-email" name="email" required aria-required="true" type="email" value={form.email} onChange={onChange} onBlur={onBlur}
                    aria-invalid={!!shown("email")} className="input-line" />
                </Field>
                <Field label="Phone" error={shown("phone")} htmlId="careers-phone">
                  <input data-testid="careers-phone" name="phone" value={form.phone} onChange={onChange} onBlur={onBlur}
                    aria-invalid={!!shown("phone")} className="input-line" />
                </Field>
                <Field label="Applying For *">
                  <select data-testid="careers-type" name="applicant_type" required aria-required="true" value={form.applicant_type} onChange={onChange} className="input-line bg-transparent">
                    <option value="recruitment">Recruitment</option>
                    <option value="internship">Internship</option>
                  </select>
                </Field>
                <div className="md:col-span-2">
                  <Field label="Position / Area of Interest" error={shown("position")} htmlId="careers-position">
                    <input data-testid="careers-position" name="position" value={form.position} onChange={onChange} onBlur={onBlur}
                      aria-invalid={!!shown("position")} className="input-line" placeholder="e.g. Associate — Civil Litigation" />
                  </Field>
                </div>
                <div className="md:col-span-2">
                  <Field label="Message *" error={shown("message")} htmlId="careers-message">
                    <textarea data-testid="careers-message" name="message" rows={5} required aria-required="true" value={form.message} onChange={onChange} onBlur={onBlur}
                      aria-invalid={!!shown("message")} className="input-line resize-none" />
                  </Field>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="careers-resume" className="text-[10px] uppercase tracking-widest-plus text-ink-soft">
                    Resume / CV (PDF or Word, max 5MB)
                  </label>

                  {/* Drop target. The real control is the <input> below: it is
                      `sr-only` rather than `hidden`, because display:none would
                      drop it out of the tab order and the accessibility tree and
                      leave attaching a CV mouse-only. Dragging and clicking the
                      zone are additions on top of it, and `focus-within` gives
                      the zone a visible ring when the input takes focus. */}
                  <div
                    data-testid="careers-dropzone"
                    data-dragging={dragging}
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={onDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative mt-2 flex items-center gap-3 border border-dashed px-5 py-4 cursor-pointer transition-colors duration-200 focus-within:border-brown focus-within:ring-2 focus-within:ring-brown/30 ${
                      resumeError
                        ? "border-red-400 bg-red-50/40"
                        : dragging
                          ? "border-brown bg-brown-soft"
                          : "border-border hover:border-brown"
                    }`}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {resume ? (
                        <motion.div
                          key="file"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.18 }}
                          className="flex w-full items-center gap-3"
                        >
                          <FileText size={18} strokeWidth={1.4} className="text-brown flex-shrink-0" />
                          <span className="text-sm text-ink truncate">{resume.name}</span>
                          <span className="text-xs text-ink-soft flex-shrink-0">{formatBytes(resume.size)}</span>
                          <button
                            type="button"
                            aria-label="Remove selected file"
                            onClick={(e) => { e.stopPropagation(); clearResume(); }}
                            className="ml-auto flex-shrink-0 text-ink-soft hover:text-brown transition-colors duration-200"
                          >
                            <X size={16} />
                          </button>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="empty"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.18 }}
                          className="flex items-center gap-3"
                        >
                          <Upload size={18} strokeWidth={1.4} className="text-brown flex-shrink-0" />
                          <span className="text-sm text-ink-soft">
                            {dragging ? "Drop to attach" : "Drag a file here, or click to choose"}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <input ref={fileInputRef} id="careers-resume" data-testid="careers-resume" type="file"
                      accept=".pdf,.doc,.docx" className="sr-only"
                      aria-invalid={!!resumeError}
                      aria-describedby={resumeError ? "careers-resume-error" : undefined}
                      onChange={(e) => acceptFile(e.target.files?.[0])} />
                  </div>

                  <AnimatePresence initial={false}>
                    {resumeError && (
                      <motion.p
                        id="careers-resume-error"
                        role="alert"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22 }}
                        className="overflow-hidden text-[11px] text-red-700"
                      >
                        <span className="mt-1.5 block">{resumeError}</span>
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Stated at the point of upload, not only in the notice: a
                      CV is the most sensitive thing this site accepts, and the
                      moment someone decides whether to attach it is the moment
                      they need to know how long it will be held. */}
                  <p className="mt-3 text-[11px] text-ink-soft leading-relaxed">
                    Your application and any résumé attached are kept for {RESUME_RETENTION_MONTHS} months
                    and then deleted. You can ask for yours to be removed sooner at any time — see the{" "}
                    <Link to="/privacy" className="text-brown">Privacy Notice</Link>.
                  </p>
                </div>
              </div>

              <button type="submit" data-testid="careers-submit" disabled={loading} aria-busy={loading}
                className="mt-8 inline-flex items-center gap-3 bg-brown text-white px-10 py-4 text-xs uppercase tracking-widest-plus font-semibold hover:bg-brown-light transition-colors duration-300 pressable disabled:opacity-60 disabled:cursor-not-allowed group">
                {loading ? "Submitting" : "Submit Application"}
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
      </section>
    </Reveal>
  );
}
