# Photography brief

Every photograph on this site is currently a stock library image. The one
exception is the portrait of Ramandeep Bawa. Replacing the rest is the single
highest-value change left — more than any further work on the interface.

This is the brief a photographer needs: what to shoot, what shape each frame
has to be, and how to hand the files over.

---

## Why it matters

The site's entire proposition is *this* advocate, in *these* chambers, before
*this* court. It is currently illustrated by a library in Dublin, an office of
strangers, and eighteen unrelated photographs. A reader who recognises any one
of them — and stock images from these collections are widely recognised —
discounts everything around it.

The grading in `NewsroomImage` does real work to make mixed sources cohere, and
it will do the same for real photographs. It is compensation, not a solution.

---

## Shot list

Aspect ratios below are what the layouts actually crop to. Shoot wider than the
listed ratio and leave headroom — the frames re-crop across breakpoints.

### 1 · Hero — `src/components/site/Hero.jsx`
- **Where:** right half of the landing page, full height. The most important
  image on the site and its Largest Contentful Paint element.
- **Shape:** portrait-ish on desktop (roughly 1:1.2 visible), full-width band on
  mobile. Shoot **portrait orientation**, minimum 1920px on the long edge.
- **Subject:** the Delhi High Court exterior, or the chambers' own reading room
  or shelves. It must survive being cropped to a tall narrow column.
- **Note:** the subject should sit in the centre third horizontally — the outer
  thirds are cropped away above 1024px.

### 2 · Portrait — `PORTRAIT` in `src/data/chambers.js`
- **Where:** `/about` (520–620px tall column) and `/team` (near-square frame,
  cropped `object-top`).
- **Shape:** **portrait, 4:5**, minimum 1200px wide. Already replaced once;
  this is the one real photograph on the site.
- **Note:** the `/team` frame crops close to square from the top, so leave
  space above the head. A centred crop cuts the hairline.

### 3 · Careers banner — `src/components/site/Careers.jsx`
- **Where:** full-bleed band, 56dvh tall, with a dark gradient over the lower
  half and white text on it.
- **Shape:** **landscape, 16:9 or wider**, minimum 1920px.
- **Subject:** the chambers as a workplace — a desk mid-matter, juniors
  working, the library in use. It currently claims to be "inside the chambers"
  and is not.
- **Note:** keep the lower third visually quiet. The headline sits there.

### 4 · Newsroom — `image` on each entry in `src/data/newsroom.js`
- **Where:** card thumbnails (16:10), the spotlight (16:10 → tall on desktop),
  and the article header (16:9 / 21:9).
- **Shape:** **landscape, 16:9**, minimum 1600px, one per entry.
- **Subject:** court exteriors, chambers interiors, documents, the city. Never
  anything implying a specific client or a specific hearing.
- **Note:** the data module already supports real files —
  `image: { src: "/newsroom/some-photo.jpg", alt: "…" }` overrides the library
  id and receives the same grading. No component change is needed.

---

## Alt text

The rule the site already follows, from `src/data/newsroom.js`:

> alt text describes the photograph only. These are images setting a tone, not
> records of a hearing, and nothing in the alt text should imply otherwise.

"Inside the chambers" on a stock office was a breach of that and has been
corrected. Apply the same standard to real photographs — describe what is in
the frame, not what you would like the reader to infer.

---

## Handover

Drop full-resolution originals anywhere and run:

```bash
cd frontend
node scripts/optimise-images.mjs path/to/photo.jpg
```

It writes `public/<name>-<width>.webp` at 480/720/990 and prints the `srcSet`
string to paste into the component. Override widths for the wide frames:

```bash
node scripts/optimise-images.mjs path/to/hero.jpg --widths 640,960,1400,1920
```

Keep one JPEG or PNG of the portrait in `public/` regardless — `og:image`
points at it, and social crawlers should not be handed a WebP.

Requires `cwebp` (`brew install webp`); `sips` ships with macOS.
