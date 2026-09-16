import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Linkedin, Mail, MapPin, Scale } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { FadeImage } from "@/components/motion";
import { initials } from "@/data/team";
import { itemsByCounsel, categoryLabel, formatDate } from "@/data/newsroom";
import { CHAMBERS_ADDRESS, EMAIL } from "@/data/chambers";

/**
 * One advocate's profile, at /team/<slug>.
 *
 * Laid out on the same 8/4 grid as a newsroom article — body left, standing
 * facts in the rail — because a reader arriving here wants the same two
 * things in the same two places: the account, and the verifiable particulars.
 *
 * Every section below renders only when its data exists. A member listed on
 * the day they join, with nothing but a name and a role, gets a page that
 * reads as deliberately short rather than one full of empty headings.
 */

function Section({ title, children }) {
  return (
    <section className="mt-12 first:mt-0">
      <h2 className="text-[10px] uppercase tracking-widest-plus text-brown font-semibold">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

/** The rail's fact blocks — label above, values below, hairline between. */
function Facts({ title, items }) {
  if (!items?.length) return null;
  return (
    <div className="border-t border-border pt-5 mt-5 first:border-t-0 first:pt-0 first:mt-0">
      <div className="text-[10px] uppercase tracking-widest-plus text-ink-soft">{title}</div>
      <ul className="mt-3 space-y-1.5">
        {items.map((v) => (
          <li key={v} className="text-[13px] text-ink leading-relaxed">{v}</li>
        ))}
      </ul>
    </div>
  );
}

export default function TeamMember({ member: m }) {
  const hasEnrolment = Boolean(m.enrolment?.council);
  // Matters are never listed on the member record — they come from wherever
  // the newsroom already credits this advocate by name.
  const matters = itemsByCounsel(m.name);

  return (
    <Reveal asChild inViewMargin="0px">
      <article data-testid="team-member" className="bg-white text-ink">
        <div className="shell pt-14 pb-8">
          {/* Back to the grid this page was opened from, not to /about's top. */}
          <Link
            to="/about#team"
            data-testid="team-member-back"
            className="print-hide inline-flex items-center gap-2 text-ink-soft text-[12px] uppercase tracking-widest-plus hover:text-brown transition-colors"
          >
            <ArrowLeft size={14} /> The Team
          </Link>
        </div>

        {/* Header — portrait beside name, role and enrolment. */}
        <div className="shell">
          <div className="grid md:grid-cols-12 bg-cream-dark border border-border">
            <div className="md:col-span-4 lg:col-span-3 relative min-h-[300px] md:min-h-[360px]">
              {m.image ? (
                <FadeImage
                  src={m.image.src}
                  srcSet={m.image.srcSet}
                  sizes="(min-width: 1024px) 320px, (min-width: 768px) 34vw, 100vw"
                  alt={`${m.name}, ${m.role}`}
                  priority
                  className="absolute inset-0 w-full h-full object-cover grayscale-[10%]"
                  style={m.image.objectPosition ? { objectPosition: m.image.objectPosition } : undefined}
                />
              ) : (
                /* Decorative: the name is set beside it, so a screen reader
                   reading the monogram would only repeat what follows. */
                <div aria-hidden className="absolute inset-0 flex items-center justify-center bg-brown-soft">
                  <span className="font-serif text-[clamp(4rem,9vw,7rem)] leading-none text-brown/85 tracking-tight">{initials(m.name)}</span>
                </div>
              )}
            </div>

            <div className="md:col-span-8 lg:col-span-9 p-8 md:p-12 flex flex-col justify-center">
              <div className="text-[11px] uppercase tracking-widest-plus text-brown font-semibold">{m.role}</div>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.06] mt-3">{m.name}</h1>

              {m.tagline && (
                <p className="mt-4 font-serif italic text-lg md:text-xl text-ink-soft max-w-xl leading-snug">
                  {m.tagline}
                </p>
              )}

              {hasEnrolment && (
                <div className="mt-4 flex items-start gap-2.5 text-ink-soft text-sm">
                  <Scale size={16} strokeWidth={1.5} className="text-brown mt-0.5 flex-shrink-0" />
                  <span>
                    Enrolled with the {m.enrolment.council}
                    {m.enrolment.year ? ` in ${m.enrolment.year}` : ""}
                    {m.enrolment.number ? ` · ${m.enrolment.number}` : ""}
                  </span>
                </div>
              )}

              {m.linkedin && (
                <div className="mt-6">
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-ink-soft hover:text-brown transition-colors duration-200"
                  >
                    <Linkedin size={17} strokeWidth={1.6} /> <span className="text-sm">LinkedIn</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-14 pb-20">
          {/* Body */}
          <div className="lg:col-span-8">
            {m.bio?.length > 0 && (
              <Section title="Profile">
                <div className="space-y-6">
                  {m.bio.map((para, i) => (
                    <p key={i} className="text-ink-soft text-[16px] leading-[1.8]">{para}</p>
                  ))}
                </div>
              </Section>
            )}

            {m.practices?.length > 0 && (
              <Section title="Areas of Practice">
                {/* Linked, not inert tags: /practice-areas is a real page and
                    a reader who clicks a practice on a profile is asking to
                    see it. */}
                <ul className="flex flex-wrap gap-2.5">
                  {m.practices.map((p) => (
                    <li key={p}>
                      <Link
                        to="/practice-areas"
                        className="block border border-border bg-cream px-4 py-2 text-[13px] text-ink hover:border-brown hover:text-brown transition-colors duration-200"
                      >
                        {p}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {m.education?.length > 0 && (
              <Section title="Education">
                <ul className="divide-y divide-border border-t border-b border-border">
                  {m.education.map((e) => (
                    <li key={e.qualification} className="py-4 flex flex-wrap items-baseline gap-x-3">
                      <span className="font-serif text-lg text-ink">{e.qualification}</span>
                      <span className="text-ink-soft text-sm">{e.institution}</span>
                      {e.year && (
                        <span className="text-ink-soft text-[12px] tracking-wider ml-auto tabular-nums">{e.year}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {m.experience?.previous?.length > 0 && (
              <Section title="Professional experience">
                <ul className="divide-y divide-border border-t border-b border-border">
                  {m.experience.previous.map((e) => (
                    <li key={e.firm} className="py-4 flex flex-wrap items-baseline gap-x-3">
                      <span className="text-ink">{e.firm}</span>
                      {e.period && (
                        <span className="text-ink-soft text-[12px] tracking-wider ml-auto tabular-nums">{e.period}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {matters.length > 0 && (
              <Section title="Matters &amp; mentions">
                <ul className="divide-y divide-border border-t border-b border-border">
                  {matters.map((i) => (
                    <li key={i.slug}>
                      <Link to={`/newsroom/${i.slug}`} className="group block py-5">
                        <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-widest-plus">
                          <span className="text-brown font-semibold">{categoryLabel(i.category)}</span>
                          <span className="h-px w-5 bg-border" />
                          <span className="text-ink-soft tabular-nums">{formatDate(i.date)}</span>
                        </div>
                        <div className="mt-2 font-serif text-lg text-ink leading-snug group-hover:text-brown transition-colors duration-200">
                          {i.title}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {m.recognition?.length > 0 && (
              <Section title="Recognition">
                <ul className="space-y-2.5">
                  {m.recognition.map((r) => (
                    <li key={r} className="text-ink-soft text-[15px] leading-relaxed">{r}</li>
                  ))}
                </ul>
              </Section>
            )}

            {m.publications?.length > 0 && (
              <Section title="Publications">
                <ul className="divide-y divide-border border-t border-b border-border">
                  {m.publications.map((x) => (
                    <li key={x.title} className="py-4">
                      <div className="text-ink">{x.title}</div>
                      <div className="text-ink-soft text-[13px] mt-1">
                        {x.where}{x.year ? ` · ${x.year}` : ""}
                      </div>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {m.speaking?.length > 0 && (
              <Section title="Speaking &amp; teaching">
                <ul className="divide-y divide-border border-t border-b border-border">
                  {m.speaking.map((x) => (
                    <li key={x.title} className="py-4">
                      <div className="text-ink">{x.title}</div>
                      <div className="text-ink-soft text-[13px] mt-1">
                        {x.where}{x.year ? ` · ${x.year}` : ""}
                      </div>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {m.related?.length > 0 && (
              <Section title="More on this advocate">
                <ul className="space-y-3">
                  {m.related.map((r) => (
                    <li key={r.to}>
                      <Link
                        to={r.to}
                        className="group inline-flex items-center gap-2 text-brown text-[13px] font-semibold uppercase tracking-[0.08em]"
                      >
                        {r.label}
                        <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {/* Same standing note the newsroom carries, for the same reason:
                a profile naming forums and practice areas is exactly the page
                a reader might mistake for a solicitation. */}
            <p className="mt-14 text-[11px] text-ink-soft leading-relaxed border border-border p-5">
              <span className="text-brown uppercase tracking-widest-plus">Note · </span>
              Published for information only. In accordance with the Bar Council of India Rules, nothing
              on this page is an advertisement or a solicitation of work, and reading it does not create
              an advocate&ndash;client relationship.
            </p>
          </div>

          {/* Rail */}
          <aside className="lg:col-span-4">
            <div className="border border-border p-7 bg-cream">
              <div className="text-[10px] uppercase tracking-widest-plus text-brown font-semibold">
                At a glance
              </div>

              <div className="mt-6">
                <Facts title="With the chambers" items={m.since ? [`Since ${m.since}`] : []} />
                <Facts title="Forums" items={m.forums} />
                <Facts title="Memberships" items={m.memberships} />
                <Facts title="Languages" items={m.languages} />
              </div>
            </div>

            {/* Contact is the chambers', not a personal line — every enquiry is
                reviewed centrally, which is what /contact already tells people. */}
            <div className="border border-border border-t-0 p-7 bg-white">
              <div className="text-[10px] uppercase tracking-widest-plus text-brown font-semibold">
                Get in touch
              </div>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-start gap-3 text-ink-soft">
                  <Mail size={16} strokeWidth={1.4} className="text-brown mt-0.5 flex-shrink-0" />
                  <a href={`mailto:${EMAIL}`} className="hover:text-brown transition-colors">{EMAIL}</a>
                </li>
                <li className="flex items-start gap-3 text-ink-soft">
                  <MapPin size={16} strokeWidth={1.4} className="text-brown mt-0.5 flex-shrink-0" />
                  <span>{CHAMBERS_ADDRESS}</span>
                </li>
              </ul>
              <Link
                to="/contact"
                className="mt-6 flex w-full items-center justify-center gap-2.5 bg-brown text-white px-5 py-3.5 text-[11px] uppercase tracking-widest-plus font-semibold hover:bg-brown-light transition-colors duration-300 pressable"
              >
                Request a consultation
                <ArrowRight size={14} className="flex-shrink-0" />
              </Link>
            </div>
          </aside>
        </div>
      </article>
    </Reveal>
  );
}

export { TeamMember };
