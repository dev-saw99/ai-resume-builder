export type FontGroup = "Sans" | "Serif" | "Display" | "Mono";

export interface FontOption {
  id: string;
  name: string;
  group: FontGroup | null;
  /** null → keep the theme's own fonts */
  stack: string | null;
}

export const FONT_OPTIONS: FontOption[] = [
  { id: "theme", name: "Theme default", group: null, stack: null },
  { id: "inter", name: "Inter", group: "Sans", stack: "'Inter', 'Helvetica Neue', Arial, sans-serif" },
  { id: "dm-sans", name: "DM Sans", group: "Sans", stack: "'DM Sans', Arial, sans-serif" },
  { id: "manrope", name: "Manrope", group: "Sans", stack: "'Manrope', Arial, sans-serif" },
  { id: "outfit", name: "Outfit", group: "Sans", stack: "'Outfit', Arial, sans-serif" },
  { id: "sora", name: "Sora", group: "Sans", stack: "'Sora', Arial, sans-serif" },
  { id: "plus-jakarta", name: "Plus Jakarta Sans", group: "Sans", stack: "'Plus Jakarta Sans', Arial, sans-serif" },
  { id: "work-sans", name: "Work Sans", group: "Sans", stack: "'Work Sans', Arial, sans-serif" },
  { id: "nunito", name: "Nunito", group: "Sans", stack: "'Nunito', Arial, sans-serif" },
  { id: "raleway", name: "Raleway", group: "Sans", stack: "'Raleway', Arial, sans-serif" },
  { id: "montserrat", name: "Montserrat", group: "Sans", stack: "'Montserrat', Arial, sans-serif" },
  { id: "poppins", name: "Poppins", group: "Sans", stack: "'Poppins', 'Inter', Arial, sans-serif" },
  { id: "lato", name: "Lato", group: "Sans", stack: "'Lato', 'Helvetica Neue', Arial, sans-serif" },
  { id: "space-grotesk", name: "Space Grotesk", group: "Sans", stack: "'Space Grotesk', 'Inter', Arial, sans-serif" },
  { id: "plex", name: "IBM Plex Sans", group: "Sans", stack: "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif" },
  { id: "system", name: "System UI", group: "Sans", stack: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" },
  { id: "playfair", name: "Playfair Display", group: "Serif", stack: "'Playfair Display', Georgia, 'Times New Roman', serif" },
  { id: "fraunces", name: "Fraunces", group: "Serif", stack: "'Fraunces', Georgia, 'Times New Roman', serif" },
  { id: "cormorant", name: "Cormorant Garamond", group: "Serif", stack: "'Cormorant Garamond', Georgia, 'Times New Roman', serif" },
  { id: "crimson", name: "Crimson Pro", group: "Serif", stack: "'Crimson Pro', Georgia, 'Times New Roman', serif" },
  { id: "libre-baskerville", name: "Libre Baskerville", group: "Serif", stack: "'Libre Baskerville', Georgia, 'Times New Roman', serif" },
  { id: "merriweather", name: "Merriweather", group: "Serif", stack: "'Merriweather', Georgia, 'Times New Roman', serif" },
  { id: "lora", name: "Lora", group: "Serif", stack: "'Lora', Georgia, 'Times New Roman', serif" },
  { id: "source-serif", name: "Source Serif", group: "Serif", stack: "'Source Serif 4', Georgia, 'Times New Roman', serif" },
  { id: "georgia", name: "Georgia", group: "Serif", stack: "Georgia, Georgia, 'Times New Roman', serif" },
  { id: "bricolage", name: "Bricolage Grotesque", group: "Display", stack: "'Bricolage Grotesque', Arial, sans-serif" },
  { id: "syne", name: "Syne", group: "Display", stack: "'Syne', Arial, sans-serif" },
  { id: "unbounded", name: "Unbounded", group: "Display", stack: "'Unbounded', Arial, sans-serif" },
  { id: "bebas", name: "Bebas Neue", group: "Display", stack: "'Bebas Neue', Arial, sans-serif" },
  { id: "archivo", name: "Archivo", group: "Display", stack: "'Archivo', Arial, sans-serif" },
  { id: "jetbrains-mono", name: "JetBrains Mono", group: "Mono", stack: "'JetBrains Mono', 'SF Mono', Menlo, Consolas, monospace" },
  { id: "plex-mono", name: "IBM Plex Mono", group: "Mono", stack: "'IBM Plex Mono', Menlo, Consolas, monospace" },
  { id: "space-mono", name: "Space Mono", group: "Mono", stack: "'Space Mono', Menlo, Consolas, monospace" },
  { id: "fira-code", name: "Fira Code", group: "Mono", stack: "'Fira Code', Menlo, Consolas, monospace" },
  { id: "dm-mono", name: "DM Mono", group: "Mono", stack: "'DM Mono', Menlo, Consolas, monospace" },
  { id: "roboto-mono", name: "Roboto Mono", group: "Mono", stack: "'Roboto Mono', Menlo, Consolas, monospace" },
];

export function getFont(id: string): FontOption {
  return FONT_OPTIONS.find((font) => font.id === id) ?? FONT_OPTIONS[0];
}
