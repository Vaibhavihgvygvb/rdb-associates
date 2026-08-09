import { Children, cloneElement, isValidElement, useId } from "react";
import { AnimatePresence, motion } from "motion/react";

/**
 * Labelled form field with an inline error that animates in beneath it.
 *
 * Shared by the consultation and careers forms, which previously each declared
 * their own bare copy.
 *
 * The control is associated explicitly (`htmlFor`/`id`) rather than by being
 * wrapped in the <label>: a wrapping label pulls *all* of its text into the
 * control's accessible name, so the hint and the error message were being
 * announced as part of the field's name ("Full Name * 0/3000 a short summary
 * is enough…"). Explicit association keeps the name to the label alone and
 * hands the hint and error to `aria-describedby`, where they belong — the
 * error also carries `role="alert"` so it announces on appearance rather than
 * only when the field is next focused.
 *
 * `htmlId` is optional; a generated id is used when a caller doesn't supply
 * one, so every field is associated whether or not it names itself.
 */
export default function Field({ label, error, htmlId, children, hint }) {
  const generatedId = useId();
  const id = htmlId ?? generatedId;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  // The hint gives way to the error rather than stacking with it.
  const showHint = Boolean(hint) && !error;

  const child = Children.only(children);
  const describedBy =
    [
      isValidElement(child) ? child.props["aria-describedby"] : null,
      error ? errorId : null,
      showHint ? hintId : null,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

  const control = isValidElement(child)
    ? cloneElement(child, { id, "aria-describedby": describedBy })
    : child;

  return (
    <div>
      <label htmlFor={id} className="text-[10px] uppercase tracking-widest-plus text-ink-soft">
        {label}
      </label>
      <div className="mt-1" data-invalid={error ? "true" : undefined}>
        {control}
      </div>

      {showHint && (
        <span id={hintId} className="mt-1.5 block text-[11px] text-ink-soft">
          {hint}
        </span>
      )}

      <AnimatePresence initial={false}>
        {error && (
          <motion.span
            id={errorId}
            role="alert"
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -4 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="block overflow-hidden text-[11px] text-red-700"
          >
            <span className="mt-1.5 block">{error}</span>
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

export { Field };
