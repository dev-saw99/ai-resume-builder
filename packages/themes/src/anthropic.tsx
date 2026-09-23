import type { Theme } from "@resume/ui";
import { defaultComponents } from "@resume/ui";

/**
 * Anthropic — warm ivory paper, terracotta accent, grotesque headings
 * (Space Grotesk ≈ Styrene) over a literary serif body (Source Serif ≈ Tiempos).
 */
export const anthropic: Theme = {
  id: "anthropic",
  name: "Anthropic",
  className: "theme-anthropic",
  tokens: {
    colors: {
      primary: "#c15f3c",
      text: "#191919",
      muted: "#5e5d59",
      faint: "#a29f98",
      border: "#e8e5dc",
      background: "#fdfcf7",
    },
    font: {
      body: "'Source Serif 4', Georgia, 'Times New Roman', serif",
      heading: "'Space Grotesk', 'Inter', Arial, sans-serif",
      mono: "'JetBrains Mono', 'SF Mono', Menlo, monospace",
    },
    fontSize: {
      displayXl: "25pt",
      display: "19pt",
      heading: "10pt",
      title: "11pt",
      body: "10pt",
      small: "9pt",
      caption: "8pt",
    },
    spacing: {
      page: "15mm",
      sectionGap: "16pt",
      itemGap: "12pt",
      large: "13pt",
      medium: "8pt",
      small: "4.5pt",
    },
    radius: "4px",
    lineHeight: "1.55",
    headingLetterSpacing: "0.14em",
    headingTransform: "uppercase",
  },
  components: defaultComponents,
};
