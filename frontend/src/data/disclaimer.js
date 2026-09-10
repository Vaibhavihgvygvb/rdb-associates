// The Bar Council of India notice shown before the site is first read.
//
// Rule 36 of the BCI Rules bars an advocate from soliciting work or
// advertising, and the accepted reading of it for a website is that the
// visitor must reach the material of their own accord. That is what the gate
// in components/site/Disclaimer.jsx records: an affirmation, not a cookie
// banner, which is why it blocks rather than dismisses.
//
// The wording lives here for the same reason the privacy notice's periods do
// — it is the firm's decision rather than a description of what the code does,
// and it should be changeable without reading JSX. It is the standard form of
// the notice adapted to this practice, not advice: have the chambers confirm
// it before publishing, and move LAST_REVIEWED when they do.

/** Shown as the dialog's heading. */
export const DISCLAIMER_TITLE = "Disclaimer";

/** The affirmation itself, in reading order. */
export const DISCLAIMER_PARAGRAPHS = [
  "As per the rules of the Bar Council of India, an advocate may not solicit work or advertise. By proceeding further, you acknowledge that you wish to know more about RDB Associates of your own accord, and that there has been no advertisement, personal communication, solicitation, invitation or inducement of any sort whatsoever from the firm or any of its members to solicit any work through this website.",
  "The information provided on this website is made available solely at your request and is for your general understanding. It does not constitute legal advice, and the firm accepts no liability for any consequence of any action taken by relying on the material published here.",
  "Your access to and use of this website does not create an advocate–client relationship between you and RDB Associates. Where you require legal assistance on a matter, please consult an advocate directly.",
];

/** Shown after a visitor declines, in place of the affirmation. */
export const DISCLAIMER_DECLINED = [
  "Thank you for visiting. Because the acknowledgement above has not been given, the rest of this website cannot be shown to you.",
  "If you reached this page in error, or would prefer to speak to the chambers directly, you are welcome to write to us — nothing on this page is a solicitation of work.",
];

export const AGREE_LABEL = "I Agree";
export const DECLINE_LABEL = "I Decline";

/**
 * Where the affirmation is remembered.
 *
 * `sessionStorage`, not `localStorage`, and deliberately: the notice records
 * that this visit was made of the reader's own accord, so it is asked once per
 * visit rather than remembered indefinitely on the device. Bumping the version
 * suffix re-asks everyone, which is what a material change to the wording
 * above should do.
 */
export const DISCLAIMER_STORAGE_KEY = "rdb.disclaimer.accepted.v1";

/** Move this when the wording changes materially. Format: "9 August 2026". */
export const LAST_REVIEWED = "5 September 2026";
