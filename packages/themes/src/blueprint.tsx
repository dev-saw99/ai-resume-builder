import type { Theme } from "@resume/ui";
import { defaultComponents } from "@resume/ui";

/**
 * Blueprint — white-on-blue technical drawing: gridded title block,
 * numbered sections, dashed rules, monospace throughout.
 */
export const blueprint: Theme = {
  id: "blueprint",
  name: "Blueprint",
  className: "theme-blueprint",
  tokens: {
    colors: {
      primary: "#ffd166",
      text: "#e6f0ff",
      muted: "#b7cdee",
      faint: "#7f9fd0",
      border: "#5b83c4",
      background: "#0b3a75",
    },
    font: {
      body: "'IBM Plex Mono', Menlo, Consolas, monospace",
      heading: "'IBM Plex Mono', Menlo, Consolas, monospace",
      mono: "'IBM Plex Mono', Menlo, Consolas, monospace",
    },
    fontSize: {
      displayXl: "22pt",
      display: "16pt",
      heading: "10pt",
      title: "10pt",
      body: "9pt",
      small: "8.5pt",
      caption: "7.75pt",
    },
    spacing: {
      page: "13mm",
      sectionGap: "14pt",
      itemGap: "10pt",
      large: "12pt",
      medium: "7pt",
      small: "3.5pt",
    },
    radius: "0px",
    lineHeight: "1.5",
    headingLetterSpacing: "0.14em",
    headingTransform: "uppercase",
  },
  components: { ...defaultComponents },
};
