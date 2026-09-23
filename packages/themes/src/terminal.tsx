import type { Theme } from "@resume/ui";
import { defaultComponents } from "@resume/ui";

/**
 * Terminal — dark, all-monospace, green-on-black with shell-style section
 * prompts. For the engineer who lives in the command line.
 */
export const terminal: Theme = {
  id: "terminal",
  name: "Terminal",
  className: "theme-terminal",
  tokens: {
    colors: {
      primary: "#4ade80",
      text: "#d4d4d4",
      muted: "#a3a3a3",
      faint: "#737373",
      border: "#262626",
      background: "#0c0c0c",
    },
    font: {
      body: "'JetBrains Mono', 'Fira Code', 'SF Mono', Menlo, monospace",
      heading: "'JetBrains Mono', 'Fira Code', 'SF Mono', Menlo, monospace",
      mono: "'JetBrains Mono', 'Fira Code', 'SF Mono', Menlo, monospace",
    },
    fontSize: {
      displayXl: "21pt",
      display: "16pt",
      heading: "10pt",
      title: "10pt",
      body: "9pt",
      small: "8.5pt",
      caption: "7.75pt",
    },
    spacing: {
      page: "14mm",
      sectionGap: "14pt",
      itemGap: "10pt",
      large: "12pt",
      medium: "7pt",
      small: "3.5pt",
    },
    radius: "0px",
    lineHeight: "1.55",
    headingLetterSpacing: "0.04em",
    headingTransform: "none",
  },
  components: defaultComponents,
};
