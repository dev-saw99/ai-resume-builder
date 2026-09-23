import { useRef, type KeyboardEvent, type ReactNode } from "react";
import type { MarginPreset, PaperSize } from "@resume/pdf";
import { getTheme } from "@resume/themes";
import { FONT_OPTIONS, type FontGroup } from "../fonts";
import { useAppStore } from "../store";

const FONT_GROUPS: FontGroup[] = ["Sans", "Serif", "Display", "Mono"];

const selectClass =
  "h-8 rounded-lg border border-zinc-200 bg-white pl-2.5 pr-7 text-xs font-medium text-zinc-800 shadow-sm outline-none transition hover:border-zinc-300 focus-visible:border-indigo-400 focus-visible:ring-2 focus-visible:ring-indigo-200";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-500">
      <span className="hidden xl:inline">{label}</span>
      {children}
    </label>
  );
}

/** Two-option segmented control (radiogroup). */
function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const index = options.findIndex((option) => option.value === value);

  // Standard radiogroup keys: arrows move + select, focus follows.
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = (index + step + options.length) % options.length;
    onChange(options[next].value);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label={label}
      onKeyDown={onKeyDown}
      className="flex h-8 items-center rounded-lg border border-zinc-200 bg-zinc-100 p-0.5 shadow-inner"
    >
      {options.map((option, i) => (
        <button
          key={option.value}
          ref={(node) => {
            refs.current[i] = node;
          }}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          tabIndex={value === option.value ? 0 : -1}
          onClick={() => onChange(option.value)}
          className={[
            "h-full rounded-md px-2.5 text-xs font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-indigo-300",
            value === option.value
              ? "bg-white text-zinc-900 shadow-sm"
              : "text-zinc-500 hover:text-zinc-800",
          ].join(" ")}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export function TopBar({ onPrint }: { onPrint: () => void }) {
  const themeId = useAppStore((s) => s.themeId);
  const fontId = useAppStore((s) => s.fontId);
  const bgColor = useAppStore((s) => s.bgColor);
  const paperSize = useAppStore((s) => s.paperSize);
  const setFontId = useAppStore((s) => s.setFontId);
  const setBgColor = useAppStore((s) => s.setBgColor);
  const setPaperSize = useAppStore((s) => s.setPaperSize);
  const marginPreset = useAppStore((s) => s.marginPreset);
  const setMarginPreset = useAppStore((s) => s.setMarginPreset);

  const themeBg = getTheme(themeId).tokens.colors.background;

  return (
    <header className="app-chrome flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-zinc-200/80 bg-white px-4 py-2.5">
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden="true"
          className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-[13px] font-bold text-white shadow-sm"
        >
          {"{ }"}
        </span>
        <h1 className="leading-tight">
          <span className="block text-sm font-semibold tracking-tight text-zinc-900">Resume Builder</span>
          <span className="hidden text-[11px] text-zinc-400 sm:block">JSON in, ATS-friendly PDF out</span>
        </h1>
      </div>

      <div className="ml-auto flex flex-wrap items-center gap-2">
        <Field label="Font">
          <select
            value={fontId}
            onChange={(e) => setFontId(e.target.value)}
            aria-label="Font"
            className={`${selectClass} w-40`}
          >
            {FONT_OPTIONS.filter((font) => font.group === null).map((font) => (
              <option key={font.id} value={font.id}>
                {font.name}
              </option>
            ))}
            {FONT_GROUPS.map((group) => (
              <optgroup key={group} label={group}>
                {FONT_OPTIONS.filter((font) => font.group === group).map((font) => (
                  <option key={font.id} value={font.id}>
                    {font.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </Field>

        <div className="flex items-center gap-1">
          <input
            type="color"
            value={bgColor ?? themeBg}
            onChange={(e) => setBgColor(e.target.value)}
            title="Page background color"
            aria-label="Page background color"
            className="h-8 w-8 cursor-pointer rounded-lg border border-zinc-200 bg-white p-1 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-indigo-200"
          />
          {bgColor ? (
            <button
              type="button"
              onClick={() => setBgColor(null)}
              title="Reset background to theme default"
              aria-label="Reset background to theme default"
              className="grid h-8 w-6 place-items-center rounded-md text-sm text-zinc-400 outline-none hover:bg-zinc-100 hover:text-zinc-700 focus-visible:ring-2 focus-visible:ring-indigo-200"
            >
              ↺
            </button>
          ) : null}
        </div>

        <Segmented<PaperSize>
          label="Paper size"
          value={paperSize}
          options={[
            { value: "a4", label: "A4" },
            { value: "letter", label: "Letter" },
          ]}
          onChange={setPaperSize}
        />

        <Field label="Margins">
          <select
            value={marginPreset}
            onChange={(e) => setMarginPreset(e.target.value as MarginPreset)}
            aria-label="Page margins"
            className={`${selectClass} w-28`}
          >
            <option value="none">No margins</option>
            <option value="narrow">Narrow</option>
            <option value="normal">Normal</option>
            <option value="wide">Wide</option>
          </select>
        </Field>

        <button
          type="button"
          onClick={onPrint}
          className="flex h-8 items-center gap-1.5 rounded-lg bg-zinc-900 px-3.5 text-xs font-semibold text-white shadow-sm outline-none transition hover:bg-zinc-700 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 active:scale-[0.98]"
        >
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M8 2v8m0 0L5 7m3 3 3-3M3 13h10" />
          </svg>
          Download PDF
        </button>
      </div>
    </header>
  );
}
