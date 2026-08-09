/**
 * Client-side validation mirroring the FastAPI models in backend/server.py.
 *
 * The server stays the authority — this exists so someone filling in a
 * consultation request finds out which field is wrong while they're still
 * looking at it, rather than after a round trip that returns one flat toast.
 * If a constraint changes in server.py, change it here too.
 */

// Deliberately permissive. Rejecting unusual-but-valid addresses is worse than
// letting the server have the final say.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const RESUME_MAX_BYTES = 5 * 1024 * 1024;
export const RESUME_TYPES = {
  "application/pdf": ".pdf",
  "application/msword": ".doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
};

const rules = {
  // Consultation — server: name 2..120, email, phone 6..20, message 10..3000
  name: (v) => {
    const s = v.trim();
    if (s.length < 2) return "Please enter your full name.";
    if (s.length > 120) return "Name must be under 120 characters.";
    return null;
  },
  email: (v) => {
    const s = v.trim();
    if (!s) return "An email address is required.";
    if (!EMAIL_RE.test(s)) return "Please enter a valid email address.";
    return null;
  },
  phone: (v) => {
    const s = v.trim();
    if (s.length < 6) return "Please enter a contact number.";
    if (s.length > 20) return "Phone number must be under 20 characters.";
    return null;
  },
  message: (v) => {
    const s = v.trim();
    if (s.length < 10) return "Please describe the matter in a little more detail.";
    if (s.length > 3000) return "Please keep this under 3000 characters.";
    return null;
  },
  subject: (v) =>
    v.trim().length > 200 ? "Subject must be under 200 characters." : null,
  practice_area: (v) =>
    v.trim().length > 80 ? "Practice area must be under 80 characters." : null,
  position: (v) =>
    v.trim().length > 120 ? "Position must be under 120 characters." : null,
  // Careers allows a blank phone; the server has no minimum there.
  phoneOptional: (v) => {
    const s = v.trim();
    if (!s) return null;
    if (s.length > 20) return "Phone number must be under 20 characters.";
    return null;
  },
};

export function validateField(rule, value) {
  const fn = rules[rule];
  return fn ? fn(value ?? "") : null;
}

/** Runs a `{ fieldName: ruleName }` map and returns `{ field: message }`. */
export function validateForm(schema, values) {
  const errors = {};
  Object.entries(schema).forEach(([field, rule]) => {
    const message = validateField(rule, values[field]);
    if (message) errors[field] = message;
  });
  return errors;
}

/** Matches the resume checks in the /api/careers handler. */
export function validateResume(file) {
  if (!file) return null;
  if (!(file.type in RESUME_TYPES)) return "Resume must be a PDF or Word document.";
  if (file.size > RESUME_MAX_BYTES) return "Resume must be under 5MB.";
  return null;
}

export function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
