// Newsroom content store.
//
// Structure mirrors a large-firm newsroom (labelled item type, three filter axes,
// counsel credited per item, related-capability cross-links) but the content model
// is built for Bar Council of India Rule 36: no client is named, no fee or claim
// value is stated, and nothing here solicits work. Matter notes describe the forum
// and the nature of the question decided — the same standard already used on /work.
//
// Replace the illustrative entries below with chambers records as they accrue.
//
// `image` holds an Unsplash photo id and its alt text. Every image is graded into
// the site palette by <NewsroomImage>, so photographs from different sources still
// read as one set — see components/site/NewsroomImage.jsx. The alt text describes
// the photograph only: these are library images setting a tone, not records of a
// hearing, and nothing in the alt text should imply otherwise. To use a chambers
// photograph instead, set `image: { src: "/path.jpg", alt: "..." }` — `src` wins
// over `id` and the same grading is applied.

export const CATEGORIES = [
  { id: "matter-note", label: "Matter Note", blurb: "Outcomes and orders, described generally and without identifying any client." },
  { id: "chambers-news", label: "Chambers News", blurb: "Additions to the chambers, designations, empanelments and administrative notices." },
  { id: "recognition", label: "Recognition", blurb: "Appointments, bar body roles, panel memberships and honours." },
  { id: "publication", label: "Publication", blurb: "Journal articles, commentaries and contributed chapters." },
  { id: "speaking", label: "Speaking", blurb: "Lectures, panels, moot judging and continuing legal education." },
  { id: "pro-bono", label: "Pro Bono & Legal Aid", blurb: "Legal aid, clinics and unpaid representation." },
];

export const PRACTICES = [
  "Civil Litigation",
  "Commercial Litigation",
  "Trial Advocacy",
  "Alternative Dispute Resolution",
  "Medical Law & Ethics",
  "Cyber Law",
  "Tribunals & Regulatory",
  "Advisory & Drafting",
];

export const FORUMS = [
  "Supreme Court of India",
  "High Court of Delhi",
  "District Courts, Delhi",
  "Debt Recovery Tribunal",
  "Consumer Commissions",
  "Arbitral Tribunals",
  "Chambers",
];

const PRINCIPAL = { name: "Ramandeep Bawa", role: "Principal Counsel" };
// Placeholder team entries — replace with named counsel as the chambers grows.
const ASSOCIATE = { name: "Associate Counsel", role: "Litigation" };
const JUNIOR = { name: "Junior Counsel", role: "Drafting & Research" };

export const ITEMS = [
  {
    slug: "delhi-high-court-interim-injunction-asset-alienation",
    image: { id: "photo-1436450412740-6b988f486c6b", alt: "The columned portico of a neoclassical building" },
    category: "matter-note",
    title: "Chambers secures interim injunction restraining alienation of disputed assets",
    date: "2026-07-09",
    forum: "High Court of Delhi",
    practices: ["Commercial Litigation", "Trial Advocacy"],
    summary:
      "An interim order restraining transfer of the assets in dispute was obtained pending trial in a commercial suit involving recovery and specific performance.",
    body: [
      "The chambers appeared for the plaintiff in a commercial suit before the High Court of Delhi concerning recovery and specific performance of a written agreement. The defendant was alleged to have taken steps to transfer the assets that formed the subject matter of the suit while proceedings were pending.",
      "An application under Order XXXIX Rules 1 and 2 of the Code of Civil Procedure, 1908 was pressed at the first effective hearing. The chambers argued that a prima facie case existed on the face of the documents, that the balance of convenience lay with preserving the subject matter, and that any transfer would render the eventual decree unenforceable.",
      "The Court granted an interim injunction restraining alienation, encumbrance or creation of third-party rights in the disputed assets until further orders, and directed the defendant to file an affidavit disclosing the present status of the assets. The suit remains pending on the trial board.",
    ],
    counsel: [PRINCIPAL, ASSOCIATE],
    quote: {
      text: "Interim relief in a commercial suit is won on the documents you put before the Court in the first fifteen minutes, not on the arguments you save for trial.",
      by: "Ramandeep Bawa",
      role: "Principal Counsel",
    },
    featured: true,
  },
  {
    slug: "district-court-partition-decree-upheld-appeal",
    image: { id: "photo-1560518883-ce09059eeffa", alt: "A model house beside a set of keys" },
    category: "matter-note",
    title: "Partition decree upheld in first appeal on findings of title and possession",
    date: "2026-06-24",
    forum: "District Courts, Delhi",
    practices: ["Civil Litigation", "Trial Advocacy"],
    summary:
      "A trial court decree in a property partition matter was successfully defended in appellate proceedings, with the findings on title and possession left undisturbed.",
    body: [
      "The chambers defended a decree passed in a suit for partition of immovable property, in first appeal before the District Judge. The appellants challenged the trial court's findings on title, the sufficiency of the pleadings, and the appreciation of oral evidence led at trial.",
      "The response focused on the standard of interference in a first appeal: that concurrent documentary evidence supported the finding on title, that the appellants had failed to plead ouster at any stage, and that no perversity had been demonstrated in the trial court's reading of the testimony.",
      "The appeal was dismissed and the decree confirmed. The Court recorded that the trial court's findings on title and possession were supported by the record and required no interference.",
    ],
    counsel: [PRINCIPAL, JUNIOR],
    quote: null,
    featured: false,
  },
  {
    slug: "consumer-commission-medical-negligence-negotiated-resolution",
    image: { id: "photo-1450101499163-c8848c66ca85", alt: "A hand signing a document" },
    category: "matter-note",
    title: "Professional negligence complaint against a healthcare institution resolved before final adjudication",
    date: "2026-06-02",
    forum: "Consumer Commissions",
    practices: ["Medical Law & Ethics", "Alternative Dispute Resolution"],
    summary:
      "A private healthcare provider was advised through a medical negligence complaint, which concluded by negotiated settlement recorded by the Commission.",
    body: [
      "The chambers advised a private healthcare institution facing a complaint of professional negligence before a Consumer Disputes Redressal Commission. The advisory work covered the treatment record, the adequacy of the consent documentation on file, and the standard of care applicable to the procedure in question.",
      "Written statements were drafted with expert material annexed on the accepted standard of care. In parallel, the chambers assessed the matter for settlement and advised the institution on the range within which a negotiated resolution would be preferable to a contested finding.",
      "The parties arrived at a negotiated resolution, which was recorded by the Commission and the complaint disposed of accordingly. No finding of negligence was returned.",
    ],
    counsel: [PRINCIPAL],
    quote: {
      text: "In medico-legal matters the consent record decides more cases than the clinical record. Institutions should be auditing what they document, not only what they do.",
      by: "Ramandeep Bawa",
      role: "Principal Counsel",
    },
    featured: false,
  },
  {
    slug: "drt-sarfaesi-secured-debt-recovery-enforcement",
    image: { id: "photo-1554224155-6726b3ff858f", alt: "Printed forms, a calculator and a pen on a desk" },
    category: "matter-note",
    title: "Chambers acts in secured-debt recovery proceedings coordinated under the SARFAESI framework",
    date: "2026-05-18",
    forum: "Debt Recovery Tribunal",
    practices: ["Commercial Litigation", "Tribunals & Regulatory"],
    summary:
      "Representation in a recovery proceeding before the Debt Recovery Tribunal, alongside enforcement steps under the SARFAESI Act, 2002.",
    body: [
      "The chambers appeared in a secured-debt recovery matter before the Debt Recovery Tribunal, with parallel enforcement measures under the Securitisation and Reconstruction of Financial Assets and Enforcement of Security Interest Act, 2002.",
      "The work involved sequencing the tribunal proceedings against the measures available under Section 13 of the SARFAESI Act, responding to an application challenging the classification of the account, and addressing objections raised on the service of the demand notice.",
      "The Tribunal declined the challenge to the enforcement measures and permitted the recovery proceedings to continue. Enforcement steps have proceeded in coordination with the tribunal timetable.",
    ],
    counsel: [PRINCIPAL, ASSOCIATE],
    quote: null,
    featured: false,
  },
  {
    slug: "cyber-fraud-complaint-it-act-proceedings-electronic-evidence",
    image: { id: "photo-1454165804606-c3d57bc86b40", alt: "Hands working between a laptop and handwritten notes" },
    category: "matter-note",
    title: "Electronic evidence objections answered in cyber-fraud proceedings",
    date: "2026-04-27",
    forum: "District Courts, Delhi",
    practices: ["Cyber Law", "Trial Advocacy"],
    summary:
      "Certification and chain-of-custody objections to electronic records were met in proceedings arising from an online financial fraud.",
    body: [
      "The chambers acted in proceedings arising out of an online financial fraud, where the prosecution case rested substantially on electronic records — transaction logs, device data and platform correspondence.",
      "The contest turned on admissibility. Objections were raised on the certificate accompanying the electronic records and on the chain of custody between seizure and production. The chambers addressed the requirements under Section 63 of the Bharatiya Sakshya Adhiniyam, 2023 and the position on when a certificate must be furnished.",
      "The Court took the electronic records on record, holding the certification sufficient and the custody trail adequately established on the material produced. The matter continues.",
    ],
    counsel: [PRINCIPAL, JUNIOR],
    quote: null,
    featured: false,
  },
  {
    slug: "arbitration-reference-commercial-dispute-mediated-settlement",
    image: { id: "photo-1517048676732-d65bc937f952", alt: "Colleagues making notes around a meeting table" },
    category: "matter-note",
    title: "Commercial dispute referred to arbitration concludes in a recorded settlement",
    date: "2026-03-30",
    forum: "Arbitral Tribunals",
    practices: ["Alternative Dispute Resolution", "Commercial Litigation"],
    summary:
      "A contractual dispute referred under an arbitration clause was settled during the reference and recorded as a consent award.",
    body: [
      "The chambers appeared in an arbitral reference arising from a commercial contract, following invocation of the arbitration clause and appointment of a sole arbitrator.",
      "Statements of claim and defence were completed and the tribunal fixed a schedule for evidence. The chambers advised on the comparative cost and timeline of a contested award against a negotiated exit, and settlement discussions were opened between the parties during the reference.",
      "Terms were agreed and recorded by the tribunal as a consent award under Section 30 of the Arbitration and Conciliation Act, 1996, bringing the reference to a close without an evidentiary hearing.",
    ],
    counsel: [PRINCIPAL],
    quote: null,
    featured: false,
  },

  {
    slug: "chambers-adds-associate-counsel-commercial-disputes",
    image: { id: "photo-1521737604893-d14cc237f11d", alt: "A group in discussion around an office table" },
    category: "chambers-news",
    title: "Chambers adds an associate on the commercial disputes side",
    date: "2026-07-15",
    forum: "Chambers",
    practices: ["Commercial Litigation", "Advisory & Drafting"],
    summary:
      "An associate joins the chambers to work on commercial suits, recovery matters and pre-litigation advisory.",
    body: [
      "RDB Associates has added an associate to the commercial disputes side of the practice, working on commercial suits before the High Court of Delhi, recovery proceedings before tribunals, and pre-litigation drafting and advisory work.",
      "The appointment supports the chambers' commercial and contractual disputes workload and the drafting practice that runs alongside it.",
    ],
    counsel: [PRINCIPAL],
    quote: null,
    featured: false,
  },
  {
    slug: "delhi-high-court-chamber-block-office",
    image: { id: "photo-1497366754035-f200968a6e72", alt: "The quiet interior of a modern office" },
    category: "chambers-news",
    title: "Chambers operating from the Lawyers Chamber Block, Delhi High Court",
    date: "2026-02-11",
    forum: "Chambers",
    practices: ["Civil Litigation", "Trial Advocacy"],
    summary:
      "The practice operates from Chamber No. 412, Lawyers Chamber Block, Delhi High Court, New Delhi.",
    body: [
      "RDB Associates operates from Chamber No. 412, 4th Floor, Lawyers Chamber Block, Delhi High Court, Sher Shah Road, New Delhi — 110003.",
      "Consultations are by prior appointment. Correspondence may be addressed to the chambers by email, and matters are taken on after a conflict check and an initial assessment of the papers.",
    ],
    counsel: [PRINCIPAL],
    quote: null,
    featured: false,
  },

  {
    slug: "empanelment-legal-services-authority-panel-counsel",
    image: { id: "photo-1589994965851-a8f479c573a9", alt: "A figure of Justice holding her scales" },
    category: "recognition",
    title: "Empanelment as panel counsel with a legal services authority",
    date: "2026-05-06",
    forum: "Chambers",
    practices: ["Civil Litigation", "Trial Advocacy"],
    summary:
      "Empanelment permits appearance for assigned parties in legal aid matters at the district level.",
    body: [
      "Ramandeep Bawa has been empanelled as panel counsel with a legal services authority, permitting appearance on behalf of assigned parties in legal aid matters at the district level.",
      "The empanelment covers civil and criminal assignments referred by the authority, and sits alongside the chambers' existing pro bono commitments.",
    ],
    counsel: [PRINCIPAL],
    quote: null,
    featured: false,
  },
  {
    slug: "bar-association-membership-delhi-high-court",
    image: { id: "photo-1505664194779-8beaceb93744", alt: "Classical busts before the shelves of a library" },
    category: "recognition",
    title: "Membership of the Delhi High Court Bar Association",
    date: "2025-12-15",
    forum: "Chambers",
    practices: ["Civil Litigation"],
    summary:
      "Continuing membership of the Delhi High Court Bar Association and enrolment with the Bar Council of Delhi.",
    body: [
      "Ramandeep Bawa is enrolled with the Bar Council of Delhi and is a member of the Delhi High Court Bar Association.",
      "Practice before the High Court of Delhi, the District Courts of Delhi and tribunals across India is conducted under that enrolment.",
    ],
    counsel: [PRINCIPAL],
    quote: null,
    featured: false,
  },

  {
    slug: "section-63-bharatiya-sakshya-adhiniyam-electronic-records-commentary",
    image: { id: "photo-1479142506502-19b3a3b7ff33", alt: "Antique leather-bound volumes on a shelf" },
    category: "publication",
    title: "Commentary: certification of electronic records under the Bharatiya Sakshya Adhiniyam",
    date: "2026-06-18",
    forum: "Chambers",
    practices: ["Cyber Law", "Advisory & Drafting"],
    summary:
      "A note on what changed for electronic evidence when Section 65B of the Evidence Act was carried into Section 63 of the 2023 Act.",
    body: [
      "A commentary published by the chambers examines the treatment of electronic records under Section 63 of the Bharatiya Sakshya Adhiniyam, 2023, and its relationship to the jurisprudence built up around Section 65B of the Indian Evidence Act, 1872.",
      "The note covers the form and timing of the certificate, who may sign it, the position where the device is not in the party's control, and the practical consequences of the schedule introduced by the 2023 Act.",
      "It closes with a checklist for practitioners producing electronic records at trial, addressing hash values, custody documentation and the sequencing of certification against the stage of production.",
    ],
    counsel: [PRINCIPAL],
    quote: {
      text: "The 2023 Act did not undo the certification requirement — it formalised it. Practitioners who treat the certificate as an afterthought will keep losing records at the threshold.",
      by: "Ramandeep Bawa",
      role: "Principal Counsel",
    },
    featured: true,
  },
  {
    slug: "informed-consent-doctrine-note-healthcare-institutions",
    image: { id: "photo-1423592707957-3b212afa6733", alt: "Stacked books beside an open notebook and pen" },
    category: "publication",
    title: "Note: informed consent beyond the consent form",
    date: "2026-04-08",
    forum: "Chambers",
    practices: ["Medical Law & Ethics", "Advisory & Drafting"],
    summary:
      "How the informed consent doctrine has developed, and what treating institutions should be recording today.",
    body: [
      "A note prepared for healthcare clients of the chambers sets out the development of the informed consent doctrine in Indian law and the distance between a signed consent form and a defensible consent record.",
      "It addresses the disclosure of material risk, consent obtained for a procedure that changes during the course of treatment, consent in emergencies, and the position of substitute decision-makers.",
      "The note concludes with documentation guidance for institutions: what should be recorded contemporaneously, by whom, and how the record should read when it is produced years later before a Commission.",
    ],
    counsel: [PRINCIPAL],
    quote: null,
    featured: false,
  },
  {
    slug: "settlement-architecture-mediation-commercial-matters",
    image: { id: "photo-1481627834876-b7833e8f5570", alt: "Long shelves of bound volumes in a library" },
    category: "publication",
    title: "Paper: building a settlement architecture in commercial matters",
    date: "2026-01-22",
    forum: "Chambers",
    practices: ["Alternative Dispute Resolution", "Commercial Litigation"],
    summary:
      "A framework for deciding between contested litigation and structured dispute resolution, written after the Mediation Act, 2023.",
    body: [
      "This paper sets out a framework for choosing between contested litigation and structured dispute resolution in commercial matters, in light of the Mediation Act, 2023 and the pre-institution mediation requirement under the Commercial Courts Act, 2015.",
      "It treats the choice as an architectural one taken at the outset rather than a concession made late: which disputes are suited to mediation, how the clause should be drafted, how to sequence mediation against interim relief, and how a settlement should be recorded so that it is enforceable.",
      "Worked illustrations cover contractual disputes, recovery matters and partnership separations.",
    ],
    counsel: [PRINCIPAL, ASSOCIATE],
    quote: null,
    featured: false,
  },

  {
    slug: "guest-lecture-trial-advocacy-law-students",
    image: { id: "photo-1524178232363-1fb2b075b655", alt: "An audience seated for a lecture" },
    category: "speaking",
    title: "Guest lecture on trial advocacy and cross-examination technique",
    date: "2026-05-29",
    forum: "Chambers",
    practices: ["Trial Advocacy", "Civil Litigation"],
    summary:
      "A session for law students on preparing a cross-examination from the pleadings and the documentary record.",
    body: [
      "Ramandeep Bawa delivered a guest lecture on trial advocacy, covering the preparation of cross-examination from the pleadings, the use of the documentary record to control a witness, and the discipline of closing a line of questioning before it turns.",
      "The session included a demonstration exercise built on a civil recovery fact pattern, with students taking the examination-in-chief and cross on alternating sides.",
    ],
    counsel: [PRINCIPAL],
    quote: null,
    featured: false,
  },
  {
    slug: "moot-court-competition-judging-panel",
    image: { id: "photo-1541339907198-e08756dedf3f", alt: "Graduates throwing their caps at a convocation" },
    category: "speaking",
    title: "Judging panel, inter-collegiate moot court competition",
    date: "2026-03-14",
    forum: "Chambers",
    practices: ["Trial Advocacy", "Commercial Litigation"],
    summary:
      "Judging the preliminary and semi-final rounds of a moot on commercial contract and arbitration questions.",
    body: [
      "Ramandeep Bawa sat on the judging panel for the preliminary and semi-final rounds of an inter-collegiate moot court competition, on a problem concerning commercial contract performance and the scope of an arbitration clause.",
      "Feedback to participants focused on structuring oral submissions around the relief sought, and on answering the bench's question before returning to the prepared argument.",
    ],
    counsel: [PRINCIPAL],
    quote: null,
    featured: false,
  },
  {
    slug: "cle-session-medico-legal-risk-healthcare-practitioners",
    image: { id: "photo-1589829545856-d10d557cf95f", alt: "A bronze figure of Justice holding her scales" },
    category: "speaking",
    title: "Continuing legal education session on medico-legal risk",
    date: "2025-11-20",
    forum: "Chambers",
    practices: ["Medical Law & Ethics", "Tribunals & Regulatory"],
    summary:
      "A session for healthcare practitioners on documentation, consent and the conduct of a Commission proceeding.",
    body: [
      "The chambers conducted a continuing legal education session for healthcare practitioners on medico-legal risk, covering documentation standards, the consent record, and what to expect procedurally when a complaint is filed before a Consumer Disputes Redressal Commission.",
      "The session addressed the practical steps to take in the first seventy-two hours after an adverse outcome, and the errors most commonly made in the treatment record during that window.",
    ],
    counsel: [PRINCIPAL],
    quote: null,
    featured: false,
  },

  {
    slug: "legal-aid-clinic-district-court-complex",
    image: { id: "photo-1454165804606-c3d57bc86b40", alt: "Notes and a laptop during an advice session" },
    category: "pro-bono",
    title: "Legal aid clinic conducted at a district court complex",
    date: "2026-07-02",
    forum: "District Courts, Delhi",
    practices: ["Civil Litigation", "Advisory & Drafting"],
    summary:
      "Free advice on maintenance, tenancy and consumer questions for litigants attending without representation.",
    body: [
      "The chambers participated in a legal aid clinic at a district court complex, providing free advice to litigants attending without representation.",
      "Queries received concerned maintenance proceedings, tenancy and eviction, consumer complaints, and the procedure for filing and serving a plaint. Where a matter required continued representation, referrals were made to the legal services authority panel.",
    ],
    counsel: [PRINCIPAL, JUNIOR],
    quote: null,
    featured: false,
  },
  {
    slug: "pro-bono-representation-assigned-legal-aid-matters",
    image: { id: "photo-1521737604893-d14cc237f11d", alt: "Two people in conversation across a table" },
    category: "pro-bono",
    title: "Pro bono representation in assigned legal aid matters",
    date: "2026-02-26",
    forum: "District Courts, Delhi",
    practices: ["Civil Litigation", "Trial Advocacy"],
    summary:
      "Continuing unpaid representation in matters referred by the legal services authority.",
    body: [
      "The chambers continues to appear without fee in matters assigned by the legal services authority, principally in civil disputes where a party would otherwise be unrepresented at trial.",
      "Assigned matters are conducted on the same basis as instructed work — full pleadings, evidence and argument — and are staffed from within the chambers rather than briefed out.",
    ],
    counsel: [PRINCIPAL, ASSOCIATE],
    quote: {
      text: "An assigned brief is not a lesser brief. The litigant on the other side of the table has the same right to a prepared advocate as anyone who pays for one.",
      by: "Ramandeep Bawa",
      role: "Principal Counsel",
    },
    featured: false,
  },
];

// ---- helpers -------------------------------------------------------------

export const categoryLabel = (id) => CATEGORIES.find((c) => c.id === id)?.label ?? id;

export const formatDate = (iso) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export const sortedItems = () => [...ITEMS].sort((a, b) => b.date.localeCompare(a.date));

export const getItem = (slug) => ITEMS.find((i) => i.slug === slug);

export const relatedItems = (item, limit = 3) =>
  sortedItems()
    .filter((i) => i.slug !== item.slug)
    .map((i) => ({
      item: i,
      score:
        (i.category === item.category ? 2 : 0) +
        i.practices.filter((p) => item.practices.includes(p)).length,
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.item);
