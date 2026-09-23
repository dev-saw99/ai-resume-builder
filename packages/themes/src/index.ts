import type { Theme } from "@resume/ui";
import { academic } from "./academic";
import { anthropic } from "./anthropic";
import { apple } from "./apple";
import { atlas } from "./atlas";
import { banner } from "./banner";
import { editorial } from "./editorial";
import { executive } from "./executive";
import { github } from "./github";
import { google } from "./google";
import { ivory } from "./ivory";
import { linear } from "./linear";
import { meta } from "./meta";
import { midnight } from "./midnight";
import { minimal } from "./minimal";
import { mono } from "./mono";
import { netflix } from "./netflix";
import { nordic } from "./nordic";
import { notion } from "./notion";
import { ocean } from "./ocean";
import { openai } from "./openai";
import { slate } from "./slate";
import { stripe } from "./stripe";
import { sunset } from "./sunset";
import { terminal } from "./terminal";
import { timeline } from "./timeline";
import { violet } from "./violet";
import { xai } from "./xai";

export {
  academic,
  anthropic,
  apple,
  atlas,
  banner,
  editorial,
  executive,
  github,
  google,
  ivory,
  linear,
  meta,
  midnight,
  minimal,
  mono,
  netflix,
  nordic,
  notion,
  ocean,
  openai,
  slate,
  stripe,
  sunset,
  terminal,
  timeline,
  violet,
  xai,
};

/** Theme registry — third-party themes can be merged in by the app. */
// Ordered by popularity (most to least), so the theme picker lists favorites first.
export const themes: Record<string, Theme> = Object.fromEntries(
  [
    minimal, linear, github, stripe, notion, apple, violet, executive, academic,
    mono, ivory, editorial, google, anthropic, openai,
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
  return themes[id] ?? violet;
}
