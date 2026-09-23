import { z } from "zod";

/**
 * Resume Schema — the single source of truth.
 *
 * The resume is data. Never HTML, never JSX, never editor state.
 * Everything is optional except `basics`.
 */

export const ProfileSchema = z.object({
  network: z.string(),
  username: z.string().optional(),
  url: z.string().url(),
});

export const BasicsSchema = z.object({
  name: z.string().min(1),
  label: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  url: z.string().url().optional(),
  location: z.string().optional(),
  profiles: z.array(ProfileSchema).optional(),
});

export const SkillGroupSchema = z.object({
  name: z.string(),
  keywords: z.array(z.string()),
});

export const ExperienceSchema = z.object({
  company: z.string(),
  position: z.string(),
  url: z.string().url().optional(),
  location: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
  summary: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
});

export const ProjectSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  url: z.string().url().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
});

export const EducationSchema = z.object({
  institution: z.string(),
  area: z.string().optional(),
  studyType: z.string().optional(),
  url: z.string().url().optional(),
  location: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  score: z.string().optional(),
  highlights: z.array(z.string()).optional(),
});

export const CertificationSchema = z.object({
  name: z.string(),
  issuer: z.string().optional(),
  date: z.string().optional(),
  url: z.string().url().optional(),
});

export const AchievementSchema = z.object({
  title: z.string(),
  date: z.string().optional(),
  summary: z.string().optional(),
});

export const AwardSchema = z.object({
  title: z.string(),
  awarder: z.string().optional(),
  date: z.string().optional(),
  summary: z.string().optional(),
});

export const PublicationSchema = z.object({
  name: z.string(),
  publisher: z.string().optional(),
  releaseDate: z.string().optional(),
  url: z.string().url().optional(),
  summary: z.string().optional(),
});

export const OpenSourceSchema = z.object({
  name: z.string(),
  role: z.string().optional(),
  url: z.string().url().optional(),
  description: z.string().optional(),
  highlights: z.array(z.string()).optional(),
});

export const LanguageSchema = z.object({
  language: z.string(),
  fluency: z.string().optional(),
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
  sectionOrder: z.array(SectionKeySchema).optional(),
  /** Explicitly hide sections even if data is present. */
  hiddenSections: z.array(SectionKeySchema).optional(),
});

export const ResumeSchema = z.object({
  basics: BasicsSchema,
  summary: z.string().optional(),
  skills: z.array(SkillGroupSchema).optional(),
  experience: z.array(ExperienceSchema).optional(),
  projects: z.array(ProjectSchema).optional(),
  education: z.array(EducationSchema).optional(),
  certifications: z.array(CertificationSchema).optional(),
  achievements: z.array(AchievementSchema).optional(),
  awards: z.array(AwardSchema).optional(),
  publications: z.array(PublicationSchema).optional(),
  openSource: z.array(OpenSourceSchema).optional(),
  languages: z.array(LanguageSchema).optional(),
  interests: z.array(z.string()).optional(),
  meta: MetaSchema.optional(),
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
