// Writing from the chambers.
//
// Both the /insights page and the header's Insights panel render this list.
// Nav used to restate the three titles inline with a comment noting that they
// mirrored the ones in Insights.jsx, which is exactly the drift the search
// index already avoids by importing its taxonomy rather than repeating it.
//
// `date: null` marks a piece as announced but not yet published — see
// `isPublished` below and the placeholder state in components/site/Insights.jsx.
export const POSTS = [
  {
    tag: "ADR",
    date: null,
    title: "When Mediation Wins: Building a Settlement Architecture",
    excerpt:
      "A practical framework for choosing between litigation and structured dispute resolution in commercial matters.",
  },
  {
    tag: "Cyber Law",
    date: null,
    title: "Digital Evidence in Indian Courts: What Practitioners Miss",
    excerpt:
      "Notes on Section 65B, chain of custody and admissibility of electronic records under the Bharatiya Sakshya Adhiniyam.",
  },
  {
    tag: "Medical Law",
    date: null,
    title: "Informed Consent Beyond the Paperwork",
    excerpt:
      "Why the doctrine has moved on — and what treating hospitals should be documenting today.",
  },
];

/** The topics the writing is organised under, shown in the header panel. */
export const TOPICS = [
  "Alternative Dispute Resolution",
  "Cyber Law",
  "Medical Law & Ethics",
  "Commercial Litigation",
  "Trial Advocacy",
];

export const isPublished = (post) => Boolean(post.date);

export const publishedPosts = () => POSTS.filter(isPublished);
