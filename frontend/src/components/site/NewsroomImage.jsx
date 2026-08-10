import { useEffect, useRef, useState } from "react";

// Newsroom imagery.
//
// Photographs are never shown raw. Each one is desaturated, then an emerald layer
// is composited over it in `color` blend mode: the photograph keeps its own
// luminosity — its light and shade — but takes its hue from the chambers palette.
// A page of images from unrelated sources therefore reads as a single set, which
// is the whole point of the treatment.
//
// `isolate` is load-bearing. Without it the blend layer would reach past the frame
// and tint whatever sits behind the card.

const SRCSET_WIDTHS = [640, 960, 1440, 1920];

const unsplash = (id, w) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export default function NewsroomImage({
  image,
  sizes = "100vw",
  priority = false,
  className = "",
  // "full" for cards and thumbnails, "soft" where body text sits nearby and a
  // lighter grade keeps the page from going heavy.
  grade = "full",
  // Bottom-weighted scrim, for when a label or heading is set over the image.
  scrim = true,
}) {
  if (!image) return null;

  // A chambers photograph (`src`) overrides the library id, and is graded the same.
  const fixed = image.src;

  // These images used to snap to full opacity the instant each bitmap decoded.
  // Every other photograph on the site — the hero, the portrait on /about and
  // /team, the careers banner — resolves through <FadeImage>, which holds at
  // zero until the image is ready and then fades it up. The newsroom was the
  // one place that did not, and it is the most image-dense page on the site:
  // eighteen lazily-loaded frames popping in against a near-black block while
  // the reader scrolls. Same treatment as everything else now.
  //
  // `complete` is checked on mount for the same reason FadeImage checks it: a
  // cached image can finish decoding before React attaches onLoad, which would
  // otherwise strand it at opacity 0 forever. onError does the same, so a frame
  // that fails to decode is never left invisible.
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <div className={`relative isolate overflow-hidden bg-ink ${className}`}>
      <img
        ref={imgRef}
        src={fixed ?? unsplash(image.id, 1440)}
        srcSet={fixed ? undefined : SRCSET_WIDTHS.map((w) => `${unsplash(image.id, w)} ${w}w`).join(", ")}
        sizes={fixed ? undefined : sizes}
        alt={image.alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover grayscale contrast-[1.08] transition-[transform,filter,opacity] duration-700 ease-out group-hover:grayscale-[0.45] group-hover:scale-[1.04] ${
          loaded ? "opacity-100" : "opacity-0"
        } ${scrim ? "brightness-[0.82] group-hover:brightness-[0.9]" : "brightness-[0.97]"}`}
      />

      {/* Hue from the palette, luminosity from the photograph. Held well below full
          strength: at full opacity the emerald stops reading as a grade and starts
          reading as a green filter, which is the opposite of the house style.

          "Well below full" was still too strong. `mix-blend-color` replaces hue
          outright rather than tinting toward it, so over a fully desaturated
          base the old 0.46/0.34 did not read as a graded photograph — it read
          as a green one, and full-bleed on a phone that is the loudest thing on
          the page. Roughly halved. The images still resolve as one set, which
          is the whole point of the treatment, without the cast announcing
          itself before the subject does. */}
      <div
        aria-hidden
        className={`absolute inset-0 bg-brown mix-blend-color transition-opacity duration-500 group-hover:opacity-[0.20] ${
          grade === "soft" ? "opacity-[0.16]" : "opacity-[0.22]"
        }`}
      />

      {/* Depth, and a legible bed for anything set over the frame. The wash carries
          through the whole frame rather than fading out at the top: a bright stock
          photo otherwise blows its highlights to pale mint and refuses to sit
          alongside the darker images in the same grid. */}
      {scrim && (
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/28 to-ink/14" />
      )}
    </div>
  );
}
