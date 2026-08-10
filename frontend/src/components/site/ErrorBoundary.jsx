import { Component } from "react";
import { ArrowRight } from "lucide-react";
import { EMAIL } from "@/data/chambers";

/**
 * Catches render errors beneath it and shows a recoverable page instead of the
 * blank white screen React leaves when a subtree throws.
 *
 * The case this exists for is mundane and near-certain over the life of a
 * deployed site: every route below the landing page is a lazily-imported
 * chunk, and a visitor who has the page open across a redeploy is holding
 * hashed chunk URLs that no longer exist. Their next navigation rejects the
 * dynamic import, the Suspense boundary re-throws it, and without this the
 * whole app unmounts to nothing. Reloading fetches the new manifest, which is
 * why that is the primary action offered.
 *
 * A class is required — `componentDidCatch` has no hook equivalent.
 */
export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // Left as console output deliberately: there is no error-reporting service
    // wired up here, and swallowing it silently would make the failure
    // invisible in the one place a developer would look.
    console.error("Unhandled render error:", error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <main className="min-h-screen bg-cream text-ink flex items-center">
        <div className="max-w-2xl mx-auto px-6 md:px-12 py-24">
          <div className="eyebrow">
              <span className="eyebrow-label">Something went wrong</span>
            </div>
          <h1 className="font-serif text-4xl md:text-5xl leading-[1.05]">
            This page didn&rsquo;t load.
          </h1>
          <p className="mt-8 text-ink-soft text-base md:text-lg leading-relaxed">
            The site may have been updated since you opened it. Reloading should put things right.
            If it doesn&rsquo;t, the chambers can be reached directly at{" "}
            <a href={`mailto:${EMAIL}`} className="text-brown">{EMAIL}</a>.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-3 bg-brown text-white px-8 py-4 text-xs uppercase tracking-widest-plus font-semibold hover:bg-brown-light transition-colors duration-300 pressable"
            >
              Reload the page
              <ArrowRight size={16} />
            </button>
            {/* A full navigation, not a router link: the router is inside the
                subtree that just failed. */}
            <a href="/" className="text-brown text-xs uppercase tracking-widest-plus">
              Return home
            </a>
          </div>
        </div>
      </main>
    );
  }
}

export { ErrorBoundary };
