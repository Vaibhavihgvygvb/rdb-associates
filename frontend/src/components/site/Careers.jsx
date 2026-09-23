import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useLenis } from "lenis/react";
import { toast } from "sonner";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Upload, Briefcase, GraduationCap, X, FileText } from "lucide-react";
import { Reveal } from "@/components/motion";
import Field from "@/components/site/Field";
import { FieldGroup, ErrorSummary, FormSuccess, SubmitButton } from "@/components/site/FormParts";
import useFormState from "@/lib/useFormState";
import { validateResume, formatBytes } from "@/lib/validate";
import { NAV_HEIGHT } from "@/lib/layout";
import { RESUME_RETENTION_MONTHS } from "@/data/privacy";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const tracks = [
  {
    key: "recruitment",
    Icon: Briefcase,
    title: "Recruitment",
    body: "Openings for qualified advocates and associates to join the chambers across litigation and advisory practice.",
    eligibility: "For advocates enrolled with a State Bar Council.",
  },
  {
    key: "internship",
    Icon: GraduationCap,
    title: "Internship",
    body: "Structured internships for law students seeking hands-on exposure to courtroom advocacy, drafting and research.",
    eligibility: "For students currently reading for a law degree.",
  },
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

// Field -> the name the error summary calls it by.
const LABELS = {
  name: "Full Name",
  email: "Email",
  phone: "Phone",
  position: "Position / Area of Interest",
  message: "Message",
};

export default function Careers() {
  const [resume, setResume] = useState(null);
  const [resumeError, setResumeError] = useState(null);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);
  const formRef = useRef(null);
  const lenis = useLenis();

  const {
    values: form, setValues: setForm, loading, sent, setSent,
    shown, onChange, onBlur, submit, problems, focusField,
  } = useFormState(initial, SCHEMA, { blockSubmit: Boolean(resumeError) });

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

  const onSubmit = submit(async (payload) => {
    const data = new FormData();
    Object.entries(payload).forEach(([k, v]) => data.append(k, v));
    if (resume) data.append("resume", resume);
    try {
      await axios.post(`${API}/careers`, data);
      clearResume();
    } catch (err) {
      const msg = err?.response?.data?.detail || "Unable to submit. Please try again.";
      toast.error(typeof msg === "string" ? msg : "Submission failed.");
      throw err;
    }
  });

  return (
    <Reveal asChild>
      <section id="careers" data-testid="careers-section" className="relative bg-white">
        {/* Hero.
            Typographic rather than photographic. What stood here was a stock
            photograph of an unrelated office and unrelated people — the code
            comment removed with it said as much, and had already been forced to
            write alt text disowning the image ("A meeting in progress in a
            naturally lit office"). A careers page for a chambers that opens on
            a picture of strangers it has no connection to reads as borrowed,
            which is the opposite of the impression this page exists to make.
            It also removes the page's only Unsplash request — a third party the
            Privacy Notice has to disclose precisely because it sees the
            reader's IP address.

            The dark ground is `sage-deep`, the surface the footer and the other
            accent blocks already use, so the page opens in the site's own
            register instead of a one-off. */}
        <div className="relative bg-sage-deep text-white overflow-hidden">
          {/* A single hairline grid, drawn from the border token at low opacity
              — the same device the site uses to delineate everything else,
              rather than a gradient or a texture. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
              backgroundSize: "88px 88px",
            }}
          />
          <div className="relative shell pt-28 pb-20 md:pt-36 md:pb-28">
            <div className="eyebrow" data-tone="dark">
              <span className="eyebrow-label">Careers</span>
            </div>
            <h1 className="font-serif text-white text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-tight max-w-4xl">
              No ordinary career.
            </h1>
            <p className="mt-6 text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed">
              Build a practice at the intersection of rigorous advocacy and considered counsel.
            </p>

            {/* Three standing facts, each already stated elsewhere on this page
                or evidenced in the data — not new claims. `brown-on-dark` is
                the emerald tuned for dark grounds; the DEFAULT fails AA here. */}
            <dl className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/10 border border-white/10">
              {[
                { k: "Reviewed by", v: "Ramandeep Bawa, personally" },
                { k: "You will work on", v: "Live matters, from day one" },
                { k: "Open to", v: "Advocates and law students" },
              ].map(({ k, v }) => (
                <div key={k} className="bg-sage-deep px-6 py-6">
                  <dt className="text-[10px] uppercase tracking-widest-plus text-brown-on-dark font-semibold">{k}</dt>
                  <dd className="mt-2 text-white/90 leading-snug">{v}</dd>
                </div>
              ))}
            </dl>
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

          <div className="mb-20">
            <div className="eyebrow">
              <span className="eyebrow-label">Two ways in</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-ink leading-tight mb-10">
              Choose the track that fits.
            </h2>

            {/* One hairline grid rather than two detached cards: `gap-px` over a
                border-coloured ground is how the rest of the site joins related
                panels (the team profile's practice grid does the same), and it
                keeps the two tracks reading as one choice. */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
              {tracks.map(({ key, Icon, title, body, eligibility }, i) => {
                const active = form.applicant_type === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => selectTrack(key)}
                    aria-pressed={active}
                    data-testid={`careers-track-${key}`}
                    className={`group relative flex flex-col p-8 md:p-10 text-left transition-colors duration-300 ${
                      active ? "bg-brown-soft" : "bg-white hover:bg-cream-dark"
                    }`}
                  >
                    {/* The selected track is marked by a solid rule along its
                        top edge — a border the layout already reserves space
                        for, so selecting one shifts nothing. */}
                    <span
                      aria-hidden
                      className={`absolute inset-x-0 top-0 h-0.5 transition-colors duration-300 ${
                        active ? "bg-brown" : "bg-transparent"
                      }`}
                    />
                    <div className="flex items-center justify-between">
                      <Icon size={26} strokeWidth={1.3} className="text-brown" />
                      <span className="font-serif text-2xl text-ink-soft/30 tabular-nums">0{i + 1}</span>
                    </div>
                    <h3 className="font-serif text-2xl text-ink mt-6 mb-3">{title}</h3>
                    <p className="text-ink-soft text-sm md:text-base leading-relaxed">{body}</p>
                    <p className="mt-4 text-[13px] text-ink-soft leading-relaxed border-t border-border pt-4">
                      {eligibility}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-brown text-xs font-semibold uppercase tracking-widest-plus">
                      {active ? "Selected — apply below" : "Apply for this"}
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </span>
                  </button>
                );
              })}
            </div>
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
              <FormSuccess
                className="lg:col-span-8"
                testId="careers-success"
                title="Your application has been received."
                body="Applications are reviewed as they arrive. We will be in touch if there is a fit."
                actionLabel="Submit another application"
                onReset={() => setSent(false)}
              />
            ) : (
            <motion.form
              key="form"
              data-testid="careers-form"
              onSubmit={onSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="lg:col-span-8 bg-white border border-border p-8 md:p-12">
              <ErrorSummary problems={problems} labels={LABELS} onFocus={focusField} />

              <div className="space-y-10">
                <FieldGroup title="Your details" note="* required">
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
                  <Field label="Position / Area of Interest" error={shown("position")} htmlId="careers-position">
                    <input data-testid="careers-position" name="position" value={form.position} onChange={onChange} onBlur={onBlur}
                      aria-invalid={!!shown("position")} className="input-line" placeholder="e.g. Associate — Civil Litigation" />
                  </Field>
                </FieldGroup>

                <FieldGroup title="Your application">
                  {/* Native radios rather than the previous <select>. The two
                      options are the same two the track cards above offer, so a
                      dropdown hid a choice the page had already made visible —
                      and the cards set this value, which a closed select gave
                      no feedback about. Radios keep arrow-key behaviour and the
                      grouping semantics for free. */}
                  <div className="md:col-span-2">
                    <span className="text-[10px] uppercase tracking-widest-plus text-ink-soft">Applying For *</span>
                    <div role="radiogroup" aria-label="Applying for" className="mt-3 flex flex-wrap gap-3">
                      {tracks.map(({ key, Icon, title }) => {
                        const active = form.applicant_type === key;
                        return (
                          <label
                            key={key}
                            data-testid={`careers-type-${key}`}
                            className={`inline-flex cursor-pointer items-center gap-2.5 border px-5 py-3 text-sm transition-colors duration-200 focus-within:ring-2 focus-within:ring-brown/30 ${
                              active ? "border-brown bg-brown-soft text-ink" : "border-border text-ink-soft hover:border-brown"
                            }`}
                          >
                            <input
                              type="radio"
                              name="applicant_type"
                              value={key}
                              checked={active}
                              onChange={onChange}
                              className="sr-only"
                            />
                            <Icon size={16} strokeWidth={1.5} className={active ? "text-brown" : "text-ink-soft"} />
                            {title}
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <Field
                      label="Message *"
                      error={shown("message")}
                      htmlId="careers-message"
                      hint={`${form.message.trim().length}/3000 · a short note on why you would like to join`}
                    >
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
                </FieldGroup>
              </div>

              <div className="mt-10">
                <SubmitButton testId="careers-submit" loading={loading} idle="Submit Application" pending="Submitting" />
              </div>
            </motion.form>
            )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
