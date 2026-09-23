import type {
  AchievementsProps,
  AwardsProps,
  CertificationsProps,
  EducationProps,
  ExperienceProps,
  FooterProps,
  HeaderProps,
  InterestsProps,
  LanguagesProps,
  OpenSourceProps,
  ProjectsProps,
  PublicationsProps,
  SkillsProps,
  SummaryProps,
  ThemeComponents,
} from "./types";
import {
  Bullets,
  ContactItem,
  displayUrl,
  EntryHeader,
  formatDateRange,
  InlineList,
  InlineMarkdown,
  Section,
} from "./primitives";

export function Header({ basics }: HeaderProps) {
  return (
    <header className="rb-header">
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

export function Summary({ summary }: SummaryProps) {
  return (
    <Section title="Summary">
      <p className="rb-summary">
        <InlineMarkdown text={summary} />
      </p>
    </Section>
  );
}

export function Skills({ skills }: SkillsProps) {
  return (
    <Section title="Skills">
      <dl className="rb-skills">
        {skills.map((group) => (
          <div className="rb-skill-group" key={group.name}>
            <dt className="rb-skill-name">{group.name}</dt>
            <dd className="rb-skill-keywords">{group.keywords.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

export function Experience({ items }: ExperienceProps) {
  return (
    <Section title="Experience">
      {items.map((job, i) => (
        <article className="rb-entry" key={i}>
          <EntryHeader
            title={job.position}
            subtitle={job.company}
            titleUrl={job.url}
            meta={formatDateRange(job.startDate, job.endDate)}
            aside={job.location}
          />
          {job.summary ? (
            <p className="rb-entry-summary">
              <InlineMarkdown text={job.summary} />
            </p>
          ) : null}
          <Bullets items={job.highlights} />
          {job.keywords?.length ? (
            <p className="rb-entry-keywords">
              <InlineList items={job.keywords} />
            </p>
          ) : null}
        </article>
      ))}
    </Section>
  );
}

export function Projects({ items }: ProjectsProps) {
  return (
    <Section title="Projects">
      {items.map((project, i) => (
        <article className="rb-entry" key={i}>
          <EntryHeader
            title={project.name}
            titleUrl={project.url}
            subtitle={project.description}
            meta={formatDateRange(project.startDate, project.endDate)}
          />
          <Bullets items={project.highlights} />
          {project.keywords?.length ? (
            <p className="rb-entry-keywords">
              <InlineList items={project.keywords} />
            </p>
          ) : null}
        </article>
      ))}
    </Section>
  );
}

export function Education({ items }: EducationProps) {
  return (
    <Section title="Education">
      {items.map((school, i) => (
        <article className="rb-entry" key={i}>
          <EntryHeader
            title={school.institution}
            titleUrl={school.url}
            subtitle={[school.studyType, school.area].filter(Boolean).join(", ")}
            meta={formatDateRange(school.startDate, school.endDate)}
            aside={school.score ? `GPA ${school.score}` : school.location}
          />
          <Bullets items={school.highlights} />
        </article>
      ))}
    </Section>
  );
}

export function Certifications({ items }: CertificationsProps) {
  return (
    <Section title="Certifications">
      {items.map((cert, i) => (
        <article className="rb-entry rb-entry-compact" key={i}>
          <EntryHeader
            title={cert.name}
            titleUrl={cert.url}
            subtitle={cert.issuer}
            meta={cert.date ? formatDateRange(cert.date, cert.date).split(" — ")[0] : undefined}
          />
        </article>
      ))}
    </Section>
  );
}

export function Achievements({ items }: AchievementsProps) {
  return (
    <Section title="Achievements">
      <ul className="rb-bullets">
        {items.map((achievement, i) => (
          <li key={i}>
            <strong>{achievement.title}</strong>
            {achievement.summary ? ` — ${achievement.summary}` : ""}
            {achievement.date ? ` (${achievement.date.split("-")[0]})` : ""}
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function Awards({ items }: AwardsProps) {
  return (
    <Section title="Awards">
      <ul className="rb-bullets">
        {items.map((award, i) => (
          <li key={i}>
            <strong>{award.title}</strong>
            {award.awarder ? `, ${award.awarder}` : ""}
            {award.summary ? ` — ${award.summary}` : ""}
            {award.date ? ` (${award.date.split("-")[0]})` : ""}
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function Publications({ items }: PublicationsProps) {
  return (
    <Section title="Publications">
      {items.map((pub, i) => (
        <article className="rb-entry rb-entry-compact" key={i}>
          <EntryHeader
            title={pub.name}
            titleUrl={pub.url}
            subtitle={pub.publisher}
            meta={pub.releaseDate ? pub.releaseDate.split("-")[0] : undefined}
          />
          {pub.summary ? <p className="rb-entry-summary">{pub.summary}</p> : null}
        </article>
      ))}
    </Section>
  );
}

export function OpenSource({ items }: OpenSourceProps) {
  return (
    <Section title="Open Source">
      {items.map((project, i) => (
        <article className="rb-entry" key={i}>
          <EntryHeader
            title={project.name}
            titleUrl={project.url}
            subtitle={project.description}
            meta={project.role}
          />
          <Bullets items={project.highlights} />
        </article>
      ))}
    </Section>
  );
}

export function Languages({ items }: LanguagesProps) {
  return (
    <Section title="Languages">
      <p className="rb-inline-section">
        {items
          .map((entry) => (entry.fluency ? `${entry.language} (${entry.fluency})` : entry.language))
          .join(" · ")}
      </p>
    </Section>
  );
}

export function Interests({ items }: InterestsProps) {
  return (
    <Section title="Interests">
      <p className="rb-inline-section">{items.join(" · ")}</p>
    </Section>
  );
}

export function Footer(_props: FooterProps) {
  return null;
}

/** The default component set. Themes spread this and override what they need. */
export const defaultComponents: ThemeComponents = {
  Header,
  Summary,
  Skills,
  Experience,
  Projects,
  Education,
  Certifications,
  Achievements,
  Awards,
  Publications,
  OpenSource,
  Languages,
  Interests,
  Footer,
};
