import { useRef } from "react";
import { useResumePdf } from "@resume/pdf";
import { getTheme } from "@resume/themes";
import { JsonEditor } from "./components/JsonEditor";
import { Preview } from "./components/Preview";
import { ThemePicker } from "./components/ThemePicker";
import { TopBar } from "./components/TopBar";
import { useAppStore } from "./store";

export default function App() {
  const pageRef = useRef<HTMLDivElement>(null);
  const resume = useAppStore((s) => s.resume);
  const paperSize = useAppStore((s) => s.paperSize);
  const themeId = useAppStore((s) => s.themeId);
  const bgColor = useAppStore((s) => s.bgColor);

  const handlePrint = useResumePdf({
    contentRef: pageRef,
    documentTitle: resume.basics.name.toLowerCase().replace(/\s+/g, "-") + "-resume",
    paperSize,
    backgroundColor: bgColor ?? getTheme(themeId).tokens.colors.background,
  });

  return (
    <div className="flex h-dvh flex-col bg-white text-zinc-900">
      <TopBar onPrint={handlePrint} />
      <main className="grid min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)] md:grid-cols-[minmax(360px,2fr)_minmax(0,3fr)_auto] md:grid-rows-1">
        {/* Mobile: preview only. Desktop: split view. */}
        <div className="app-chrome hidden min-h-0 md:block">
          <JsonEditor />
        </div>
        <Preview pageRef={pageRef} />
        <ThemePicker />
      </main>
    </div>
  );
}
