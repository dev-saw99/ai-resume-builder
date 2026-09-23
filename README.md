# Resume Builder

**Resumes as code.** A developer-focused resume builder built around structured JSON, reusable React components, and theme-driven rendering — like shadcn/ui for resumes.

```
JSON → Schema → Renderer → Theme → HTML / PDF / Print
```

No drag & drop. No WYSIWYG. No backend. Your resume is data; components render it; themes style it; PDF and HTML are just output formats.

## Quick start

```bash
npm install
npm run dev
```

Open the app, edit the JSON on the left, watch the preview update instantly. Use your own resume with `RESUME_FILE=data/me.json npm run dev` (the `data/` folder is git-ignored). The header has a light/dark toggle for the app UI, and the right-hand sidebar switches themes live (arrow keys, or `[` / `]`). Pick a theme, pick a paper size, click **Download PDF**.

> **Using AI?** See [How to use](#how-to-use) and [`docs/using-ai.md`](docs/using-ai.md) (agents *and* chat AIs, feeding it your work, tailoring to a JD). Agents read [`AGENTS.md`](AGENTS.md).

## The problem this solves

If you've kept a resume in Word, Google Docs or a design template, you know the cycle: add one bullet and the layout jumps, a heading gets stranded at the bottom of a page, a table cell blows up, and you spend an hour nudging margins, font sizes and spaces to get back to one page. Want a fresh look? Rebuild the whole document in a new template and re-paste everything. Applying to ten jobs? Ten files named `resume_final_v3_REAL.docx`.

The root cause is that **content and formatting live in the same file**. Here they're separate: your resume is plain data, and themes decide how it looks.

| The usual pain | What happens here |
| --- | --- |
| Edit one line and the layout breaks or shifts | You only edit text in a JSON file. The layout is generated, so everything reflows on its own — long jobs flow across pages, headers stay with their first lines, bullets never split. |
| Fiddling with margins, font sizes, tabs and spaces to fit a page | None of that is in your data. Paper size, margins, font and background are settings in the top bar, applied on top of any theme. |
| Want a different look → rebuild the doc in a new template | Switch themes with one keystroke (29 of them: single-column, two-column, graphical, dark). Same data, no re-pasting, nothing to fix afterwards. |
| `resume_final_v3_REAL.docx`, and no idea what changed between versions | One master JSON plus a copy per job, kept in git. A diff shows exactly which words changed. |
| Tailoring for each job means duplicating and hand-editing a formatted document | Edit data only — by hand or with an AI ([guide](docs/using-ai.md)) — and re-render. The design can't be damaged because it isn't in the file. |
| Templates full of tables, text boxes and icon images that ATS parsers choke on | Semantic HTML and real, selectable text in the PDF; single-column themes for ATS submissions. |
| The PDF looks different on another machine or print dialog | PDFs come from a headless Chrome the project controls (fixed paper, margins, no headers/footers), so the output is the same everywhere. |
| Typos and inconsistent formats (dates, links, missing fields) | A schema validates the file and names the exact field to fix (`experience.0.startDate — Required`). |

The one honest limit: themes decide layout, so a very long resume still needs editing to fit the page count you want — but you fix that by cutting words, not by fighting formatting. (Two-column sidebars also don't repeat on page 2, so keep those to one page when you can.)

## How to use

Your resume is **one JSON file**. You write (or generate) it, pick a theme, and export a PDF. Three ways to get there:

| I want to… | Do this |
| --- | --- |
| **Write it myself** | `npm install && npm run dev`, edit the JSON on the left (errors show inline, `resume.schema.json` gives editor autocompletion), switch themes on the right, **Download PDF**. Start from [`examples/sonu.json`](examples/sonu.json). |
| **Let an AI agent do it** (Claude Code, Codex CLI, Gemini CLI, Cursor, …) | Put your old CV / notes / JD in `data/inputs/` and tell the agent: *"Read AGENTS.md and build my resume from data/inputs/."* It writes `data/me.json`, validates it and renders the PDF for you. |
| **Use a chat AI** (ChatGPT, Claude.ai, Gemini, …) | Paste the [ready-made prompt](docs/using-ai.md#path-b--chat-ai-chatgpt-claudeai-gemini-) plus your CV/notes → it returns the JSON → paste it into the app's editor (or save as `data/me.json` and run `npm run validate`). |

**Step by step**

1. **Install** — `npm install` (Node 22.18+ — the `validate`/`pdf` scripts run TypeScript directly; Chrome/Chromium is needed only for PDF export).
2. **Create your data** — save your resume as `data/me.json` (the `data/` folder is git-ignored, so personal data is never committed).
3. **Preview** — `RESUME_FILE=data/me.json npm run dev`, then open the printed URL. Switch themes with the right-hand sidebar (↑/↓ or `[` / `]` change the theme live; `\` collapses it), change font, paper size and margins in the top bar.
4. **Validate** — `npm run validate -- data/me.json` lists any problems by path.
5. **Export** — click **Download PDF**, or `npm run pdf -- data/me.json --theme slate` → `data/me.pdf`.

### Tailor it to a job description

Keep `data/me.json` as your master, give an AI the master + the job description, and ask it to produce a tailored copy (`data/me.acme.json`): JD keywords in `skills`, `summary` and `highlights` — **only for things you've really done** — then render one PDF per application. The full workflow, copy-paste prompts, a "where keywords go" table and ATS do's and don'ts are in **[docs/using-ai.md](docs/using-ai.md)**, which also covers what material to gather and how to hand it to an AI.

## Exporting a PDF

PDFs are rendered by the project itself, not by your browser's print dialog: a headless Chrome we control prints a dedicated chrome-free view (`/?print=1`) with a fixed paper size, no headers/footers, backgrounds included, and tagged text + bookmarks — so the output is the same for everyone.

```bash
npm run pdf -- data/me.json --theme slate --paper a4 --margin normal   # → data/me.pdf
```

The **Download PDF** button uses the same renderer. Requirements: Chrome or Chromium installed on the machine (`puppeteer-core` does not download one; set `CHROME_PATH` if it isn't on your `PATH`) and internet access for Google Fonts. Without a local Chrome the button falls back to the browser print dialog. Long jobs and projects flow across pages instead of leaving gaps; each bullet and short section stays whole.

## Why this architecture

- **ATS & AI-parser friendly** — semantic HTML (`h1`, `h2`, `ul`), real vector text in PDFs, no rasterization, no tables-for-layout.
- **Consistent PDF** — rendered by a headless Chrome the project controls (see [Exporting a PDF](#exporting-a-pdf)), with real selectable, searchable vector text; `react-to-print` remains as a fallback.
- **Theme switching never touches data** — themes are design tokens + component overrides. Swapping themes re-renders the same JSON.
- **New themes need zero renderer changes** — the renderer only knows the `ThemeComponents` contract.

## Monorepo layout

| Package | Purpose |
| --- | --- |
| `packages/schema` | Zod schema, TypeScript types, `validateResume`, section ordering, JSON Schema generator |
| `packages/ui` | Theme contract (`Theme`, `DesignTokens`), typed section components, base CSS |
| `packages/renderer` | `<ResumeRenderer data={...} theme={...} />` |
| `packages/themes` | 29 themes — see [Themes](#themes) |
| `packages/pdf` | `useResumePdf` print hook, paper sizes (A4 / Letter) |
| `apps/web` | Vite + React 19 + Tailwind v4 + Zustand editor app |
| `examples/` | Example resume JSON |

## Resume JSON

Everything is optional except `basics`. See [`examples/sonu.json`](examples/sonu.json) for a complete example.

```json
{
  "basics": { "name": "Ada Lovelace", "label": "Engineer", "email": "ada@example.com" },
  "summary": "…",
  "skills": [{ "name": "Languages", "keywords": ["Go", "Python"] }],
  "experience": [{ "company": "…", "position": "…", "startDate": "2022-04", "highlights": ["…"] }]
}
```

Supported sections: `summary`, `experience`, `skills`, `projects`, `education`, `certifications`, `achievements`, `awards`, `publications`, `openSource`, `languages`, `interests`. Reorder or hide sections with `meta.sectionOrder` / `meta.hiddenSections`.

### JSON Schema

[`resume.schema.json`](resume.schema.json) describes every field (types, required keys, descriptions). Point your resume at it and editors (VS Code, JetBrains, …) give autocompletion and inline validation:

```json
{ "$schema": "./resume.schema.json", "basics": { "name": "Ada Lovelace" } }
```

The file is generated from the Zod schema, so never edit it by hand — run `npm run schema:generate` after changing `packages/schema/src/index.ts`. Dates use `"YYYY"` or `"YYYY-MM"`; omit `endDate` for a current role.

## Themes

| Kind | Themes |
| --- | --- |
| Single column | Google, Anthropic, OpenAI, Netflix, Meta, xAI |
| Two column | Atlas, Ocean (tinted right panel), Slate (dark left sidebar + monogram), Nordic (frosted left sidebar), Indigo (gradient sidebar), Coral, Parchment (serif, warm) |
| Graphical | Banner (gradient header card), Timeline (rail + dots), Sunset, Aurora (mesh gradient), Cards (each section a card), Bauhaus (geometric shapes), Brutalist (hard shadows), Blueprint (gridded title block) |
| Dark | Midnight, Terminal, Dracula, Obsidian (gold on black), Synthwave (neon), Forest, Eclipse (2-col), Twilight (2-col), Blueprint — backgrounds are printed into the PDF |

### Gallery

Every theme rendering [`examples/sonu.json`](examples/sonu.json) (screenshots are in [`screenshots/`](screenshots)).

| **Google** | **Anthropic** | **OpenAI** |
| --- | --- | --- |
| <img src="screenshots/google.png" width="260" alt="Google theme"> | <img src="screenshots/anthropic.png" width="260" alt="Anthropic theme"> | <img src="screenshots/openai.png" width="260" alt="OpenAI theme"> |
| **Netflix** | **Meta** | **xAI** |
| <img src="screenshots/netflix.png" width="260" alt="Netflix theme"> | <img src="screenshots/meta.png" width="260" alt="Meta theme"> | <img src="screenshots/xai.png" width="260" alt="xAI theme"> |
| **Atlas** | **Ocean** | **Slate** |
| <img src="screenshots/atlas.png" width="260" alt="Atlas theme"> | <img src="screenshots/ocean.png" width="260" alt="Ocean theme"> | <img src="screenshots/slate.png" width="260" alt="Slate theme"> |
| **Nordic** | **Indigo** | **Coral** |
| <img src="screenshots/nordic.png" width="260" alt="Nordic theme"> | <img src="screenshots/indigo.png" width="260" alt="Indigo theme"> | <img src="screenshots/coral.png" width="260" alt="Coral theme"> |
| **Parchment** | **Banner** | **Timeline** |
| <img src="screenshots/parchment.png" width="260" alt="Parchment theme"> | <img src="screenshots/banner.png" width="260" alt="Banner theme"> | <img src="screenshots/timeline.png" width="260" alt="Timeline theme"> |
| **Sunset** | **Aurora** | **Cards** |
| <img src="screenshots/sunset.png" width="260" alt="Sunset theme"> | <img src="screenshots/aurora.png" width="260" alt="Aurora theme"> | <img src="screenshots/cards.png" width="260" alt="Cards theme"> |
| **Bauhaus** | **Brutalist** | **Blueprint** |
| <img src="screenshots/bauhaus.png" width="260" alt="Bauhaus theme"> | <img src="screenshots/brutalist.png" width="260" alt="Brutalist theme"> | <img src="screenshots/blueprint.png" width="260" alt="Blueprint theme"> |
| **Midnight** | **Terminal** | **Dracula** |
| <img src="screenshots/midnight.png" width="260" alt="Midnight theme"> | <img src="screenshots/terminal.png" width="260" alt="Terminal theme"> | <img src="screenshots/dracula.png" width="260" alt="Dracula theme"> |
| **Obsidian** | **Synthwave** | **Forest** |
| <img src="screenshots/obsidian.png" width="260" alt="Obsidian theme"> | <img src="screenshots/synthwave.png" width="260" alt="Synthwave theme"> | <img src="screenshots/forest.png" width="260" alt="Forest theme"> |
| **Eclipse** | **Twilight** |   |
| <img src="screenshots/eclipse.png" width="260" alt="Eclipse theme"> | <img src="screenshots/twilight.png" width="260" alt="Twilight theme"> |   |

## Writing a theme

A theme is design tokens plus a full set of section components. Spread the defaults and override only what you need:

```tsx
import { defaultComponents, type Theme } from "@resume/ui";

export const myTheme: Theme = {
  id: "my-theme",
  name: "My Theme",
  className: "theme-my-theme",
  tokens: { /* colors, fonts, type scale, spacing */ },
  components: { ...defaultComponents, Header: MyHeader },
};
```

Set `sidebar` to move sections into a second column, `sidebarPosition: "left"` to put it on the left, and `headerInSidebar: true` to render the header at the top of the sidebar (see `slate.tsx`).

Tokens become `--rb-*` CSS variables on the resume root; the base stylesheet in `@resume/ui` consumes them. Themes never touch resume data.

## Scripts

```bash
npm run dev        # start the editor app
npm run build      # production build
npm run typecheck  # tsc across the whole monorepo
npm run schema:generate  # regenerate resume.schema.json from the Zod schema
npm run validate -- data/me.json  # validate a resume file from the CLI
```

## Roadmap

- [x] Phase 1 — schema, renderer, theme API, Linear theme, print/PDF, example resume
- [x] Phase 2 (partial) — Minimal & Executive themes
- [x] Phase 3 (partial) — live JSON editor, validation, theme switcher
- [x] More themes — two-column, graphical and dark layouts
- [ ] Dark mode, print preview polish
- [ ] AI: resume generation, job tailoring, cover letters, ATS scoring
- [ ] CLI: `resume dev` / `resume build` / `resume export pdf`

## License

MIT
