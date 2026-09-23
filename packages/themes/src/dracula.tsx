import type { Theme } from "@resume/ui";
import { defaultComponents } from "@resume/ui";
import { SkillChips } from "./shared";

/**
 * Dracula — the classic editor palette on a resume: purple, pink and green on
 * charcoal, Fira Code headings and `//` section comments.
 */
export const dracula: Theme = {
  id: "dracula",
  name: "Dracula",
  className: "theme-dracula",
  tokens: {
    colors: {
      primary: "#bd93f9",
      text: "#f8f8f2",
      muted: "#c3c6d8",
      faint: "#6272a4",
      border: "#44475a",
      background: "#282a36",
    },
    font: {
      body: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      heading: "'Fira Code', 'JetBrains Mono', Menlo, monospace",
      mono: "'Fira Code', 'JetBrains Mono', Menlo, monospace",
    },
    fontSize: {
      displayXl: "23pt",
      display: "17pt",
      heading: "10pt",
      title: "10.5pt",
      body: "9.75pt",
      small: "9pt",
      caption: "8pt",
    },
    spacing: {
      page: "14mm",
      sectionGap: "15pt",
      itemGap: "11pt",
      large: "13pt",
      medium: "7pt",
      small: "4pt",
    },
    radius: "6px",
    lineHeight: "1.55",
    headingLetterSpacing: "0.02em",
    headingTransform: "none",
  },
  components: { ...defaultComponents, Skills: SkillChips },
};
