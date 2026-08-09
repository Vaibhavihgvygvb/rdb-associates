// Values in the privacy notice that are the firm's decision rather than a
// description of what the code does.
//
// Everything else in components/site/Privacy.jsx is a factual account of the
// application's behaviour and was written against backend/server.py. These
// three are policy, and are pulled out here so they can be changed in one
// place — including by someone who does not want to read JSX to do it.
//
// The retention periods below are conservative proposals, not advice. Confirm
// them against the chambers' own record-keeping obligations before relying on
// them, and update LAST_UPDATED whenever the notice changes materially.

/** How long a career application and any attached résumé is kept. */
export const RESUME_RETENTION_MONTHS = 12;

/** How long an enquiry that did not lead to an engagement is kept. */
export const ENQUIRY_RETENTION_YEARS = 3;

/** Shown at the head of the notice. Format: "9 August 2026". */
export const LAST_UPDATED = "9 August 2026";
