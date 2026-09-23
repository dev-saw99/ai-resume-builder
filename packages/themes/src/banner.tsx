import type { Theme } from "@resume/ui";
import { defaultComponents } from "@resume/ui";
import { SkillChips } from "./shared";

/**
 * Banner — a bold gradient header card with white type, skills as pill chips,
 * and clean single-column body. Indigo → violet.
 */
export const banner: Theme = {
  id: "banner",
  name: "Banner",
  className: "theme-banner",
  tokens: {
    colors: {
      primary: "#4f46e5",
      text: "#1e1b3a",
      muted: "#4b5563",
      faint: "#9ca3af",
      border: "#e0e7ff",
      background: "#ffffff",
    },
    font: {
      body: "'Poppins', 'Inter', 'Helvetica Neue', Arial, sans-serif",
      heading: "'Poppins', 'Inter', 'Helvetica Neue', Arial, sans-serif",
      mono: "'JetBrains Mono', 'SF Mono', Menlo, monospace",
    },
    fontSize: {
      displayXl: "25pt",
      display: "18pt",
      heading: "10pt",
      title: "10.5pt",
      body: "9.5pt",
      small: "9pt",
      caption: "8pt",
    },
    spacing: {
      page: "12mm",
      sectionGap: "15pt",
      itemGap: "11pt",
      large: "13pt",
      medium: "8pt",
      small: "4.5pt",
    },
    radius: "10px",
    lineHeight: "1.55",
    headingLetterSpacing: "0.12em",
    headingTransform: "uppercase",
  },
  components: { ...defaultComponents, Skills: SkillChips },
};
