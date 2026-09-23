import type { Theme } from "@resume/ui";
import { defaultComponents } from "@resume/ui";
import { SkillChips } from "./shared";

/**
 * Forest — dark evergreen with mint accents, serif headings and soft
 * rounded chips. Calm and organic.
 */
export const forest: Theme = {
  id: "forest",
  name: "Forest",
  className: "theme-forest",
  tokens: {
    colors: {
      primary: "#7ee2a8",
      text: "#e3efe6",
      muted: "#a9c4b1",
      faint: "#6c8b78",
      border: "#1f3a2c",
      background: "#0e1a14",
    },
    font: {
      body: "'DM Sans', 'Inter', Arial, sans-serif",
      heading: "'Lora', Georgia, 'Times New Roman', serif",
      mono: "'JetBrains Mono', 'SF Mono', Menlo, monospace",
    },
    fontSize: {
      displayXl: "27pt",
      display: "19pt",
      heading: "11.5pt",
      title: "11pt",
      body: "9.75pt",
      small: "9pt",
      caption: "8pt",
    },
    spacing: {
      page: "14mm",
      sectionGap: "16pt",
      itemGap: "12pt",
      large: "14pt",
      medium: "8pt",
      small: "4pt",
    },
    radius: "8px",
    lineHeight: "1.55",
    headingLetterSpacing: "0.02em",
    headingTransform: "none",
  },
  components: { ...defaultComponents, Skills: SkillChips },
};
