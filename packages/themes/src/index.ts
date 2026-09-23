import type { Theme } from "@resume/ui";
import { anthropic } from "./anthropic";
import { atlas } from "./atlas";
import { aurora } from "./aurora";
import { banner } from "./banner";
import { bauhaus } from "./bauhaus";
import { blueprint } from "./blueprint";
import { brutalist } from "./brutalist";
import { cards } from "./cards";
import { coral } from "./coral";
import { dracula } from "./dracula";
import { eclipse } from "./eclipse";
import { forest } from "./forest";
import { google } from "./google";
import { indigo } from "./indigo";
import { meta } from "./meta";
import { midnight } from "./midnight";
import { netflix } from "./netflix";
import { nordic } from "./nordic";
import { obsidian } from "./obsidian";
import { ocean } from "./ocean";
import { openai } from "./openai";
import { parchment } from "./parchment";
import { slate } from "./slate";
import { sunset } from "./sunset";
import { synthwave } from "./synthwave";
import { terminal } from "./terminal";
import { timeline } from "./timeline";
import { twilight } from "./twilight";
import { xai } from "./xai";

export {
  anthropic,
  atlas,
  aurora,
  banner,
  bauhaus,
  blueprint,
  brutalist,
  cards,
  coral,
  dracula,
  eclipse,
  forest,
  google,
  indigo,
  meta,
  midnight,
  netflix,
  nordic,
  obsidian,
  ocean,
  openai,
  parchment,
  slate,
  sunset,
  synthwave,
  terminal,
  timeline,
  twilight,
  xai,
};

/** Theme registry — third-party themes can be merged in by the app. */
export const themes: Record<string, Theme> = Object.fromEntries(
  [
    google, anthropic, openai, netflix, meta, xai,
    // Two-column layouts
    atlas, ocean, slate, nordic, indigo, coral, parchment,
    // Graphical layouts
    banner, timeline, sunset, aurora, cards, bauhaus, brutalist,
    // Dark themes
    midnight, terminal, dracula, obsidian, synthwave, forest,
    // Dark two-column
    eclipse, twilight,
    blueprint,
  ].map((theme) => [theme.id, theme]),
);

export const themeList: Theme[] = Object.values(themes);

export function getTheme(id: string): Theme {
  return themes[id] ?? google;
}
