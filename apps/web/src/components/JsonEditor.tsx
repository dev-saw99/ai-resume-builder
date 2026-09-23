import { useRef } from "react";
import { highlightJson } from "../highlightJson";
import { useAppStore } from "../store";

export function JsonEditor() {
  const jsonText = useAppStore((s) => s.jsonText);
  const parseError = useAppStore((s) => s.parseError);
  const schemaErrors = useAppStore((s) => s.schemaErrors);
  const saveStatus = useAppStore((s) => s.saveStatus);
  const saveMessage = useAppStore((s) => s.saveMessage);
  const setJsonText = useAppStore((s) => s.setJsonText);
  const formatJson = useAppStore((s) => s.formatJson);
  const saveJson = useAppStore((s) => s.saveJson);

  const preRef = useRef<HTMLPreElement>(null);

  const hasErrors = parseError !== null || schemaErrors.length > 0;

  const syncScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (preRef.current) {
      preRef.current.scrollTop = e.currentTarget.scrollTop;
      preRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
  };

  return (
    <div className="flex h-full flex-col bg-[#0b0d12]">
      <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.03] px-3 py-2">
        <span className="flex items-center gap-2 text-xs font-medium text-zinc-300">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-amber-400" />
          resume.json
          <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] font-normal text-zinc-500">
            schema-validated
          </span>
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={formatJson}
            className="rounded-md px-2 py-1 text-[11px] text-zinc-400 outline-none hover:bg-white/10 hover:text-zinc-100 focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            Format
          </button>
          <button
            onClick={saveJson}
            disabled={parseError !== null || saveStatus === "saving"}
            title={parseError ? "Fix JSON errors before saving" : "Format and save (Ctrl/⌘+S)"}
            className="rounded-md bg-emerald-600 px-2.5 py-1 text-[11px] font-medium text-white outline-none hover:bg-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-300 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
          >
            {saveStatus === "saving" ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      <div className="relative min-h-0 flex-1">
        <pre
          ref={preRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-auto whitespace-pre-wrap break-words p-3 font-mono text-[12px] leading-relaxed text-zinc-200"
          dangerouslySetInnerHTML={{ __html: highlightJson(jsonText) + "\n" }}
        />
        <textarea
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          onScroll={syncScroll}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
              e.preventDefault();
              void saveJson();
            }
          }}
          aria-label="Resume JSON"
          spellCheck={false}
          className="absolute inset-0 resize-none whitespace-pre-wrap break-words bg-transparent p-3 font-mono text-[12px] leading-relaxed text-transparent caret-zinc-200 outline-none"
        />
      </div>

      {hasErrors ? (
        <div className="max-h-36 overflow-y-auto border-t border-red-900/50 bg-red-950/40 px-3 py-2">
          {parseError ? (
            <p className="text-[11px] text-red-400">
              <span className="font-semibold">JSON:</span> {parseError}
            </p>
          ) : (
            schemaErrors.map((error, i) => (
              <p key={i} className="text-[11px] text-red-400">
                <span className="font-mono font-semibold">{error.path}</span> — {error.message}
              </p>
            ))
          )}
        </div>
      ) : saveStatus === "saved" ? (
        <div className="border-t border-emerald-900/50 bg-emerald-950/40 px-3 py-1.5">
          <p className="text-[11px] text-emerald-400">✓ {saveMessage}</p>
        </div>
      ) : saveStatus === "error" ? (
        <div className="border-t border-red-900/50 bg-red-950/40 px-3 py-1.5">
          <p className="text-[11px] text-red-400">✗ {saveMessage}</p>
        </div>
      ) : (
        <div className="border-t border-white/5 px-3 py-1.5">
          <p className="text-[11px] text-emerald-500">✓ Valid resume</p>
        </div>
      )}
    </div>
  );
}
