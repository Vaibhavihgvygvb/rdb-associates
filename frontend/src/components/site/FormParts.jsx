import { motion } from "motion/react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

/**
 * The pieces the consultation and careers forms both draw.
 *
 * These were separate copies in Contact.jsx and Careers.jsx: the same white
 * bordered panel, the same confirmation state down to the spring on the badge,
 * and the same submit button differing only in its label. Keeping two copies is
 * how the two forms drifted apart in the first place — one grew a character
 * count and an error summary, the other didn't.
 *
 * `FieldGroup` is the one addition rather than an extraction. Both forms were a
 * flat six-field grid with a single "Fields marked * are required." line above
 * it, which reads as a wall of inputs; grouping them under a heading gives each
 * form a shape, and a <fieldset>/<legend> is what a group of related controls
 * is supposed to be, so a screen reader announces the group when entering it.
 */

/** A titled group of related controls. Renders a real fieldset/legend. */
export function FieldGroup({ title, note, children, className = "" }) {
  return (
    <fieldset className={`min-w-0 border-0 p-0 m-0 ${className}`}>
      <legend className="w-full">
        <span className="flex items-baseline gap-4 w-full">
          <span className="text-[10px] uppercase tracking-widest-plus text-brown font-semibold whitespace-nowrap">
            {title}
          </span>
          <span aria-hidden className="h-px flex-1 bg-border" />
          {note && <span className="text-[11px] text-ink-soft whitespace-nowrap">{note}</span>}
        </span>
      </legend>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">{children}</div>
    </fieldset>
  );
}

/**
 * Summary of what still needs fixing, shown after a rejected submit.
 *
 * The forms already moved focus to the first problem, which serves the person
 * who submitted from the keyboard. It does nothing for someone who submitted
 * by mouse from the bottom of a six-field form and is now looking at a button
 * that did not appear to do anything — the failing field may be off-screen.
 * `role="alert"` announces it; each entry focuses its field.
 */
export function ErrorSummary({ problems, labels, onFocus, id }) {
  if (!problems.length) return null;
  return (
    <div
      id={id}
      role="alert"
      data-testid="form-error-summary"
      className="mb-8 border border-red-300 bg-red-50/60 px-5 py-4"
    >
      <p className="text-[13px] text-red-800">
        {problems.length === 1
          ? "One field needs your attention:"
          : `${problems.length} fields need your attention:`}
      </p>
      <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
        {problems.map((name) => (
          <li key={name}>
            <button
              type="button"
              onClick={() => onFocus(name)}
              className="text-[13px] text-red-800 underline underline-offset-4 decoration-red-400 hover:decoration-red-800 transition-[text-decoration-color] duration-200"
            >
              {labels[name] ?? name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The confirmation panel that replaces the form once it has been accepted. */
export function FormSuccess({ title, body, actionLabel, onReset, testId, className = "" }) {
  return (
    <motion.div
      key="sent"
      data-testid={testId}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 160, damping: 22 }}
      /* Border only — the shadow scale is reserved for hover, which is the
         only place the rest of the site raises anything. */
      className={`bg-white border border-border p-8 md:p-12 ${className}`}
    >
      <motion.span
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.12, type: "spring", stiffness: 300, damping: 18 }}
        className="confirm-badge"
      >
        <Check size={22} strokeWidth={1.8} />
      </motion.span>
      <h3 className="font-serif text-2xl md:text-3xl text-ink mt-6">{title}</h3>
      <p className="mt-4 text-ink-soft leading-relaxed max-w-lg">{body}</p>
      <button
        type="button"
        onClick={onReset}
        className="mt-8 inline-flex items-center gap-3 text-brown text-xs uppercase tracking-widest-plus border-b border-brown/40 pb-1 hover:border-brown transition-colors duration-300"
      >
        {actionLabel}
        <ArrowRight size={14} />
      </button>
    </motion.div>
  );
}

/** Submit control, with its own pending state. */
export function SubmitButton({ loading, idle, pending, testId }) {
  return (
    <button
      type="submit"
      data-testid={testId}
      disabled={loading}
      aria-busy={loading}
      className="inline-flex items-center gap-3 bg-brown text-white px-10 py-4 text-xs uppercase tracking-widest-plus font-semibold hover:bg-brown-light transition-colors duration-300 pressable disabled:opacity-60 disabled:cursor-not-allowed group"
    >
      {loading ? pending : idle}
      {loading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
      )}
    </button>
  );
}
