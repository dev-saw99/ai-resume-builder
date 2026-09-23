import type { CSSProperties, ReactNode } from "react";
import type { Resume, SectionKey } from "@resume/schema";
import { resolveSections } from "@resume/schema";
import type { Theme } from "@resume/ui";
import { tokensToCssVars } from "@resume/ui";

export interface ResumeRendererProps {
  data: Resume;
  theme: Theme;
  className?: string;
  style?: CSSProperties;
}

/**
 * Renders a resume from data + theme. Knows nothing about specific themes —
 * new themes plug in via the ThemeComponents contract without renderer changes.
 */
export function ResumeRenderer({ data, theme, className, style }: ResumeRendererProps) {
  const { components: C } = theme;

  const sections: Record<SectionKey, () => ReactNode> = {
    summary: () => (data.summary ? <C.Summary summary={data.summary} /> : null),
    skills: () => (data.skills ? <C.Skills skills={data.skills} /> : null),
    experience: () => (data.experience ? <C.Experience items={data.experience} /> : null),
    projects: () => (data.projects ? <C.Projects items={data.projects} /> : null),
    education: () => (data.education ? <C.Education items={data.education} /> : null),
    certifications: () => (data.certifications ? <C.Certifications items={data.certifications} /> : null),
    achievements: () => (data.achievements ? <C.Achievements items={data.achievements} /> : null),
    awards: () => (data.awards ? <C.Awards items={data.awards} /> : null),
    publications: () => (data.publications ? <C.Publications items={data.publications} /> : null),
    openSource: () => (data.openSource ? <C.OpenSource items={data.openSource} /> : null),
    languages: () => (data.languages ? <C.Languages items={data.languages} /> : null),
    interests: () => (data.interests ? <C.Interests items={data.interests} /> : null),
  };

  const renderSlot = (key: SectionKey) => (
    <div key={key} className={`rb-slot rb-slot-${key}`}>
      {sections[key]()}
    </div>
  );

  const ordered = resolveSections(data);
  const sidebarSet = new Set(theme.sidebar ?? []);
  const mainSections = ordered.filter((key) => !sidebarSet.has(key));
  const asideSections = ordered.filter((key) => sidebarSet.has(key));

  return (
    <div
      className={["rb-resume", theme.className, className].filter(Boolean).join(" ")}
      style={{ ...tokensToCssVars(theme.tokens), ...style }}
    >
      <C.Header basics={data.basics} />
      {asideSections.length > 0 ? (
        <div className="rb-columns">
          <div className="rb-main">{mainSections.map(renderSlot)}</div>
          <aside className="rb-aside">{asideSections.map(renderSlot)}</aside>
        </div>
      ) : (
        ordered.map(renderSlot)
      )}
      <C.Footer basics={data.basics} />
    </div>
  );
}
