import type { Theme } from "@resume/ui";
import { anthropic } from "./anthropic";
import { atlas } from "./atlas";
import { banner } from "./banner";
import { google } from "./google";
import { meta } from "./meta";
import { midnight } from "./midnight";
import { netflix } from "./netflix";
import { nordic } from "./nordic";
import { ocean } from "./ocean";
import { openai } from "./openai";
import { slate } from "./slate";
import { sunset } from "./sunset";
import { terminal } from "./terminal";
import { timeline } from "./timeline";
import { xai } from "./xai";

export {
  anthropic,
  atlas,
  banner,
  google,
  meta,
  midnight,
  netflix,
  nordic,
  ocean,
  openai,
  slate,
  sunset,
  terminal,
  timeline,
  xai,
};

/** Theme registry — third-party themes can be merged in by the app. */
// Ordered by popularity (most to least), so the theme picker lists favorites first.
export const themes: Record<string, Theme> = Object.fromEntries(
  [
    google, anthropic, openai,
    // Two-column layouts
    atlas, ocean, slate, nordic,
    // Graphical layouts
    banner, timeline, sunset,
    // Dark themes
    midnight, terminal,
    netflix, meta, xai,
  ].map((theme) => [theme.id, theme]),
);

export const themeList: Theme[] = Object.values(themes);

export function getTheme(id: string): Theme {
  return themes[id] ?? google;
}
