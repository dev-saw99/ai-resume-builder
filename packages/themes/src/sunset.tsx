import type { Theme } from "@resume/ui";
import { defaultComponents } from "@resume/ui";
import { SkillChips } from "./shared";

/**
 * Sunset — warm and friendly: rounded geometric type (Poppins) with an
 * orange-to-pink gradient rule under the header.
 */
export const sunset: Theme = {
  id: "sunset",
  name: "Sunset",
  className: "theme-sunset",
  tokens: {
    colors: {
      primary: "#ea580c",
      text: "#2b2118",
      muted: "#5c4d40",
      faint: "#a8998a",
      border: "#f1e4d6",
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
      page: "13mm",
      sectionGap: "15pt",
      itemGap: "11pt",
      large: "13pt",
      medium: "8pt",
      small: "4.5pt",
    },
    radius: "6px",
    lineHeight: "1.55",
    headingLetterSpacing: "0.12em",
    headingTransform: "uppercase",
  },
  components: { ...defaultComponents, Skills: SkillChips },
};
