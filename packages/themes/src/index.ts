import type { Theme } from "@resume/ui";
import { anthropic } from "./anthropic";
import { atlas } from "./atlas";
import { executive } from "./executive";
import { github } from "./github";
import { google } from "./google";
import { ivory } from "./ivory";
import { linear } from "./linear";
import { meta } from "./meta";
import { minimal } from "./minimal";
import { mono } from "./mono";
import { netflix } from "./netflix";
import { openai } from "./openai";
import { stripe } from "./stripe";
import { violet } from "./violet";
import { xai } from "./xai";

export {
  anthropic,
  atlas,
  executive,
  github,
  google,
  ivory,
  linear,
  meta,
  minimal,
  mono,
  netflix,
  openai,
  stripe,
  violet,
  xai,
};

/** Theme registry — third-party themes can be merged in by the app. */
// Ordered by popularity (most to least), so the theme picker lists favorites first.
export const themes: Record<string, Theme> = {
  [minimal.id]: minimal,
  [linear.id]: linear,
  [github.id]: github,
  [stripe.id]: stripe,
  [violet.id]: violet,
  [executive.id]: executive,
  [mono.id]: mono,
  [ivory.id]: ivory,
  [google.id]: google,
  [anthropic.id]: anthropic,
  [openai.id]: openai,
  [atlas.id]: atlas,
  [netflix.id]: netflix,
  [meta.id]: meta,
  [xai.id]: xai,
};

export const themeList: Theme[] = Object.values(themes);

export function getTheme(id: string): Theme {
  return themes[id] ?? violet;
}
