export interface FontOption {
  id: string;
  name: string;
  /** null → keep the theme's own fonts */
  stack: string | null;
}

export const FONT_OPTIONS: FontOption[] = [
  { id: "theme", name: "Theme default", stack: null },
  { id: "inter", name: "Inter", stack: "'Inter', 'Helvetica Neue', Arial, sans-serif" },
  { id: "poppins", name: "Poppins", stack: "'Poppins', 'Inter', 'Helvetica Neue', Arial, sans-serif" },
  { id: "lato", name: "Lato", stack: "'Lato', 'Helvetica Neue', Arial, sans-serif" },
  { id: "space-grotesk", name: "Space Grotesk", stack: "'Space Grotesk', 'Inter', Arial, sans-serif" },
  { id: "plex", name: "IBM Plex Sans", stack: "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif" },
  { id: "system", name: "System UI", stack: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" },
  { id: "lora", name: "Lora (serif)", stack: "'Lora', Georgia, 'Times New Roman', serif" },
  { id: "source-serif", name: "Source Serif (serif)", stack: "'Source Serif 4', Georgia, 'Times New Roman', serif" },
  { id: "georgia", name: "Georgia (serif)", stack: "Georgia, 'Times New Roman', serif" },
  { id: "jetbrains-mono", name: "JetBrains Mono (mono)", stack: "'JetBrains Mono', 'SF Mono', Menlo, monospace" },
  { id: "plex-mono", name: "IBM Plex Mono (mono)", stack: "'IBM Plex Mono', Menlo, Consolas, monospace" },
  { id: "space-mono", name: "Space Mono (mono)", stack: "'Space Mono', Menlo, Consolas, monospace" },
  { id: "fira-code", name: "Fira Code (mono)", stack: "'Fira Code', Menlo, Consolas, monospace" },
];

export function getFont(id: string): FontOption {
  return FONT_OPTIONS.find((font) => font.id === id) ?? FONT_OPTIONS[0];
}
