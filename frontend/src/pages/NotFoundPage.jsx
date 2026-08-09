import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageShell from "@/components/site/PageShell";

// The routes worth offering someone who has landed on a URL that doesn't
// exist — the entry points, not the full sitemap, which the footer already
// carries directly below this.
const suggestions = [
  ["Practice Areas", "/practice-areas"],
  ["About the Advocate", "/about"],
  ["Newsroom", "/newsroom"],
  ["Contact", "/contact"],
];

export default function NotFoundPage() {
  return (
    <PageShell testId="not-found-page"
      title="Page not found"
      description="The page you are looking for is not on record."
    >
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-10 bg-brown" />
            <span className="text-brown text-xs uppercase tracking-widest-plus">404 · Page not found</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.05]">
            That page isn&rsquo;t <span className="italic text-brown">on record</span>.
          </h1>
          <p className="mt-8 text-ink-soft text-base md:text-lg leading-relaxed">
            The address may have changed, or the link that brought you here may be out of date.
            The pages below are the usual places to start.
          </p>

          <ul className="mt-12 border-t border-border">
            {suggestions.map(([label, to]) => (
              <li key={to} className="border-b border-border">
                <Link
                  to={to}
                  className="group flex items-center justify-between py-5 text-ink hover:text-brown transition-colors duration-200"
                >
                  <span className="font-serif text-xl md:text-2xl">{label}</span>
                  <ArrowRight size={18} className="text-brown group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
