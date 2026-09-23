import type { HeaderProps, Theme } from "@resume/ui";
import { ContactItem, defaultComponents, displayUrl } from "@resume/ui";

/** Centered, serif header — the classic executive letterhead. */
function ExecutiveHeader({ basics }: HeaderProps) {
  return (
    <header className="rb-header" style={{ textAlign: "center" }}>
      <h1 className="rb-name">{basics.name}</h1>
      {basics.label ? <p className="rb-label">{basics.label}</p> : null}
      <p className="rb-contact">
        {basics.email ? <ContactItem href={`mailto:${basics.email}`}>{basics.email}</ContactItem> : null}
        {basics.phone ? <ContactItem href={`tel:${basics.phone.replace(/\s/g, "")}`}>{basics.phone}</ContactItem> : null}
        {basics.url ? <ContactItem href={basics.url}>{displayUrl(basics.url)}</ContactItem> : null}
        {basics.location ? <ContactItem>{basics.location}</ContactItem> : null}
        {basics.profiles?.map((profile) => (
          <ContactItem key={profile.url} href={profile.url}>
            {profile.url ? displayUrl(profile.url) : `${profile.network.toLowerCase()}/${profile.username}`}
          </ContactItem>
        ))}
      </p>
    </header>
  );
}

/**
 * Executive — serif typography, navy accents, formal letterhead layout.
 */
export const executive: Theme = {
  id: "executive",
  name: "Executive",
  className: "theme-executive",
  tokens: {
    colors: {
      primary: "#1e3a5f",
      text: "#20242a",
      muted: "#4e555e",
      faint: "#8a919a",
      border: "#c9ced4",
      background: "#ffffff",
    },
    font: {
      body: "'Source Serif 4', Georgia, 'Times New Roman', serif",
      heading: "'Source Serif 4', Georgia, 'Times New Roman', serif",
      mono: "'SF Mono', Menlo, Consolas, monospace",
    },
    fontSize: {
      displayXl: "25pt",
      display: "19pt",
      heading: "10.5pt",
      title: "11pt",
      body: "10.5pt",
      small: "9.5pt",
      caption: "8.5pt",
    },
    spacing: {
      page: "15mm",
      sectionGap: "15pt",
      itemGap: "12pt",
      large: "13pt",
      medium: "7pt",
      small: "4pt",
    },
    radius: "0px",
    lineHeight: "1.45",
    headingLetterSpacing: "0.1em",
    headingTransform: "uppercase",
  },
  components: {
    ...defaultComponents,
    Header: ExecutiveHeader,
  },
};
