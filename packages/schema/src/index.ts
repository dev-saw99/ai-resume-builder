import { z } from "zod";

/**
 * Resume Schema — the single source of truth.
 *
 * The resume is data. Never HTML, never JSX, never editor state.
 * Everything is optional except `basics`.
 */

export const ProfileSchema = z.object({
  network: z.string().describe('Platform name, e.g. "GitHub", "LinkedIn".'),
  username: z.string().optional().describe("Handle on the platform."),
  url: z.string().url().describe("Full profile URL."),
});

export const BasicsSchema = z.object({
  name: z.string().min(1).describe("Full name."),
  label: z.string().optional().describe('Headline under the name, e.g. "Senior Software Engineer".'),
  email: z.string().email().optional().describe("Contact email address."),
  phone: z.string().optional().describe("Phone number in any readable format."),
  url: z.string().url().optional().describe("Personal website or portfolio."),
  location: z.string().optional().describe('City and country, e.g. "Bengaluru, India".'),
  profiles: z.array(ProfileSchema).optional().describe("Social / coding profiles (GitHub, LinkedIn, ...)."),
});

export const SkillGroupSchema = z.object({
  name: z.string().describe('Group heading, e.g. "Languages", "Cloud".'),
  keywords: z.array(z.string()).describe("Skills in this group."),
});

export const ExperienceSchema = z.object({
  company: z.string().describe("Employer name. Consecutive entries with the same company may be grouped by some themes."),
  position: z.string().describe("Job title."),
  url: z.string().url().optional().describe("Company website."),
  location: z.string().optional().describe("Work location."),
  startDate: z.string().describe('Date as "YYYY" or "YYYY-MM", e.g. "2022-04".'),
  endDate: z.string().optional().describe('Date as "YYYY" or "YYYY-MM", e.g. "2022-04". Omit for a current role ("Present").'),
  summary: z.string().optional().describe("One or two lines describing the role."),
  highlights: z.array(z.string()).optional().describe("Achievement bullets. Supports **bold** inline."),
  keywords: z.array(z.string()).optional().describe("Technologies used in this role."),
});

export const ProjectSchema = z.object({
  name: z.string().describe("Project name."),
  description: z.string().optional().describe("Short description."),
  url: z.string().url().optional().describe("Link to the repo or live project."),
  startDate: z.string().optional().describe('Date as "YYYY" or "YYYY-MM", e.g. "2022-04".'),
  endDate: z.string().optional().describe('Date as "YYYY" or "YYYY-MM", e.g. "2022-04".'),
  highlights: z.array(z.string()).optional().describe("Bullets about what you built / achieved."),
  keywords: z.array(z.string()).optional().describe("Technologies used."),
});

export const EducationSchema = z.object({
  institution: z.string().describe("School or university."),
  area: z.string().optional().describe('Field of study, e.g. "Computer Science".'),
  studyType: z.string().optional().describe('Degree, e.g. "B.Tech", "MSc".'),
  url: z.string().url().optional().describe("Institution website."),
  location: z.string().optional().describe("Campus location."),
  startDate: z.string().optional().describe('Date as "YYYY" or "YYYY-MM", e.g. "2022-04".'),
  endDate: z.string().optional().describe('Date as "YYYY" or "YYYY-MM", e.g. "2022-04".'),
  score: z.string().optional().describe('GPA / grade, e.g. "8.4/10".'),
  highlights: z.array(z.string()).optional().describe("Coursework, honors, activities."),
});

export const CertificationSchema = z.object({
  name: z.string().describe("Certification name."),
  issuer: z.string().optional().describe("Issuing organization."),
  date: z.string().optional().describe('Date as "YYYY" or "YYYY-MM", e.g. "2022-04".'),
  url: z.string().url().optional().describe("Credential verification link."),
});

export const AchievementSchema = z.object({
  title: z.string().describe("Achievement headline."),
  date: z.string().optional().describe('Date as "YYYY" or "YYYY-MM", e.g. "2022-04".'),
  summary: z.string().optional().describe("Context or impact."),
});

export const AwardSchema = z.object({
  title: z.string().describe("Award title."),
  awarder: z.string().optional().describe("Organization that gave the award."),
  date: z.string().optional().describe('Date as "YYYY" or "YYYY-MM", e.g. "2022-04".'),
  summary: z.string().optional().describe("Why you received it."),
});

export const PublicationSchema = z.object({
  name: z.string().describe("Title of the publication."),
  publisher: z.string().optional().describe("Journal, conference or website."),
  releaseDate: z.string().optional().describe('Date as "YYYY" or "YYYY-MM", e.g. "2022-04".'),
  url: z.string().url().optional().describe("Link to the publication."),
  summary: z.string().optional().describe("Short abstract."),
});

export const OpenSourceSchema = z.object({
  name: z.string().describe("Project or repository name."),
  role: z.string().optional().describe('Your role, e.g. "Maintainer", "Contributor".'),
  url: z.string().url().optional().describe("Repository URL."),
  description: z.string().optional().describe("What the project does."),
  highlights: z.array(z.string()).optional().describe("Your contributions."),
});

export const LanguageSchema = z.object({
  language: z.string().describe('Language name, e.g. "English".'),
  fluency: z.string().optional().describe('Proficiency, e.g. "Native", "Professional".'),
});

export const SECTION_KEYS = [
  "summary",
  "experience",
  "skills",
  "projects",
  "education",
  "certifications",
  "achievements",
  "awards",
  "publications",
  "openSource",
  "languages",
  "interests",
] as const;

export const SectionKeySchema = z.enum(SECTION_KEYS);

export const MetaSchema = z.object({
  /** Sections render in this order; omitted sections use the default order. */
  sectionOrder: z.array(SectionKeySchema).optional().describe("Render sections in this order; omitted sections use the default order."),
  /** Explicitly hide sections even if data is present. */
  hiddenSections: z.array(SectionKeySchema).optional().describe("Sections to hide even if data is present."),
});

export const ResumeSchema = z.object({
  $schema: z.string().optional().describe("Path or URL of the JSON Schema, for editor autocompletion."),
  basics: BasicsSchema.describe("Name and contact details. The only required section."),
  summary: z.string().optional().describe("Professional summary paragraph."),
  skills: z.array(SkillGroupSchema).optional().describe("Skills grouped by category."),
  experience: z.array(ExperienceSchema).optional().describe("Work history, most recent first."),
  projects: z.array(ProjectSchema).optional().describe("Personal or professional projects."),
  education: z.array(EducationSchema).optional().describe("Education history."),
  certifications: z.array(CertificationSchema).optional().describe("Professional certifications."),
  achievements: z.array(AchievementSchema).optional().describe("Notable achievements."),
  awards: z.array(AwardSchema).optional().describe("Awards and honors."),
  publications: z.array(PublicationSchema).optional().describe("Papers, articles, talks."),
  openSource: z.array(OpenSourceSchema).optional().describe("Open-source contributions."),
  languages: z.array(LanguageSchema).optional().describe("Spoken languages."),
  interests: z.array(z.string()).optional().describe("Personal interests."),
  meta: MetaSchema.optional().describe("Layout controls: section order and visibility."),
});

export type Profile = z.infer<typeof ProfileSchema>;
export type Basics = z.infer<typeof BasicsSchema>;
export type SkillGroup = z.infer<typeof SkillGroupSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type Certification = z.infer<typeof CertificationSchema>;
export type Achievement = z.infer<typeof AchievementSchema>;
export type Award = z.infer<typeof AwardSchema>;
export type Publication = z.infer<typeof PublicationSchema>;
export type OpenSource = z.infer<typeof OpenSourceSchema>;
export type Language = z.infer<typeof LanguageSchema>;
export type SectionKey = z.infer<typeof SectionKeySchema>;
export type ResumeMeta = z.infer<typeof MetaSchema>;
export type Resume = z.infer<typeof ResumeSchema>;

export type ValidationResult =
  | { success: true; data: Resume }
  | { success: false; errors: { path: string; message: string }[] };

/** Validate unknown input against the resume schema. */
export function validateResume(input: unknown): ValidationResult {
  const result = ResumeSchema.safeParse(input);
  if (result.success) return { success: true, data: result.data };
  return {
    success: false,
    errors: result.error.issues.map((issue) => ({
      path: issue.path.join(".") || "(root)",
      message: issue.message,
    })),
  };
}

/** Sections that have data, in render order, honoring meta overrides. */
export function resolveSections(resume: Resume): SectionKey[] {
  const order = resume.meta?.sectionOrder ?? [...SECTION_KEYS];
  const hidden = new Set(resume.meta?.hiddenSections ?? []);
  return order.filter((key) => {
    if (hidden.has(key)) return false;
    const value = resume[key];
    if (value == null) return false;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "string") return value.trim().length > 0;
    return true;
  });
}
