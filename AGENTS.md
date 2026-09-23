# Agent guide — creating a resume with this project

This repo turns **a JSON file into a themed, ATS-friendly resume (HTML / PDF)**. The resume is *data*; themes only decide how it looks. If a user asks you to "make me a resume", your job is almost always: **write valid resume JSON → pick a theme → preview → export a PDF**.

```
JSON → Schema (Zod) → Renderer → Theme → HTML / PDF
```

## Quick workflow

1. **Collect the content** (start with `data/inputs/`). Ask for (or extract from a pasted CV/LinkedIn/GitHub): name, headline, contact, summary, work history (company, title, dates, achievements), projects, education, skills, certifications. Don't invent facts, metrics or dates — ask when unsure.
2. **Write the JSON** to `data/<name>.json`. The `data/` folder is git-ignored, so personal data never gets committed. Start the file with `"$schema": "../resume.schema.json"` for editor autocompletion. `examples/sonu.json` is a complete reference.
3. **Validate** (fast, no browser needed):
   ```bash
   npm run validate -- data/<name>.json
   ```
   Fix every reported path (e.g. `experience.0.startDate — Required`) until it prints `✓ … is a valid resume`.
4. **Preview** with the app pointed at your file:
   ```bash
   npm install                                   # first time only
   RESUME_FILE=data/<name>.json npm run dev      # fish: env RESUME_FILE=data/<name>.json npm run dev
   ```
   Open the printed URL. Edit JSON on the left, the resume updates live. **Save** (Ctrl/⌘+S in the editor) writes back to `RESUME_FILE`. Without `RESUME_FILE` the app loads `examples/sonu.json`.
5. **Pick a theme**: use the right-hand sidebar (arrow keys / `[` `]` switch live), or the URL: `http://localhost:5173/?theme=<id>` (optional `&font=<font-id>` and `&bg=<hex>`).
6. **Export the PDF** — the project renders PDFs itself with a headless Chrome it controls (fixed paper size, no headers/footers, page background printed, tagged PDF with bookmarks), so output never depends on browser print-dialog settings:
   ```bash
   npm run pdf -- data/<name>.json --theme <id> [--paper a4|letter] [--margin none|narrow|normal|wide] [--font <id>] [--bg <hex>] [--out me.pdf]
   ```
   Defaults: A4, normal margins, output next to the JSON file (`data/<name>.pdf`). The **Download PDF** button in the app uses the same renderer; if no Chrome/Chromium is installed (set `CHROME_PATH=/path/to/chrome` if it isn't on `PATH`) it falls back to the browser print dialog. Open the PDF, check page breaks, and iterate.

## Tailoring to a job description (JD)

When the user gives you a JD (paste, or a file such as `data/inputs/jd-*.txt`), **never edit their master resume** — write a copy (`data/me.<company>.json`) and render that.

1. Extract from the JD: must-have skills, nice-to-haves, recurring themes — in the JD's **exact wording**.
2. Gap analysis: JD requirement → where the resume already shows it, or "missing". **Ask the user** about each gap; only add what they confirm they've actually done. Never fabricate skills, metrics, titles or dates.
3. Apply, using only true facts:
   - `summary`: lead with what this role needs.
   - `skills`: JD must-haves first; rename groups to the JD's terms; include both forms when useful (`Kubernetes (K8s)`, `CI/CD`).
   - `experience[].highlights`: reorder so the most relevant come first and reuse the JD's vocabulary (same facts). Keywords work best *in context* inside bullets.
   - `experience[].keywords` / `projects[].keywords`: technologies the user really used there.
   - `meta.sectionOrder` / `meta.hiddenSections`: surface or hide sections; keep to one page unless 8+ years.
4. `npm run validate -- <copy>`, then `npm run pdf -- <copy> --theme <single-column theme> --out data/<company>-resume.pdf`.
5. Report what changed and which JD keywords the user still doesn't cover.

Don't keyword-stuff or hide text. Use a single-column theme for ATS submissions.

## Getting the user's material

Look in `data/inputs/` first (old CV, LinkedIn text, notes, JDs). If it's empty, ask the user to paste or drop files there. Extract only what's written; ask about missing dates/metrics rather than guessing. See [`docs/using-ai.md`](docs/using-ai.md) for the user-facing version of these workflows and the prompts they may paste. Chat-only users (no file access) follow that document's "Path B".

## Resume JSON cheat sheet

Only `basics.name` is required; every other section is optional. Unknown keys are rejected by the JSON Schema. The full contract is in [`resume.schema.json`](resume.schema.json) (generated from `packages/schema/src/index.ts`).

| Section | Shape (★ = required inside the item) |
| --- | --- |
| `basics` | `name`★, `label` (headline), `email`, `phone`, `url`, `location`, `profiles[]` → `{network★, url★, username}` |
| `summary` | string, 2–4 sentences |
| `experience[]` | `company`★, `position`★, `startDate`★, `endDate` (omit = "Present"), `location`, `url`, `summary`, `highlights[]`, `keywords[]` |
| `projects[]` | `name`★, `description`, `url`, `startDate`, `endDate`, `highlights[]`, `keywords[]` |
| `education[]` | `institution`★, `studyType`, `area`, `startDate`, `endDate`, `score`, `location`, `url`, `highlights[]` |
| `skills[]` | `{ name★: "Group", keywords★: ["a", "b"] }` |
| `certifications[]` | `name`★, `issuer`, `date`, `url` |
| `achievements[]` / `awards[]` | `title`★, `date`, `summary` (awards also `awarder`) |
| `publications[]` | `name`★, `publisher`, `releaseDate`, `url`, `summary` |
| `openSource[]` | `name`★, `role`, `url`, `description`, `highlights[]` |
| `languages[]` | `language`★, `fluency` |
| `interests[]` | array of strings |
| `meta` | `sectionOrder[]`, `hiddenSections[]` — reorder or hide sections without deleting data |

Rules that trip people up:

- **Dates** are strings: `"2024-11"` or `"2024"`. Nothing else (no `"Nov 2024"`, no `"Present"` — just leave `endDate` out).
- **URLs** must be absolute (`https://…`); `email` must be a valid address.
- `highlights[]` supports inline `**bold**`. Use it sparingly for the 1–2 most important numbers per role.
- Put consecutive roles at the same company as separate `experience` items with the same `company` string.
- Section keys for `meta`: `summary, experience, skills, projects, education, certifications, achievements, awards, publications, openSource, languages, interests`.

### Writing good content

- Reverse-chronological. 3–5 bullets per role, most recent roles get the most space.
- Bullets start with a strong verb and end with an outcome: *"Cut deploy time from 40 → 8 min by …"*. Quantify only with numbers the user gave you.
- Skills: 4–7 groups, most relevant first, no self-ratings.
- One page for < 8 years of experience, two pages otherwise. If it overflows, trim bullets before shrinking fonts or margins.

## Choosing a theme

| Need | Theme ids |
| --- | --- |
| Safest for ATS / conservative employers (single column) | `google`, `anthropic`, `openai`, `netflix`, `meta`, `xai` |
| Two-column (skills/education in a sidebar) | `atlas`, `ocean`, `slate`, `nordic`, `indigo`, `coral`, `parchment` |
| Graphical / creative | `banner`, `timeline`, `sunset`, `aurora`, `cards`, `bauhaus`, `brutalist`, `blueprint` |
| Dark backgrounds | `midnight`, `terminal`, `dracula`, `obsidian`, `synthwave`, `forest`, `eclipse` (2-col), `twilight` (2-col), `blueprint` |

Guidance: recruiters/ATS → single-column. Design/creative roles → graphical. Dark themes look great on screen and print fine (the background is printed), but many people prefer a light theme for paper. Two-column sidebars don't repeat on page 2, so keep two-column resumes to one page when possible.

Pagination: long entries may split across pages (each bullet stays whole and a job's header always travels with its first lines); short sections like education stay together. Don't fight it with padding hacks.

Fonts: `&font=<id>` overrides the theme font; ids are in `apps/web/src/fonts.ts` (fonts load from Google Fonts, so they need internet access when previewing/printing).

## Project map

| Path | What it is |
| --- | --- |
| `packages/schema` | Zod schema (source of truth), types, `validateResume`, JSON Schema + validate scripts |
| `packages/ui` | Theme contract (`Theme`, `DesignTokens`), default section components, base CSS |
| `packages/renderer` | `<ResumeRenderer data theme />` |
| `packages/themes` | All themes (`<id>.tsx` tokens/components) + `styles.css` (per-theme CSS) + `index.ts` registry |
| `packages/pdf` | Paper sizes/margins, the headless-Chrome PDF renderer (`src/render.mjs`) and the `npm run pdf` CLI, plus the browser-print fallback hook |
| `apps/web` | Editor app (Vite + React + Tailwind v4) |
| `examples/sonu.json` | Reference resume (must always validate) |
| `data/` | Git-ignored — put real personal resumes here |
| `screenshots/` | One full-page PNG per theme, `thumbs/` 400×500 crops for the README gallery, and `hero.png` |

## Commands

```bash
npm run dev                 # editor app (RESUME_FILE=… to load your resume)
npm run build               # production build
npm run typecheck           # tsc across the monorepo — run before finishing code changes
npm run validate -- <file>  # validate a resume JSON file
npm run pdf -- <file> --theme <id>  # render a resume JSON straight to PDF (needs Chrome/Chromium)
npm run schema:generate     # regenerate resume.schema.json after editing the Zod schema
```

## Changing the project itself

- **Schema change:** edit `packages/schema/src/index.ts` (add `.describe()` to every field), then `npm run schema:generate`, update the table above and the README, and keep `examples/sonu.json` valid. Never hand-edit `resume.schema.json`.
- **New theme:** copy a similar `packages/themes/src/<id>.tsx` (tokens + optional `sidebar`, `sidebarPosition`, `headerInSidebar`, `previewHint`), add per-theme CSS scoped under `.theme-<id>` in `styles.css`, register it in `packages/themes/src/index.ts`, then check it renders (screenshot the `.resume-page` element) and add `screenshots/<id>.png` plus a gallery thumbnail (`magick screenshots/<id>.png -crop 1190x1488+0+0 +repage -resize 400x500 -colors 160 screenshots/thumbs/<id>.png`) and an entry in the README gallery (`### Single column / Two column / Graphical / Dark`). Themes must never read resume data directly — only typed props via the component contract — and must not change how data is validated.
- **Verify:** `npm run typecheck`, `npm run build`, and validate any JSON you touched.
- Never commit anything from `data/`, and don't put HTML/JSX/styles inside the resume JSON.
