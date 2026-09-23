import type { ComponentType } from "react";
import type {
  Achievement,
  Award,
  Basics,
  Certification,
  Education,
  Experience,
  Language,
  OpenSource,
  Project,
  Publication,
  SectionKey,
  SkillGroup,
} from "@resume/schema";

/**
 * Design tokens — themes only control presentation, never data.
 * Every token becomes a `--rb-*` CSS variable on the resume root.
 */
export interface DesignTokens {
  colors: {
    primary: string;
    text: string;
    muted: string;
    faint: string;
    border: string;
    background: string;
  };
  font: {
    body: string;
    heading: string;
    mono: string;
  };
  /** Typography scale, largest to smallest. */
  fontSize: {
    displayXl: string;
    display: string;
    heading: string;
    title: string;
    body: string;
    small: string;
    caption: string;
  };
  spacing: {
    page: string;
    sectionGap: string;
    itemGap: string;
    large: string;
    medium: string;
    small: string;
  };
  radius: string;
  lineHeight: string;
  headingLetterSpacing: string;
  headingTransform: "none" | "uppercase" | "capitalize";
}

export interface HeaderProps {
  basics: Basics;
}
export interface SummaryProps {
  summary: string;
}
export interface SkillsProps {
  skills: SkillGroup[];
}
export interface ExperienceProps {
  items: Experience[];
}
export interface ProjectsProps {
  items: Project[];
}
export interface EducationProps {
  items: Education[];
}
export interface CertificationsProps {
  items: Certification[];
}
export interface AchievementsProps {
  items: Achievement[];
}
export interface AwardsProps {
  items: Award[];
}
export interface PublicationsProps {
  items: Publication[];
}
export interface OpenSourceProps {
  items: OpenSource[];
}
export interface LanguagesProps {
  items: Language[];
}
export interface InterestsProps {
  items: string[];
}
export interface FooterProps {
  basics: Basics;
}

/**
 * Every theme exports the full set of section components.
 * Components never access resume JSON directly — only typed props.
 */
export interface ThemeComponents {
  Header: ComponentType<HeaderProps>;
  Summary: ComponentType<SummaryProps>;
  Skills: ComponentType<SkillsProps>;
  Experience: ComponentType<ExperienceProps>;
  Projects: ComponentType<ProjectsProps>;
  Education: ComponentType<EducationProps>;
  Certifications: ComponentType<CertificationsProps>;
  Achievements: ComponentType<AchievementsProps>;
  Awards: ComponentType<AwardsProps>;
  Publications: ComponentType<PublicationsProps>;
  OpenSource: ComponentType<OpenSourceProps>;
  Languages: ComponentType<LanguagesProps>;
  Interests: ComponentType<InterestsProps>;
  Footer: ComponentType<FooterProps>;
}

export interface Theme {
  id: string;
  name: string;
  /** Class applied to the resume root for theme-specific CSS. */
  className: string;
  tokens: DesignTokens;
  components: ThemeComponents;
  /**
   * Sections rendered in a narrow side column (two-column layouts).
   * Omit for single-column themes.
   */
  sidebar?: SectionKey[];
  /** Which side the sidebar sits on. Defaults to "right". */
  sidebarPosition?: "left" | "right";
  /** Render the Header inside the sidebar instead of across the top. */
  headerInSidebar?: boolean;
}

/** Flatten tokens into `--rb-*` CSS custom properties. */
export function tokensToCssVars(tokens: DesignTokens): Record<string, string> {
  return {
    "--rb-color-primary": tokens.colors.primary,
    "--rb-color-text": tokens.colors.text,
    "--rb-color-muted": tokens.colors.muted,
    "--rb-color-faint": tokens.colors.faint,
    "--rb-color-border": tokens.colors.border,
    "--rb-color-background": tokens.colors.background,
    "--rb-font-body": tokens.font.body,
    "--rb-font-heading": tokens.font.heading,
    "--rb-font-mono": tokens.font.mono,
    "--rb-text-display-xl": tokens.fontSize.displayXl,
    "--rb-text-display": tokens.fontSize.display,
    "--rb-text-heading": tokens.fontSize.heading,
    "--rb-text-title": tokens.fontSize.title,
    "--rb-text-body": tokens.fontSize.body,
    "--rb-text-small": tokens.fontSize.small,
    "--rb-text-caption": tokens.fontSize.caption,
    "--rb-space-page": tokens.spacing.page,
    "--rb-space-section": tokens.spacing.sectionGap,
    "--rb-space-item": tokens.spacing.itemGap,
    "--rb-space-lg": tokens.spacing.large,
    "--rb-space-md": tokens.spacing.medium,
    "--rb-space-sm": tokens.spacing.small,
    "--rb-radius": tokens.radius,
    "--rb-line-height": tokens.lineHeight,
    "--rb-heading-tracking": tokens.headingLetterSpacing,
    "--rb-heading-transform": tokens.headingTransform,
  };
}
