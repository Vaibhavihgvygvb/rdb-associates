import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ArrowRight, Mail } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Newsletter({ variant = "footer" }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/newsletter`, { email });
      toast.success("You're subscribed. Thank you for joining our newsletter.");
      setEmail("");
    } catch (err) {
      const msg = err?.response?.data?.detail || "Unable to subscribe. Please try again.";
      toast.error(typeof msg === "string" ? msg : "Subscription failed.");
    } finally {
      setLoading(false);
    }
  };

  if (variant === "footer") {
    return (
      <div data-testid="newsletter-footer">
        <div className="text-[10px] uppercase tracking-widest-plus text-brown mb-4">Newsletter</div>
        <p className="text-cream/70 text-sm mb-4 max-w-sm">
          Subscribe for firm news, legal updates and insights from the chambers.
        </p>
        <form onSubmit={onSubmit} className="flex items-stretch gap-0 max-w-sm">
          <input
            data-testid="newsletter-footer-email"
            type="email"
            required
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-transparent border border-brown/40 border-r-0 px-4 py-3 text-sm text-cream placeholder:text-cream/40 outline-none focus:border-brown transition-colors duration-300"
          />
          <button
            data-testid="newsletter-footer-submit"
            type="submit"
            disabled={loading}
            className="bg-brown text-white px-4 flex items-center justify-center hover:bg-brown-light transition-colors duration-300 disabled:opacity-60"
            aria-label="Subscribe"
          >
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
    );
  }

  return (
    <section data-testid="newsletter-page-section" className="relative py-24 md:py-32 bg-cream">
      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="h-px w-10 bg-brown" />
          <span className="text-brown text-xs uppercase tracking-widest-plus">Newsletter</span>
          <span className="h-px w-10 bg-brown" />
        </div>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.05]">
          Stay informed with <span className="italic text-brown">the chambers</span>.
        </h1>
        <p className="mt-8 text-ink/70 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
          Subscribe to receive periodic updates on firm news, notable matters, and short-form legal
          insights across our practice areas — civil, commercial, medical and cyber law. No spam,
          unsubscribe anytime.
        </p>

        <form onSubmit={onSubmit} className="mt-12 flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <div className="flex-1 flex items-center gap-3 bg-white border border-brown/30 px-5 py-4">
            <Mail size={18} strokeWidth={1.4} className="text-brown flex-shrink-0" />
            <input
              data-testid="newsletter-page-email"
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm text-ink placeholder:text-ink/40"
            />
          </div>
          <button
            data-testid="newsletter-page-submit"
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-3 bg-brown text-white px-8 py-4 text-xs uppercase tracking-widest-plus font-semibold hover:bg-brown-light transition-colors duration-300 disabled:opacity-60 group"
          >
            {loading ? "Subscribing..." : "Subscribe"}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </form>
      </div>
    </section>
  );
}
