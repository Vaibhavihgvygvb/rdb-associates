import { Link } from "react-router-dom";
import Reveal from "@/components/motion/Reveal";
import { CHAMBERS_ADDRESS, EMAIL } from "@/data/chambers";
import { RESUME_RETENTION_MONTHS, ENQUIRY_RETENTION_YEARS, LAST_UPDATED } from "@/data/privacy";

/**
 * Website privacy notice.
 *
 * Every factual claim here was written against the code rather than from a
 * template: the field lists match the Pydantic models in backend/server.py,
 * the résumé handling matches the /api/careers handler, and the "no cookies,
 * no analytics" statement was verified by grepping the frontend for
 * document.cookie, localStorage, sessionStorage and the usual analytics
 * globals — there are none.
 *
 * Three things need the firm's own decision rather than mine, and are
 * collected in data/privacy.js so they are changed in one place:
 * the two retention periods and the last-updated date.
 */

// Rendered as the in-page contents rail and as the section headings, so the
// two cannot fall out of step.
const SECTIONS = [
  { id: "scope", title: "What this notice covers" },
  { id: "who", title: "Who is responsible" },
  { id: "collected", title: "What is collected" },
  { id: "purpose", title: "Why it is collected" },
  { id: "resumes", title: "Résumés and applications" },
  { id: "storage", title: "Where it is held" },
  { id: "third-parties", title: "Third parties" },
  { id: "cookies", title: "Cookies and analytics" },
  { id: "retention", title: "How long it is kept" },
  { id: "rights", title: "Your rights" },
  { id: "contact", title: "Contact and grievances" },
  { id: "changes", title: "Changes to this notice" },
];

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-nav pt-12 first:pt-0">
      <h2 className="font-serif text-2xl md:text-3xl text-ink leading-snug">{title}</h2>
      <div className="mt-5 space-y-5 text-ink-soft text-base leading-relaxed">{children}</div>
    </section>
  );
}

function DataList({ items }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-2.5 h-1 w-1 rounded-full bg-brown flex-shrink-0" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Privacy() {
  return (
    <Reveal asChild inViewMargin="0px">
      <section data-testid="privacy-section" className="relative bg-white">
        <header className="border-b border-border">
          <div className="shell section-y">
            <div className="eyebrow">
              <span className="eyebrow-label">Privacy</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.05] max-w-4xl">
              What this website collects, and <span className="italic text-brown">what becomes of it</span>.
            </h1>
            <p className="mt-8 text-ink-soft text-base md:text-lg leading-relaxed max-w-3xl">
              This notice describes the personal data the chambers collects through this website, why
              it is collected, where it is held, how long it is kept, and how to have it corrected or
              removed. It is written to be read, not to be survived.
            </p>
            <p className="mt-6 text-[11px] uppercase tracking-widest-plus text-ink-soft">
              Last updated · {LAST_UPDATED}
            </p>
          </div>
        </header>

        <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 section-y-sm">
          {/* Contents rail */}
          <nav aria-label="On this page" className="lg:col-span-4 lg:order-2">
            <div className="lg:sticky lg:top-[calc(theme(spacing.nav)+2rem)] border border-border p-7">
              <div className="text-[11px] uppercase tracking-widest-plus text-brown font-semibold">
                On this page
              </div>
              <ol className="mt-5 space-y-2.5">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="text-[15px] text-ink-soft">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="lg:col-span-8 lg:order-1 divide-y divide-border">
            <Section {...SECTIONS[0]}>
              <p>
                This notice covers <strong className="text-ink font-semibold">this website only</strong>.
              </p>
              <p>
                It does not govern the handling of information in a matter where the chambers has been
                formally engaged. That is governed by the terms of engagement and by an advocate&rsquo;s
                professional obligations of confidentiality, which are considerably stricter than
                anything set out here.
              </p>
              <p>
                Submitting a form on this website does not create an advocate&ndash;client relationship.
                Please do not send privileged or confidential material through it until a formal
                engagement is in place.
              </p>
            </Section>

            <Section {...SECTIONS[1]}>
              <p>
                The chambers of Ramandeep Bawa, practising as RDB Associates, decides why and how the
                data described below is handled.
              </p>
              <p className="text-ink">{CHAMBERS_ADDRESS}</p>
              <p>
                <a href={`mailto:${EMAIL}`} className="text-brown">{EMAIL}</a>
              </p>
            </Section>

            <Section {...SECTIONS[2]}>
              <p>
                The website has three forms. Nothing is collected from you other than what you type
                into one of them and choose to send. There is no account to create, no password, and
                no payment detail is ever requested.
              </p>

              <div>
                <h3 className="text-[11px] uppercase tracking-widest-plus text-brown font-semibold mb-3">
                  Consultation enquiry
                </h3>
                <DataList
                  items={[
                    "Your full name, email address and telephone number.",
                    "The practice area and subject, if you select or enter them.",
                    "The description of the matter that you write.",
                    "The date and time the enquiry was received.",
                  ]}
                />
              </div>

              <div>
                <h3 className="text-[11px] uppercase tracking-widest-plus text-brown font-semibold mb-3">
                  Newsletter
                </h3>
                <DataList items={["Your email address, and the date you subscribed. Nothing else."]} />
              </div>

              <div>
                <h3 className="text-[11px] uppercase tracking-widest-plus text-brown font-semibold mb-3">
                  Career application
                </h3>
                <DataList
                  items={[
                    "Your full name and email address, and your telephone number if you give one.",
                    "Whether you are applying for recruitment or an internship, and the position or area of interest, if entered.",
                    "The covering message you write.",
                    "Your résumé or CV, if you attach one.",
                  ]}
                />
              </div>
            </Section>

            <Section {...SECTIONS[3]}>
              <p>
                Enquiry details are used to read and respond to your enquiry, to carry out the conflict
                check an advocate must perform before taking a matter on, and to keep a record of what
                was asked and when.
              </p>
              <p>
                Application details are used to assess your application and to contact you about it.
              </p>
              <p>
                A newsletter address is used to send the newsletter, and for nothing else. It is not
                added to any other list.
              </p>
              <p className="text-ink">
                Your details are never sold, rented, or shared with anyone for their own marketing.
              </p>
            </Section>

            <Section {...SECTIONS[4]}>
              <p>
                If you attach a résumé it is accepted only as a PDF or Word document, and only up to
                5&nbsp;MB. The file is stored on the server that runs this website, under a generated
                identifier; your original filename is kept alongside it so the document can be
                recognised.
              </p>
              <p className="text-ink">
                Résumés and the applications they belong to are kept for{" "}
                {RESUME_RETENTION_MONTHS} months from the date they are received, and are then
                deleted. If you would like yours removed before then, write to{" "}
                <a href={`mailto:${EMAIL}`} className="text-brown">{EMAIL}</a> and it will be deleted.
              </p>
              <p>
                Please do not include information in a résumé that you would not want held for that
                period.
              </p>
            </Section>

            <Section {...SECTIONS[5]}>
              <p>
                Form submissions are held in a managed PostgreSQL database. Résumé files are held on
                the application server&rsquo;s own storage rather than in the database.
              </p>
              {/* Reflects the DATABASE_URL currently configured for production
                  (a managed instance in the United States). If the database is
                  moved — for example to an Indian region — this paragraph has
                  to move with it. */}
              <p>
                The database is at present hosted outside India, on managed infrastructure located in
                the United States. This means the data described above is stored on servers outside
                the country. Access is restricted to the chambers.
              </p>
            </Section>

            <Section {...SECTIONS[6]}>
              <p>
                Two third parties receive a request from your browser simply because this website
                loads assets from them. Neither receives anything you type into a form.
              </p>
              <DataList
                items={[
                  "Google Fonts — the typefaces used across the site are fetched from Google's servers, which makes your IP address visible to Google as a consequence of loading the page.",
                  "Unsplash — a number of the photographs on the site are served from Unsplash, with the same consequence.",
                ]}
              />
              <p>
                The chambers&rsquo; LinkedIn profile is linked from the footer. Nothing is sent to
                LinkedIn unless you follow that link yourself.
              </p>
            </Section>

            <Section {...SECTIONS[7]}>
              <p className="text-ink">
                This website sets no cookies. It runs no analytics, no advertising or tracking pixels,
                and nothing that follows you between sites. It stores nothing in your browser.
              </p>
              <p>
                There is accordingly no cookie banner, because there is nothing to consent to. The
                server keeps ordinary technical logs of requests, as any web server does, for security
                and diagnosis.
              </p>
            </Section>

            <Section {...SECTIONS[8]}>
              <DataList
                items={[
                  `Consultation enquiries that do not lead to an engagement: kept for ${ENQUIRY_RETENTION_YEARS} years, so that conflict checks remain reliable, and then deleted. Where a matter is taken on, the record becomes part of the file and is governed by the terms of engagement.`,
                  `Career applications and any résumé attached: ${RESUME_RETENTION_MONTHS} months, then deleted.`,
                  "Newsletter subscriptions: until you unsubscribe or ask to be removed, at which point the address is deleted.",
                ]}
              />
            </Section>

            <Section {...SECTIONS[9]}>
              <p>
                Under the Digital Personal Data Protection Act, 2023, you may ask the chambers to:
              </p>
              <DataList
                items={[
                  "confirm what personal data of yours is held, and obtain a summary of it;",
                  "correct anything inaccurate, complete anything incomplete, or update anything that has changed;",
                  "erase what is held, where it is no longer needed for the purpose it was given for and no legal or professional obligation requires it to be kept;",
                  "withdraw a consent you have given — a newsletter subscription, for instance — as easily as you gave it;",
                  "nominate another person to exercise these rights on your behalf in the event of death or incapacity.",
                ]}
              />
              <p>
                There is no charge for any of this. You will be asked to confirm your identity before a
                request is acted on, so that one person cannot obtain or delete another&rsquo;s data.
              </p>
            </Section>

            <Section {...SECTIONS[10]}>
              <p>
                Write to <a href={`mailto:${EMAIL}`} className="text-brown">{EMAIL}</a> with
                &ldquo;Privacy&rdquo; in the subject line, and the chambers will respond.
              </p>
              <p>
                If a grievance is not resolved to your satisfaction, you may complain to the Data
                Protection Board of India.
              </p>
              <p>
                General enquiries are better sent through the{" "}
                <Link to="/contact" className="text-brown">contact page</Link>.
              </p>
            </Section>

            <Section {...SECTIONS[11]}>
              <p>
                If this notice changes, the revised version will be published here and the date at the
                top will be updated. Material changes will be described rather than made silently.
              </p>
            </Section>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
