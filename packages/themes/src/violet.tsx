import type { Experience } from "@resume/schema";
import type { ExperienceProps, HeaderProps, Theme } from "@resume/ui";
import { Bullets, defaultComponents, displayUrl, Section } from "@resume/ui";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "2024-11" → "November, 2024" · "2017" → "2017" */
function fullDate(date?: string): string {
  if (!date) return "";
  const [year, month] = date.split("-");
  if (!month) return year;
  const name = MONTHS[Number(month) - 1];
  return name ? `${name}, ${year}` : year;
}

function fullRange(start?: string, end?: string): string {
  if (!start && !end) return "";
  const from = fullDate(start);
  const to = end ? fullDate(end) : "Present";
  return from ? `( ${from} - ${to} )` : `( ${to} )`;
}

/** Centered letterhead with a boxed contact bar. */
function VioletHeader({ basics }: HeaderProps) {
  const cells: { key: string; href?: string; text: string }[] = [];
  if (basics.phone) cells.push({ key: "phone", href: `tel:${basics.phone.replace(/\s/g, "")}`, text: basics.phone });
  basics.profiles?.forEach((profile) =>
    cells.push({ key: profile.url, href: profile.url, text: displayUrl(profile.url) }),
  );
  if (basics.email) cells.push({ key: "email", href: `mailto:${basics.email}`, text: basics.email });
  if (basics.url) cells.push({ key: "url", href: basics.url, text: displayUrl(basics.url) });
  if (basics.location) cells.push({ key: "location", text: basics.location });

  return (
    <header className="rb-header vt-header">
      <h1 className="rb-name">{basics.name}</h1>
      {basics.label ? <p className="rb-label">{basics.label}</p> : null}
      {cells.length > 0 ? (
        <div className="vt-contact-bar">
          {cells.map((cell) => (
            <span className="vt-contact-cell" key={cell.key}>
              {cell.href ? (
                <a href={cell.href} className="rb-link">
                  {cell.text}
                </a>
              ) : (
                cell.text
              )}
            </span>
          ))}
        </div>
      ) : null}
    </header>
  );
}

/** Consecutive roles at the same company share one company heading. */
function groupByCompany(items: Experience[]) {
  const groups: { company: string; url?: string; roles: Experience[] }[] = [];
  for (const item of items) {
    const last = groups[groups.length - 1];
    if (last && last.company === item.company) {
      last.roles.push(item);
    } else {
      groups.push({ company: item.company, url: item.url, roles: [item] });
    }
  }
  return groups;
}

function VioletExperience({ items }: ExperienceProps) {
  return (
    <Section title="Work Experience">
      {groupByCompany(items).map((group) => (
        <div className="vt-company" key={group.company}>
          <h3 className="vt-company-name">
            {group.url ? (
              <a href={group.url} className="rb-link">
                {group.company}
              </a>
            ) : (
              group.company
            )}
          </h3>
          {group.roles.map((role, i) => (
            <article className="rb-entry vt-role" key={i}>
              <header className="vt-role-row">
                <span className="vt-role-title">{role.position}</span>
                <span className="vt-role-dates">{fullRange(role.startDate, role.endDate)}</span>
              </header>
              {role.summary ? <p className="rb-entry-summary">{role.summary}</p> : null}
              <Bullets items={role.highlights} />
            </article>
          ))}
        </div>
      ))}
    </Section>
  );
}

/**
 * Violet — centered letterhead, boxed contact bar, deep purple accents,
 * geometric sans (Poppins), company-grouped experience.
 */
export const violet: Theme = {
  id: "violet",
  name: "Violet",
  className: "theme-violet",
  tokens: {
    colors: {
      primary: "#4b3a78",
      text: "#3a3a45",
      muted: "#5c5c6a",
      faint: "#9a94ad",
      border: "#b9addc",
      background: "#ffffff",
    },
    font: {
      body: "'Poppins', 'Inter', 'Helvetica Neue', Arial, sans-serif",
      heading: "'Poppins', 'Inter', 'Helvetica Neue', Arial, sans-serif",
      mono: "'JetBrains Mono', 'SF Mono', Menlo, monospace",
    },
    fontSize: {
      displayXl: "24pt",
      display: "18pt",
      heading: "11pt",
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
    radius: "2px",
    lineHeight: "1.55",
    headingLetterSpacing: "0.18em",
    headingTransform: "uppercase",
  },
  components: {
    ...defaultComponents,
    Header: VioletHeader,
    Experience: VioletExperience,
  },
};
