import type { HeaderProps, Theme } from "@resume/ui";
import { ContactItem, defaultComponents, displayUrl } from "@resume/ui";
import { SkillChips } from "./shared";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

/** Monogram badge + stacked contact list, lives at the top of the sidebar. */
function SlateHeader({ basics }: HeaderProps) {
  return (
    <header className="rb-header sl-header">
      <div className="sl-monogram" aria-hidden="true">
        {initials(basics.name)}
      </div>
      <h1 className="rb-name">{basics.name}</h1>
      {basics.label ? <p className="rb-label">{basics.label}</p> : null}
      <ul className="sl-contact">
        {basics.email ? <li><ContactItem href={`mailto:${basics.email}`}>{basics.email}</ContactItem></li> : null}
        {basics.phone ? <li><ContactItem href={`tel:${basics.phone.replace(/\s/g, "")}`}>{basics.phone}</ContactItem></li> : null}
        {basics.url ? <li><ContactItem href={basics.url}>{displayUrl(basics.url)}</ContactItem></li> : null}
        {basics.location ? <li><ContactItem>{basics.location}</ContactItem></li> : null}
        {basics.profiles?.map((profile) => (
          <li key={profile.url}>
            <ContactItem href={profile.url}>{displayUrl(profile.url)}</ContactItem>
          </li>
        ))}
      </ul>
    </header>
  );
}

/**
 * Slate — two-column with a dark left sidebar: monogram, name, contact,
 * skill chips, education. Summary and experience fill the light main column.
 */
export const slate: Theme = {
  id: "slate",
  name: "Slate",
  className: "theme-slate",
  sidebar: ["skills", "education", "certifications", "languages", "interests", "awards"],
  sidebarPosition: "left",
  headerInSidebar: true,
  tokens: {
    colors: {
      primary: "#0f766e",
      text: "#1e293b",
      muted: "#475569",
      faint: "#94a3b8",
      border: "#e2e8f0",
      background: "#ffffff",
    },
    font: {
      body: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      heading: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      mono: "'JetBrains Mono', 'SF Mono', Menlo, monospace",
    },
    fontSize: {
      displayXl: "20pt",
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
    radius: "8px",
    lineHeight: "1.5",
    headingLetterSpacing: "0.14em",
    headingTransform: "uppercase",
  },
  components: { ...defaultComponents, Header: SlateHeader, Skills: SkillChips },
};
