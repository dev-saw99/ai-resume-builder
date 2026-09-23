import type { Theme } from "@resume/ui";
import { defaultComponents } from "@resume/ui";
import { MonogramHeader, SkillChips } from "./shared";

/**
 * Eclipse — dark two-column: monogram, name and contacts in a left sidebar
 * panel, orange accents on GitHub-dark.
 */
export const eclipse: Theme = {
  id: "eclipse",
  name: "Eclipse",
  className: "theme-eclipse",
  sidebar: ["skills", "education", "certifications", "languages", "interests", "awards"],
  sidebarPosition: "left",
  headerInSidebar: true,
  tokens: {
    colors: {
      primary: "#f0883e",
      text: "#e6edf3",
      muted: "#a8b3bf",
      faint: "#6e7681",
      border: "#30363d",
      background: "#0d1117",
    },
    font: {
      body: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      heading: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      mono: "'JetBrains Mono', 'SF Mono', Menlo, monospace",
    },
    fontSize: {
      displayXl: "21pt",
      display: "16pt",
      heading: "9.5pt",
      title: "10.5pt",
      body: "9.5pt",
      small: "8.75pt",
      caption: "8pt",
    },
    spacing: {
      page: "10mm",
      sectionGap: "14pt",
      itemGap: "11pt",
      large: "12pt",
      medium: "7pt",
      small: "4pt",
    },
    radius: "10px",
    lineHeight: "1.5",
    headingLetterSpacing: "0.14em",
    headingTransform: "uppercase",
  },
  components: { ...defaultComponents, Header: MonogramHeader, Skills: SkillChips },
};
