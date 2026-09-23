import type { MarginPreset, PaperSize } from "@resume/pdf";
import { getTheme, themeList } from "@resume/themes";
import { FONT_OPTIONS } from "../fonts";
import { useAppStore } from "../store";

export function TopBar({ onPrint }: { onPrint: () => void }) {
  const themeId = useAppStore((s) => s.themeId);
  const fontId = useAppStore((s) => s.fontId);
  const bgColor = useAppStore((s) => s.bgColor);
  const paperSize = useAppStore((s) => s.paperSize);
  const setThemeId = useAppStore((s) => s.setThemeId);
  const setFontId = useAppStore((s) => s.setFontId);
  const setBgColor = useAppStore((s) => s.setBgColor);
  const setPaperSize = useAppStore((s) => s.setPaperSize);
  const marginPreset = useAppStore((s) => s.marginPreset);
  const setMarginPreset = useAppStore((s) => s.setMarginPreset);

  const themeBg = getTheme(themeId).tokens.colors.background;

  return (
    <header className="app-chrome flex items-center gap-4 border-b border-zinc-200 bg-white px-4 py-2.5">
      <h1 className="text-sm font-semibold tracking-tight text-zinc-900">
        Resume Builder
        <span className="ml-2 hidden text-xs font-normal text-zinc-400 sm:inline">
          resumes as code
        </span>
      </h1>

      <div className="ml-auto flex items-center gap-2">
        <label className="flex items-center gap-1.5 text-xs text-zinc-500">
          Theme
          <select
            value={themeId}
            onChange={(e) => setThemeId(e.target.value)}
            className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs font-medium text-zinc-800"
          >
            {themeList.map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-1.5 text-xs text-zinc-500">
          Font
          <select
            value={fontId}
            onChange={(e) => setFontId(e.target.value)}
            className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs font-medium text-zinc-800"
          >
            {FONT_OPTIONS.map((font) => (
              <option key={font.id} value={font.id}>
                {font.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-1.5 text-xs text-zinc-500">
          Bg
          <input
            type="color"
            value={bgColor ?? themeBg}
            onChange={(e) => setBgColor(e.target.value)}
            title="Page background color"
            className="h-6 w-8 cursor-pointer rounded-md border border-zinc-300 bg-white p-0.5"
          />
        </label>
        {bgColor ? (
          <button
            onClick={() => setBgColor(null)}
            title="Reset background to theme default"
            className="rounded px-1 text-xs text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
          >
            ↺
          </button>
        ) : null}

        <label className="flex items-center gap-1.5 text-xs text-zinc-500">
          Paper
          <select
            value={paperSize}
            onChange={(e) => setPaperSize(e.target.value as PaperSize)}
            className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs font-medium text-zinc-800"
          >
            <option value="a4">A4</option>
            <option value="letter">Letter</option>
          </select>
        </label>

        <label className="flex items-center gap-1.5 text-xs text-zinc-500">
          Margins
          <select
            value={marginPreset}
            onChange={(e) => setMarginPreset(e.target.value as MarginPreset)}
            className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs font-medium text-zinc-800"
          >
            <option value="none">None</option>
            <option value="narrow">Narrow</option>
            <option value="normal">Normal</option>
            <option value="wide">Wide</option>
          </select>
        </label>

        <button
          onClick={onPrint}
          className="rounded-md bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-700"
        >
          Download PDF
        </button>
      </div>
    </header>
  );
}
