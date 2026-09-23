import type { HeaderProps, SkillsProps } from "@resume/ui";
import { ContactItem, displayUrl, Section } from "@resume/ui";

/**
 * Skills rendered as pill chips (styled per theme via `.rb-chip`).
 * Keeps each group's name as a label so the text stays ATS-readable.
 */
export function SkillChips({ skills }: SkillsProps) {
  return (
    <Section title="Skills">
      <div className="rb-chip-groups">
        {skills.map((group) => (
          <div className="rb-chip-group" key={group.name}>
            <h3 className="rb-chip-label">{group.name}</h3>
            <ul className="rb-chips">
              {group.keywords.map((keyword) => (
                <li className="rb-chip" key={keyword}>
                  {keyword}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

/** Monogram badge + stacked contact list, lives at the top of the sidebar. */
export function MonogramHeader({ basics }: HeaderProps) {
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
