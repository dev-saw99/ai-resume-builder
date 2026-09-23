import type { Theme } from "@resume/ui";
import { defaultComponents } from "@resume/ui";
import { SkillChips } from "./shared";

/**
 * Cards — every section is its own rounded card on a pale canvas, with
 * pill dates and chips. Airy and modular.
 */
export const cards: Theme = {
  id: "cards",
  name: "Cards",
  className: "theme-cards",
  previewHint: "cards",
  tokens: {
    colors: {
      primary: "#0891b2",
      text: "#0f172a",
      muted: "#475569",
      faint: "#94a3b8",
      border: "#e2e8f0",
      background: "#eef2f7",
    },
    font: {
      body: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      heading: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      mono: "'JetBrains Mono', 'SF Mono', Menlo, monospace",
    },
    fontSize: {
      displayXl: "24pt",
      display: "17pt",
      heading: "10pt",
      title: "10.5pt",
      body: "9.5pt",
      small: "9pt",
      caption: "8pt",
    },
    spacing: {
      page: "11mm",
      sectionGap: "10pt",
      itemGap: "11pt",
      large: "12pt",
      medium: "7pt",
      small: "4pt",
    },
    radius: "12px",
    lineHeight: "1.5",
    headingLetterSpacing: "0.1em",
    headingTransform: "uppercase",
  },
  components: { ...defaultComponents, Skills: SkillChips },
};
