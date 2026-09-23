import { create } from "zustand";
import type { Resume } from "@resume/schema";
import { validateResume } from "@resume/schema";
import type { MarginPreset, PaperSize } from "@resume/pdf";
import exampleResume from "@resume-data";

interface ValidationError {
  path: string;
  message: string;
}

interface AppState {
  /** Raw editor text — may be invalid while the user types. */
  jsonText: string;
  /** Last successfully validated resume; preview never goes blank. */
  resume: Resume;
  /** JSON syntax error, if any. */
  parseError: string | null;
  /** Schema validation errors, if any. */
  schemaErrors: ValidationError[];
  /** Status of the last save-to-disk attempt, shown as a transient notice. */
  saveStatus: "idle" | "saving" | "saved" | "error";
  saveMessage: string | null;
  themeId: string;
  /** Font override id from FONT_OPTIONS; "theme" keeps the theme's fonts. */
  fontId: string;
  /** Page background override (hex); null keeps the theme's background. */
  bgColor: string | null;
  paperSize: PaperSize;
  /** PDF page margins. */
  marginPreset: MarginPreset;
  setJsonText: (text: string) => void;
  setThemeId: (id: string) => void;
  setFontId: (id: string) => void;
  setBgColor: (color: string | null) => void;
  setPaperSize: (size: PaperSize) => void;
  setMarginPreset: (preset: MarginPreset) => void;
  formatJson: () => void;
  saveJson: () => Promise<void>;
}

const params = new URLSearchParams(window.location.search);

// The PDF renderer injects the current resume here so it renders unsaved editor content.
const source = window.__RESUME_OVERRIDE__ ?? exampleResume;
const MARGINS: MarginPreset[] = ["none", "narrow", "normal", "wide"];

const initial = validateResume(source);
if (!initial.success) {
  throw new Error(`${__RESUME_FILE__} failed schema validation — run \`npm run validate -- ${__RESUME_FILE__}\``);
}

export const useAppStore = create<AppState>((set, get) => ({
  jsonText: JSON.stringify(source, null, 2),
  resume: initial.data,
  parseError: null,
  schemaErrors: [],
  saveStatus: "idle",
  saveMessage: null,
  themeId: params.get("theme") ?? "google",
  fontId: params.get("font") ?? "theme",
  bgColor: params.get("bg") ? `#${params.get("bg")!.replace(/^#/, "")}` : null,
  paperSize: params.get("paper") === "letter" ? "letter" : "a4",
  marginPreset: MARGINS.find((m) => m === params.get("margin")) ?? "normal",

  setJsonText: (text) => {
    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch (error) {
      set({ jsonText: text, parseError: (error as Error).message, schemaErrors: [] });
      return;
    }
    const result = validateResume(parsed);
    if (result.success) {
      set({ jsonText: text, resume: result.data, parseError: null, schemaErrors: [] });
    } else {
      set({ jsonText: text, parseError: null, schemaErrors: result.errors });
    }
  },

  setThemeId: (themeId) => set({ themeId }),
  setFontId: (fontId) => set({ fontId }),
  setBgColor: (bgColor) => set({ bgColor }),
  setPaperSize: (paperSize) => set({ paperSize }),
  setMarginPreset: (marginPreset) => set({ marginPreset }),

  formatJson: () => {
    const { jsonText } = get();
    try {
      set({ jsonText: JSON.stringify(JSON.parse(jsonText), null, 2) });
    } catch {
      // leave invalid JSON untouched
    }
  },

  saveJson: async () => {
    const { parseError } = get();
    if (parseError) return;

    get().formatJson();
    const formatted = get().jsonText;

    set({ saveStatus: "saving", saveMessage: null });
    try {
      const response = await fetch("/api/save-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: formatted,
      });
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error || `Save failed (${response.status})`);
      }
      set({ saveStatus: "saved", saveMessage: `Saved to ${__RESUME_FILE__}` });
    } catch (error) {
      set({ saveStatus: "error", saveMessage: (error as Error).message || "Save failed" });
    }

    setTimeout(() => {
      set((state) => (state.saveStatus === "idle" ? state : { saveStatus: "idle", saveMessage: null }));
    }, 2500);
  },
}));
