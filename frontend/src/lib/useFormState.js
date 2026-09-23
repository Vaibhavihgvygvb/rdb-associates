import { useState } from "react";
import { validateForm, validateField } from "@/lib/validate";

/**
 * The state machinery behind the consultation and careers forms.
 *
 * Both forms had their own copy of this: the same five pieces of state, the
 * same `shown`/`onChange`/`onBlur` trio, and the same validate-then-focus-the-
 * first-problem opening to `onSubmit` — about sixty lines duplicated with only
 * the schema differing. index.css already records the same consolidation for
 * the control styling these two forms share (`.input-line`, which replaced a
 * `<style>` block in one and `.input-line-careers` in the other); this is that
 * change applied to the behaviour rather than the appearance.
 *
 * `schema` maps a field name to a rule name in lib/validate.js, so the two
 * forms keep their different rules — careers takes `phoneOptional` where the
 * consultation form takes `phone` — while sharing the mechanics around them.
 *
 * Returns `submit(handler)`: a submit handler that validates first and only
 * calls `handler(values)` when the form is clean, so a caller writes the part
 * that differs (a JSON post, or a multipart one) and nothing else.
 */
export default function useFormState(initial, schema, { blockSubmit } = {}) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  // A field is only allowed to show an error once the user has left it, so
  // nobody is told they're wrong while still typing their name.
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const shown = (field) => (touched[field] ? errors[field] : undefined);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((f) => ({ ...f, [name]: value }));
    // Clear an existing error as soon as the value becomes valid — waiting for
    // blur to forgive a corrected field feels punitive.
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(schema[name], value) ?? undefined }));
    }
  };

  const onBlur = (e) => {
    const { name, value } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(schema[name], value) ?? undefined }));
  };

  const focusField = (name) => {
    const el = document.querySelector(`[name="${name}"]`);
    if (el) el.focus();
  };

  const reset = () => {
    setValues(initial);
    setErrors({});
    setTouched({});
  };

  const submit = (handler) => async (e) => {
    e.preventDefault();
    const found = validateForm(schema, values);

    // `blockSubmit` covers a problem the schema cannot see — the careers
    // résumé, which is validated as a File rather than as a form value.
    if (Object.keys(found).length || blockSubmit) {
      setErrors(found);
      setTouched(Object.fromEntries(Object.keys(schema).map((k) => [k, true])));
      // Send them straight to the first problem rather than making them hunt.
      const first = Object.keys(schema).find((k) => found[k]);
      if (first) focusField(first);
      return;
    }

    setLoading(true);
    try {
      // A handler signals failure by throwing (or returning false). It owns
      // reporting the problem — a toast, usually — because only it knows what
      // went wrong; this just leaves the form filled in so nothing is retyped.
      const outcome = await handler(values);
      if (outcome !== false) {
        setSent(true);
        reset();
      }
    } catch {
      /* reported by the handler */
    } finally {
      setLoading(false);
    }
  };

  /** Field names currently showing an error, in the schema's own order. */
  const problems = Object.keys(schema).filter((k) => shown(k));

  return {
    values, setValues,
    errors, touched,
    loading, sent, setSent,
    shown, onChange, onBlur, submit, reset, focusField, problems,
  };
}
