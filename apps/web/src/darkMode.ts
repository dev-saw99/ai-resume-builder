const KEY = "resume-builder:mode";

/** Saved choice wins; otherwise follow the OS. The inline script in index.html applies it before first paint. */
export function prefersDark(): boolean {
  try {
    const saved = window.localStorage.getItem(KEY);
    if (saved) return saved === "dark";
  } catch {
    // storage unavailable — fall through to the OS setting
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function applyMode(dark: boolean): void {
  document.documentElement.classList.toggle("dark", dark);
  try {
    window.localStorage.setItem(KEY, dark ? "dark" : "light");
  } catch {
    // storage unavailable — the class still applies for this session
  }
}
