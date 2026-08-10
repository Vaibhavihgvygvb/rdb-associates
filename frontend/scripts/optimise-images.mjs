/* eslint-disable no-console */
/**
 * Turns a delivered photograph into the responsive set this site serves.
 *
 * The portrait on /about was shipping as a single 317KB JPEG to every device,
 * including phones painting it about 340px wide. Fixing that by hand meant
 * three `sips` calls, three `cwebp` calls and hand-writing a srcset string —
 * which is exactly the kind of job that gets skipped the second time. This
 * does it in one command so the next photograph costs nothing to do properly.
 *
 *   node scripts/optimise-images.mjs <file...> [--widths 480,720,990] [--quality 82]
 *
 * For each input it writes `<name>-<width>.webp` into public/ and prints the
 * srcset string to paste into the component. Sources are never modified, and
 * the original stays on disk — og:image needs a JPEG, because social crawlers
 * are the one consumer that should not be handed a WebP.
 *
 * Requires `cwebp` (brew install webp) and `sips` (macOS built-in).
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const PUBLIC_DIR = path.resolve(import.meta.dirname, "..", "public");
const DEFAULT_WIDTHS = [480, 720, 990];
const DEFAULT_QUALITY = 82;

function parseArgs(argv) {
  const files = [];
  let widths = DEFAULT_WIDTHS;
  let quality = DEFAULT_QUALITY;
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === "--widths") {
      widths = argv[++i].split(",").map((n) => parseInt(n.trim(), 10)).filter(Boolean);
    } else if (argv[i] === "--quality") {
      quality = parseInt(argv[++i], 10);
    } else {
      files.push(argv[i]);
    }
  }
  return { files, widths, quality };
}

function has(bin) {
  try {
    execFileSync("which", [bin], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

const { files, widths, quality } = parseArgs(process.argv.slice(2));

if (!files.length) {
  console.log("Usage: node scripts/optimise-images.mjs <file...> [--widths 480,720,990] [--quality 82]");
  process.exit(0);
}
for (const bin of ["cwebp", "sips"]) {
  if (!has(bin)) {
    console.error(`[images] \`${bin}\` not found. cwebp: brew install webp`);
    process.exit(1);
  }
}

for (const input of files) {
  const abs = path.resolve(input);
  if (!fs.existsSync(abs)) {
    console.error(`[images] ${input} — not found, skipping.`);
    continue;
  }

  const base = path.basename(abs).replace(/\.[^.]+$/, "");
  const originalKb = Math.round(fs.statSync(abs).size / 1024);
  const written = [];

  for (const w of widths) {
    // sips resizes; cwebp encodes. PNG in between so the resize is lossless
    // and the only generation loss is the single WebP encode.
    const tmp = path.join(os.tmpdir(), `optimise-${base}-${w}.png`);
    execFileSync("sips", ["-Z", String(w), "--out", tmp, abs], { stdio: "ignore" });
    const out = path.join(PUBLIC_DIR, `${base}-${w}.webp`);
    execFileSync("cwebp", ["-q", String(quality), "-quiet", tmp, "-o", out]);
    fs.unlinkSync(tmp);
    written.push({ w, kb: Math.round(fs.statSync(out).size / 1024) });
  }

  const srcset = written.map(({ w }) => `/${base}-${w}.webp ${w}w`).join(", ");
  const savedAt = written[0];

  console.log(`\n[images] ${path.basename(abs)}  (${originalKb}KB original)`);
  written.forEach(({ w, kb }) => console.log(`           ${String(w).padStart(5)}w  ${kb}KB`));
  console.log(
    `           smallest is ${Math.round((1 - savedAt.kb / originalKb) * 100)}% lighter than the original\n`,
  );
  console.log("  srcSet={");
  console.log(`    "${srcset}"`);
  console.log("  }");
  console.log('  sizes="…"   // the CSS width of the frame, per breakpoint\n');
}
