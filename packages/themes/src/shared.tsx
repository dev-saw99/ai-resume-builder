import type { SkillsProps } from "@resume/ui";
import { Section } from "@resume/ui";

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
