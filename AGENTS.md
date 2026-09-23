# Agent guide — creating a resume with this project

This repo turns **a JSON file into a themed, ATS-friendly resume (HTML / PDF)**. The resume is *data*; themes only decide how it looks. If a user asks you to "make me a resume", your job is almost always: **write valid resume JSON → pick a theme → preview → export a PDF**.

```
JSON → Schema (Zod) → Renderer → Theme → HTML / PDF
```

## Quick workflow

1. **Collect the content.** Ask for (or extract from a pasted CV/LinkedIn/GitHub): name, headline, contact, summary, work history (company, title, dates, achievements), projects, education, skills, certifications. Don't invent facts, metrics or dates — ask when unsure.
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
6. **Export the PDF** — either click **Download PDF** in the app (choose A4/Letter and margins first), or headlessly:
   ```bash
   google-chrome --headless=new --no-pdf-header-footer --virtual-time-budget=5000 \
     --print-to-pdf=resume.pdf "http://localhost:5173/?theme=<id>"
   ```
   The headless route uses A4 with normal margins. The PDF has real, selectable text (good for ATS). Open it, check page breaks, and iterate.

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

Fonts: `&font=<id>` overrides the theme font; ids are in `apps/web/src/fonts.ts` (fonts load from Google Fonts, so they need internet access when previewing/printing).

## Project map

| Path | What it is |
| --- | --- |
| `packages/schema` | Zod schema (source of truth), types, `validateResume`, JSON Schema + validate scripts |
| `packages/ui` | Theme contract (`Theme`, `DesignTokens`), default section components, base CSS |
| `packages/renderer` | `<ResumeRenderer data theme />` |
| `packages/themes` | All themes (`<id>.tsx` tokens/components) + `styles.css` (per-theme CSS) + `index.ts` registry |
| `packages/pdf` | Print hook, paper sizes, margins |
| `apps/web` | Editor app (Vite + React + Tailwind v4) |
| `examples/sonu.json` | Reference resume (must always validate) |
| `data/` | Git-ignored — put real personal resumes here |
| `screenshots/` | One PNG per theme (used in the README gallery) |

## Commands

```bash
npm run dev                 # editor app (RESUME_FILE=… to load your resume)
npm run build               # production build
npm run typecheck           # tsc across the monorepo — run before finishing code changes
npm run validate -- <file>  # validate a resume JSON file
npm run schema:generate     # regenerate resume.schema.json after editing the Zod schema
```

## Changing the project itself

- **Schema change:** edit `packages/schema/src/index.ts` (add `.describe()` to every field), then `npm run schema:generate`, update the table above and the README, and keep `examples/sonu.json` valid. Never hand-edit `resume.schema.json`.
- **New theme:** copy a similar `packages/themes/src/<id>.tsx` (tokens + optional `sidebar`, `sidebarPosition`, `headerInSidebar`, `previewHint`), add per-theme CSS scoped under `.theme-<id>` in `styles.css`, register it in `packages/themes/src/index.ts`, then check it renders (screenshot the `.resume-page` element) and add `screenshots/<id>.png` + a README gallery entry. Themes must never read resume data directly — only typed props via the component contract — and must not change how data is validated.
- **Verify:** `npm run typecheck`, `npm run build`, and validate any JSON you touched.
- Never commit anything from `data/`, and don't put HTML/JSX/styles inside the resume JSON.
