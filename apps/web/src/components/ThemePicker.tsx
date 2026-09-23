import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { themeList } from "@resume/themes";
import type { Theme } from "@resume/ui";
import { useAppStore } from "../store";

/** Miniature wireframe of a theme, drawn from its tokens and layout. */
function ThemeThumb({ theme }: { theme: Theme }) {
  const { colors } = theme.tokens;
  const dark = isDark(colors.background);
  const hint = theme.previewHint;
  const side = theme.sidebar?.length ? (theme.sidebarPosition === "left" ? "left" : "right") : null;
  const mainX = side === "left" ? 24 : 6;
  const mainW = side ? 30 : 48;
  const sideX = side === "left" ? 4 : 40;
  const line = (y: number, w: number, key: string, fill = colors.muted, opacity = 0.45) => (
    <rect key={key} x={mainX} y={y} width={w} height={1.7} rx={0.85} fill={fill} opacity={opacity} />
  );

  return (
    <svg viewBox="0 0 60 80" className="h-full w-full" aria-hidden="true">
      <rect width="60" height="80" fill={colors.background} />
      {theme.headerInSidebar ? (
        <>
          <rect x="3" y="3" width="19" height="74" rx="3" fill={hint === "colorSidebar" ? colors.primary : dark ? "#1e293b" : "#0f172a"} />
          <circle cx="12.5" cy="12" r="4.2" fill={hint === "colorSidebar" ? "#fff" : colors.primary} />
          <rect x="6.5" y="20" width="12" height="2.6" rx="1.3" fill="#fff" />
          <rect x="6.5" y="25" width="9" height="1.6" rx="0.8" fill={hint === "colorSidebar" ? "#c7d2fe" : colors.primary} />
          {[34, 40, 46, 56].map((y) => (
            <rect key={y} x="6.5" y={y} width={y % 12 ? 10 : 12} height="1.6" rx="0.8" fill="#94a3b8" opacity="0.8" />
          ))}
          <rect x="27" y="7" width="8" height="2" rx="1" fill={colors.primary} />
          {[12, 16, 20, 24].map((y) => (
            <rect key={y} x="27" y={y} width={y % 8 ? 26 : 22} height="1.6" rx="0.8" fill={colors.muted} opacity="0.45" />
          ))}
          <rect x="27" y="34" width="8" height="2" rx="1" fill={colors.primary} />
          {[39, 43, 47, 51, 55, 59].map((y) => (
            <rect key={y} x="27" y={y} width={y % 8 ? 26 : 20} height="1.6" rx="0.8" fill={colors.muted} opacity="0.45" />
          ))}
        </>
      ) : (
        <>
          {hint === "mesh" ? (
            <>
              <defs>
                <linearGradient id="thumb-mesh" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#c7d2fe" />
                  <stop offset="1" stopColor="#fbcfe8" />
                </linearGradient>
              </defs>
              <rect x="4" y="4" width="52" height="17" rx="3" fill="url(#thumb-mesh)" />
            </>
          ) : null}
          {hint === "cards"
            ? [26, 46, 62].map((top) => (
                <rect key={top} x="3.5" y={top - 3} width="53" height={top === 62 ? 16 : 17} rx="2.5" fill="#fff" stroke={colors.border} strokeWidth="0.6" />
              ))
            : null}
          {hint === "frame" ? (
            <>
              <rect x="7.5" y="5.5" width="46" height="13" fill={colors.text} />
              <rect x="6" y="4" width="46" height="13" fill="#ffde59" stroke={colors.text} strokeWidth="1.2" />
            </>
          ) : null}
          {hint === "shapes" ? (
            <>
              <circle cx="38" cy="9" r="3.2" fill="#d62828" />
              <rect x="43" y="5.8" width="6.4" height="6.4" fill="#f4b400" />
              <polygon points="50.5,12.2 57,12.2 57,5.8" fill="#1d4ed8" />
              <rect x="4" y="20" width="52" height="1.2" fill={colors.text} />
            </>
          ) : null}
          {theme.previewHint === "banner" ? (
            <rect x="4" y="4" width="52" height="17" rx="3" fill={colors.primary} />
          ) : null}
          <rect
            x={6}
            y="7.5"
            width="26"
            height="3.6"
            rx="1.8"
            fill={theme.previewHint === "banner" ? "#fff" : colors.text}
          />
          <rect
            x={6}
            y="14"
            width="18"
            height="2.2"
            rx="1.1"
            fill={theme.previewHint === "banner" ? "#fff" : colors.primary}
            opacity={theme.previewHint === "banner" ? 0.8 : 1}
          />
          {side ? (
            <rect
              x={sideX}
              y="24"
              width="16"
              height="52"
              rx="2.5"
              fill={colors.primary}
              opacity={dark ? 0.2 : 0.12}
            />
          ) : null}
          {[26, 46, 62].map((top, i) => (
            <g key={top}>
              <rect x={mainX} y={top} width="11" height="2.2" rx="1.1" fill={colors.primary} />
              {line(top + 5, mainW, `a${i}`)}
              {line(top + 9, mainW - 6, `b${i}`)}
              {i < 2 ? line(top + 13, mainW - 2, `c${i}`) : null}
            </g>
          ))}
          {theme.previewHint === "timeline" ? (
            <>
              <rect x="4.2" y="28" width="0.9" height="30" fill={colors.border} />
              <circle cx="4.6" cy="31" r="1.7" fill={colors.background} stroke={colors.primary} strokeWidth="0.9" />
              <circle cx="4.6" cy="51" r="1.7" fill={colors.background} stroke={colors.primary} strokeWidth="0.9" />
            </>
          ) : null}
          {side ? (
            <>
              {[29, 34, 39, 44, 49].map((y) => (
                <rect key={y} x={sideX + 2.5} y={y} width={y % 2 ? 9 : 11} height="1.6" rx="0.8" fill={colors.muted} opacity="0.55" />
              ))}
            </>
          ) : null}
        </>
      )}
    </svg>
  );
}

function isDark(hex: string): boolean {
  const value = hex.replace("#", "");
  if (value.length !== 6) return false;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16));
  return (r * 299 + g * 587 + b * 114) / 1000 < 110;
}

function layoutLabel(theme: Theme): string | null {
  if (theme.sidebar?.length || theme.headerInSidebar) return "2-col";
  if (isDark(theme.tokens.colors.background)) return "dark";
  return null;
}

const COLLAPSE_KEY = "resume-builder:theme-sidebar-collapsed";

function readCollapsed(): boolean {
  try {
    return window.localStorage.getItem(COLLAPSE_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * Collapsible theme sidebar (right side, top to bottom). A radiogroup with
 * roving focus: arrow keys / Home / End move the selection, and selecting a
 * theme re-renders the resume immediately. `[` and `]` cycle themes from
 * anywhere outside a text field; `\` toggles the sidebar.
 * On narrow screens it becomes a horizontal strip above the preview.
 */
export function ThemePicker() {
  const themeId = useAppStore((s) => s.themeId);
  const setThemeId = useAppStore((s) => s.setThemeId);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef(new Map<string, HTMLButtonElement>());
  const [collapsed, setCollapsed] = useState(readCollapsed);

  const index = Math.max(0, themeList.findIndex((theme) => theme.id === themeId));
  const current = themeList[index];

  const toggle = () =>
    setCollapsed((value) => {
      try {
        window.localStorage.setItem(COLLAPSE_KEY, value ? "0" : "1");
      } catch {
        // storage unavailable — state still works for this session
      }
      return !value;
    });

  const select = (next: number, focus: boolean) => {
    const theme = themeList[(next + themeList.length) % themeList.length];
    setThemeId(theme.id);
    if (focus) itemRefs.current.get(theme.id)?.focus({ preventScroll: true });
  };

  // Keep the selected card centered in the list (either axis; the browser clamps).
  useEffect(() => {
    const list = listRef.current;
    const el = itemRefs.current.get(themeId);
    if (!list || !el || collapsed) return;
    list.scrollTo({
      left: el.offsetLeft - list.clientWidth / 2 + el.clientWidth / 2,
      top: el.offsetTop - list.clientHeight / 2 + el.clientHeight / 2,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }, [themeId, collapsed]);

  // Keep the URL shareable: ?theme=<id>
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("theme", themeId);
    window.history.replaceState(null, "", url);
  }, [themeId]);

  // `[` / `]` cycle themes, `\` toggles the sidebar — never while typing in a field.
  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) return;
      if (event.key === "[") select(index - 1, false);
      else if (event.key === "]") select(index + 1, false);
      else if (event.key === "\\") toggle();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowDown: index + 1,
      ArrowLeft: index - 1,
      ArrowUp: index - 1,
      Home: 0,
      End: themeList.length - 1,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    select(moves[event.key], true);
  };

  return (
    <aside
      aria-label="Themes"
      className={[
        "app-chrome order-first flex min-h-0 flex-col border-zinc-200/80 bg-zinc-50/80 transition-[width] duration-200",
        "border-b md:order-none md:border-b-0 md:border-l",
        collapsed ? "md:w-12" : "md:w-[200px]",
      ].join(" ")}
    >
      <div
        className={[
          "flex items-center gap-2 px-3 py-2",
          collapsed ? "md:flex-col md:px-0 md:py-3" : "justify-between",
        ].join(" ")}
      >
        <div className={collapsed ? "md:hidden" : ""}>
          <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">Theme</span>
          <span className="block text-sm font-semibold leading-tight text-zinc-900" aria-live="polite">
            {current.name}
          </span>
          <span className="block text-[10px] text-zinc-400">
            {index + 1} / {themeList.length}
          </span>
        </div>

        <button
          type="button"
          onClick={toggle}
          aria-expanded={!collapsed}
          aria-controls="theme-list"
          aria-label={collapsed ? "Expand theme sidebar" : "Collapse theme sidebar"}
          title={`${collapsed ? "Expand" : "Collapse"} themes (\\)`}
          className="ml-auto grid h-7 w-7 shrink-0 place-items-center rounded-md text-zinc-500 outline-none transition hover:bg-zinc-200/70 hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-indigo-400 md:ml-0"
        >
          <svg
            viewBox="0 0 16 16"
            className={["h-4 w-4 transition-transform duration-200", collapsed ? "" : "md:rotate-180"].join(" ")}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M10 3 5 8l5 5" />
          </svg>
        </button>

        {collapsed ? (
          <span
            aria-hidden="true"
            className="hidden select-none text-[11px] font-semibold tracking-wide text-zinc-500 [writing-mode:vertical-rl] md:block"
          >
            {current.name}
          </span>
        ) : null}
      </div>

      <div
        id="theme-list"
        ref={listRef}
        role="radiogroup"
        aria-label="Resume theme"
        hidden={collapsed}
        onKeyDown={onKeyDown}
        className="theme-strip relative flex min-h-0 min-w-0 flex-1 gap-2 overflow-x-auto px-3 pb-3 md:flex-col md:overflow-y-auto md:overflow-x-hidden md:pb-3 md:pt-1"
      >
        {themeList.map((theme) => {
          const selected = theme.id === themeId;
          const tag = layoutLabel(theme);
          return (
            <button
              key={theme.id}
              ref={(node) => {
                if (node) itemRefs.current.set(theme.id, node);
                else itemRefs.current.delete(theme.id);
              }}
              type="button"
              role="radio"
              aria-checked={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(themeList.indexOf(theme), false)}
              title={theme.name}
              className={[
                "group flex shrink-0 items-center gap-2.5 rounded-lg p-1.5 text-left outline-none transition",
                "flex-col md:flex-row",
                "focus-visible:ring-2 focus-visible:ring-indigo-400",
                selected ? "bg-indigo-50 ring-1 ring-indigo-200" : "hover:bg-zinc-100",
              ].join(" ")}
            >
              <span
                className={[
                  "relative block h-[72px] w-[54px] shrink-0 overflow-hidden rounded-md border transition duration-150",
                  selected
                    ? "border-indigo-500 shadow-md"
                    : "border-zinc-200 shadow-sm group-hover:border-zinc-300 group-hover:shadow-md",
                ].join(" ")}
              >
                <ThemeThumb theme={theme} />
              </span>
              <span className="min-w-0 md:flex-1">
                <span
                  className={[
                    "block truncate text-xs leading-tight",
                    selected ? "font-semibold text-indigo-700" : "font-medium text-zinc-700 group-hover:text-zinc-900",
                  ].join(" ")}
                >
                  {theme.name}
                </span>
                {tag ? (
                  <span className="mt-0.5 hidden text-[10px] uppercase tracking-wide text-zinc-400 md:block">
                    {tag === "2-col" ? "Two column" : "Dark"}
                  </span>
                ) : null}
              </span>
            </button>
          );
        })}
      </div>

      <div
        hidden={collapsed}
        className="hidden shrink-0 flex-wrap items-center gap-1 border-t border-zinc-200/80 px-3 py-2 text-[10px] text-zinc-400 md:flex"
      >
        <Kbd>↑</Kbd>
        <Kbd>↓</Kbd>
        <span>or</span>
        <Kbd>[</Kbd>
        <Kbd>]</Kbd>
        <span>switch live</span>
      </div>
    </aside>
  );
}

function Kbd({ children }: { children: string }) {
  return (
    <kbd className="rounded border border-zinc-300 bg-white px-1.5 py-0.5 font-sans text-[10px] font-medium text-zinc-500 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
      {children}
    </kbd>
  );
}
