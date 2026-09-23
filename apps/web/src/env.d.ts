/** The resume JSON selected via RESUME_FILE (see vite.config.ts). */
declare module "@resume-data" {
  const data: unknown;
  export default data;
}

/** Repo-relative path of that file, for UI messages. */
declare const __RESUME_FILE__: string;

interface Window {
  /** Set by the server-side PDF renderer to render unsaved editor content. */
  __RESUME_OVERRIDE__?: unknown;
}
