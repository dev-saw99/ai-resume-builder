/** The resume JSON selected via RESUME_FILE (see vite.config.ts). */
declare module "@resume-data" {
  const data: unknown;
  export default data;
}

/** Repo-relative path of that file, for UI messages. */
declare const __RESUME_FILE__: string;
