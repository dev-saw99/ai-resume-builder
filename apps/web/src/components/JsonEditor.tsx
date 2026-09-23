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
    <div className="flex h-full flex-col bg-zinc-950">
      <div className="flex items-center justify-between border-b border-zinc-800 px-3 py-1.5">
        <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
          resume.json
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={formatJson}
            className="rounded px-2 py-0.5 text-[11px] text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
          >
            Format
          </button>
          <button
            onClick={saveJson}
            disabled={parseError !== null || saveStatus === "saving"}
            title={parseError ? "Fix JSON errors before saving" : "Format and save to examples/sonu.json"}
            className="rounded bg-emerald-600 px-2 py-0.5 text-[11px] font-medium text-white hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
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
        <div className="border-t border-zinc-800 px-3 py-1.5">
          <p className="text-[11px] text-emerald-500">✓ Valid resume</p>
        </div>
      )}
    </div>
  );
}
