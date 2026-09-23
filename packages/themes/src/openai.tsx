import type { Theme } from "@resume/ui";
import { defaultComponents } from "@resume/ui";

/**
 * OpenAI — near-black minimalism with the ChatGPT teal used sparingly
 * for dates and markers. Sentence-case headings, generous air.
 */
export const openai: Theme = {
  id: "openai",
  name: "OpenAI",
  className: "theme-openai",
  tokens: {
    colors: {
      primary: "#10a37f",
      text: "#0d0d0d",
      muted: "#565869",
      faint: "#8e8ea0",
      border: "#ececf1",
      background: "#ffffff",
    },
    font: {
      body: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      heading: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      mono: "'JetBrains Mono', 'SF Mono', Menlo, monospace",
    },
    fontSize: {
      displayXl: "25pt",
      display: "19pt",
      heading: "11.5pt",
      title: "10.5pt",
      body: "9.75pt",
      small: "9pt",
      caption: "8pt",
    },
    spacing: {
      page: "15mm",
      sectionGap: "16pt",
      itemGap: "12pt",
      large: "13pt",
      medium: "8pt",
      small: "4pt",
    },
    radius: "6px",
    lineHeight: "1.55",
    headingLetterSpacing: "0",
    headingTransform: "none",
  },
  components: defaultComponents,
};
