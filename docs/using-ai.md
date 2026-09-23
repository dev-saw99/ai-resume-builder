# Using Resume Builder with AI

Your resume is one JSON file. AI is very good at turning messy material (an old CV, LinkedIn text, project notes, a job description) into that JSON — and this project gives it a strict schema to aim at, so the result is checked, not guessed.

**Why JSON instead of asking AI to "write me a resume document"?** Because the AI only touches *content*. Ask a chat AI to edit a formatted document and it may quietly change the layout, drop a section or reflow everything; ask it to edit this JSON and the worst case is a validation error that names the exact field. The design stays untouched no matter how many times you re-tailor, re-order or rewrite — and switching themes afterwards is one click.

There are two ways to work with AI. Pick the one that matches your tool:

| | **AI harness / coding agent** | **Chat AI** |
| --- | --- | --- |
| Examples | Claude Code, Codex CLI, Gemini CLI, Cursor, Aider, Copilot agent mode | ChatGPT, Claude.ai, Gemini, Copilot chat, any web chat |
| Can read files & run commands | ✅ yes | ❌ no — you copy/paste |
| Who runs `validate` / `pdf` | the agent | you |
| Best for | doing everything end to end | quick drafts, no setup |
| Start here | [Path A](#path-a--ai-harness-coding-agent) | [Path B](#path-b--chat-ai-chatgpt-claudeai-gemini-) |

> **Privacy:** anything you give an AI (old CVs, phone number, employer details) goes to that provider. Keep personal files in `data/` — it is git-ignored, so they are never committed — and use a provider/plan you are comfortable sharing your career history with.

---

## First: gather your material

The AI can only be as accurate as what you give it. Collect whatever you have — messy is fine:

- your current CV/resume (PDF, DOCX, or pasted text), LinkedIn "About" + experience text
- for each job: **company, title, dates, what you owned, tech used, results** (numbers if you have them)
- projects (repo links, what you built, impact), open-source work
- education, certifications, awards, publications, languages
- performance reviews, promo docs, brag docs, commit history highlights
- the **job description (JD)** you're targeting, if any

Don't worry about wording. A rough brain dump per role is enough:

```text
PayPal — Senior Software Engineer — Nov 2024 to now — Bengaluru
- built cloud cost recommendation engine (Go, Python, BigQuery), saved ~$6.3M/yr
- led design of ops agent with Gemini + RAG for infra questions
- mentor 3 engineers
```

**Rule for the AI (and for you): never invent.** No made-up metrics, employers, dates or skills. If something is unknown the AI should *ask*, not fill in.

---

## Path A — AI harness (coding agent)

The agent can read your files, write the JSON, validate it and render the PDF itself. This repo ships an [`AGENTS.md`](../AGENTS.md) that teaches it the whole workflow, so you mostly just point it there.

**1. Set up (once)**

```bash
git clone https://github.com/dev-saw99/ai-resume-builder.git resume && cd resume
npm install
```

You also need Chrome or Chromium installed for PDF export (set `CHROME_PATH` if it isn't on your `PATH`).

**2. Drop your material into `data/inputs/`**

```
data/
  inputs/
    old-cv.pdf
    linkedin.txt
    notes.md          ← your brain dump
    jd-acme-backend.txt   ← optional job description
```

`data/` is git-ignored, so none of this is ever committed.

**3. Open the repo in your agent and say:**

```text
Read AGENTS.md. Build my resume from everything in data/inputs/ and save it as
data/me.json. Don't invent anything — ask me about missing dates, metrics or
anything ambiguous. Validate it with `npm run validate`, then render a PDF with
the "google" theme using `npm run pdf`.
```

The agent will extract your details, write `data/me.json`, run `npm run validate -- data/me.json` until it passes, and produce `data/me.pdf`.

**4. Preview and tweak**

```bash
RESUME_FILE=data/me.json npm run dev     # fish shell: env RESUME_FILE=data/me.json npm run dev
```

Edit JSON on the left, switch themes on the right (arrow keys or `[` / `]`), click **Download PDF**. Or keep chatting with the agent: *"make it fit on one page"*, *"try the slate theme"*, *"tighten the PayPal bullets"*.

**5. Tailor to a job** → see [Tailoring to a job description](#tailoring-to-a-job-description).

---

## Path B — Chat AI (ChatGPT, Claude.ai, Gemini, …)

A chat AI can't touch your files, so the loop is: **paste in → get JSON out → validate → paste errors back.**

**1. Paste the prompt below**, then paste your material after it (CV text, notes, LinkedIn text). If your chat supports file upload you can also attach your old CV and `resume.schema.json` from this repo.

````text
You are helping me create a resume as JSON for the "Resume Builder" project.

Output ONE JSON object in a single ```json code block and nothing else after it.
Rules:
- Use ONLY facts I give you. Never invent employers, dates, metrics, skills or
  links. If something is missing or ambiguous, ask me questions FIRST (numbered
  list) before writing the JSON.
- Dates are strings: "YYYY" or "YYYY-MM" (e.g. "2024-11"). For a current job,
  OMIT endDate. Never write "Present".
- URLs must be absolute (https://...). email must be a valid email address.
- Unknown keys are not allowed. Omit sections I have no data for.
- Reverse-chronological order. 3-5 bullets per role in "highlights", each
  starting with a strong verb and ending with the outcome. **bold** is allowed
  inside highlights for the 1-2 most important numbers.

Schema (★ = required):
{
  "basics": { "name"★, "label", "email", "phone", "url", "location",
              "profiles": [ { "network"★, "url"★, "username" } ] },
  "summary": "2-4 sentences",
  "skills": [ { "name"★: "Group name", "keywords"★: ["skill", "..."] } ],
  "experience": [ { "company"★, "position"★, "startDate"★, "endDate", "location",
                    "url", "summary", "highlights": ["..."], "keywords": ["..."] } ],
  "projects": [ { "name"★, "description", "url", "startDate", "endDate",
                  "highlights": ["..."], "keywords": ["..."] } ],
  "education": [ { "institution"★, "studyType", "area", "startDate", "endDate",
                   "score", "location", "url", "highlights": ["..."] } ],
  "certifications": [ { "name"★, "issuer", "date", "url" } ],
  "achievements": [ { "title"★, "date", "summary" } ],
  "awards": [ { "title"★, "awarder", "date", "summary" } ],
  "publications": [ { "name"★, "publisher", "releaseDate", "url", "summary" } ],
  "openSource": [ { "name"★, "role", "url", "description", "highlights": ["..."] } ],
  "languages": [ { "language"★, "fluency" } ],
  "interests": ["..."]
}

Here is my material:
<paste your CV / LinkedIn text / notes here>
````

**2. Answer any questions** the AI asks, then let it produce the JSON.

**3. Get it into the app.** Either:

- **Paste into the editor** — run `npm run dev` (or open the app), select everything in the left JSON pane, paste. Errors are listed at the bottom with their path (e.g. `experience.0.startDate — Required`); or
- **Save to a file** — put it in `data/me.json`, then run `npm run validate -- data/me.json`.

**4. Fix errors by pasting them back:**

```text
The validator says:
  experience.0.startDate — Required
  basics.email — Invalid email
Fix the JSON and give me the complete corrected version.
```

**5. Refine** in the same chat: *"shorten the summary to 2 sentences"*, *"merge the last two roles"*, *"reorder skills with Go and Kubernetes first"*. Always ask for the **complete** JSON back so you can paste it straight in.

**6. Pick a theme and export** in the app (right sidebar → **Download PDF**), or `npm run pdf -- data/me.json --theme slate`.

---

## Tailoring to a job description

The same resume gets better results when it speaks the language of the job. The goal is **honest alignment**: surface the real experience you already have in the JD's vocabulary — not claim skills you don't have.

**Keep one master file** (`data/me.json`) and make a copy per application (`data/me.acme.json`). Never overwrite the master with tailored edits.

### What to give the AI

1. Your **master resume JSON** (`data/me.json`).
2. The **job description**, pasted in full (title, responsibilities, requirements, nice-to-haves). In a harness, save it as `data/inputs/jd-<company>-<role>.txt`.
3. Optional: anything true that the JSON doesn't say yet (a tool you used that isn't listed, scale numbers, a project not on the resume).

### Prompt (works in both a harness and a chat)

````text
Here is my master resume JSON and a job description. Tailor a copy of the
resume for this job.

Steps:
1. Extract from the JD: (a) must-have skills/keywords, (b) nice-to-have
   keywords, (c) recurring themes (e.g. "scale", "ownership", "on-call").
   Use the JD's exact wording for tools and phrases.
2. Gap analysis: a table of JD requirement -> where my resume already shows it
   (or "missing"). Do NOT add anything I haven't actually done. For each
   "missing" item ask me whether I truly have that experience.
3. Then produce the tailored JSON:
   - rewrite "summary" to lead with what this role needs (2-4 sentences)
   - in "skills", put the JD's must-have skills first and rename groups to
     match the JD's terms; include both the acronym and the full form when both
     appear in the JD (e.g. "Kubernetes (K8s)", "CI/CD")
   - re-order and lightly reword "highlights" so the most relevant achievements
     come first and use the JD's vocabulary — same facts, no new claims
   - add relevant keywords to each role's and project's "keywords" array where
     I really used them
   - use "meta.sectionOrder" / "meta.hiddenSections" to move or hide sections
     that help or hurt (keep it to ONE page unless I have 8+ years)
4. Output the complete JSON in one ```json block, then a short list of what
   you changed and any keywords from the JD that I still don't cover.

Master resume:
<paste data/me.json>

Job description:
<paste JD>
````

### Where keywords go (and where they don't)

| Put keywords in… | Why |
| --- | --- |
| `skills[].keywords` | The first place ATS and recruiters look. Put the JD's must-haves first. |
| `summary` | 1–2 of the most important terms, in a natural sentence. |
| `experience[].highlights` | Best signal: a keyword *in context* ("Built Kafka pipelines…") beats a bare list. |
| `experience[].keywords` / `projects[].keywords` | Technologies per role, shown under the entry. |
| `certifications`, `education` | Exact names as the JD writes them. |

Do:

- **Mirror the JD's exact phrases** for tools and methods (e.g. "Terraform", "event-driven architecture", "REST APIs").
- **Include both forms** of common pairs: *Kubernetes (K8s)*, *Amazon Web Services (AWS)*, *CI/CD*.
- Use **standard section names** (the themes already do) and a **single-column theme** (`google`, `anthropic`, `openai`, …) when applying through an ATS.

Don't:

- Add skills you don't have — interviews will find out, and it can get an offer pulled.
- Stuff keywords or hide white text; modern ATS/recruiters penalise it.
- Change dates, titles or numbers to "fit".

### Then render one PDF per application

```bash
npm run validate -- data/me.acme.json
npm run pdf -- data/me.acme.json --theme google --out data/acme-resume.pdf
```

(In a chat AI: paste the tailored JSON into the app, choose a theme, **Download PDF**.)

---

## More prompts

**Sharpen bullets** — *"Rewrite these highlights as strong-verb, outcome-first bullets. Keep every fact and number exactly as given; if a bullet has no outcome, ask me for one instead of guessing: <bullets>"*

**Make it fit** — *"This resume is 2 pages and I want 1. Suggest what to cut or merge, oldest and least relevant first, and output the complete JSON. Don't change any facts."*

**Fix validation errors** — *"`npm run validate` says: <errors>. Return the complete corrected JSON."*

**Review** — *"Review this resume JSON as a hiring manager for <role>: what's weak, vague or unquantified? Ask me questions to fill the gaps — don't invent answers."*

---

## Minimal valid example

Use this as a sanity check for any AI output (it validates as-is):

```json
{
  "$schema": "./resume.schema.json",
  "basics": {
    "name": "Ada Lovelace",
    "label": "Software Engineer",
    "email": "ada@example.com",
    "location": "London, UK",
    "profiles": [{ "network": "GitHub", "url": "https://github.com/ada" }]
  },
  "summary": "Engineer who builds reliable data pipelines and the tooling around them.",
  "skills": [{ "name": "Languages", "keywords": ["Python", "Go", "SQL"] }],
  "experience": [
    {
      "company": "Analytical Engines Ltd",
      "position": "Software Engineer",
      "startDate": "2022-04",
      "highlights": ["Cut nightly batch time from **6 h to 45 min** by parallelising the ingest stage."],
      "keywords": ["Python", "Airflow"]
    }
  ],
  "education": [{ "institution": "University of London", "studyType": "BSc", "area": "Mathematics", "endDate": "2021" }]
}
```

See also: [`AGENTS.md`](../AGENTS.md) (the agent's own guide) and [`examples/sonu.json`](../examples/sonu.json) (a complete resume).
